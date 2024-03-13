import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { Student, StudentKey } from '../model/student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('student')
    private readonly model: Model<Student, StudentKey>,
  ) {}

  create() {
    try {
      return this.model.create({
        id: uuid.v4(),
        linkedin: '',
        resume: '',
        certificate: '',
        courseId: [''],
        techStack: [''],
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
