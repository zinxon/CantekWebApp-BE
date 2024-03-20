import { IsEnum, IsIn, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { UserStatus } from './user.enum';

@InputType()
export class UpdateUserInput {
  @IsIn([UserStatus.Deleted, UserStatus.Active])
  @IsEnum(UserStatus)
  @Field(/* istanbul ignore next */ () => UserStatus)
  status?: UserStatus;

  @IsOptional()
  @Field({ nullable: true })
  password?: string;
}
