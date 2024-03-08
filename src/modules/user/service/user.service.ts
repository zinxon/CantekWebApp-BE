import * as bcrypt from 'bcrypt';
import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { CreateUserInput } from '../model/create-user.input';
import { UpdateUserInput } from '../model/update-user.input';
import { UserStatus } from '../model/user.enum';
import { User, UserKey } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly model: Model<User, UserKey>,
  ) {}

  async create(input: CreateUserInput) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(input.password, saltOrRounds);

    return this.model.create({
      ...input,
      id: uuid.v4(),
      password: hash,
      status: UserStatus.Active,
      profileId: '',
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    });
  }

  update(key: UserKey, input: UpdateUserInput) {
    return this.model.update(key, input);
  }

  delete(key: UserKey) {
    return this.model.delete(key);
  }

  findOne(key: UserKey) {
    return this.model.get(key);
  }

  findByEmail(email: string) {
    return this.model.query('email').eq(email).exec();
  }

  findByStatus(status: string) {
    return this.model.query('status').eq(status).exec();
  }
}
