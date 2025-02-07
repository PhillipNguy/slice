import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import connectToDb from '../../db';
import { User as IUser } from '../../db/types';
import { User } from '../../db/models';

const JWT_SECRET = process.env.JWT_SECRET!;
declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userId: string;
  }
}

// extend user interface and save user to req.user instead of req.body

const authMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: Function): Promise<void> => {
  await connectToDb();
  try {
    const authorization = req.headers.authorization;
    console.log(req.headers);
    if (!authorization) throw new Error();
    const accessToken: string = authorization.split(' ')[1];
    const { userId } = <jwt.JwtPayload>jwt.verify(accessToken, JWT_SECRET);
    const user: IUser = await User.findOne({ _id: userId });
    if (!user) throw new Error();
    req.body.user = user;
    next();
  } catch (e: any) {
    console.error(e);
    res.status(403).send({ error: true, message: 'Unathorized request' });
  }
}

export { authMiddleware };