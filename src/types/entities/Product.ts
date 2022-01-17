export interface Media {
  t: string;
  a: string;
  s: number;
  u: string;
  p: number;
}

export interface ProductBrand {
  id: number;
  name: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductStock {
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
}

export interface Product {
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
  sold: string;
  trend: number;
  category_id: number;
  summary: string;
  site_main_picture: Media;
  meta_title: string;
  title_page: string;
  onesize: string;
  Enable: number;
  collection_id: number;
  media: Media[];
  discount_exp: number;
  updated_at: string;
  created_at: string;
  url: string;
  tags: [];
  brand: ProductBrand[];
  collection: null;
  category: ProductCategory;
  stock: ProductStock[];
}
