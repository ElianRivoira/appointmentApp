import { api } from './axiosInstance';

export async function createOperator(
  name: string,
  email: string,
  dni: number,
  password: string,
  branch: string
): Promise<Operator> {
  const operator = await api.post('/operators', { name, email, dni, password, branch })
  return operator.data;
}
