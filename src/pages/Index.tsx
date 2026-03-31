import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import { menuCategories } from "@/data/menuData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const cat of menuCategories) {
        const el = document.getElementById(cat.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div id="cardapio">
        <CategoryNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <main className="container mx-auto px-6">
          {menuCategories.map((category) => (
            <MenuSection key={category.id} category={category} />
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
