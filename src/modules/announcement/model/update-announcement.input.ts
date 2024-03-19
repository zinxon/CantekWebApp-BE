import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementDto } from './create-announcement.input';

export class UpdateAnnouncementInput extends PartialType(CreateAnnouncementDto) {}
