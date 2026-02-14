import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkResponse, type IssueResponse } from "@/services/mockApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckResponse = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [conversation, setConversation] = useState<IssueResponse[] | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    const result = await checkResponse(code.trim());
    setConversation(result.found ? result.conversation! : null);
    setSearched(true);
    setLoading(false);
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
                placeholder="Enter your access code (e.g. TEST123)"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="bg-background font-mono text-lg tracking-wider"
              />
              <Button type="submit" disabled={loading || !code.trim()}>
                {loading ? "..." : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </form>

          {searched && !conversation && (
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

          {conversation && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Secure conversation thread</span>
              </div>

              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.from === "pastor" ? "" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.from === "pastor"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {msg.from === "pastor" ? (
                      <Shield className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.from === "pastor"
                        ? "bg-card border border-border rounded-tl-md"
                        : "bg-primary text-primary-foreground rounded-tr-md"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {msg.from === "pastor" ? "Pastor" : "You"}
                    </p>
                    <p className={`text-sm leading-relaxed ${msg.from === "pastor" ? "text-foreground" : ""}`}>
                      {msg.message}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.from === "pastor" ? "text-muted-foreground" : "text-primary-foreground/70"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckResponse;
