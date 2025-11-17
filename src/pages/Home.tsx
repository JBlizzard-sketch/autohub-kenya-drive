import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CarTipsWidget } from "@/components/home/CarTipsWidget";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <TrustBadges />
        <FeaturedCategories />
        <FeaturedProducts />
        <CarTipsWidget />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
