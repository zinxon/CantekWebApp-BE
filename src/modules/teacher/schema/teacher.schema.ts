import { Schema } from 'dynamoose';

export const TeacherSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    courseId: {
      type: Array,
      schema: [String],
    },
    additionalAttributes: {
      type: String,
    },
    // createdAt: {
    //   type: String,
    // },
    // updatedAt: {
    //   type: String,
    // },
  },
  {
    timestamps: {
      createdAt: {
        createdAt: {
          type: {
            value: Date,
            settings: {
              storage: 'iso',
            },
          },
        },
      },
      updatedAt: {
        updatedAt: {
          type: {
            value: Date,
            settings: {
              storage: 'iso',
            },
          },
        },
      },
    },
  },
);
