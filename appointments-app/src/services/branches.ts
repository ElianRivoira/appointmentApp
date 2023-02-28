import { api } from './axiosInstance';

export async function postBranch(
  name: string,
  email: string,
  phone: number,
  capacity: number,
  openHour: string,
  closeHour: string
): Promise<ReserveResponse> {
  const res = await api.post('/branch', {
    name,
    email,
    phone,
    capacity,
    openHour,
    closeHour,
  });
  return res.data;
}
