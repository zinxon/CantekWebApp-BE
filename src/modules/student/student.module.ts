import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { CourseSchema } from '@modules/course/schema/course.schema';
import { CourseService } from '@modules/course/service/course.service';

import { StudentController } from './controller/student.controller';
import { StudentSchema } from './schema/student.schema';
import { StudentService } from './service/student.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'student',
        schema: StudentSchema,
      },
      {
        name: 'course',
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService, CourseService],
  exports: [StudentService],
})
export class StudentModule {}
