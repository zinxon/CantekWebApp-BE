import { Schema } from 'dynamoose';

export const TeacherSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  courseId: {
    type: Array,
    schema: String,
  },
  additionalAttributes: {
    type: String,
  },
  createAt: {
    type: String,
  },
  updateAt: {
    type: String,
  },
});
