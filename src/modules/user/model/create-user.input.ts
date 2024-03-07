import { IsNotEmpty, IsString } from 'class-validator';

import { Field, InputType, InterfaceType } from '@nestjs/graphql';

@InputType()
@InterfaceType('BaseUser')
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  passwordHash: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  role: string;
}
