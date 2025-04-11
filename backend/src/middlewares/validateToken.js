import jwt from 'jsonwebtoken';
import { parseBearerToken } from '../utils/functions.js';

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    const token = parseBearerToken(authHeader);
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" })
  }
};

export default validateToken;
