import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const allTestimonials = [
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
  },
  {
    name: "James Mwangi",
    location: "Nakuru, Kenya",
    image: testimonial2,
    rating: 5,
    testimonial: "Excellent customer service! They helped me identify the correct suspension parts for my Subaru. The parts arrived quickly and fit perfectly."
  },
  {
    name: "Lucy Njeri",
    location: "Eldoret, Kenya",
    image: testimonial1,
    rating: 5,
    testimonial: "AutoHub has the best selection of genuine parts in Kenya. I've compared prices with other shops and they're very competitive. Professional service!"
  },
  {
    name: "Peter Otieno",
    location: "Kisii, Kenya",
    image: testimonial2,
    rating: 5,
    testimonial: "The team at AutoHub really knows their stuff. They guided me through choosing the right oil filters and spark plugs for my Honda. Very satisfied!"
  },
  {
    name: "Mary Wambui",
    location: "Thika, Kenya",
    image: testimonial3,
    rating: 5,
    testimonial: "Fast delivery and quality parts! I ordered brake discs on Monday and received them on Wednesday. The packaging was excellent too."
  },
  {
    name: "Samuel Kipchoge",
    location: "Naivasha, Kenya",
    image: testimonial2,
    rating: 5,
    testimonial: "I run a small garage and AutoHub is my primary supplier. Consistent quality, fair prices, and they always have what I need in stock."
  },
  {
    name: "Faith Chebet",
    location: "Machakos, Kenya",
    image: testimonial1,
    rating: 5,
    testimonial: "Ordering through WhatsApp was so convenient! The team responded quickly and helped me choose the right battery for my Nissan. Great experience!"
  }
];

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title>Customer Testimonials - AutoHub Kenya</title>
        <meta
          name="description"
          content="Read reviews from satisfied customers across Kenya. See why AutoHub is Kenya's trusted auto parts supplier."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-blue">
            <div className="container mx-auto px-4 text-center">
              <h1 className="mb-4 text-white">Customer Testimonials</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers across Kenya have to say about AutoHub.
              </p>
            </div>
          </section>
          
          {/* Testimonials Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTestimonials.map((testimonial, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${(index % 6) * 0.1}s` }}>
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Testimonials;
