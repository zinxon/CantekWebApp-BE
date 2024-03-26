import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query, // Req,
  // UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/role.guard';
import { Roles } from '@modules/auth/roles.decorator';

import { CreateUserInput } from '../model/create-user.input';
import { UpdateUserInput } from '../model/update-user.input';
import { UserRole } from '../model/user.enum';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserInput) {
    return this.userService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserInput) {
    return this.userService.update({ id }, body);
  }

  @Post(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete({ id });
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAllUser(
    @Query()
    {
      limit,
      page,
      role,
      email,
      status,
    }: {
      limit?: number;
      page?: number;
      role?: string;
      email?: string;
      status?: string;
    },
  ) {
    try {
      return await this.userService.findAllUser(
        limit,
        page,
        role,
        email,
        status,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Get()
  findByStatus(@Query() { status }: { status?: string }) {
    if (status) {
      return this.userService.findByStatus(status);
    }
    throw new BadRequestException();
  }
}
