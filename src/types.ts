export interface Product {
  id: string;
  name: string;
  banglaName: string;
  category: 'dinajpur' | 'rajshahi' | 'premium' | 'bombai' | 'bedana' | 'china3';
  categoryBangla: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  image: string;
  reviewsCount: number;
  soldCount: number;
  description: string;
  weights: string[]; // e.g. ["১ কেজি", "২ কেজি", "৫ কেজি"]
  features: string[];
}

export interface CartItem {
  id: string; // combination of productId and selectedWeight
  product: Product;
  selectedWeight: string;
  quantity: number;
  pricePerPkg: number; // based on chosen weight
}

export type ActiveTab = 'home' | 'product-details' | 'checkout' | 'terms' | 'about';
