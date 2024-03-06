import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { UserController } from './controller/user.controller';
import { UserResolver } from './resolver/user.resolver';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
