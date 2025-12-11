export enum Category {
  NECKLACES = 'Necklaces',
  RINGS = 'Rings',
  EARRINGS = 'Earrings',
  BRACELETS = 'Bracelets',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
