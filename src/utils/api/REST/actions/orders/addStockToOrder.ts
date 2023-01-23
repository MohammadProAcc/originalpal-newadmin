import axios from 'axios'

export const add_stock_option = async (order_id: string, form: any, token: string) => {
  try {
    const { data: stock_options } = await axios.post(
      `https://api.originalpal.co.uk/admin/orders/${order_id}/order-item`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return stock_options
  } catch (err) {
    return false
  }
}
