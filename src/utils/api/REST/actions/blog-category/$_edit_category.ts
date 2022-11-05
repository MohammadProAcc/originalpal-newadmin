import { admin } from 'utils/api/AdminApi'

export async function $_edit_category(props: IEditCategoryProps) {
  try {
    const response = await admin(props.token).put(`/categories/${props.id}`, props.body)
    return response.data
  } catch (err) {
    return new Error('request failed')
  }
}

interface IEditCategoryProps {
  id: number
  body: {
    title: string
    slug: string
    content: string
    priority: number
  }
  token?: string
}
