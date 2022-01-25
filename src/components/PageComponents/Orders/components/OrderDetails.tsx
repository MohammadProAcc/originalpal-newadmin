import { Container } from '@paljs/ui'
import { BasicTable } from 'components'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { getSingleOrder } from 'utils'

export const OrderDetails: React.FC<{ orderId: number }> = ({ orderId }) => {
  const [order, setOrder] = useState<any>(null)
  const [orderItems, setOrderItems] = useState<any>([])

  useEffect(() => {
    getSingleOrder(orderId.toString(), Cookies.get('token') ?? '').then(({ data }) => setOrder(data))
  }, [])

  useEffect(() => {
    setOrderItems(order?.order_items?.map((item: any) => [item?.id, item?.product_id, item?.quantity, item?.size]))
  }, [order])

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const columns = ['شناسه انبار', 'شناسه محصول', 'تعداد', 'سایز']

  return <BasicTable getSelections={setTableSelections} columns={columns} rows={orderItems ?? []} />
}
