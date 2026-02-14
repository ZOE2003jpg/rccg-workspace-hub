import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    date: "Mar 2",
    month: "MAR",
    title: "Annual Thanksgiving Service",
    description: "Join us for a special service of gratitude and celebration.",
    time: "10:00 AM",
  },
  {
    date: "Mar 15",
    month: "MAR",
    title: "Youth Conference 2026",
    description: "Empowering the next generation with purpose and vision.",
    time: "5:00 PM",
  },
  {
    date: "Apr 5",
    month: "APR",
    title: "Easter Sunday Celebration",
    description: "Celebrate the resurrection with praise, worship, and fellowship.",
    time: "9:00 AM",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Upcoming</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Events & Programs
          </h2>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                <span className="text-primary text-xs font-bold tracking-wider">{event.month}</span>
                <span className="text-primary text-xl font-bold">{event.date.split(" ")[1]}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground">{event.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {event.time}
                </span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  Details <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
