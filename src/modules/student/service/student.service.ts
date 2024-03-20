import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import { Injectable } from '@nestjs/common';

import { Student, StudentKey } from '../model/student.model';
import { UpdateStudentInput } from '../model/update-student.input';

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
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllStudent(filter: UpdateStudentInput) {
    // Apply filters based on provided criteria
    if (filter.linkedin) {
      this.model.query('linkedin').eq(filter.linkedin).exec();
    }

    if (filter.resume) {
      this.model.query('resume').eq(filter.resume).exec();
    }

    if (filter.certificate) {
      this.model.query('certificate').eq(filter.certificate).exec();
    }

    if (filter.courseId && filter.courseId.length > 0) {
      this.model.query('courseId').eq(filter.courseId).exec();
    }

    if (filter.techStack && filter.techStack.length > 0) {
      this.model.query('techStack').eq(filter.techStack).exec();
    }

    return this.model.scan().exec();
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
