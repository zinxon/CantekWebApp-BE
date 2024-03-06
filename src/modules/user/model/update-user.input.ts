import { IsEnum, IsIn } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { UserStatus } from './user.enum';

@InputType()
export class UpdateUserInput {
  @IsIn([UserStatus.Deleted])
  @IsEnum(UserStatus)
  @Field(/* istanbul ignore next */ () => UserStatus)
  status: UserStatus;
}
