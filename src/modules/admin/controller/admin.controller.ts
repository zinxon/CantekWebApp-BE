import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.adminService.findOne({ id });
    if (!admin) {
      throw new NotFoundException();
    }
    return admin;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminInput: UpdateAdminInput) {
    return this.adminService.update({ id }, updateAdminInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
