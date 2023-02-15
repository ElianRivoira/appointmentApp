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
  date: Date;
  branch: string;
  time: string;
  name: string;
  email: string;
}
