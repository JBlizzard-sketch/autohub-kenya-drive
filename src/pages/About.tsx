import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, Award, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us - AutoHub Kenya | Quality Auto Parts Supplier</title>
        <meta name="description" content="Learn about AutoHub Kenya, your trusted partner for genuine auto parts across Kenya. Expert service, quality products, and fast delivery since 2015." />
      </Helmet>

      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4">About AutoHub Kenya</h1>
            <p className="text-xl max-w-3xl">
              Kenya's most trusted automotive parts supplier, delivering quality and reliability since 2015.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  Founded in 2015, AutoHub Kenya began with a simple mission: to provide Kenyan motorists with genuine, high-quality auto parts at competitive prices. What started as a small shop in Nairobi has grown into Kenya's premier online automotive parts marketplace.
                </p>
                <p className="mb-4">
                  We understand the frustration of unreliable parts and poor service. That's why we've built relationships with trusted manufacturers and suppliers worldwide, ensuring every part we sell meets stringent quality standards.
                </p>
                <p>
                  Today, we serve thousands of customers across Kenya, from individual car owners to professional mechanics and auto repair shops. Our commitment to quality, fair pricing, and exceptional customer service remains unchanged.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center">Why Choose AutoHub Kenya?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="gradient-card shadow-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Genuine Parts</h3>
                  <p className="text-sm text-muted-foreground">
                    100% authentic parts from verified manufacturers with warranties
                  </p>
                </CardContent>
              </Card>

              <Card className="gradient-card shadow-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Same-day delivery in Nairobi, 2-3 days nationwide
                  </p>
                </CardContent>
              </Card>

              <Card className="gradient-card shadow-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Expert Advice</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional guidance to find the perfect part for your vehicle
                  </p>
                </CardContent>
              </Card>

              <Card className="gradient-card shadow-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Customer First</h3>
                  <p className="text-sm text-muted-foreground">
                    24/7 support and easy returns for your peace of mind
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Products Available</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Trusted Brands</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">15K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">9+</div>
                <div className="text-muted-foreground">Years in Business</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
