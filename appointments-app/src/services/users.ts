import axios from 'axios';

export async function login(
  username: string,
  password: string
): Promise<object> {
  console.log(username, password);
  const res = await axios.post('http://localhost:8000/api/users/login', {
    username,
    password,
  });
  console.log(res.data);
  return res;
}

export async function postUser(
  name: string,
  dni: number,
  email: string,
  password: string
): Promise<Object> {
  let response = await axios.post('http://localhost:8000', {
    name,
    dni,
    email,
    password,
  });
  return response.data;
}