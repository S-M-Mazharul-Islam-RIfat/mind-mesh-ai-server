import jwt from 'jsonwebtoken';
import { TUser } from '../user/user.interface';

export const createToken = (jwtPayload: Partial<TUser>, secret: string, expiresIn: string | undefined): string => {
   const token = jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions);
   return token;
}