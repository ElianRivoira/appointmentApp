import { api } from './axiosInstance';

export async function login(
  email: string,
  password: string
): Promise<User> {
  const res = await api.post('/users/login', {
    email,
    password,
  });
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data.user;
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
  return res.data;
}

export async function updateUser(id: string, user: UpdateUser): Promise<User> {
  const res = await api.put(`/users/${id}`, user);
  return res.data;
}

export async function updatePassword(id: string, pass: string): Promise<User> {
  const res = await api.put(`/users/pass/${id}`, { pass });
  console.log(res.data);
  return res.data;
}

export async function sendPassEmail(id: string, email: string): Promise<void> {
  try {
    await api.post('/users/pass/email', { id, email });
  } catch (e) {
    console.error(e);
  }
}
