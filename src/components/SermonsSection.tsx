import { Play, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const sermons = [
  {
    title: "Walking in Purpose",
    speaker: "Pastor John",
    date: "Feb 9, 2026",
    duration: "45 min",
  },
  {
    title: "The Power of Faith",
    speaker: "Pastor John",
    date: "Feb 2, 2026",
    duration: "38 min",
  },
  {
    title: "Overcoming Through Grace",
    speaker: "Pastor Mary",
    date: "Jan 26, 2026",
    duration: "42 min",
  },
];

const SermonsSection = () => {
  return (
    <section id="sermons" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Listen & Watch</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Recent Sermons
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Missed a service? Catch up on our latest messages and be encouraged in your faith.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <div
              key={sermon.title}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-video bg-primary/5 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <span className="absolute bottom-3 right-3 text-xs bg-foreground/80 text-background px-2 py-1 rounded">
                  {sermon.duration}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{sermon.title}</h3>
                <p className="text-muted-foreground text-sm">{sermon.speaker} • {sermon.date}</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Play className="w-4 h-4 mr-1" /> Watch
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Headphones className="w-4 h-4 mr-1" /> Listen
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SermonsSection;
