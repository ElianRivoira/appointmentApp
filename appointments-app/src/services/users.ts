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
