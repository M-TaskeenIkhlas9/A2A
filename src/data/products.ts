import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Blend Blazer',
    price: 495,
    description: 'A sophisticated silk blend blazer with modern tailoring. Perfect for both formal occasions and elevated casual wear.',
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Ivory', hex: '#FFFFF0' },
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 350,
    originalPrice: 450,
    description: 'Luxuriously soft cashmere sweater with a relaxed fit. An essential piece for your premium wardrobe.',
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Gray', hex: '#808080' },
    ],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Tailored Wool Trousers',
    price: 295,
    description: 'Impeccably tailored wool trousers with a high waist and wide leg. Timeless elegance for the modern woman.',
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Structured Wool Coat',
    price: 895,
    description: 'A statement wool coat with structured shoulders and clean lines. The epitome of luxury outerwear.',
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '5',
    name: 'Premium Cotton Shirt',
    price: 195,
    description: 'Crisp cotton shirt with mother-of-pearl buttons. A refined essential for any sophisticated wardrobe.',
    category: 'Men',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
    ],
    inStock: true,
  },
  {
    id: '6',
    name: 'Italian Leather Belt',
    price: 175,
    description: 'Handcrafted Italian leather belt with a polished gold buckle. The finishing touch for any ensemble.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: '7',
    name: 'Merino Wool Scarf',
    price: 145,
    description: 'Ultra-soft merino wool scarf in a versatile neutral tone. Luxurious warmth for the discerning individual.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '8',
    name: 'Silk Evening Dress',
    price: 750,
    description: 'Flowing silk evening dress with elegant draping. Make a statement at your next special occasion.',
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    inStock: true,
    isNew: true,
  },
];

export const newArrivals = products.filter((p) => p.isNew);
export const bestSellers = products.filter((p) => p.isBestSeller);
