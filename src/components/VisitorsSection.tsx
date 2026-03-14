import { Smile, Music, BookOpen, Heart } from "lucide-react";
import carousel3 from "@/assets/carousel-3.jpg";

const expectations = [
  { icon: Smile, text: "A friendly and welcoming atmosphere" },
  { icon: Music, text: "Powerful worship and heartfelt prayer" },
  { icon: BookOpen, text: "Bible-based teaching that applies to everyday life" },
  { icon: Heart, text: "A church family that genuinely cares" },
];

const VisitorsSection = () => {
  return (
    <section id="visitors" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={carousel3}
              alt="Pastor Adeboye praying"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">First Time?</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              New Here?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Visiting RCCG Master's Place for the first time? We want your experience to be warm,
              welcoming, and meaningful. When you visit, you can expect:
            </p>

            <div className="space-y-4 mb-6">
              {expectations.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              We look forward to welcoming you and helping you grow in your journey with God.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorsSection;
