import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [StudentModule, AdminModule, CourseModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
