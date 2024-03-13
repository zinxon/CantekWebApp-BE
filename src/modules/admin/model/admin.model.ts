import { Field, ID, ObjectType } from '@nestjs/graphql';

export type AdminKey = {
  id: string;
};

@ObjectType()
export class Admin {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @Field({ nullable: true })
  additionalAttributes: string;

  @Field()
  createAt: string;
  @Field()
  updateAt: string;
}
