import dotenv from 'dotenv';
import swaggerDoc from './swagger.js';
import blogs from './blogs/index.js';
import users from "./users/index.js";
import messages from "./messages/index.js";
const defaults = swaggerDoc.paths;

dotenv.config();


const host =
    process.env.NODE_ENV === 'production'
        ? process.env.HOST.split('https://')[1]
        : process.env.HOST.split('http://')[1];

const paths = {
    ...defaults,
    ...blogs,
    ...users,
    ...messages,
};

const config = {
    swagger: '2.0',
    info: {
        version: '1.0.0.',
        title: 'My brand APIs Documentation',
        description: '',
    },
    host,
    basePath: `/api/${process.env.API_VERSION || 'v1'}`,
    schemes: ['http', 'https'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    tags: [
        {
            name: 'My brand APIs Documentation',
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths,
};
export default config;
