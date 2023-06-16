interface User {
  _id: string;
  name: string;
  dni: number;
  email: string;
  phone?: number;
  role: string;
  branch?: {
    name: string;
    _id: string;
  };
}

interface LoginUser {
  email: string; 
  password: string;
}

interface PostUser {
  name: string;
  dni: number;
  email: string; 
  password: string;
}

interface UpdateUser {
  id: string;
  name: string;
  dni: number;
  email: string;
  phone?: number;
  branch?: string;
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
  confirmed: boolean;
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

interface PostOperator {
  name: string,
  email: string,
  dni: number,
  password: string,
  branch: string,
  phone: number
}

interface Shift {
  [key: string]: any[];
}

interface Branch {
  _id: string;
  name: string;
  email: string;
  phone: number;
  capacity: number;
  openHour: string;
  closeHour: string;
  shifts: Shift;
  appointments: reserveUser[];
}

interface PostBranch {
  name: string,
  email: string,
  phone: number,
  capacity: number,
  openHour: string,
  closeHour: string
}

interface UpdateBranch {
  id: string;
  name: string;
  email: string;
  phone: number;
  capacity: number;
  openHour: string;
  closeHour: string;
}

interface CustomError {
  message: string;
}

interface PostReserve {
  date: Date,
  branch: string,
  name: string,
  phone: string,
  email: string,
  userId: string
}

interface PutReserve {
  date: Date,
  branch: string,
  name: string,
  phone: string,
  email: string,
  reserveId: string
}