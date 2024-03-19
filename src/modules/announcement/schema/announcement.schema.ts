import {Schema} from 'dynamoose';

export const announcementSchema = new Schema(
    {
        id: {
            type: String,
            hashKey: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdByUserId: {
            type: Number,
            required: true,
        },
        file: {
            type: String,
            required: false,
        },
    },
    {
        timestamps:
            {
                createdAt:
                    {
                        createdAt:
                            {
                                type:
                                    {
                                        value:
                                        Date,
                                        settings:
                                            {storage: 'iso',},
                                    },
                            },
                    },
                updatedAt: {
                    updatedAt: {
                        type: {
                            value: Date, settings:
                                {storage: 'iso',},
                        },
                    },
                },
            },
    },
);
