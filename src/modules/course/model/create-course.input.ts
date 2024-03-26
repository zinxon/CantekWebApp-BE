import { IsNotEmpty, IsString } from 'class-validator';

import { Field, InputType, InterfaceType } from '@nestjs/graphql';

import { Session } from './session.enum';

@InputType()
@InterfaceType('BaseCourse')
export class CreateCourseInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @Field(/* istanbul ignore next */ () => Session)
  availableSessions: Session;

  @IsString()
  @Field({ nullable: true })
  description: string;
}
