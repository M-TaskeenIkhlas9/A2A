export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    productCount: 48,
  },
  {
    id: "2",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
    productCount: 64,
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600&q=80",
    productCount: 32,
  },
  {
    id: "4",
    name: "New Arrivals",
    slug: "new-arrivals",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    productCount: 24,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wool Blend Coat",
    slug: "premium-wool-blend-coat",
    price: 449,
    originalPrice: 599,
    description: "Crafted from the finest wool blend, this elegant coat combines timeless sophistication with modern comfort. Features a tailored fit, luxurious lining, and meticulous attention to detail that defines the AURELION experience.",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Navy", hex: "#1a365d" },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "2",
    name: "Silk Evening Dress",
    slug: "silk-evening-dress",
    price: 389,
    description: "An exquisite silk evening dress that embodies effortless elegance. The flowing silhouette and delicate draping create a stunning visual effect perfect for special occasions.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Black", hex: "#000000" },
      { name: "Burgundy", hex: "#800020" },
    ],
    isNew: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Cashmere Crewneck Sweater",
    slug: "cashmere-crewneck-sweater",
    price: 279,
    originalPrice: 349,
    description: "Pure cashmere luxury in a classic crewneck silhouette. Incredibly soft against the skin while providing superior warmth without bulk.",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Heather Gray", hex: "#9CA3AF" },
      { name: "Navy", hex: "#1a365d" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Tailored Wool Trousers",
    slug: "tailored-wool-trousers",
    price: 199,
    description: "Impeccably tailored trousers crafted from premium Italian wool. The perfect foundation for both formal and smart-casual looks.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    ],
    category: "men",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1a365d" },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Italian Leather Belt",
    slug: "italian-leather-belt",
    price: 129,
    description: "Handcrafted from full-grain Italian leather, this belt features a minimalist buckle design that complements any wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    ],
    category: "accessories",
    sizes: ["85cm", "90cm", "95cm", "100cm", "105cm"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "6",
    name: "Merino Wool Scarf",
    slug: "merino-wool-scarf",
    price: 89,
    description: "Luxuriously soft merino wool scarf with a subtle herringbone pattern. The perfect finishing touch to elevate any outfit.",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Gray", hex: "#808080" },
      { name: "Burgundy", hex: "#800020" },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "7",
    name: "Structured Blazer",
    slug: "structured-blazer",
    price: 349,
    originalPrice: 449,
    description: "A masterfully tailored blazer that transitions seamlessly from boardroom to dinner. Features a contemporary slim fit with timeless appeal.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&q=80",
    ],
    category: "men",
    sizes: ["36", "38", "40", "42", "44", "46"],
    colors: [
      { name: "Navy", hex: "#1a365d" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Black", hex: "#000000" },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "8",
    name: "Linen Blend Shirt",
    slug: "linen-blend-shirt",
    price: 159,
    description: "A relaxed yet refined linen blend shirt perfect for warm weather. Features mother-of-pearl buttons and a comfortable regular fit.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#ADD8E6" },
      { name: "Sage", hex: "#9CAF88" },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "9",
    name: "Pleated Midi Skirt",
    slug: "pleated-midi-skirt",
    price: 189,
    description: "Elegant pleated midi skirt with a fluid drape. The versatile length and sophisticated movement make it perfect for any occasion.",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0uj56?w=600&q=80",
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Emerald", hex: "#50C878" },
      { name: "Burgundy", hex: "#800020" },
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "10",
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 289,
    description: "Compact yet spacious crossbody bag in premium pebbled leather. Features an adjustable strap and gold-tone hardware.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Tan", hex: "#D2B48C" },
      { name: "Burgundy", hex: "#800020" },
    ],
    isNew: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "11",
    name: "Oversized Knit Cardigan",
    slug: "oversized-knit-cardigan",
    price: 229,
    description: "Cozy oversized cardigan in a chunky knit. Perfect for layering during transitional seasons with its relaxed, effortless silhouette.",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    ],
    category: "women",
    sizes: ["XS/S", "M/L"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Charcoal", hex: "#36454F" },
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "12",
    name: "Silk Pocket Square Set",
    slug: "silk-pocket-square-set",
    price: 79,
    description: "Set of three hand-rolled silk pocket squares in complementary patterns. The finishing touch for the discerning gentleman.",
    images: [
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600&q=80",
      "https://images.unsplash.com/photo-1598808503491-87c4d2d92c78?w=600&q=80",
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Assorted", hex: "#C9A96E" },
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
  },
];

export const newArrivals = products.filter((p) => p.isNew);
export const bestSellers = products.filter((p) => p.isBestSeller);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
