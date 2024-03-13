import { registerEnumType } from '@nestjs/graphql';

enum UserStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}
registerEnumType(UserStatus, {
  name: 'UserStatus',
});

enum UserRole {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
export { UserStatus, UserRole };
