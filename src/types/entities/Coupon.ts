export interface Coupon {
  id: number;
  code: string;
  decription: string;
  type: string;
  amount: number;
  start: number;
  expiration: string;
  min_to_execute: number;
  max: number;
  deny_off: number;
  limit: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
