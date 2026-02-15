import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Copy, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitIssue } from "@/services/issueApi";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  "Spiritual Guidance",
  "Marriage & Family",
  "Youth & Teenagers",
  "Financial Counseling",
  "Health & Wellness",
  "Church Operations",
  "Volunteering",
  "Other",
];

const SubmitIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !message) return;
    setLoading(true);
    try {
      const result = await submitIssue({ category, title, message });
      setAccessCode(result.accessCode);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to submit issue.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

          {!accessCode ? (
            <>
              <div className="mb-8">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  Submit an Issue
                </h1>
                <p className="text-muted-foreground text-lg">
                  Share your concern confidentially. A pastor will review and respond through a secure channel.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-6 sm:p-8 border border-border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                  <Input
                    placeholder="Brief title for your issue"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea
                    placeholder="Describe your concern in detail. Your submission is confidential."
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold"
                  disabled={loading || !category || !title || !message}
                >
                  {loading ? "Submitting..." : "Submit Issue"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  🔒 Your submission is private and only visible to designated pastoral leadership.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center bg-card rounded-2xl p-8 sm:p-12 border border-border">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Issue Submitted Successfully
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your concern has been received. Use the access code below to check for a pastoral response.
              </p>

              <div className="bg-secondary rounded-xl p-6 mb-8 inline-block">
                <p className="text-sm text-muted-foreground mb-2">Your Access Code</p>
                <div className="flex items-center gap-3 justify-center">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-wider break-all">
                    {accessCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                    title="Copy code"
                  >
                    {copied ? <ClipboardCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-8">
                ⚠️ Save this code — it's the only way to check your response.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate("/check-response")} variant="default">
                  Check Response
                </Button>
                <Button onClick={() => navigate("/")} variant="outline">
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SubmitIssue;
