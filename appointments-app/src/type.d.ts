interface User {
  id: string;
  name: string;
  dni: number;
  email: string;
  phone: number;
}

interface UserState {
  user: User | null;
  loading: boolean;
}