import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceTimesSection from "@/components/ServiceTimesSection";
import EventsSection from "@/components/EventsSection";
import SermonsSection from "@/components/SermonsSection";
import GivingSection from "@/components/GivingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServiceTimesSection />
      <EventsSection />
      <SermonsSection />
      <GivingSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
