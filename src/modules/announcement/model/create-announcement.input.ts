import {IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateAnnouncementDto {

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsNumber()
    createdByUserId: number;

    @IsOptional()
    @IsString()
    file?: string;

}


export type AnnouncementKey = {
    id: string;
};
