import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'passwordHash',
    }); // allows us to pass back the entire request to the callback
  }

  async validate(email: string, passwordHash: string): Promise<any> {
    const user = await this.authService.validateUser(email, passwordHash);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
