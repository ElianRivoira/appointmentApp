import { api } from './axiosInstance';

export async function login(
  username: string,
  password: string
): Promise<Object> {
  const res = await api.post('/users/login', {
    username,
    password,
  });
  return res;
}

export async function postUser(
  name: string,
  dni: number,
  email: string,
  password: string
): Promise<Object> {
  const response = await api.post('/users', {
    name,
    dni,
    email,
    password,
  });
  return response.data;
}