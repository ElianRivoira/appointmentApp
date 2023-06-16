import { api } from './axiosInstance';

export async function postReserve({ date, branch, name, phone, email, userId }: PostReserve): Promise<ReserveResponse> {
  const res = await api.post('/appointments', {
    date,
    branch,
    name,
    phone,
    email,
    userId,
  });
  return res.data;
}

export async function editReserve({
  date,
  branch,
  name,
  phone,
  email,
  reserveId,
}: PutReserve): Promise<ReserveResponse> {
  const res = await api.put(`/appointments/${reserveId}`, {
    date,
    branch,
    name,
    phone,
    email,
  });
  return res.data;
}

export async function getReserves(id: string): Promise<reserveUser[]> {
  const res = await api.get(`/appointments/all/${id}`);
  return res.data;
}

export async function getOneReserve(id: string): Promise<reserveUser> {
  const res = await api.get(`/appointments/${id}`);
  return res.data;
}

export async function cancelReserv(id: string): Promise<void> {
  const res = await api.delete(`/appointments/${id}`);
}

export async function confirmReserve(id: string): Promise<void> {
  const res = await api.put(`/appointments/confirm/${id}`);
}
