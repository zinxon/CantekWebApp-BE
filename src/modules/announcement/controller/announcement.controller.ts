import {Body, Controller, Delete, Param, Post, Put} from "@nestjs/common";
import {AnnouncementService} from "@modules/announcement/service/announcement.service";
import {CreateAnnouncementDto} from "../model/create-announcement.input";
import {AnnouncementKey} from "@modules/announcement/model/create-announcement.input";

@Controller('announcement')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    @Post()
    async create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
        return this.announcementService.create(createAnnouncementDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAnnouncementDto: Partial<CreateAnnouncementDto>) {
        const key: AnnouncementKey = {id};
        return this.announcementService.update(key, updateAnnouncementDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const key: AnnouncementKey = {id};
        return this.announcementService.delete(key);
    }
}
