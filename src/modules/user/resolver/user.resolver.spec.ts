import { Item } from 'nestjs-dynamoose';

import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../service/user.service';
import { UserTestImports } from '../test/user-test.imports';
import userJson from './user.data.json';
import { UserResolver } from './user.resolver';
import { User } from '../model/user.model';

let resolver: UserResolver;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: UserTestImports,
    providers: [UserService, UserResolver],
  }).compile();

  resolver = module.get<UserResolver>(UserResolver);
});

describe('User Resolver', () => {
  let users: Item<User>[] = [];

  beforeAll(async () => {
    // create user records
    users = await Promise.all(
      userJson.map(
        async (input) => (await resolver.createUser(input)) as any,
      ),
    );
  });

  afterAll(async () => {
    // create user records
    await Promise.all(
      users.map(
        async (user) =>
          await resolver.deleteUser(user.toJSON().id),
      ),
    );
  });

  // it('find by email or targetId', async () => {
  //   // test findByUserId and findByTargetId
  //   expect(await resolver.userByUserId('mary')).toHaveLength(0);
  //   expect(await resolver.userByUserId('user21')).toHaveLength(2);
  //   expect(await resolver.userByTargetId('iphone')).toHaveLength(0);
  // });

  // it('update status', async () => {
  //   const users = await resolver.userByTargetId('device21');
  //   expect(users).toHaveLength(1);
  //   expect(users[0].status).toBe(UserStatus.Active);

  //   const updated = await resolver.updateUser(users[0].id, {
  //     status: UserStatus.Deleted,
  //   });
  //   expect(updated).toBeDefined();
  //   expect(updated.status).toBe(UserStatus.Deleted);
  // });

  // it('find by id', async () => {
  //   const users = await resolver.userByTargetId('device23');
  //   expect(users).toHaveLength(1);

  //   const user = await resolver.user(users[0].id);
  //   expect(user).toBeDefined();
  //   expect(user.id).toBe(users[0].id);
  // });
});
