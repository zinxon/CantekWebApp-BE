import { Item } from 'nestjs-dynamoose';

import { Test, TestingModule } from '@nestjs/testing';

import { UserStatus } from '../model/user.enum';
import { UserService } from '../service/user.service';
import { UserTestImports } from '../test/user-test.imports';
import { UserController } from './user.controller';
import userJson from './user.data.json';
import { User } from '../model/user.model';

let controller: UserController;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: UserTestImports,
    providers: [UserService],
    controllers: [UserController],
  }).compile();

  controller = module.get<UserController>(UserController);
});

describe('User Controller', () => {
  let users: Item<User>[] = [];

  beforeAll(async () => {
    users = await Promise.all(
      userJson.map(
        async (input) => await controller.create(input),
      ) as any,
    );
  });

  afterAll(async () => {
    await Promise.all(
      users.map(
        async (user) =>
          await controller.delete(user.toJSON().id),
      ),
    );
  });

  it('find by email', async () => {
    // test findByEmail
    expect(await controller.find({ email: 'mary' })).toHaveLength(0);
    expect(await controller.find({ email: 'user12' })).toHaveLength(1);
  });

  it('update status', async () => {
    const users = await controller.find({ email: 'device12' });
    expect(users).toHaveLength(1);
    expect(users[0].status).toBe(UserStatus.Active);

    const updated = await controller.update(users[0].id, {
      status: UserStatus.Deleted,
    });
    expect(updated).toBeDefined();
    expect(updated.status).toBe(UserStatus.Deleted);
  });

  // it('find by id', async () => {
  //   const users = await controller.find({ id: 'device13' });
  //   expect(users).toHaveLength(1);

  //   const user = await controller.findOne(users[0].id);
  //   expect(user).toBeDefined();
  //   expect(user.id).toBe(users[0].id);
  // });

  it('find by id (not found)', async () => {
    let error = null;
    try {
      await controller.findOne('dummyid');
    } catch (e) {
      error = e;
    }
    expect(error).toMatchObject({ status: 404 });
  });

  it('find by email (bad request)', async () => {
    let error = null;
    try {
      await controller.find({email: 'user01' });
    } catch (e) {
      error = e;
    }
    expect(error).toMatchObject({ status: 400 });
  });

  it('find all (bad request)', async () => {
    let error = null;
    try {
      await controller.find({});
    } catch (e) {
      error = e;
    }
    expect(error).toMatchObject({ status: 400 });
  });
});
