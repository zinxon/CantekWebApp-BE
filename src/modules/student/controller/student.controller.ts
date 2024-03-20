import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/role.guard';
import { Roles } from '@modules/auth/roles.decorator';

import { UpdateStudentInput } from '../model/update-student.input';
import { StudentService } from '../service/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create() {
    return this.studentService.create();
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findStudent(@Query() filter: UpdateStudentInput) {
    try {
      return await this.studentService.findAllStudent(filter);
    } catch (error) {
      throw error;
    }
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateStudentInput) {
    return this.studentService.update({ id }, body);
  }
}
