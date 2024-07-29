import * as jwt from 'jsonwebtoken';

export function generateEmailConfirmationToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

export async function verifyEmailConfirmationToken(token: string): Promise<any> {
    return jwt.verify(token, process.env.JWT_SECRET);
}
