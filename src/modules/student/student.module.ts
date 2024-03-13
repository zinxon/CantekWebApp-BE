import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

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
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
