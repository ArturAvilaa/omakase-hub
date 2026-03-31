import { useState } from "react";
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import MenuSection from "@/components/MenuSection";
import SearchBar from "@/components/SearchBar";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { menuCategories } from "@/data/menuData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredCategories = searchQuery
    ? menuCategories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : menuCategories;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div id="cardapio">
        <CategoryNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <main className="container mx-auto px-6">
          {filteredCategories.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground font-body">Nenhum item encontrado para "{searchQuery}"</p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <MenuSection key={category.id} category={category} />
            ))
          )}
        </main>
      </div>
      <Footer />
      <CartButton />
      <CartDrawer />
    </div>
  );
};

export default Index;
