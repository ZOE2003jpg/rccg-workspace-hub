import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockResources, type LibraryResource } from "@/services/mockApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const typeIcons: Record<LibraryResource["type"], string> = {
  pdf: "PDF",
  book: "BOOK",
  guide: "GUIDE",
  devotional: "DEV",
};

const LibraryPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="mb-10">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Resources</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Church Library
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Explore books, guides, and devotionals to deepen your faith and knowledge.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                {/* Book cover */}
                <div
                  className="h-40 flex items-center justify-center relative"
                  style={{ backgroundColor: resource.coverColor }}
                >
                  <BookOpen className="w-12 h-12 text-white/40" />
                  <span className="absolute top-3 right-3 text-xs bg-white/20 text-white px-2 py-1 rounded-full font-semibold tracking-wider">
                    {typeIcons[resource.type]}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-primary mb-2">by {resource.author}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  <div className="flex gap-2">
                    {resource.pdfUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <a href={resource.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-1" /> Preview
                        </a>
                      </Button>
                    )}
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LibraryPage;
