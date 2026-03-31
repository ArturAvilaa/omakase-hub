import heroImage from "@/assets/hero-sushi.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      <img
        src={heroImage}
        alt="Sushi artesanal premium"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 container mx-auto px-6 pb-20">
        <p className="font-body text-sm tracking-[0.4em] uppercase text-accent mb-4">
          Culinária Japonesa Autêntica
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
          <span className="text-gradient-gold">桜</span>{" "}
          <span className="text-foreground">Sakura</span>
        </h1>
        <p className="font-display text-xl md:text-2xl text-secondary-foreground italic max-w-lg">
          Uma experiência gastronômica que honra a tradição japonesa
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#cardapio"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Ver Cardápio
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
