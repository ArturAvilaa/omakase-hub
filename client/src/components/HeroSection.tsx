import heroImage from "@/assets/hero-churrascaria.jpg";

interface HeroSectionProps {
    onCardapioClick: () => void;
    onRodizioClick: () => void;
}

const HeroSection = ({ onCardapioClick, onRodizioClick }: HeroSectionProps) => {
    return (
        <section className="relative h-screen min-h-[600px] flex items-end">
            <img
                src={heroImage}
                alt="Churrascaria premium com carnes nobres na brasa"
                className="absolute inset-0 w-full h-full object-cover"
                width={1920}
                height={1080}
            />
            <div className="absolute inset-0 bg-hero-overlay" />
            <div className="relative z-10 container mx-auto px-6 pb-20">
                <p className="font-body text-sm tracking-[0.4em] uppercase text-accent mb-4">
                    Churrascaria Premium
                </p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
                    <span className="text-gradient-gold">Brasa</span>{" "}
                    <span className="text-foreground">& Honra</span>
                </h1>
                <p className="font-display text-xl md:text-2xl text-secondary-foreground italic max-w-lg">
                    O verdadeiro sabor da carne na brasa, tradição gaúcha com
                    excelência
                </p>
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={onCardapioClick}
                        className="inline-flex flex-col items-center bg-primary text-primary-foreground px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                    >
                        <span>Ver Cardápio</span>
                        <span className="text-xs tracking-widest opacity-80 normal-case font-normal mt-0.5">
                            11 às 15
                        </span>
                    </button>
                    <button
                        onClick={onRodizioClick}
                        className="inline-flex flex-col items-center bg-primary text-primary-foreground px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                    >
                        <span>Espeto Corrido</span>
                        <span className="text-xs tracking-widest opacity-80 normal-case font-normal mt-0.5">
                            18 às 23
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
