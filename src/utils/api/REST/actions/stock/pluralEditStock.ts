import { admin } from 'utils/api/AdminApi'

export async function pluralEditStock(stocks: any[], token?: string) {
  console.log(stocks);
  try {
    const response = await admin(token).put('/stock', {
      stocks,
    })
    return response
  } catch (err) {
    return null
  }
}
