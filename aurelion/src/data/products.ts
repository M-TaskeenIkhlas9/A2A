export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  sizes: string[];
  colors: { name: string; value: string }[];
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Wool Blazer",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    category: "men",
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1a237e" },
    ],
    description: "Timeless wool blazer crafted from premium Italian fabric. Perfect for both formal occasions and smart casual looks.",
  },
  {
    id: "2",
    name: "Silk Evening Dress",
    price: 459,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    category: "women",
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Gold", value: "#C9A96E" },
      { name: "Black", value: "#000000" },
    ],
    description: "Elegant silk evening dress with a flowing silhouette. Designed for special occasions and unforgettable moments.",
  },
  {
    id: "3",
    name: "Cashmere Sweater",
    price: 189,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    category: "women",
    isNew: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", value: "#FFFDD0" },
      { name: "Grey", value: "#808080" },
      { name: "Black", value: "#000000" },
    ],
    description: "Luxuriously soft cashmere sweater. Premium quality for everyday elegance.",
  },
  {
    id: "4",
    name: "Tailored Trousers",
    price: 159,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
    category: "men",
    isBestSeller: true,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Charcoal", value: "#36454F" },
    ],
    description: "Perfectly tailored trousers with a modern slim fit. Essential for the contemporary wardrobe.",
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    price: 249,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=800&fit=crop",
    category: "accessories",
    isNew: true,
    sizes: ["One Size"],
    colors: [
      { name: "Tan", value: "#D2691E" },
      { name: "Black", value: "#000000" },
    ],
    description: "Handcrafted leather crossbody bag with gold-tone hardware. A versatile accessory for any outfit.",
  },
  {
    id: "6",
    name: "Linen Summer Shirt",
    price: 129,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop",
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Light Blue", value: "#ADD8E6" },
    ],
    description: "Breathable linen shirt perfect for warm weather. Relaxed fit with refined details.",
  },
  {
    id: "7",
    name: "Structured Handbag",
    price: 379,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop",
    category: "accessories",
    isBestSeller: true,
    sizes: ["One Size"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Burgundy", value: "#800020" },
    ],
    description: "Sophisticated structured handbag in premium leather. Statement piece for the modern woman.",
  },
  {
    id: "8",
    name: "Merino Wool Coat",
    price: 549,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    category: "women",
    isNew: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Camel", value: "#C19A6B" },
      { name: "Black", value: "#000000" },
    ],
    description: "Luxurious merino wool coat with impeccable tailoring. A timeless investment piece.",
  },
];

export const categories = [
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop",
    description: "Refined essentials for the modern gentleman",
  },
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop",
    description: "Elegant pieces for every occasion",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=800&fit=crop",
    description: "Finishing touches that make a statement",
  },
];

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
