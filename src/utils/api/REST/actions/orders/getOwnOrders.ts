import { api } from "utils";

export async function getOwnOrders() {
  try {
    const response = await api().get("/dashboard/orders");
    return response.data.data;
  } catch(err) {
    return err;
  }
}
