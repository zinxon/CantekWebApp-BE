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

  findOne(key: StudentKey) {
    return this.model.get(key);
  }

  async update(key: StudentKey, input: UpdateStudentInput) {
    const res = await this.model.update(key, input);
    return res;
  }

  delete(key: StudentKey) {
    return this.model.delete(key);
  }

  async enroll(studentKey: StudentKey, courseIdList: string[], method: string) {
    // help me write a function to add list of courseId from courseId param into student's courseID
    const student = await this.model.get(studentKey);
    // Combine the arrays and convert them into a Set to eliminate duplicates
    let finalCourseList = [''];
    if (method === 'add') {
      const combinedSet = new Set([
        ...(student.courseId as string[]),
        ...courseIdList,
      ]);
      // Convert the Set back to an array
      finalCourseList = Array.from(combinedSet);
    } else if (method === 'remove') {
      const studentCourseList = student.courseId || [''];
      finalCourseList = studentCourseList.filter(
        (item) => !courseIdList.includes(item),
      );
    }
    const res = await this.model.update({
      id: studentKey.id,
      courseId: finalCourseList,
    });
    return res;
  }
}
