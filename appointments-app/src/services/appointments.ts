import { api } from './axiosInstance';

export async function postReserve(
  date: Date,
  branch: string,
  time: string,
  name: string,
  phone: string,
  email: string
): Promise<Object> {
  const res = await api.post('/appointments', {
    date,
    branch,
    time,
    name,
    phone,
    email,
  });
  console.log(res.data)
  return res.data;
}
