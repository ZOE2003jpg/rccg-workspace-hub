import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_1px,transparent_1px)] bg-[length:30px_30px]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary-foreground/80 font-sans text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">
          Welcome to
        </p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
          RCCG Master's Place
        </h1>
        <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          A place of worship, fellowship, and spiritual growth. Come experience 
          the love of God in a vibrant community of believers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8"
            asChild
          >
            <a href="#services">Join Us This Sunday</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8"
            asChild
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
