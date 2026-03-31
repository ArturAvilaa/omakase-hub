export interface MenuItem {
  id: string;
  name: string;
  nameJp?: string;
  description: string;
  price: number;
  pieces?: number;
  tag?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameJp: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "carnes-nobres",
    name: "Carnes Nobres",
    nameJp: "🔥",
    items: [
      { id: "cn1", name: "Picanha", description: "Corte premium grelhado no ponto, servida com sal grosso", price: 89.9, tag: "Especialidade" },
      { id: "cn2", name: "Costela Premium", description: "Costela bovina assada lentamente por 12 horas", price: 79.9, tag: "Chef's Choice" },
      { id: "cn3", name: "Ancho", description: "Corte argentino marmorizado, suculento e saboroso", price: 84.9 },
      { id: "cn4", name: "T-Bone", description: "Corte duplo com filé mignon e contra filé no osso", price: 99.9, tag: "Premium" },
      { id: "cn5", name: "Tomahawk", description: "Corte imponente no osso, 800g de pura carne", price: 149.9, tag: "Especial" },
    ],
  },
  {
    id: "cortes-tradicionais",
    name: "Cortes Tradicionais",
    nameJp: "🥩",
    items: [
      { id: "ct1", name: "Maminha", description: "Corte macio e suculento, temperado com ervas finas", price: 59.9, tag: "Popular" },
      { id: "ct2", name: "Fraldinha", description: "Grelhada ao ponto com chimichurri da casa", price: 54.9 },
      { id: "ct3", name: "Contra Filé", description: "Corte clássico com capa de gordura dourada", price: 64.9 },
      { id: "ct4", name: "Cupim", description: "Assado lentamente até desmanchar, sabor incomparável", price: 49.9 },
      { id: "ct5", name: "Linguiça Artesanal", description: "Blend exclusivo de carnes com temperos especiais", price: 34.9 },
    ],
  },
  {
    id: "espetos",
    name: "Espetos",
    nameJp: "🍢",
    items: [
      { id: "e1", name: "Espeto de Picanha", description: "Cubos de picanha grelhados na brasa", price: 18.9, tag: "Campeão" },
      { id: "e2", name: "Espeto de Frango", description: "Sobrecoxa marinada com ervas e limão", price: 12.9 },
      { id: "e3", name: "Espeto Misto", description: "Carne bovina, frango e linguiça no espeto", price: 16.9 },
      { id: "e4", name: "Espeto de Coração", description: "Coração de frango temperado na brasa", price: 14.9 },
      { id: "e5", name: "Espeto de Queijo Coalho", description: "Queijo coalho grelhado com melaço", price: 12.9, tag: "Vegetariano" },
    ],
  },
  {
    id: "acompanhamentos",
    name: "Acompanhamentos",
    nameJp: "🥗",
    items: [
      { id: "a1", name: "Arroz Biro-Biro", description: "Arroz crocante com batata palha e bacon", price: 24.9, tag: "Clássico" },
      { id: "a2", name: "Farofa Especial", description: "Farofa com bacon, ovo e banana da terra", price: 19.9 },
      { id: "a3", name: "Vinagrete", description: "Tomate, cebola e pimentão frescos temperados", price: 12.9 },
      { id: "a4", name: "Pão de Alho", description: "Pão artesanal recheado com manteiga de alho", price: 16.9, pieces: 4 },
      { id: "a5", name: "Batata Rústica", description: "Batatas assadas com alecrim e sal grosso", price: 22.9 },
    ],
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    nameJp: "🍮",
    items: [
      { id: "so1", name: "Abacaxi Grelhado", description: "Abacaxi caramelizado na brasa com canela", price: 18.9, tag: "Da Casa" },
      { id: "so2", name: "Pudim", description: "Pudim de leite condensado tradicional", price: 16.9 },
      { id: "so3", name: "Petit Gâteau", description: "Bolo de chocolate com centro cremoso e sorvete", price: 24.9 },
      { id: "so4", name: "Banana Flambada", description: "Banana caramelizada com sorvete de creme", price: 22.9 },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    nameJp: "🍷",
    items: [
      { id: "b1", name: "Caipirinha", description: "Cachaça artesanal com limão, açúcar e gelo", price: 22.9, tag: "Clássica" },
      { id: "b2", name: "Vinho Tinto", description: "Taça de malbec argentino selecionado", price: 28.9 },
      { id: "b3", name: "Chopp Artesanal", description: "Chopp gelado direto da torneira, 500ml", price: 16.9 },
      { id: "b4", name: "Refrigerante", description: "Coca-Cola, Guaraná ou Sprite", price: 7.9 },
      { id: "b5", name: "Água", description: "Com ou sem gás", price: 5.9 },
      { id: "b6", name: "Suco Natural", description: "Laranja, limão, abacaxi ou maracujá", price: 12.9 },
    ],
  },
];
