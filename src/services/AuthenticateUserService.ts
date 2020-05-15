import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email/password combination');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new Error('Incorrect email password combination');

    const { id } = user;

    const token = jwt.sign({ id }, '654893dc765fb1b19c854c9cf6a4df35', {
      expiresIn: '1d',
      subject: String(id),
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
