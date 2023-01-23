import { api } from "utils";

interface IApplyCouponOnOrderProps {orderId: number, code: string}

export async function applyCouponOnOrder(props: IApplyCouponOnOrderProps) {
  const response = await api().post(`/orders/${props.orderId}/coupon`, {
    code: props.code
  })
  return response.data;
}
