import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { Admin, AdminKey } from '../model/admin.model';
import { UpdateAdminInput } from '../model/update-admin.input';

// import { CreateAdminInput } from '../model/create-admin.input';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('admin')
    private readonly model: Model<Admin, AdminKey>,
  ) {}

  create() {
    try {
      return this.model.create({
        id: uuid.v4(),
        additionalAttributes: '',
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.model.scan().exec();
  }

  findOne(key: AdminKey) {
    return this.model.get(key);
  }

  update(key: AdminKey, updateAdminInput: UpdateAdminInput) {
    console.log(`This action updates a #${key} admin`);
    return this.model.update(key, updateAdminInput);
  }

  remove(key: AdminKey) {
    this.model.delete(key);
    return { status: 'ok' };
  }
}
