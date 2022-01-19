export interface Blog {
  id: number;
  title: string;
  slug: string;
  desc: string;
  writer: string;
  show_categories: string;
  labels: string;
  comments: string;
  created_at: string;
  updated_at: string;
  thumb: string;
  deleted_at: string;
  summary: string;
  meta_keywords: string;
  meta_description: string;
  meta_title: string;
  title_page: string;
  endimage: string;
  endtitle: string;
  endalt: string;
  endtext: string;
  isboard: number;
  ishighlight: number;
  istop: number;
  isvideo: number;
  iscast: number;
  srcvideo: number;
  headers: string;
  trend: string;
  is_news: 1;
}