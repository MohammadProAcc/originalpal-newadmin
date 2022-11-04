import { admin } from 'utils/api/AdminApi'

export async function $_get_categories(props: IGetCategoriesProps) {
  try {
    const response = await admin(props.token).get('/categories', { params: props.params })
    return response.data;
  } catch (err) {
    return new Error('request failed')
  }
}

interface IGetCategoriesProps {
  params?: any
  token?: string
}
