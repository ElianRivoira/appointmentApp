import { api } from './axiosInstance';

export async function postBranch({ name, email, phone, capacity, openHour, closeHour }: PostBranch): Promise<Branch> {
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

export async function getBranches(): Promise<Branch[]> {
  const res = await api.get('/branches');
  return res.data;
}

export async function getBranch(id: string): Promise<Branch> {
  const res = await api.get(`/branches/${id}`);
  return res.data;
}

export async function updateBranch(branch: UpdateBranch): Promise<Branch> {
  const res = await api.put(`/branches/${branch.id}`, branch);
  return res.data;
}

export async function getBranchByName(name: string): Promise<Branch> {
  const res = await api.get(`/branches/name/${name}`);
  return res.data;
}
