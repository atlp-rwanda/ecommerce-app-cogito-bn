const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Library',
      version: 1.0,
      description: 'Swagger Api Documentation',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
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

  apis: ['./src/routes/*.js'],
};

export default options;
