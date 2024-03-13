import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { AdminSchema } from '../admin/schema/admin.schema';
import { AdminService } from '../admin/service/admin.service';
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
      {
        name: 'admin',
        schema: AdminSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver, AdminService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
