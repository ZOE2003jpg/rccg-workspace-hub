
-- Create enums
CREATE TYPE public.sender_type AS ENUM ('youth', 'admin');
CREATE TYPE public.submission_status AS ENUM ('new', 'awaiting_admin', 'awaiting_user', 'resolved');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table (needed by admin policies)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role helper
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  status submission_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_submissions_access_code ON public.submissions (access_code);
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  sender_type sender_type NOT NULL,
  sender_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_submission_id ON public.messages (submission_id);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Admin RLS policies
CREATE POLICY "Admins can view all submissions" ON public.submissions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions" ON public.submissions
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all messages" ON public.messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert messages" ON public.messages
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SECURITY DEFINER RPC: Submit issue
CREATE OR REPLACE FUNCTION public.submit_issue(p_category TEXT, p_title TEXT, p_message TEXT)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_access_code TEXT;
  v_submission_id UUID;
  v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  v_exists BOOLEAN;
BEGIN
  LOOP
    v_access_code := '';
    FOR i IN 1..14 LOOP
      v_access_code := v_access_code || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
    END LOOP;
    SELECT EXISTS(SELECT 1 FROM submissions WHERE access_code = v_access_code) INTO v_exists;
    EXIT WHEN NOT v_exists;
  END LOOP;

  INSERT INTO submissions (access_code, category, title, status)
  VALUES (v_access_code, p_category, p_title, 'new')
  RETURNING id INTO v_submission_id;

  INSERT INTO messages (submission_id, sender_type, message)
  VALUES (v_submission_id, 'youth', p_message);

  RETURN json_build_object('access_code', v_access_code, 'submission_id', v_submission_id);
END;
$$;

-- SECURITY DEFINER RPC: Get thread by access code
CREATE OR REPLACE FUNCTION public.get_thread_by_code(p_access_code TEXT)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_submission RECORD;
  v_messages JSON;
BEGIN
  SELECT id, category, title, status, created_at INTO v_submission
  FROM submissions WHERE access_code = p_access_code;

  IF NOT FOUND THEN RETURN json_build_object('found', false); END IF;

  SELECT json_agg(row_to_json(m) ORDER BY m.created_at ASC) INTO v_messages
  FROM (SELECT id, sender_type, message, created_at FROM messages WHERE submission_id = v_submission.id ORDER BY created_at ASC) m;

  RETURN json_build_object(
    'found', true,
    'submission', json_build_object('id', v_submission.id, 'category', v_submission.category, 'title', v_submission.title, 'status', v_submission.status, 'created_at', v_submission.created_at),
    'messages', COALESCE(v_messages, '[]'::json)
  );
END;
$$;

-- SECURITY DEFINER RPC: Youth reply
CREATE OR REPLACE FUNCTION public.reply_to_thread(p_access_code TEXT, p_message TEXT)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_submission_id UUID;
BEGIN
  SELECT id INTO v_submission_id FROM submissions WHERE access_code = p_access_code;
  IF NOT FOUND THEN RETURN json_build_object('success', false, 'error', 'Invalid access code'); END IF;

  INSERT INTO messages (submission_id, sender_type, message) VALUES (v_submission_id, 'youth', p_message);
  UPDATE submissions SET status = 'awaiting_admin' WHERE id = v_submission_id;

  RETURN json_build_object('success', true);
END;
$$;

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
