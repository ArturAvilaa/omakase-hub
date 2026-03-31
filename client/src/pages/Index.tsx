import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import MenuSection from "@/components/MenuSection";
import SearchBar from "@/components/SearchBar";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import AuthButton from "@/components/AuthButton";
import { menuCategories, rodizioCategories } from "@/data/menuData";

const Index = () => {
    const [mode, setMode] = useState<"cardapio" | "rodizio">("cardapio");
    const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeRodizioId, setActiveRodizioId] = useState(
        rodizioCategories[0].id,
    );

    const activeRodizioCategory = rodizioCategories.find(
        (c) => c.id === activeRodizioId,
    )!;

    const handleCategoryChange = (id: string) => {
        setActiveCategory(id);
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const top =
                el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const handleCardapioClick = () => {
        setMode("cardapio");
        setTimeout(() => {
            const el = document.getElementById("cardapio");
            if (el) {
                const top =
                    el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 50);
    };

    const handleRodizioClick = () => {
        setMode("rodizio");
        setTimeout(() => {
            const el = document.getElementById("cardapio");
            if (el) {
                const top =
                    el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 50);
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
                          item.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                          item.description
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()),
                  ),
              }))
              .filter((cat) => cat.items.length > 0)
        : menuCategories;

    return (
        <div className="min-h-screen bg-background">
            <AuthButton />
                onCardapioClick={handleCardapioClick}
                onRodizioClick={handleRodizioClick}
            />
            <div id="cardapio">
                {mode === "cardapio" ? (
                    <>
                        <CategoryNav
                            activeCategory={activeCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                        <main className="container mx-auto px-6">
                            {filteredCategories.length === 0 ? (
                                <div className="py-20 text-center">
                                    <p className="text-muted-foreground font-body">
                                        Nenhum item encontrado para "
                                        {searchQuery}"
                                    </p>
                                </div>
                            ) : (
                                filteredCategories.map((category) => (
                                    <MenuSection
                                        key={category.id}
                                        category={category}
                                    />
                                ))
                            )}
                        </main>
                    </>
                ) : (
                    <>
                        {/* Rodizio category navbar */}
                        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gold">
                            <div className="container mx-auto px-6">
                                <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-4">
                                    {rodizioCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() =>
                                                setActiveRodizioId(cat.id)
                                            }
                                            className={`whitespace-nowrap px-5 py-2 rounded-sm font-body text-sm tracking-wider transition-all ${
                                                activeRodizioId === cat.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                            }`}
                                        >
                                            <span className="mr-2 text-xs opacity-60">
                                                {cat.nameJp}
                                            </span>
                                            {cat.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        {/* Rodizio items */}
                        <main className="container mx-auto px-6">
                            <section className="py-12">
                                <div className="flex items-baseline gap-4 mb-8">
                                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                                        {activeRodizioCategory.name}
                                    </h2>
                                    <span className="text-2xl text-accent/40 font-body">
                                        {activeRodizioCategory.nameJp}
                                    </span>
                                    <div className="flex-1 h-px bg-border/50" />
                                </div>
                                <div>
                                    {activeRodizioCategory.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-start gap-4 py-5 border-b border-border/50 hover:bg-card/50 px-4 -mx-4 rounded-sm transition-colors"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-display text-lg font-semibold text-foreground">
                                                        {item.name}
                                                    </h3>
                                                    {item.tag && (
                                                        <span className="text-[10px] uppercase tracking-widest font-body px-2 py-0.5 bg-primary/20 text-accent rounded-sm">
                                                            {item.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 text-xs font-body tracking-widest uppercase text-accent border border-accent/40 px-3 py-1.5 rounded-sm shrink-0">
                                                <Check className="h-3 w-3" />
                                                Incluso
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </main>
                    </>
                )}
            </div>
            <Footer />
            <CartButton />
            <CartDrawer />
        </div>
    );
};

export default Index;
