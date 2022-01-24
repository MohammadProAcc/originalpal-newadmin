import axios from 'axios'

export const updateBanner = async (bannerId: string, form: any, token: string) => {
  try {
    const { data } = await axios.put(`https://api.originalpal.co.uk/admin/banners/${bannerId}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (err) {
    console.warn(err)
    return false
  }
}
