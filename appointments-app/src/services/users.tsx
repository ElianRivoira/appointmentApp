import axios from 'axios';

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
