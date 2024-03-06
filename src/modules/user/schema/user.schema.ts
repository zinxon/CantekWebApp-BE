import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
    index: {
      type: 'global',
      rangeKey: 'status',
    },
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
  },
  profileId: {
    type: String,
  },
  status: {
    type: String,
  },
  createAt: {
    type: String,
  },
});
