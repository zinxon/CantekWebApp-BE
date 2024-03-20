import { IsArray, IsOptional, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  linkedin?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  resume?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  certificate?: string;

  // "each" tells class-validator to run the validation on each item of the array
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  courseId?: string[];

  // @ArrayMinSize(1)
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  techStack?: string[];
}
