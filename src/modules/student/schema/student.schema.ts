import { Schema } from 'dynamoose';

export const StudentSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  linkedin: {
    type: String,
  },
  resume: {
    type: String,
  },
  certificate: {
    type: String,
  },
  courseId: {
    type: Array,
    schema: String,
  },
  techStack: {
    type: Array,
    schema: String,
  },
  createAt: {
    type: String,
  },
  updateAt: {
    type: String,
  },
});
