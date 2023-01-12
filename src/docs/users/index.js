import responses from '../responses.js';

const users = {
    '/users/signup': {
        post: {
            tags: ['Users'],
            security: [],
            summary: 'Register as User',
            parameters: [
                {
                    in: 'body',
                    name: 'user',
                    required: true,
                    schema: {
                        example: {
                            email: 'ndatumuremyi@gmail.com',
                            password: 'password',
                        },
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },
    },
    '/users/login': {
        post: {
            tags: ['Users'],
            security: [],
            summary: 'Signin to My brand',
            parameters: [
                {
                    in: 'body',
                    name: 'user',
                    required: true,
                    schema: {
                        example: {
                            email: 'ndatumuremyi@gmail.com',
                            password: 'password',
                        },
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },
    },
    '/users/logout': {
        post: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Logout',
            parameters: [],
            consumes: ['application/json'],
            responses,
        },
    },
};

export default users;
