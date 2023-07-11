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

const recoverPasswordToken = (email: string): string => {
  const token = jwt.sign({ email }, process.env.TOKEN_PASSPHRASE as string, {
    expiresIn: '15m',
  });
  return token;
};

const validateRecoverToken = (token: string): IPayload => {
  return jwt.verify(token, process.env.TOKEN_PASSPHRASE as string) as {
    email: string;
  };
};

export { generateToken, validateToken, recoverPasswordToken, validateRecoverToken };
