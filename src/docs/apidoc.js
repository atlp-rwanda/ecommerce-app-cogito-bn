import dotenv from 'dotenv';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Cogito's ecommerce API Library",
      version: 1.0,
      description: 'This is an API of an ecommerce platform that will allow sellers to manage and sell their stock while facilitating buyers smooth online shopping',
    },
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL,
      description: 'Api server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  apis: ['./src/routes/*.js', './src/routes/vendor/*.js'],
};

export default options;
