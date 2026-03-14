import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquarePlus, Search, Headphones, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/WelcomeSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import MinistriesSection from "@/components/MinistriesSection";
import VisitorsSection from "@/components/VisitorsSection";
import ServiceTimesSection from "@/components/ServiceTimesSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import carousel1 from "@/assets/carousel-1.jpeg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";

const carouselImages = [
  { src: carousel1, alt: "Pastor E.A. Adeboye preaching" },
  { src: carousel2, alt: "Pastor E.A. Adeboye ministering" },
  { src: carousel3, alt: "Pastor E.A. Adeboye praying" },
];

const quickActions = [
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
  {
    icon: MessageSquarePlus,
    label: "Submit Issue",
    description: "Share a concern confidentially",
    to: "/submit-issue",
    accent: true,
  },
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  const next = () => setCurrent((c) => (c + 1) % carouselImages.length);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero — compact with carousel */}
      <section
        id="home"
        className="relative pt-16 overflow-hidden"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="relative z-10 px-4 py-8 sm:py-12 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Text */}
            <div className="text-center md:text-left flex-1">
              <p className="text-primary-foreground/80 text-xs tracking-[0.3em] uppercase mb-2">
                Welcome to
              </p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-3">
                RCCG Master's Place
              </h1>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-md mx-auto md:mx-0 mb-4 font-light leading-relaxed">
                A Place of Worship, Word, and Transformation.
              </p>
            </div>

            {/* Carousel */}
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md flex-shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                {carouselImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      i === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-sm rounded-full p-1.5 text-foreground hover:bg-background/80 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-sm rounded-full p-1.5 text-foreground hover:bg-background/80 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === current ? "bg-primary-foreground" : "bg-primary-foreground/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick action cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={`group rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105 ${
                  action.accent
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/20"
                }`}
              >
                <action.icon className="w-6 h-6 mx-auto mb-1.5" />
                <h3 className="font-semibold text-xs sm:text-sm">{action.label}</h3>
                <p className="text-[10px] sm:text-xs mt-0.5 opacity-80 hidden sm:block">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WelcomeSection />
      <VisionMissionSection />
      <CoreValuesSection />
      <MinistriesSection />
      <VisitorsSection />
      <ServiceTimesSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
