interface User {
  _id: string;
  id: string;
  name: string;
  dni: number;
  email: string;
  phone?: number;
  role: string;
  branch?: string;
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
  creationDate: Date;
  branch: {
    name: string;
  };
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
  userId: string;
  phone: number;
}

interface Operator {
  _id: string;
  name: string;
  email: string;
  dni: number;
  password: string;
  branch: string;
}

interface Branch {
  _id: string;
  name: string;
  email: string;
  phone: number;
  capacity: number;
  openHour: string;
  closeHour: string;
  appointments: reserveUser[];
}