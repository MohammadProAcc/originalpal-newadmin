import axios from 'axios';

export const update_order_status = async (order_id: string, status: any, token: string) => {
  try {
    const { data } = await axios.put(`https://api.originalpal.co.uk/admin/orders/${order_id}/status`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return false;
  }
};
