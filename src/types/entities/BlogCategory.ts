import { Blog } from './Blog'

export interface BlogCategory {
  id: number
  slug: string
  title: string
  content: string
  priority: string
  media: string
  created_at: string
  updated_at: string
  blog?: Blog[]
}
