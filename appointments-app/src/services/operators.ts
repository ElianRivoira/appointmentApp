import { getLocalStorage } from '@/utils/localStorage';
import { api } from './axiosInstance';

export async function createOperator({
  name,
  email,
  dni,
  password,
  branch,
  phone,
}: PostOperator): Promise<User | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const operator = await api.post(
      '/operators',
      {
        name,
        email,
        dni,
        password,
        branch,
        phone,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return operator.data;
  }
}

export async function getOperators(): Promise<User[] | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const operators = await api.get('/operators', {
      headers: {
        Authorization: token,
      },
    });
    return operators.data;
  }
}

export async function getOneOperator(id: string): Promise<User | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const operator = await api.get(`/operators/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return operator.data;
  }
}

export async function deleteOneOperator(id: string): Promise<void> {
  const token = getLocalStorage('session');
  if (token) {
    await api.delete(`/operators/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
