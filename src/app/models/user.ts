export interface User {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  address?: string;
  date?: string;
  tel?: string;
  cin?: string;
  numImmatriculation?: string;
  numPatente?: string;
  password?: string;
  role: string;
  mustChangePassword?: boolean;
}
