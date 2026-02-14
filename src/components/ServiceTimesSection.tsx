import { Clock, MapPin } from "lucide-react";

const services = [
  { day: "Sunday", title: "Sunday Worship Service", time: "9:00 AM - 11:30 AM" },
  { day: "Tuesday", title: "Bible Study", time: "6:30 PM - 8:00 PM" },
  { day: "Friday", title: "Prayer & Praise Night", time: "7:00 PM - 9:00 PM" },
];

const ServiceTimesSection = () => {
  return (
    <section id="services" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Join Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Service Times
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.map((s) => (
            <div
              key={s.day}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 text-center"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                {s.day}
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{s.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg">123 Faith Avenue, City, State 12345</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceTimesSection;
