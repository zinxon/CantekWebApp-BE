import { Controller, Post } from '@nestjs/common';

// import { CreateAdminInput } from '../model/create-admin.input';
import { TeacherService } from '../service/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create() {
    return this.teacherService.create();
  }
}
