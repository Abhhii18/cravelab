export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  image: string;
  sensoryProfile?: {
    description: string;
    characteristics: { label: string; icon: string }[];
    ingredients: string;
  };
  pairs?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string; // e.g. "Signature Gift Box" or "Order Individually"
  overridePrice?: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarColor: string; // Tailwind class e.g., "bg-amber-100"
}
