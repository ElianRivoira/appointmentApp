interface User {
  id: string;
  name: string;
  dni: number;
  email: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
}