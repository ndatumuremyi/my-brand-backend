import responses from '../responses.js';

const messages = {
    '/messages': {
        post: {
            tags: ['Messages'],
            security: [],
            summary: 'send Message',
            parameters: [
                {
                    in: 'body',
                    name: 'Message',
                    required: true,
                    schema: {
                        example: {
                            names: 'Ndatumuremyi paterne',
                            email: 'ndatumuremyi@gmail.com',
                            message: 'you did great',
                        },
                    },
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
