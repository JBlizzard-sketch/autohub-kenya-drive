import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CarTipsWidget } from "@/components/home/CarTipsWidget";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AboutUsSnippet } from "@/components/home/AboutUsSnippet";
import { CTASection } from "@/components/home/CTASection";
import { CategoryProductCarousel } from "@/components/home/CategoryProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories_final_v3")
        .select("*")
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <TrustBadges />
        <FeaturedCategories />
        <FeaturedProducts />
        {categories?.map((category) => (
          <CategoryProductCarousel
            key={category.category_id}
            categoryId={category.category_id}
            categoryName={category.category_name}
          />
        ))}
        <AboutUsSnippet />
        <TestimonialsSection />
        <CarTipsWidget />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
