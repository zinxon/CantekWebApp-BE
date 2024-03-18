import { DynamooseModule } from 'nestjs-dynamoose';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { UserSchema } from '../schema/user.schema';
import { AdminSchema } from './../../admin/schema/admin.schema';
import { StudentSchema } from './../../student/schema/student.schema';
import { TeacherSchema } from './../../teacher/schema/teacher.schema';

export const UserTestImports = [
  ConfigModule.forRoot(),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }),
  DynamooseModule.forRoot({
    local: 'http://localhost:8001',
    aws: { region: 'local' },
    table: {
      create: false,
      prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
      suffix: '-table',
    },
  }),
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
];
