import responses from '../responses.js';

const messages = {
    '/messages': {
        post: {
            tags: ['Messages'],
            security: [],
            summary: 'send Message',
            parameters: [
                {
                    in: 'formData',
                    name: 'names',
                    required: true,
                },
                {
                    in: 'formData',
                    name: 'email',
                    required: true,
                },
                {
                    in: 'formData',
                    name: 'message',
                    required: true,
                },
            ],
            consumes: ['application/json'],
            responses,
        },
        get: {
            tags: ['Messages'],
            security: [
                {
                JWT: [],
            },
            ],
            summary: 'get all Messages',
            parameters: [],
            consumes: ['application/json'],
            responses,
        },

    },
};

export default messages;
