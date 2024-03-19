import {InjectModel, Model} from "nestjs-dynamoose";
import {Injectable} from "@nestjs/common";
import {CreateAnnouncementDto} from "../model/create-announcement.input";
import {AnnouncementKey} from "@modules/announcement/model/create-announcement.input";
import * as uuid from "uuid";
@Injectable()
export class AnnouncementService {
  constructor(
      @InjectModel('announcement')
      private readonly model: Model<CreateAnnouncementDto, AnnouncementKey>,
  ) {}

  async create(input: CreateAnnouncementDto) {
    const announcementData = {
      ...input,
      id: uuid.v4(),
    };
    return this.model.create(announcementData);
  }

  async update(key: AnnouncementKey, input: Partial<CreateAnnouncementDto>) {
    return this.model.update(key, input);
  }

  async delete(key: AnnouncementKey) {
    return this.model.delete(key);
  }
}
