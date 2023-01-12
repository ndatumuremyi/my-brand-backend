import responses from "../responses.js";

const blogs = {
    '/blogs': {
        post: {
            tags: ['Blogs'],
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
            security: [],
            summary: 'Get udpate blogs',
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
        delete: {
            tags: ['Blog'],
            security: [],
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
            tags: ['Blogs'],
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
            tags: ['Blogs'],
            security: [
                {
                    JWT: [],
                },
            ],
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
                    in: 'formData',
                    name: 'browserId',
                    required: true,
                },
            ],
            consumes: ['application/json'],
            responses,
        },
    },
    '/blogs/{id}/comments':{
        get: {
            tags: ['Blogs'],
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
            tags: ['Blogs'],
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
                    name: 'comment',
                    required: true,
                },

            ],
            consumes: ['application/json'],
            responses,
        },

    },


};

export default blogs;
