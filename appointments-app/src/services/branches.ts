import { getLocalStorage } from '@/utils/localStorage';
import { api } from './axiosInstance';

export async function postBranch({
  name,
  email,
  phone,
  capacity,
  openHour,
  closeHour,
}: PostBranch): Promise<Branch | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.post(
      '/branches',
      {
        name,
        email,
        phone,
        capacity,
        openHour,
        closeHour,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  }
}

export async function getBranches(): Promise<Branch[] | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get('/branches', {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function getBranch(id: string | undefined): Promise<Branch | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get(`/branches/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function updateBranch(branch: UpdateBranch): Promise<Branch | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.put(`/branches/${branch.id}`, branch, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function getBranchByName(name: string): Promise<Branch | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get(`/branches/name/${name}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function deleteOneBranch(id: string): Promise<void> {
  const token = getLocalStorage('session');
  if (token) {
    await api.delete(`/branches/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
