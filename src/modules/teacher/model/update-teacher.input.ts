import { IsArray, IsOptional, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  courseId?: string[];

  @IsOptional()
  @Field({ nullable: true })
  additionalAttributes: string;
}
