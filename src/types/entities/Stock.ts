import { Product } from 'types';

export interface Stock {
  id: number;
  product_id: number;
  count: number;
  size: string;
  created_at: string;
  updated_at: string;
  price: string;
  discount_type: string;
  discount_amout: string;
  discount_start: string;
  discount_end: string;
  code: string;
  disc: string;
  priceAfterDiscount: string;
  product: Product;
}
