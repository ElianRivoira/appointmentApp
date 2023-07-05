import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCALAPI,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
});

export const apiForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCALAPI,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});