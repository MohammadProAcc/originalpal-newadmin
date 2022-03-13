export interface OrderInvoiceDetails {
  descriptions: string
  sentDescriptions: string
  nextOrderCoupon: string
}
export interface OrderInvoiceProps {
  details: OrderInvoiceDetails
}
