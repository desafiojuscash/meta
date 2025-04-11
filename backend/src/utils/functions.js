import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/Unauthorized.js';

const parseBearerToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError("Token inválido");
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError("Token inválido");
  }
  return token;
}

const parseBasicAuthcHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    throw new UnauthorizedError();
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');
  return { username, password };
}

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN
  };

  return jwt.sign(payload, secret, options);
};

export { parseBasicAuthcHeader, generateAccessToken, parseBearerToken }