export interface Comment {
  id: number;
  title: string;
  content: string;
  rating: string;
  comfort: string;
  quality: number;
  size: string;
  width: string;
  user_id: number;
  product_id: number;
  blog_id: number;
  parent_id: number;
  replies?: Comment[];
  purchased: number;
  created_at: string;
  updated_at: string;
}
