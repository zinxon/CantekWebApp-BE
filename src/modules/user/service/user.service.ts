// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';
import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AdminService } from '../../admin/service/admin.service';
import { StudentService } from '../../student/service/student.service';
import { TeacherService } from '../../teacher/service/teacher.service';
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
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
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

  async findAllUser(
    limit: number = 10,
    page: number = 1,
    role?: string,
    email?: string,
    status?: string,
  ) {
    try {
      if (role === UserRole.Admin) {
        return this.model.query('role').eq(UserRole.Admin).exec();
      }
      if (role === UserRole.Teacher) {
        return this.model.query('role').eq(UserRole.Teacher).exec();
      }
      if (role === UserRole.Student) {
        return this.model.query('role').eq(UserRole.Student).exec();
      }
      if (email) {
        return this.model.query('email').eq(email).exec();
      }
      if (status === UserStatus.Active) {
        return this.model.query('status').eq(UserStatus.Active).exec();
      }
      // const resModel = await this.model.scan().limit(limit).exec(); // return all user in db
      // const res = this.model.scan().startAt(resModel.lastKey).exec();
      let response;
      for (let i = 0; i < page; i++) {
        response = await this.model.scan().limit(limit).exec();
      }
      console.log('first response', response);
      // const currentIndex = (page - 1) * limit;
      // console.log(currentIndex);
      // response = await this.model
      //   .scan()
      //   .startAt(response?.lastKey as any)
      //   .limit(limit)
      //   .exec();
      // console.log('final response', response);
      return response;
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
    // console.log(this.model.query('email').eq(email).exec());
    return this.model.query('email').eq(email).exec();
  }

  findByStatus(status: string) {
    return this.model.query('status').eq(status).exec();
  }
}
