import dotenv from 'dotenv';

dotenv.config();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Cogito's ecommerce API Library",
      version: 1.0,
      description:
        'This is an API o f an ecommerce platform that will allow sellers to manage and sell their stock while facilitating buyers smooth online shopping',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'loginOTP',
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'loginOTP',
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'loginOTP',
        },
      },
    },
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL,
      description: 'Api server',
    },
  ],
  apis: ['./src/routes/*.js', './src/docs/apiDocs/*.js', './src/docs/vendors(22)/*'],
 

};

export default options;