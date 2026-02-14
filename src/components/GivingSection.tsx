import { Heart, Gift, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

const GivingSection = () => {
  return (
    <section id="give" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Online Giving</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Give Generously
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Your tithes and offerings help us spread the Gospel, support our community, 
            and build God's kingdom right here.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Heart, label: "Tithes" },
            { icon: Gift, label: "Offerings" },
            { icon: HandHeart, label: "Special Seeds" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{item.label}</h3>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10"
        >
          Give Now
        </Button>
      </div>
    </section>
  );
};

export default GivingSection;
