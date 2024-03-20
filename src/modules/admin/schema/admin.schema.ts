import { Schema } from 'dynamoose';

export const AdminSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    additionalAttributes: {
      type: String,
    },
    // name: {
    //   type: String,
    // },

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
