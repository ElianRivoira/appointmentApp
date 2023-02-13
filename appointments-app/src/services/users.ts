import { api } from './axiosInstance';

export async function login(
  username: string,
  password: string
): Promise<Object> {
  const res = await api.post('/users/login', {
    username,
    password,
  });
  console.log(res.data);
  if(res.data.token){
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
}

export async function postUser(
  name: string,
  dni: number,
  email: string,
  password: string
): Promise<User> {
  const response = await api.post('/users', {
    name,
    dni,
    email,
    password,
  });
  return response.data;
}

export async function getLoggedUser(): Promise<User> {
  const res = await api.get('/users/me', {
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  console.log(res.data)
  return res.data;
}
