import { api } from './axiosInstance';

export async function login({ email, password }: LoginUser): Promise<User> {
  const res = await api.post('/users/login', {
    email,
    password,
  });
  return res.data;
}

export async function postUser({ name, dni, email, password }: PostUser): Promise<User> {
  const response = await api.post('/users', {
    name,
    dni,
    email,
    password,
  });
  return response.data;
}

export async function getLoggedUser(): Promise<User> {
  const res = await api.get('/users/me');
  return res.data;
}

export async function updateUser(user: UpdateUser): Promise<User> {
  const res = await api.put(`/users/put`, user);
  return res.data;
}

export async function updatePassword({ id, pass }: { id: string; pass: string }): Promise<User> {
  const res = await api.put(`/users/pass/${id}`, { pass });
  return res.data;
}

export async function sendPassEmail({ id, email }: { id: string; email: string }): Promise<void> {
  try {
    await api.post('/users/pass/email', { id, email });
  } catch (e) {
    console.error(e);
  }
}
