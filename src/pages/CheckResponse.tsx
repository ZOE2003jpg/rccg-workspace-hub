import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, User, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getThreadByCode, replyToThread, subscribeToMessages, type ThreadMessage } from "@/services/issueApi";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " • " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

const CheckResponse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      const result = await getThreadByCode(code.trim());
      if (result.found && result.messages) {
        setMessages(result.messages);
        setSubmissionId(result.submission!.id);
        setActiveCode(code.trim());
      } else {
        setMessages([]);
        setSubmissionId(null);
        setActiveCode("");
      }
      setSearched(true);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim() || !activeCode) return;
    setSending(true);
    try {
      await replyToThread(activeCode, reply.trim());
      setReply("");
      // Refetch thread to get latest
      const result = await getThreadByCode(activeCode);
      if (result.found && result.messages) setMessages(result.messages);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  // Realtime subscription
  useEffect(() => {
    if (!submissionId) return;
    const unsub = subscribeToMessages(submissionId, (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });
    return unsub;
  }, [submissionId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Check Response
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your access code to view the pastoral response to your submitted issue.
            </p>
          </div>

          <form onSubmit={handleCheck} className="bg-card rounded-2xl p-6 sm:p-8 border border-border mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">Access Code</label>
            <div className="flex gap-3">
              <Input
                placeholder="Enter your access code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-background font-mono text-lg tracking-wider"
              />
              <Button type="submit" disabled={loading || !code.trim()}>
                {loading ? "..." : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </form>

          {searched && messages.length === 0 && !submissionId && (
            <div className="text-center bg-card rounded-2xl p-8 border border-border">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No Response Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                We haven't found a response for this code. Please check back later or verify your access code.
              </p>
              <Button variant="outline" onClick={() => navigate("/submit-issue")}>
                Submit a New Issue
              </Button>
            </div>
          )}

          {messages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Secure conversation thread</span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender_type === "admin" ? "" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender_type === "admin"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {msg.sender_type === "admin" ? (
                      <Shield className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.sender_type === "admin"
                        ? "bg-card border border-border rounded-tl-md"
                        : "bg-primary text-primary-foreground rounded-tr-md"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {msg.sender_type === "admin" ? "Pastor" : "You"}
                    </p>
                    <p className={`text-sm leading-relaxed ${msg.sender_type === "admin" ? "text-foreground" : ""}`}>
                      {msg.message}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender_type === "admin" ? "text-muted-foreground" : "text-primary-foreground/70"
                      }`}
                    >
                      {formatDate(msg.created_at)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />

              {/* Reply input */}
              <div className="bg-card rounded-2xl p-4 border border-border mt-6">
                <Textarea
                  placeholder="Type your reply..."
                  rows={3}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="bg-background mb-3"
                />
                <div className="flex justify-end">
                  <Button onClick={handleReply} disabled={sending || !reply.trim()}>
                    {sending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Reply</>}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckResponse;
