import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Get In Touch</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Connect With Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Location</h4>
                <p className="text-muted-foreground">123 Faith Avenue, City, State 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                <p className="text-muted-foreground">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground">info@rccgmastersplace.org</p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Prayer request / contact form */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">Prayer Request</h3>
            <p className="text-muted-foreground text-sm mb-6">We'd love to pray with you. Share your request below.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Your Name" className="bg-background" />
              <Input type="email" placeholder="Your Email" className="bg-background" />
              <Textarea placeholder="Your prayer request..." rows={4} className="bg-background" />
              <Button className="w-full">Submit Prayer Request</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
