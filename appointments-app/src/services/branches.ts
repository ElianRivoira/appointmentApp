import { api } from './axiosInstance';

export async function postBranch(
  name: string,
  email: string,
  phone: number,
  capacity: number,
  openHour: string,
  closeHour: string
): Promise<Branch> {
  const res = await api.post('/branches', {
    name,
    email,
    phone,
    capacity,
    openHour,
    closeHour,
  });
  return res.data;
}

export async function getBranches(
): Promise<Branch[]> {
  const res = await api.get('/branches');
  return res.data;
}

export async function getBranch(id: string): Promise<Branch> {
  const res = await api.get(`/branches/${id}`);
  return res.data;
}
