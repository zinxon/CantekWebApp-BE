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

  async findAllUser(role?: string, email?: string, status?: string) {
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
      return this.model.scan().exec(); // return all user in db
      // return this.model.query('role').eq(UserRole.Admin).exec(); // return all admin in db
      // return this.model.query('role').eq(UserRole.Teacher).exec(); // return all teacher in db
      // return this.model.query('role').eq(UserRole.Student).exec(); // return all student in db
      // return this.model.query('status').eq(UserStatus.Active).exec(); // return all active user in db
      // return this.model.query('status').eq(UserStatus.Inactive).exec(); // return all inactive user in db
      // return this.model.query('status').eq(UserStatus.Pending).exec(); // return all pending user in db
      // return this.model.query('status').eq(UserStatus.Deleted).exec(); // return all deleted user in db
      // return this.model.query('status').eq(UserStatus.Suspended).exec(); // return all suspended user in db
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
