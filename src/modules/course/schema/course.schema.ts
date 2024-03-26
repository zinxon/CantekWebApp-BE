import { Schema } from 'dynamoose';

export const CourseSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    availableSessions: {
      type: String,
    },
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
