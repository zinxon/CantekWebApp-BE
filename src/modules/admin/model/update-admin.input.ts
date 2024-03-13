import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  additionalAttributes: string;
}
