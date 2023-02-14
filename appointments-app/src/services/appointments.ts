import { api } from './axiosInstance';

export async function postReserve(
  date: Date,
  branch: string,
  time: string,
  name: string,
  phone: string,
  email: string,
  userId: string
): Promise<Object> {
  const res = await api.post('/appointments', {
    date,
    branch,
    time,
    name,
    phone,
    email,
    userId,
  });
  console.log(res.data);
  return res.data;
}

export async function getReserves(id: string): Promise<reserveUser[]> {
  const res = await api.get(`/appointments/${id}`);
  console.log(res.data);
  return res.data;
}
