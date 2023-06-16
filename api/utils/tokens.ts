const jwt = require('jsonwebtoken');

interface IPayload {
  [key: string]: any;
}

const generateToken = (payload: IPayload) => {
  const token = jwt.sign({ user: payload }, process.env.TOKEN_PASSPHRASE);
  return token;
};

const validateToken = (token: string): IPayload => {
  return jwt.verify(token, process.env.TOKEN_PASSPHRASE);
};

export { generateToken, validateToken };
