import { IsOptional, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description: string;
}
