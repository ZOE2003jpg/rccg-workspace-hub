import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Search, Headphones, BookOpen, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ServiceTimesSection from "@/components/ServiceTimesSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const quickActions = [
  {
    icon: MessageSquarePlus,
    label: "Submit Issue",
    description: "Share a concern confidentially",
    to: "/submit-issue",
    accent: true,
  },
  {
    icon: Search,
    label: "Check Response",
    description: "View pastoral reply",
    to: "/check-response",
    accent: false,
  },
  {
    icon: Headphones,
    label: "Sermons",
    description: "Watch & listen to messages",
    to: "/sermons",
    accent: false,
  },
  {
    icon: BookOpen,
    label: "Library",
    description: "Books, guides & devotionals",
    to: "/library",
    accent: false,
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_1px,transparent_1px)] bg-[length:30px_30px]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-foreground/80 font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            RCCG Master's Place
          </h1>
          <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            A place of worship, fellowship, and spiritual growth. Come experience
            the love of God in a vibrant community of believers.
          </p>

          {/* Quick action cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={`group rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:scale-105 ${
                  action.accent
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/20"
                }`}
              >
                <action.icon className="w-7 h-7 mx-auto mb-2" />
                <h3 className="font-semibold text-sm sm:text-base">{action.label}</h3>
                <p className="text-xs mt-1 opacity-80 hidden sm:block">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      <AboutSection />
      <ServiceTimesSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
