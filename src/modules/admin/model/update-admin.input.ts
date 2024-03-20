import { IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput {
  @IsString()
  @Field({ nullable: true })
  additionalAttributes: string;
}
