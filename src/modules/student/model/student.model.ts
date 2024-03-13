import { Field, ID, ObjectType } from '@nestjs/graphql';

export type StudentKey = {
  id: string;
};

@ObjectType()
export class Student {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @Field({ nullable: true })
  linkedin: string;
  @Field({ nullable: true })
  resume: string;
  @Field({ nullable: true })
  certificate: string;
  @Field({ nullable: true })
  courseId: string[];
  @Field({ nullable: true })
  techStack: string[];

  @Field()
  createAt: string;
  @Field()
  updateAt: string;
}
