// types.ts
export interface CartItem {
    name: string;
    price: number;
    quantity: number;
    img: string;
    available: boolean;
    category: string;
    description: string|null;
    ingreds: Array;
    extras: Array;
  }
  