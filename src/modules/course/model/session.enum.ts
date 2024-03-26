import { registerEnumType } from '@nestjs/graphql';

enum Session {
  Morning = '0',
  Afternoon = '1',
}
registerEnumType(Session, {
  name: 'Session',
});

export { Session };
