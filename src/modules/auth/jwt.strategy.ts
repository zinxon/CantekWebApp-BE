import * as dotenv from 'dotenv';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

dotenv.config();
type Payload = {
  sub: string;
  email: string;
  name: string;
  role: string;
  profileId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if ((req.cookies && req.cookies.accessToken) || req.headers.cookie) {
      const accessToken =
        req.cookies?.accessToken || req.headers.cookie?.split('=')[1] || null;
      console.log(accessToken);
      return accessToken;
    }
    return null;
  }

  async validate(payload: Payload) {
    return payload;
    // return {
    //   userId: payload.sub,
    //   email: payload.email,
    //   role: payload.role,
    //   profileId: payload.profileId,
    // };
  }
}
