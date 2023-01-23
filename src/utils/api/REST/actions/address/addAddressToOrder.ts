import { Address } from "types";
import { api } from "utils";

interface IAddAddressToOrderProps {
  orderId: number,
  address: Partial<Address> | { address_id: number }
}
export async function addAddressToOrder(props: IAddAddressToOrderProps) {
  const response = await api().post(`/orders/${props.orderId}/address`, props.address)
  return response.data;
}
