import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { AdminSchema } from '../admin/schema/admin.schema';
import { AdminService } from '../admin/service/admin.service';
import { StudentSchema } from '../student/schema/student.schema';
import { StudentService } from '../student/service/student.service';
import { TeacherSchema } from '../teacher/schema/teacher.schema';
import { TeacherService } from '../teacher/service/teacher.service';
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
      {
        name: 'student',
        schema: StudentSchema,
      },
    ]),
  ],
  providers: [
    UserService,
    UserResolver,
    AdminService,
    TeacherService,
    StudentService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
