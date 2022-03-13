import { InvoiceTable } from 'components/Table/OrderInvoice/InvoiceTable'
import React, { useEffect } from 'react'
import { useStore } from 'utils'

export const OrderInvoice: React.FC = () => {
  const { order } = useStore((state: any) => ({
    order: state?.order,
  }))

  useEffect(() => {
    window.print()
  }, [])

  return <InvoiceTable order={order} />
}
