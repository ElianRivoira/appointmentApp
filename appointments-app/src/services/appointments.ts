import { getLocalStorage } from '@/utils/localStorage';
import { api, apiForm } from './axiosInstance';

export async function postReserve({
  date,
  branch,
  name,
  phone,
  email,
  userId,
}: PostReserve): Promise<reserveUser | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.post(
      '/appointments',
      {
        date,
        branch,
        name,
        phone,
        email,
        userId,
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

export async function editReserve({
  date,
  branch,
  name,
  phone,
  email,
  reserveId,
}: PutReserve): Promise<ReserveResponse | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.put(
      `/appointments/${reserveId}`,
      {
        date,
        branch,
        name,
        phone,
        email,
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

export async function calculateMetrics(): Promise<IAllBranchesMetrics | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get(`/appointments/metrics`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function getReserves(id: string | undefined): Promise<reserveUser[] | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get(`/appointments/all/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function getOneReserve(id: string): Promise<reserveUser | undefined> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.get(`/appointments/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function cancelReserv({ id, cancelReason }: { id: string; cancelReason: string }): Promise<void> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.put(
      `/appointments/cancel/${id}`,
      { cancelReason },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  }
}

export async function confirmReserve(id: string): Promise<void> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await api.put(`/appointments/confirm/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export async function createProof(form: FormData): Promise<void> {
  const token = getLocalStorage('session');
  if (token) {
    const res = await apiForm.put(`/appointments/createProof`, form, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
}

export function printProof(reserve: reserveUser | undefined) {
  window.open(`${process.env.NEXT_PUBLIC_DOWNLOAD}/proofs/${reserve?.name}_proof_${reserve?.id}.pdf`);
}
