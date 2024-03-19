import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { Teacher, TeacherKey } from '../model/teacher.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel('teacher')
    private readonly model: Model<Teacher, TeacherKey>,
  ) {}

  create() {
    try {
      return this.model.create({
        id: uuid.v4(),
        courseId: [''],
        additionalAttributes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
