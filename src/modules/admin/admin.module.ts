import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { AdminController } from './controller/admin.controller';
import { AdminSchema } from './schema/admin.schema';
import { AdminService } from './service/admin.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'admin',
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
