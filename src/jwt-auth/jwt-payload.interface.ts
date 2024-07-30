export interface JwtPayload {
    email: string;
    userId: string;
    createdAt: Date;
    emailVerified: boolean;
    iat?: number;
    exp?: number;
  }
  