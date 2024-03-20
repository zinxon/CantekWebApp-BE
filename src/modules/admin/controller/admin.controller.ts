import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/role.guard';
import { Roles } from '@modules/auth/roles.decorator';

import { UpdateAdminInput } from '../model/update-admin.input';
// import { CreateAdminInput } from '../model/create-admin.input';
import { AdminService } from '../service/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create() {
    return this.adminService.create();
  }

  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.adminService.findOne({ id });
    if (!admin) {
      throw new NotFoundException();
    }
    return admin;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminInput: UpdateAdminInput,
  ) {
    const updatedAdmin = await this.adminService.update(
      { id },
      updateAdminInput,
    );
    if (!updatedAdmin) {
      throw new NotFoundException('Admin not found');
    }
    return updatedAdmin;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adminService.remove({ id });
  }
}
