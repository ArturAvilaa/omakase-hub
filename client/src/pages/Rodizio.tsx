import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import heroImage from "@/assets/hero-churrascaria.jpg";
import Footer from "@/components/Footer";
import { rodizioCategories } from "@/data/menuData";

const Rodizio = () => {
    const [activeId, setActiveId] = useState(rodizioCategories[0].id);

    const activeCategory = rodizioCategories.find((c) => c.id === activeId)!;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <section className="relative h-72 md:h-96 flex items-end">
                <img
                    src={heroImage}
                    alt="Espeto Corrido - Churrascaria Brasa & Honra"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-hero-overlay" />
                <div className="relative z-10 container mx-auto px-6 pb-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-accent font-body text-xs tracking-widest uppercase hover:opacity-80 transition-opacity mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao Cardápio
                    </Link>
                    <p className="font-body text-sm tracking-[0.4em] uppercase text-accent mb-3">
                        Rodízio Completo
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
                        <span className="text-gradient-gold">Espeto</span>{" "}
                        <span className="text-foreground">Corrido</span>
                    </h1>
                    <p className="font-display text-lg md:text-xl text-secondary-foreground italic">
                        Todos os dias das 18 às 23 — Carne à vontade na brasa
                    </p>
                </div>
            </section>

            {/* Category Navbar */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
                <div className="container mx-auto px-6">
                    <nav className="flex gap-1 overflow-x-auto scrollbar-none py-1">
                        {rodizioCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveId(cat.id)}
                                className={`flex items-center gap-2 px-4 py-3 font-body text-xs tracking-widest uppercase whitespace-nowrap transition-all border-b-2 ${
                                    activeId === cat.id
                                        ? "border-accent text-accent"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <span>{cat.nameJp}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Active Category Items */}
            <main className="container mx-auto px-6">
                <section className="py-12">
                    <div className="flex items-baseline gap-4 mb-8">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                            {activeCategory.name}
                        </h2>
                        <span className="text-2xl text-accent/40 font-body">
                            {activeCategory.nameJp}
                        </span>
                        <div className="flex-1 h-px bg-border/50" />
                    </div>
                    <div>
                        {activeCategory.items.map((item) => (
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

            <Footer />
        </div>
    );
};

export default Rodizio;
