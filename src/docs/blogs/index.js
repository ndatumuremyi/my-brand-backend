import responses from "../responses.js";

const blogs = {
    '/blogs': {
        post: {
            tags: ['Blog'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'create new blog',
            parameters: [
                {
                    in: 'formData',
                    name: 'title',
                    required: true,
                },
                {
                    in: 'formData',
                    name: 'category',
                    required: true,
                },
                {
                    in: 'formData',
                    name: 'description',
                    required: true,
                },
                {
                    name: 'image',
                    in: 'formData',
                    required: true,
                    type: 'file',
                },
            ],
            consumes: ['application/json'],
            responses,
        },
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'Get all blogs',
            parameters: [],
            consumes: ['application/json'],
            responses,
        },

    },
    '/blogs/{id}':{
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'Get one blogs',
            parameters: [{
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
        patch: {
            tags: ['Blog'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Update blog',
            parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
                {
                    in: 'formData',
                    name: 'title',
                    required: false,
                },
                {
                    in: 'formData',
                    name: 'category',
                    required: false,
                },
                {
                    in: 'formData',
                    name: 'description',
                    required: false,
                },
                {
                    name: 'image',
                    in: 'formData',
                    required: false,
                    type: 'file',
                },
            ],
            consumes: ['application/json'],
            responses,
        },
        delete: {
            tags: ['Blog'],
            security: [{
                JWT: [],
            },],
            summary: 'delete one blogs',
            parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        }


    },
    '/blogs/{id}/like':{
        post: {
            tags: ['Blog'],
            security: [],
            summary: 'like blog',
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
                    name: 'like',
                    required: true,
                    schema: {
                        example: {
                            browserId: 'id',
                        },
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },
    },
    '/blogs/{id}/unlike':{
        post: {
            tags: ['Blog'],
            security: [],
            summary: 'unlike blog',
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
                    name: 'like',
                    required: true,
                    schema: {
                        example: {
                            browserId: 'id',
                        },
                    },
                },
            ],
            consumes: ['application/json'],
            responses,
        },
    },
    '/blogs/{id}/comments':{
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'get blog comments',
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
        post: {
            tags: ['Blog'],
            security: [],
            summary: 'add blog comment',
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
                    name: 'Comment',
                    required: true,
                    schema: {
                        example: {
                            names: 'Ndatumuremyi paterne',
                            email: 'ndatumuremyi@gmail.com',
                            comment: 'you did great',
                        },
                    },
                },

            ],
            consumes: ['application/json'],
            responses,
        },

    },


};

export default blogs;
