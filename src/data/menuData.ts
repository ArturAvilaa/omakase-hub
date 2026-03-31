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
    id: "sushi",
    name: "Sushi",
    nameJp: "寿司",
    items: [
      { id: "s1", name: "Sushi de Salmão", nameJp: "サーモン寿司", description: "Fatia fresca de salmão sobre arroz temperado", price: 12.9, pieces: 2, tag: "Popular" },
      { id: "s2", name: "Sushi de Atum", nameJp: "マグロ寿司", description: "Atum premium sobre base de arroz japonês", price: 14.9, pieces: 2 },
      { id: "s3", name: "Sushi de Camarão", nameJp: "エビ寿司", description: "Camarão cozido com toque de limão", price: 13.9, pieces: 2 },
      { id: "s4", name: "Sushi Skin", nameJp: "スキン寿司", description: "Pele de salmão grelhada crocante", price: 10.9, pieces: 2 },
      { id: "s5", name: "Sushi de Polvo", nameJp: "タコ寿司", description: "Polvo macio sobre arroz avinagrado", price: 15.9, pieces: 2 },
    ],
  },
  {
    id: "sashimi",
    name: "Sashimi",
    nameJp: "刺身",
    items: [
      { id: "sa1", name: "Sashimi de Salmão", nameJp: "サーモン刺身", description: "5 fatias generosas de salmão fresco", price: 28.9, pieces: 5, tag: "Chef's Choice" },
      { id: "sa2", name: "Sashimi de Atum", nameJp: "マグロ刺身", description: "5 fatias de atum vermelho premium", price: 32.9, pieces: 5 },
      { id: "sa3", name: "Sashimi Misto", nameJp: "刺身盛り合わせ", description: "Seleção de peixes frescos do dia", price: 45.9, pieces: 10, tag: "Especial" },
      { id: "sa4", name: "Sashimi de Peixe Branco", nameJp: "白身刺身", description: "Fatias delicadas de peixe branco", price: 26.9, pieces: 5 },
    ],
  },
  {
    id: "temaki",
    name: "Temaki",
    nameJp: "手巻き",
    items: [
      { id: "t1", name: "Temaki de Salmão", nameJp: "サーモン手巻き", description: "Cone de alga com salmão, cream cheese e cebolinha", price: 22.9, tag: "Popular" },
      { id: "t2", name: "Temaki Filadélfia", nameJp: "フィラデルフィア手巻き", description: "Salmão grelhado com cream cheese", price: 24.9 },
      { id: "t3", name: "Temaki de Atum", nameJp: "マグロ手巻き", description: "Atum fresco com pepino e gergelim", price: 24.9 },
      { id: "t4", name: "Temaki Ebi Fry", nameJp: "エビフライ手巻き", description: "Camarão empanado com molho especial", price: 26.9 },
    ],
  },
  {
    id: "hot-rolls",
    name: "Hot Rolls",
    nameJp: "ホットロール",
    items: [
      { id: "h1", name: "Hot Roll de Salmão", nameJp: "サーモンホットロール", description: "Rolinho empanado e frito com salmão e cream cheese", price: 28.9, pieces: 8, tag: "Mais Pedido" },
      { id: "h2", name: "Hot Roll de Camarão", nameJp: "エビホットロール", description: "Crocante por fora, recheio cremoso de camarão", price: 32.9, pieces: 8 },
      { id: "h3", name: "Hot Roll Vegetariano", nameJp: "ベジホットロール", description: "Legumes frescos empanados com cream cheese", price: 24.9, pieces: 8 },
      { id: "h4", name: "Hot Roll Skin", nameJp: "スキンホットロール", description: "Pele de salmão crocante com tartar", price: 26.9, pieces: 8 },
    ],
  },
  {
    id: "combinados",
    name: "Combinados",
    nameJp: "セット",
    items: [
      { id: "c1", name: "Combo Individual", nameJp: "個人セット", description: "10 peças variadas de sushi e sashimi", price: 49.9, pieces: 10 },
      { id: "c2", name: "Combo Casal", nameJp: "カップルセット", description: "24 peças com sushi, sashimi e hot roll", price: 89.9, pieces: 24, tag: "Melhor Custo" },
      { id: "c3", name: "Combo Premium", nameJp: "プレミアムセット", description: "36 peças com seleção especial do chef", price: 139.9, pieces: 36, tag: "Premium" },
      { id: "c4", name: "Combo Família", nameJp: "ファミリーセット", description: "50 peças variadas para toda a família", price: 179.9, pieces: 50 },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    nameJp: "飲み物",
    items: [
      { id: "b1", name: "Saquê Quente", nameJp: "熱燗", description: "Saquê tradicional servido quente", price: 18.9 },
      { id: "b2", name: "Saquê Frio", nameJp: "冷酒", description: "Saquê premium gelado", price: 22.9 },
      { id: "b3", name: "Chá Verde", nameJp: "緑茶", description: "Chá verde japonês tradicional", price: 8.9 },
      { id: "b4", name: "Refrigerante", description: "Coca-Cola, Guaraná ou Sprite", price: 7.9 },
      { id: "b5", name: "Água", description: "Com ou sem gás", price: 5.9 },
    ],
  },
];
