interface User {
  id: string;
  name: string;
  dni: number;
  email: string;
  phone: number;
}

interface UpdateUser {
  name: string;
  dni: number;
  email: string;
  phone: number;
}

interface UserState {
  user: User | null;
  loading: boolean;
}

interface reserveUser {
  _id: string;
  id: string;
  date: Date;
  branch: string;
  name: string;
  email: string;
  phone: number;
}

interface ReserveResponse {
  _id: string;
  date: Date;
  branch: string;
  name: string;
  email: string;
  usedId: string;
  phone: number;
}
