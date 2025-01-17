import { IsArray, IsOptional, IsString } from 'class-validator';

import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TeacherKey = {
  id: string;
};

@ObjectType()
export class Teacher {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  courseId?: string[];

  @Field({ nullable: true })
  additionalAttributes: string;

  // @Field()
  // createdAt: string;
  // @Field()
  // updatedAt: string;
}
