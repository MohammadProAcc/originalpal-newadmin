import { Media } from "./Product";

export interface IBanner {
  id: number;
  type: string;
  platform: string;
  media: {
    t: string;
    a: string;
    s: number;
    u: string;
    p: number;
    v: string;
  };
  content: string;
  content_color: string;
  title_color: string;
  button_bg_color: string;
  button_color: string;
  title: string;
  link: string;
  priority: string;
  active: string;
  created_at: string;
  updated_at: string;
  position?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  video: Media;
}
