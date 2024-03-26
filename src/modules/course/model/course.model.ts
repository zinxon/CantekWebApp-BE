import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CreateCourseInput } from './create-course.input';

export type CourseKey = {
  id: string;
};

@ObjectType()
export class Course extends CreateCourseInput {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;
}
