import { admin } from 'utils/api/AdminApi'

export async function $_delete_category(props: IDeleteCategoryProps) {
  try {
    const response = await admin(props.token).delete(`/categories/${props.id}`)
    return response.data
  } catch (err) {
    return new Error('request failed')
  }
}

interface IDeleteCategoryProps {
  id: number
  token?: string
}
