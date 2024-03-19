import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';
import {AnnouncementService} from "@modules/announcement/service/announcement.service";
import {AnnouncementController} from "@modules/announcement/controller/announcement.controller";
import {announcementSchema} from "@modules/announcement/schema/announcement.schema";


@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'announcement',
                schema: announcementSchema,
            },
        ]),
    ],
    providers: [AnnouncementService],
    controllers: [AnnouncementController],
})
export class AnnouncementModule {}
