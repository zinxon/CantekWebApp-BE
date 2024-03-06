import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { CreateUserInput } from '../model/create-user.input';
import { UserStatus } from '../model/user.enum';
import { User, UserKey } from '../model/user.model';
import { UpdateUserInput } from '../model/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly model: Model<User, UserKey>,
  ) {}

  create(input: CreateUserInput) {
    return this.model.create({
      ...input,
      id: uuid.v4(),
      status: UserStatus.Active,
      createAt: new Date().toISOString(),
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
    return this.model
      .query('email')
      .eq(email)
      .where('status')
      .eq(UserStatus.Active)
      .exec();
  }

  findByStatus(status: string) {
    return this.model
      .query('status')
      .eq(status)
      .exec();
  }
}
