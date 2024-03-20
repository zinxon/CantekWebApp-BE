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

import { UpdateTeacherInput } from '../model/update-teacher.input';
// import { CreateAdminInput } from '../model/create-admin.input';
import { TeacherService } from '../service/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create() {
    return this.teacherService.create();
  }

  @Roles(UserRole.Admin, UserRole.Teacher, UserRole.Student)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findTeacher(@Query() filter: UpdateTeacherInput) {
    try {
      return await this.teacherService.findAll(filter);
    } catch (error) {
      throw error;
    }
  }

  @Roles(UserRole.Admin, UserRole.Teacher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTeacherInput) {
    return this.teacherService.update({ id }, body);
  }

  @Roles(UserRole.Admin, UserRole.Teacher, UserRole.Student)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const teacher = await this.teacherService.findOne({ id });
    if (!teacher) {
      throw new NotFoundException();
    }
    return teacher;
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':id')
  delete(@Param('id') id: string) {
    return this.teacherService.delete({ id });
  }
}
