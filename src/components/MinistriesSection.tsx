import { Baby, Sparkles, Shield, HeartHandshake, Music } from "lucide-react";

const ministries = [
  {
    icon: Baby,
    title: "Children's Ministry",
    description: "Helping children grow in their understanding of God through fun and engaging Bible teaching.",
  },
  {
    icon: Sparkles,
    title: "Youth Ministry",
    description: "Empowering young people to live for Christ and discover their purpose.",
  },
  {
    icon: Shield,
    title: "Men's Fellowship",
    description: "Encouraging men to grow spiritually and become godly leaders in their families and communities.",
  },
  {
    icon: HeartHandshake,
    title: "Women's Fellowship",
    description: "Supporting and equipping women to live a life of faith, strength, and purpose.",
  },
  {
    icon: Music,
    title: "Choir & Worship Team",
    description: "Leading the congregation into powerful moments of praise and worship.",
  },
];

const MinistriesSection = () => {
  return (
    <section id="ministries" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Get Involved</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ministries & Departments
          </h2>
          <p className="text-muted-foreground text-lg">
            There is a place for everyone to grow and serve at RCCG Master's Place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
