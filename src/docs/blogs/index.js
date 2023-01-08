import responses from "../responses.js";

const blogs = {
    '/blogs': {
        /*post: {
            tags: ['Company'],
            security: [{JWT: [],},],
            summary: 'Create Blog',
            parameters: [
                {
                    in: 'body',
                    name: 'company',
                    required: true,
                    schema: {
                        example: {
                            name: 'Imanzi ltd',
                        },
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },*/
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'Get all blogs',
            parameters: [],
            consumes: ['application/json'],
            responses,
        },
    },
    /*'/companies/{id}': {
        get: {
            tags: ['Company'],
            security: [{JWT: [],},],
            summary: 'Get one company',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },
        put: {
            tags: ['Company'],
            security: [{JWT: [],},],
            summary: 'Edit company profile',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
                {
                    in: 'body',
                    name: 'company',
                    schema: {
                        example: {
                            name: 'Imanzi inc',
                        },
                    },
                },

            ],
            consumes: ['application/json'],
            responses,
        },
        delete: {
            tags: ['Company'],
            security: [{JWT: [],},],
            summary: 'Delete company',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },
    },*/
};

export default blogs;
