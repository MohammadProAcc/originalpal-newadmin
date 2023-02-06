export type MenuType =
  | "top-site"
  | "ad"
  | "bottom-site"
  | "bottom-site-descriptions"
  | "bottom-site-descrpitions"
  | "products-bottom-site-menu";

export interface IMenu<T> {
  id: number;
  type: string;
  items: T[];
  created_at: string;
  updated_at: string;
}
