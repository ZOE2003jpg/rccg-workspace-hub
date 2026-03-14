import { Heart, BookOpen, Users, Megaphone } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Worship & Prayer",
    description: "We believe in passionate worship and fervent prayer as a way to encounter God's presence and power.",
  },
  {
    icon: BookOpen,
    title: "The Word of God",
    description: "The Bible is our foundation. We teach and live according to God's Word.",
  },
  {
    icon: Users,
    title: "Love & Fellowship",
    description: "We are a family that cares for one another and grows together in faith.",
  },
  {
    icon: Megaphone,
    title: "Evangelism",
    description: "We are committed to sharing the Gospel and bringing people to Christ.",
  },
];

const CoreValuesSection = () => {
  return (
    <section id="values" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">What We Stand For</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Core Values
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item) => (
            <div
              key={item.title}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
