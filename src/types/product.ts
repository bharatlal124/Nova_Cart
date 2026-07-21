// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   description: string;
//   badge: string;
//   category: string;
// }

export interface Product {
  _id?: string;

  name: string;
  price: number;
  originalPrice?: number;

  description: string;
  badge: string;
  category: string;

  image?: string;
}