const Footer = () => {
  return (
    <footer className="bg-card border-t border-gold py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-2">
              <span className="text-gradient-gold">Brasa</span> & Honra
            </h3>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              Cortes nobres grelhados na brasa com a tradição e o sabor que só uma churrascaria de verdade pode oferecer.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-3 text-foreground">Horário</h4>
            <div className="space-y-1 text-sm text-muted-foreground font-body">
              <p>Terça a Domingo</p>
              <p>11h30 – 15h30</p>
              <p>18h00 – 23h30</p>
              <p className="text-accent text-xs mt-2">Segunda: Fechado</p>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-3 text-foreground">Contato</h4>
            <div className="space-y-1 text-sm text-muted-foreground font-body">
              <p>(11) 99999-0000</p>
              <p>contato@brasaehonra.com.br</p>
              <p>Av. das Carnes, 456</p>
              <p>São Paulo – SP</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            © 2026 Brasa & Honra Churrascaria. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
