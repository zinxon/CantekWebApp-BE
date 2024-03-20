import { Schema } from 'dynamoose';

export const StudentSchema = new Schema(
  {
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
