import { CheckCircle } from "lucide-react";

const desires = [
  "Know God personally",
  "Grow in their faith",
  "Discover their purpose",
  "Impact their world for Christ",
];

const WelcomeSection = () => {
  return (
    <section id="welcome" className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Who We Are</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Welcome to RCCG Master's Place
          </h2>
          <p className="text-accent font-semibold text-lg italic mb-6">
            A Place of Worship, Word, and Transformation
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Welcome to RCCG Master's Place Parish, a parish of The Redeemed Christian Church of God.
            We are a vibrant community of believers committed to raising disciples, transforming lives,
            and spreading the Gospel of Jesus Christ.
          </p>

          <p className="text-foreground font-semibold text-lg mt-6">Our desire is to help people:</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left mt-4">
            {desires.map((d) => (
              <div key={d} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed mt-6">
            Whether you are visiting for the first time or looking for a church family, you are welcome here.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-primary font-display text-xl font-semibold italic">
              "Welcome to RCCG Master's Place – Raising Disciples, Transforming Lives."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
