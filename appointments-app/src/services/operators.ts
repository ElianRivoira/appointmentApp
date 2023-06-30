import { api } from './axiosInstance';

export async function createOperator({ name, email, dni, password, branch, phone }: PostOperator): Promise<User> {
  const operator = await api.post('/operators', {
    name,
    email,
    dni,
    password,
    branch,
    phone,
  });
  return operator.data;
}

export async function getOperators(): Promise<User[]> {
  const operators = await api.get('/operators');
  return operators.data;
}

export async function getOneOperator(id: string): Promise<User> {
  const operator = await api.get(`/operators/${id}`);
  return operator.data;
}

export async function deleteOneOperator(id: string): Promise<void> {
  await api.delete(`/operators/${id}`);
}
