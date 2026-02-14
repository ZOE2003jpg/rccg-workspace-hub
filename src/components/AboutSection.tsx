import { Heart, Users, BookOpen } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Love & Worship",
    description: "We are passionate about worshipping God and expressing His love to everyone we encounter.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building genuine relationships and supporting one another through life's journey together.",
  },
  {
    icon: BookOpen,
    title: "The Word",
    description: "Grounded in scripture, we teach and live by the truth of God's Word in all we do.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Who We Are</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Welcome Home
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            RCCG Master's Place is a dynamic and diverse congregation committed to raising 
            leaders who transform their world through the power of the Gospel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item) => (
            <div
              key={item.title}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
