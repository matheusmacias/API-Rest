import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
    [key: string]: string;
}

export class JWT {
    private static readonly SECRET: string = process.env.JWT_SECRET as string;

    static sign(payload: JwtPayload, options?: jwt.SignOptions): string {
        if (!JWT.SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment');
        }
        return jwt.sign(payload, JWT.SECRET, options);
    }

    static verify(token: string): JwtPayload {
        if (!JWT.SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment');
        }
        return jwt.verify(token, JWT.SECRET) as JwtPayload;
    }
}



