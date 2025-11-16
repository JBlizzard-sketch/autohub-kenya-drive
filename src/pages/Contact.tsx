import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us - AutoHub Kenya | Get in Touch</title>
        <meta name="description" content="Contact AutoHub Kenya for auto parts inquiries. Visit our Nairobi showroom or reach us via phone, email, or WhatsApp. Expert support available 24/7." />
      </Helmet>

      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4">Get in Touch</h1>
            <p className="text-xl max-w-3xl">
              Have a question? We're here to help. Contact us anytime.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="gradient-card shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Visit Us</h3>
                        <p className="text-sm text-muted-foreground">
                          AutoHub Kenya<br />
                          Mombasa Road, Industrial Area<br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-card shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Call Us</h3>
                        <p className="text-sm text-muted-foreground">
                          +254 712 345 678<br />
                          +254 733 456 789
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-card shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email Us</h3>
                        <p className="text-sm text-muted-foreground">
                          info@autohubkenya.co.ke<br />
                          sales@autohubkenya.co.ke
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-card shadow-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Business Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Mon - Fri: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 5:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="gradient-card shadow-card border-border">
                  <CardContent className="p-8">
                    <h2 className="mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+254 712 345 678"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={6}
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full md:w-auto shadow-glow">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center">Find Our Showroom</h2>
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-elevated">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818749933982!2d36.88800931475393!3d-1.2832533990626668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1178c5d6b7e9%3A0x9f3a3e5e4b5e5e5e!2sIndustrial%20Area%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AutoHub Kenya Location"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
