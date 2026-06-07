export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Franela Oversize Classic",
    category: "Franelas",
    price: 25,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    description: "Franela oversize de algodón 100% premium. Ideal para un look relajado y moderno."
  },
  {
    id: "2",
    name: "Jean Vintage Slim",
    category: "Jeans",
    price: 45,
    image: "https://images.unsplash.com/photo-1542272604-780c9685b5bf?q=80&w=600&auto=format&fit=crop",
    description: "Jean corte slim con lavado vintage. Comodidad y estilo para el día a día."
  },
  {
    id: "3",
    name: "Gorra Essential Minimal",
    category: "Gorras",
    price: 15,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop",
    description: "Gorra de béisbol minimalista con logo bordado sutil. Ajustable."
  },
  {
    id: "4",
    name: "Franela Básica Negra",
    category: "Franelas",
    price: 20,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
    description: "La clásica franela negra que no puede faltar en tu clóset. Tacto suave."
  },
  {
    id: "5",
    name: "Jean Cargo Street",
    category: "Jeans",
    price: 50,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    description: "Pantalón cargo estilo urbano con múltiples bolsillos funcionales."
  },
  {
    id: "6",
    name: "Lentes de Sol Retro",
    category: "Accesorios",
    price: 30,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    description: "Lentes de sol con diseño retro y protección UV400."
  },
  {
    id: "7",
    name: "Hoodie Essential Gris",
    category: "Suéteres",
    price: 40,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    description: "Suéter tipo hoodie con capucha, interior de fleece súper suave para los días fríos."
  },
  {
    id: "8",
    name: "Chaqueta Denim Clásica",
    category: "Chaquetas",
    price: 60,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=600&auto=format&fit=crop",
    description: "Chaqueta de jean con botones de metal. Un clásico atemporal."
  },
  {
    id: "9",
    name: "Sneakers Urbanos Blancos",
    category: "Zapatos",
    price: 55,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    description: "Zapatos de goma blancos, cómodos y perfectos para combinar con cualquier outfit."
  },
  {
    id: "10",
    name: "Short Deportivo Negro",
    category: "Shorts",
    price: 22,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    description: "Short deportivo de tela transpirable. Ideal para entrenar o estar en casa."
  },
  {
    id: "11",
    name: "Bolso Tote Canvas",
    category: "Accesorios",
    price: 18,
    image: "https://images.unsplash.com/photo-1597488950669-026857f6b577?q=80&w=600&auto=format&fit=crop",
    description: "Bolso de tela canvas resistente, excelente para llevar tus cosas del día a día."
  },
  {
    id: "12",
    name: "Pantalón Chino Beige",
    category: "Pantalones",
    price: 35,
    image: "https://images.unsplash.com/photo-1624378441864-6da7c44eaaf3?q=80&w=600&auto=format&fit=crop",
    description: "Pantalón de gabardina corte recto. Elegante y casual al mismo tiempo."
  }
];
