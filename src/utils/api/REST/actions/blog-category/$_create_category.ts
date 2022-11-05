import { admin } from 'utils/api/AdminApi'

export async function $_create_category(props: ICreateCategoryProps) {
  try {
    const response = await admin(props.token).post(`/categories`, props.body)
    return response.data
  } catch (err) {
    return new Error('request failed')
  }
}

interface ICreateCategoryProps {
  body: {
    title: string
    slug: string
    content: string
    priority: number
  }
  token?: string
}
