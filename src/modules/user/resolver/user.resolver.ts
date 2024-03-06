import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../model/create-user.input';
import { User } from '../model/user.model';
import { UpdateUserInput } from '../model/update-user.input';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(/* istanbul ignore next */ () => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  updateUser(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.update({ id }, input);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  deleteUser(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.userService.delete({ id });
  }

  @Query(/* istanbul ignore next */ () => User)
  user(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.userService.findOne({ id });
  }

  @Query(/* istanbul ignore next */ () => [User])
  userByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(/* istanbul ignore next */ () => [User])
  userByStatus(@Args('status') status: string) {
    return this.userService.findByStatus(status);
  }
}
