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
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserInput) {
    return this.userService.create(body);
  }

  // @Post("/admin")
  // create(@Body() body: CreateUserInput) {
  //   return this.userService.create(body);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserInput) {
    return this.userService.update({ id }, body);
  }

  @Post(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete({ id });
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAllUser(
    // @Req() req: any,
    @Query()
    { role, email, status }: { role?: string; email?: string; status?: string },
  ) {
    try {
      // if (req.user.role !== 'admin') {
      //   throw new UnauthorizedException('Insufficient Permission');
      // }
      return this.userService.findAllUser(role, email, status);
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

  // @Get()
  // find(@Query() { email }: { email?: string }) {
  //   if (email) {
  //     return this.userService.findByEmail(email);
  //   }
  //   throw new BadRequestException();
  // }

  @Get()
  findByStatus(@Query() { status }: { status?: string }) {
    if (status) {
      return this.userService.findByStatus(status);
    }
    throw new BadRequestException();
  }
}
