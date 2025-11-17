import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Wanjiru Kamau",
    location: "Nairobi, Kenya",
    image: testimonial1,
    rating: 5,
    testimonial: "AutoHub saved me so much time! I found the exact brake pads for my Toyota in minutes. Fast delivery and genuine parts. Highly recommend!"
  },
  {
    name: "David Ochieng",
    location: "Mombasa, Kenya",
    image: testimonial2,
    rating: 5,
    testimonial: "Best auto parts store in Kenya. The prices are fair and the quality is top-notch. Their WhatsApp support helped me choose the right engine parts."
  },
  {
    name: "Grace Akinyi",
    location: "Kisumu, Kenya",
    image: testimonial3,
    rating: 5,
    testimonial: "I've been buying from AutoHub for over a year now. Reliable service, authentic parts, and they always deliver on time. My go-to for all car parts!"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2">What Our Customers Say</h2>
            <p className="text-muted-foreground">Join thousands of satisfied customers across Kenya</p>
          </div>
          <Button variant="outline" className="hover-scale" asChild>
            <Link to="/testimonials">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
