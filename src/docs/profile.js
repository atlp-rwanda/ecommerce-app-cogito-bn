export const updateProfile = {
  security: {
    bearerAuth: [],
  },
  tags: ['Profile'],
  summary: 'Updating user profile',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      default: '1',
      schema: {
        type: 'integer',
      },
    },
    {
      name: 'Accept-Language',
      in: 'header',
      description: 'preferred language',
      default: 'en',
      required: true,
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },

            email: { type: 'string' },

            gender: { type: ' string' },

            birthdate: { type: 'date' },

            preferredLanguage: { type: 'string' },

            preferredCurrency: { type: 'string' },

            billingAddress: { type: 'array' },
          },
        },
        example: {
          name: 'John Doe',
          email: 'john@example.com',
          gender: 'male',
          birthdate: '2023-04-09T19:40:10.314Z',
          preferredLanguage: 'en',
          preferredCurrency: 'RF',
          billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User profile updated',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { type: 'object' },

              status: { type: 'integer' },

              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
                birthdate: '2023-04-09T19:40:10.314Z',
                preferredLanguage: 'en',
                preferredCurrency: 'RF',
                billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
                password: 'kunda123',
                role: 'vendor',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },

              status: 200,
              message: 'Profile update successfully',
            },
          },
        },
      },
    },
    422: {
      description: 'Unprocessable Entity',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              errors: { type: 'array' },

              status: { type: 'integer' },
            },
            example: {
              status: 422,
              errors: [
                {
                  field: 'name',
                  message: '"name" must be a string',
                },
                {
                  field: 'email',
                  message: '"email" must be a valid email',
                },
              ],
            },
          },
        },
      },
    },
  },
};

export const getProfile = {
  security: [],
  tags: ['Profile'],
  summary: 'Fetch user profile by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      default: '1',
      schema: {
        type: 'integer',
      },
    },
    {
      name: 'Accept-Language',
      in: 'header',
      description: 'preferred language',
      default: 'en',
      required: true,
    },
  ],
  responses: {
    200: {
      description: 'User profile',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { type: 'array' },

              status: { type: 'integer' },

              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
                birthdate: '2023-04-09T19:40:10.314Z',
                preferredLanguage: 'en',
                preferredCurrency: 'RF',
                billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
                password: 'kunda123',
                role: 'vendor',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },
              status: 200,
              message: 'Profile fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { type: 'object' },

              status: { type: 'integer' },

              message: { type: 'string' },
            },
            example: {
              data: {},
              status: 404,
              message: 'user with the id 2 does not exist',
            },
          },
        },
      },
    },
  },
};
