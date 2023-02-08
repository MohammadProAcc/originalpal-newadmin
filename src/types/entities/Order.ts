import { Address, User, Media } from "types";
import { Product } from "./Product";

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  size: string;
  price: string;
  stock_id: number;
  created_at: string;
  updated_at: string;
  product: Product;
  stock: {
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
    product: {
      id: number;
      code: string;
      name: string;
      title: string;
      slug: string;
      price: string;
      discount_price: string;
      description: string;
      state: string;
      meta_keywords: string;
      meta_description: string;
      brand_id: number;
      sold: number;
      trend: number;
      category_id: number;
      summary: string;
      site_main_picture: Media;
      meta_title: string;
      title_page: string;
      onesize: string;
      Enable: number;
      collection_id: number;
      media: Media;
      discount_exp: string;
      updated_at: string;
      created_at: string;
      url: string;
      brand: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        title_page: string;
        tagtext: string;
      };
    };
  };
};

export type OrderItems = OrderItem[];

export interface IOrder {
  id: number;
  number: number;
  status: string;
  user_id: number;
  user: User;
  payment_id: number;
  address_id: number;
  address: Address;
  notes: string;
  price: number;
  post_fee: number;
  payable: number;
  newprice: number;
  Events: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  delivery: string;
  admin_check: number;
  coupon_id: number;
  typesell: string;
  order_items: OrderItems;
}
