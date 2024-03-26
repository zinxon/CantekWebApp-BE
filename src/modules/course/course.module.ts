import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { CourseController } from './controller/course.controller';
import { CourseSchema } from './schema/course.schema';
import { CourseService } from './service/course.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'course',
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
