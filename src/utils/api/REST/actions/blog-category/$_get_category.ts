import { admin } from 'utils/api/AdminApi'

export async function $_get_category(props: IGetCategoryProps) {
  const { id, ...rest } = props.params
  try {
    const response = await admin(props.token).get(`/categories/${id}`, { params: rest })
    return response.data
  } catch (err) {
    return new Error('request failed')
  }
}

interface IGetCategoryProps {
  params: {
    id: string
  }
  token?: string
}
