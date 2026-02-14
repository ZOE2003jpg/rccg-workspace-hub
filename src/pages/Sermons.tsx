import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Headphones, Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockSermons } from "@/services/mockApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SermonsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSermon, setSelectedSermon] = useState<string | null>(null);

  const filtered = mockSermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      (s.series?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

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

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Listen & Watch</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Sermon Archive
              </h1>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sermons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
          </div>

          {/* Video player */}
          {selectedSermon && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-border bg-card">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedSermon}?autoplay=1`}
                  title="Sermon Video"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <button
                  onClick={() => setSelectedSermon(sermon.youtubeId ?? null)}
                  className="w-full aspect-video bg-primary/5 flex items-center justify-center relative"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Play className="w-7 h-7 text-primary ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 text-xs bg-foreground/80 text-background px-2 py-1 rounded">
                    {sermon.duration}
                  </span>
                  {sermon.series && (
                    <span className="absolute top-3 left-3 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      {sermon.series}
                    </span>
                  )}
                </button>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {sermon.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">{sermon.speaker}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
                    {sermon.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {sermon.date}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary"
                        onClick={() => setSelectedSermon(sermon.youtubeId ?? null)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-primary">
                        <Headphones className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No sermons found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SermonsPage;
