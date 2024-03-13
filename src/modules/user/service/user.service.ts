// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';
import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AdminService } from '@modules/admin/service/admin.service';
import { StudentService } from '@modules/student/service/student.service';
import { TeacherService } from '@modules/teacher/service/teacher.service';

import { CreateUserInput } from '../model/create-user.input';
import { UpdateUserInput } from '../model/update-user.input';
import { UserRole, UserStatus } from '../model/user.enum';
import { User, UserKey } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly model: Model<User, UserKey>,
    private readonly adminService: AdminService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  async bcryptHash(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async create(input: CreateUserInput) {
    let profileId: string = '';
    try {
      const existedUser = (
        await this.model.query('email').eq(input.email).exec()
      )[0];
      if (existedUser) {
        throw new ConflictException('User already exists');
      }
      if (input.role === UserRole.Admin) {
        profileId = (await this.adminService.create()).id;
      } else if (input.role === UserRole.Teacher) {
        profileId = (await this.teacherService.create()).id;
      } else if (input.role === UserRole.Student) {
        profileId = (await this.studentService.create()).id;
      }
      return this.model.create({
        ...input,
        id: uuid.v4(),
        password: await this.bcryptHash(input.password),
        status: UserStatus.Active,
        profileId: profileId,
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  }

  async update(key: UserKey, input: UpdateUserInput) {
    try {
      const existedUser = await this.findOne(key);
      if (!existedUser) {
        throw new NotFoundException("User doesn't exists");
      }
      // change password
      if (existedUser && input.password) {
        const hash = await this.bcryptHash(input.password);
        return this.model.update(key, {
          password: hash,
        });
      }
      // active/delete user
      if (existedUser && input.status) {
        return this.model.update(key, input);
      }
      return this.model.get(key);
    } catch (error) {
      throw error;
    }
  }

  delete(key: UserKey) {
    return this.model.delete(key);
  }

  findOne(key: UserKey) {
    return this.model.get(key);
  }

  findByEmail(email: string) {
    return this.model.query('email').eq(email).exec();
  }

  findByStatus(status: string) {
    return this.model.query('status').eq(status).exec();
  }
}
