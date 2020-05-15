import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error('JWT token is missing');

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwtAuth.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: Number(sub),
    };

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
