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
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  role: string;
}
