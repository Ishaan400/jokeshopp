export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  warning?: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}