import { Eye, Target, Globe } from "lucide-react";
import carousel2 from "@/assets/carousel-2.jpg";

const missionPoints = [
  "To take as many people as possible with us to Heaven.",
  "To have a member of RCCG in every family of all nations.",
  "To accomplish this through holiness and righteous living.",
  "To plant churches within five minutes walking distance in developing countries and within five minutes driving distance in developed countries.",
  "To pursue these objectives until every nation in the world is reached with the Gospel of Jesus Christ.",
];

const rccgKnownFor = [
  "Strong emphasis on prayer",
  "Spirit-filled worship",
  "Sound biblical teaching",
  "Evangelism and missions",
  "Raising godly leaders",
];

const VisionMissionSection = () => {
  return (
    <section id="vision" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Our Foundation</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Vision & Mission
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              The vision of The Redeemed Christian Church of God is:
            </p>
            <p className="text-primary font-bold text-xl italic">To make Heaven.</p>
          </div>

          {/* Mission */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">To accomplish this vision:</p>
            <ul className="space-y-2">
              {missionPoints.map((point, i) => (
                <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-16">
          At RCCG Master's Place, we are committed to fulfilling this mission through evangelism,
          discipleship, prayer, and service.
        </p>

        {/* About RCCG Worldwide */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground">About RCCG Worldwide</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Redeemed Christian Church of God (RCCG) is an international Pentecostal church
                  founded in 1952 by Josiah Olufemi Akindayomi in Nigeria.
                </p>
                <p>
                  From humble beginnings, RCCG has grown into a global movement with thousands of
                  parishes in more than 190 countries worldwide. The church is currently led by the
                  General Overseer, Enoch Adejare Adeboye.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-foreground font-semibold mb-3">RCCG is known for:</p>
                <div className="flex flex-wrap gap-2">
                  {rccgKnownFor.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative min-h-[250px] md:min-h-0">
              <img
                src={carousel2}
                alt="Pastor E.A. Adeboye ministering"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
