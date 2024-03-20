import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { Teacher, TeacherKey } from '../model/teacher.model';
import { UpdateTeacherInput } from '../model/update-teacher.input';

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
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  }

  findAll(filter: UpdateTeacherInput) {
    console.log(filter);
    if (filter.courseId) {
      this.model.query('courseId').eq(filter.courseId).exec();
    }
    if (filter.additionalAttributes) {
      this.model
        .query('additionalAttributes')
        .eq(filter.additionalAttributes)
        .exec();
    }
    return this.model.scan().exec();
  }

  findOne(key: TeacherKey) {
    return this.model.get(key);
  }

  async update(key: TeacherKey, input: UpdateTeacherInput) {
    return this.model.update(key, input);
  }

  delete(key: TeacherKey) {
    return this.model.delete(key);
  }
}
