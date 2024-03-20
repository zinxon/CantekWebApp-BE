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

import { UpdateTeacherInput } from '../model/update-teacher.input';
// import { CreateAdminInput } from '../model/create-admin.input';
import { TeacherService } from '../service/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create() {
    return this.teacherService.create();
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findTeacher(@Query() filter: UpdateTeacherInput) {
    try {
      return await this.teacherService.findAll(filter);
    } catch (error) {
      throw error;
    }
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTeacherInput) {
    return this.teacherService.update({ id }, body);
  }
}
