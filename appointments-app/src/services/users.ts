import { getLocalStorage } from '@/utils/localStorage';
import { api } from './axiosInstance';

export async function login({ email, password }: LoginUser): Promise<User> {
  const res = await api.post('/users/login', {
    email,
    password,
  });
  localStorage.setItem('session', res.data.token);
  return res.data.user;
}

export async function postUser({ name, dni, email, password }: PostUser): Promise<User | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const response = await api.post(
      '/users',
      {
        name,
        dni,
        email,
        password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
}

export async function getLoggedUser(): Promise<User | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get('/users/me', {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } else {
    const res = await api.get('/users/me');
    return res.data;
  }
}

export async function updateUser(user: UpdateUser): Promise<User | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.put(`/users/put`, user, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function updatePassword({ id, pass }: { id: string; pass: string }): Promise<User | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.put(
      `/users/pass/${id}`,
      { pass },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  }
}

export async function sendPassEmail({ id, email }: { id: string; email: string }): Promise<void> {
  const token = getLocalStorage('session');
  if (token) {
    try {
      await api.post(
        '/users/pass/email',
        { id, email },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
}
