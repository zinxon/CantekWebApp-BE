import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/role.guard';
import { Roles } from '@modules/auth/roles.decorator';
import { UserRole } from '@modules/user/model/user.enum';

import { UpdateStudentInput } from '../model/update-student.input';
import { StudentService } from '../service/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create() {
    return this.studentService.create();
  }

  @Roles(UserRole.Admin, UserRole.Teacher, UserRole.Student)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findStudent(@Query() filter: UpdateStudentInput) {
    try {
      return await this.studentService.findAllStudent(filter);
    } catch (error) {
      throw error;
    }
  }

  @Roles(UserRole.Admin, UserRole.Teacher, UserRole.Student)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateStudentInput) {
    return this.studentService.update({ id }, body);
  }

  @Roles(UserRole.Admin, UserRole.Teacher, UserRole.Student)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findOne({ id });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  @Roles(UserRole.Admin, UserRole.Teacher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':id')
  delete(@Param('id') id: string) {
    return this.studentService.delete({ id });
  }

  // Add/Remove Student into course
  @Roles(UserRole.Admin, UserRole.Teacher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/enroll/:id')
  enroll(@Param('id') id: string, @Body() body: any) {
    return this.studentService.enroll({ id }, body.courseId, body.method);
  }
}
