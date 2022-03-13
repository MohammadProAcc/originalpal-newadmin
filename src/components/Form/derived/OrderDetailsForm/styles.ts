import { OrderInvoiceDetails } from 'components/PageComponents/Orders/types'

export interface OrderDetailsForm extends OrderInvoiceDetails {}

export interface OrderDetailsFormProps {
  close?: any
}

export type OrderDetailsSubmit = (
  form: OrderDetailsForm,
  setter: (form: OrderDetailsForm) => void,
  callback: any,
) => void
