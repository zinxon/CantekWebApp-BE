import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './../../user/model/user.model';
import { UserService } from './../../user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = (await this.userService.findByEmail(email))[0];
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
