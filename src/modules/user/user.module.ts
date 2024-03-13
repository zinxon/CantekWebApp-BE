import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { TeacherSchema } from '@modules/teacher/schema/teacher.schema';
import { TeacherService } from '@modules/teacher/service/teacher.service';

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
      {
        name: 'teacher',
        schema: TeacherSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver, AdminService, TeacherService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
