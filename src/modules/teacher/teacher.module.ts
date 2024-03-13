import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { TeacherController } from './controller/teacher.controller';
import { TeacherSchema } from './schema/teacher.schema';
import { TeacherService } from './service/teacher.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'teacher',
        schema: TeacherSchema,
      },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
