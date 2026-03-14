import { Flame, Users, Fish } from "lucide-react";

const events = [
  {
    icon: Flame,
    title: "Annual Holy Ghost Congress",
    description: "A powerful time of prayer, worship, and encounters with God's Spirit.",
  },
  {
    icon: Users,
    title: "Annual Convention",
    description: "Join us for a life-changing gathering of teaching, fellowship, and spiritual renewal.",
  },
  {
    icon: Fish,
    title: "Let's Go Fishing (April & December)",
    description: "A fun and engaging fellowship event as we enjoy God's creation and strengthen relationships in a relaxed outdoor setting.",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Upcoming</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <event.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{event.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
