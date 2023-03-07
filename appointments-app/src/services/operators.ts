import { api } from './axiosInstance';

export async function createOperator(
  name: string,
  email: string,
  dni: number,
  password: string,
  branch: string,
  phone: number,
): Promise<Operator> {
  const operator = await api.post('/operators', { name, email, dni, password, branch, phone })
  return operator.data;
}

export async function getOperators(): Promise<User[]> {
  const operators = await api.get('/operators')
  return operators.data;
}