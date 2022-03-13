import { OrderDetailsSubmit } from '../styles'

export const onOrderDetailsFormSubmit: OrderDetailsSubmit = (form, setter, callback) => {
  setter(form)
  callback()
}
