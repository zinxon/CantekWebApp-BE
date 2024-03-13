import { Controller, Post } from '@nestjs/common';

import { StudentService } from '../service/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create() {
    return this.studentService.create();
  }
}
