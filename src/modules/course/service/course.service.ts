import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { Course, CourseKey } from '../model/course.model';
import { CreateCourseInput } from '../model/create-course.input';
import { UpdateCourseInput } from '../model/update-course.input';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('course')
    private readonly model: Model<Course, CourseKey>,
  ) {}

  create(input: CreateCourseInput) {
    try {
      return this.model.create({
        id: uuid.v4(),
        name: input.name,
        description: input.description,
        availableSessions: input.availableSessions,
      });
    } catch (error) {
      throw error;
    }
  }

  findAll(filter: UpdateCourseInput) {
    if (filter.name) {
      return this.model.query('name').eq(filter.name).exec();
    }
    return this.model.scan().exec();
  }

  findOne(key: CourseKey) {
    return this.model.get(key);
  }

  async update(key: CourseKey, input: UpdateCourseInput) {
    return this.model.update(key, input);
  }

  delete(key: CourseKey) {
    return this.model.delete(key);
  }
}
