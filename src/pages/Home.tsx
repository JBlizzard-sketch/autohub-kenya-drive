import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CarTipsWidget } from "@/components/home/CarTipsWidget";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <CarTipsWidget />
        <FeaturedCategories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
