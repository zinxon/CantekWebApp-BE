import { Schema } from 'dynamoose';

export const UserSchema = new Schema(
  {
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
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      index: {
        type: 'global',
      },
    },
    profileId: {
      type: String,
    },
    status: {
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
