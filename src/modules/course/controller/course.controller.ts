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

import { CreateCourseInput } from '../model/create-course.input';
import { UpdateCourseInput } from '../model/update-course.input';
import { CourseService } from '../service/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Roles(UserRole.Admin, UserRole.Teacher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() body: CreateCourseInput) {
    return this.courseService.create(body);
  }

  @Roles(UserRole.Admin, UserRole.Teacher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAllUser(
    @Query()
    filter: UpdateCourseInput,
  ) {
    try {
      return await this.courseService.findAll(filter);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.courseService.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCourseInput) {
    return this.courseService.update({ id }, body);
  }
}
