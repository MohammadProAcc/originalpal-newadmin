export interface Payment {
  id: number
  port: string
  price: string
  ref_id: number | string
  tracking_code: number | string
  card_number: number
  status: string
  ip: string
  description: string
  payment_date: string
  created_at: string
  updated_at: string
  deleted_at: string
}
