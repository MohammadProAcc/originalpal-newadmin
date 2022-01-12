export interface User {
  id: number;
  phone: string;
  name: string;
  lastname: string;
  email: string;
  status: number;
  points: number;
  created_at: string;
  updated_at: string;
  role: string;
  last_login_at: string;
}

export const initialUser = {
  id: 0,
  phone: '',
  name: '',
  lastname: '',
  email: '',
  status: 0,
  points: 0,
  created_at: '',
  updated_at: '',
  role: '',
  last_login_at: '',
};
