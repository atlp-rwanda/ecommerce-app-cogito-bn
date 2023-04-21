export const createNewRole = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Role'],
  summary: 'Create a new role',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            roleName: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['roleName', 'description'],
        },
        example: {
          roleName: 'Admin',
          description: 'Able to manage users',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Role created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                roleName: 'Admin',
                description: 'Able to manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                roleName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-17T12:00:00.000Z',
                updatedAt: '2023-04-17T12:00:00.000Z',
              },
              status: 201,
              message: 'Role created successfully',
            },
          },
        },
      },
    },
    headers: {
      'Accept-Language': {
        schema: {
          type: 'string',
        },
        description: 'Language preference for the response',
        example: 'en-US',
      },
    },
  },
  400: {
    description: 'Bad Request',
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
              roleName: 'Admin',
              description: 'Able to manage users',
            },
            status: 400,
            message: 'Invalid request body',
          },
        },
      },
    },
  },
  headers: {
    'Accept-Language': {
      schema: {
        type: 'string',
      },
      description: 'Language preference for the response',
      example: 'en-US',
    },
  },
};

export const getAllRole = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Role'],
  summary: 'Fetch all roles',
  responses: {
    200: {
      description: 'List of roles',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                roleName: 'Admin',
                description: 'Able to manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: [
                {
                  id: 1,
                  roleName: 'Admin',
                  description: 'Able to manage users',
                  createdAt: '2023-04-09T19:40:10.314Z',
                  updatedAt: '2023-04-11T19:40:10.314Z',
                },
                {
                  id: 2,
                  roleName: 'User',
                  description: 'Able to view products and make purchases',
                  createdAt: '2023-04-10T19:40:10.314Z',
                  updatedAt: '2023-04-12T19:40:10.314Z',
                },
              ],
              status: 200,
              message: 'Roles fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Roles not found',
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
              message: 'No roles found',
            },
          },
        },
      },
    },
  },
};

export const getRoleById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Role'],
  summary: 'Fetch a role by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the role to fetch',
    },
  ],
  responses: {
    200: {
      description: 'Role details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {},
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                roleName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },
              status: 200,
              message: 'Role fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Role not found',
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
              message: 'Role with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const updateRoleById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Role'],
  summary: 'Update a role by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the role to update',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            roleName: { type: 'string' },
            description: { type: 'string' },
          },
        },
        example: {
          roleName: 'Admin',
          description: 'Able to manage users',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Role updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                roleName: 'Admin',
                description: 'Manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                roleName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-17T10:21:33.000Z',
              },
              status: 200,
              message: 'Role updated successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Role not found',
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
              message: 'Role with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const deleteRoleById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Role'],
  summary: 'Delete a role by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the role to delete',
    },
  ],
  responses: {
    204: {
      description: 'Role deleted successfully',
    },
    404: {
      description: 'Role not found',
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
              message: 'Role with the given ID not found',
            },
          },
        },
      },
    },
  },
};

export const createNewPermission = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Permission'],
  summary: 'Create a new permission',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            permName: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['permName', 'description'],
        },
        example: {
          permName: 'Admin',
          description: 'Able to manage users',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'permission created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                permName: 'Admin',
                description: 'Able to manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                permName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-17T12:00:00.000Z',
                updatedAt: '2023-04-17T12:00:00.000Z',
              },
              status: 201,
              message: 'permission created successfully',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad Request',
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
                permName: 'Admin',
                description: 'Able to manage users',
              },
              status: 400,
              message: 'Invalid request body',
            },
          },
        },
      },
    },
  },
};

export const getAllPermission = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Permission'],
  summary: 'Fetch all permissions',
  responses: {
    200: {
      description: 'List of permissions',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                permName: 'Admin',
                description: 'Able to manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: [
                {
                  id: 1,
                  permName: 'Admin',
                  description: 'Able to manage users',
                  createdAt: '2023-04-09T19:40:10.314Z',
                  updatedAt: '2023-04-11T19:40:10.314Z',
                },
                {
                  id: 2,
                  permissionName: 'User',
                  description: 'Able to view products and make purchases',
                  createdAt: '2023-04-10T19:40:10.314Z',
                  updatedAt: '2023-04-12T19:40:10.314Z',
                },
              ],
              status: 200,
              message: 'permissions fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'permissions not found',
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
              message: 'No permissions found',
            },
          },
        },
      },
    },
  },
};

export const getPermissionById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Permission'],
  summary: 'Fetch a permission by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the permission to fetch',
    },
  ],
  responses: {
    200: {
      description: 'permission details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {},
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                permName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },
              status: 200,
              message: 'permission fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'permission not found',
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
              message: 'permission with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const updatePermissionById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Permission'],
  summary: 'Update a permission by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the permission to update',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            permName: { type: 'string' },
            description: { type: 'string' },
          },
        },
        example: {
          permName: 'Admin',
          description: 'Able to manage users',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'permission updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                permName: 'Admin',
                description: 'Manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                permName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-17T10:21:33.000Z',
              },
              status: 200,
              message: 'permission updated successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'permission not found',
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
              message: 'permission with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const deletePermissionById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['Permission'],
  summary: 'Delete a Permission by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the Permission to delete',
    },
  ],
  responses: {
    204: {
      description: 'Permission deleted successfully',
    },
    404: {
      description: 'Permission not found',
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
              message: 'Permission with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const createNewUser = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['User'],
  summary: 'Create a new user',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' },
          },
          required: ['firstName', 'lastName', 'email', 'password', 'role'],
        },
        example: {
          firstName: 'Agnes',
          lastName: 'Kunda',
          email: 'kundaaggy4@gmail.com',
          password: 'kunda123',
          role: 'admin',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'user created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                userName: 'Admin',
                description: 'Able to manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                userName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-17T12:00:00.000Z',
                updatedAt: '2023-04-17T12:00:00.000Z',
              },
              status: 201,
              message: 'user created successfully',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad Request',
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
                userName: 'Admin',
                description: 'Able to manage users',
              },
              status: 400,
              message: 'Invalid request body',
            },
          },
        },
      },
    },
  },
};
export const getAllUser = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['User'],
  summary: 'Fetch all users',
  responses: {
    200: {
      description: 'List of users',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {},
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: [
                {
                  id: 1,
                  firstName: 'Agnes',
                  lastName: 'Kunda',
                  email: 'kundaaggy4@gmail.com',
                  password: 'kunda123',
                  role: 'admin',
                  createdAt: '2023-04-09T19:40:10.314Z',
                  updatedAt: '2023-04-11T19:40:10.314Z',
                },
              ],
              status: 200,
              message: 'users fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'users not found',
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
              message: 'No users found',
            },
          },
        },
      },
    },
  },
};

export const getUserById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['User'],
  summary: 'Fetch a user by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the user to fetch',
    },
  ],
  responses: {
    200: {
      description: 'user details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {},
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                userName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },
              status: 200,
              message: 'user fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'user not found',
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
              message: 'user with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const updateUserById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['User'],
  summary: 'Update a user by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the user to update',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            userName: { type: 'string' },
            description: { type: 'string' },
          },
        },
        example: {
          userName: 'Admin',
          description: 'Able to manage users',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'user updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                userName: 'Admin',
                description: 'Manage users',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                userName: 'Admin',
                description: 'Able to manage users',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-17T10:21:33.000Z',
              },
              status: 200,
              message: 'user updated successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'user not found',
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
              message: 'user with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const deleteUserById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['User'],
  summary: 'Delete a role by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the user to delete',
    },
  ],
  responses: {
    204: {
      description: 'user deleted successfully',
    },
    404: {
      description: 'user not found',
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
              message: 'user with the given ID not found',
            },
          },
        },
      },
    },
  },
};

export const createuserRole = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['user/Role'],
  summary: 'Assign role to user',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            userId: { type: 'integer' },
            roleId: { type: 'integer' },
          },
          required: ['userId', 'roleId'],
        },
        example: {
          userId: '4',
          roleId: '3',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Role Assigned to user successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                userId: '4',
                roleId: '3',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                userId: '4',
                roleId: '3',
                createdAt: '2023-04-17T12:00:00.000Z',
                updatedAt: '2023-04-17T12:00:00.000Z',
              },
              status: 201,
              message: 'Role Assigned to user successfully',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad Request',
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
                userId: '4',
                roleId: '3',
              },
              status: 400,
              message: 'Invalid request body',
            },
          },
        },
      },
    },
  },
};
export const getAlluserRole = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['user/Role'],
  summary: 'Fetch all roles with users user',
  responses: {
    200: {
      description: 'List of roles with users',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                userId: '4',
                roleId: '3',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: [
                {
                  id: 1,
                  userId: '4',
                  roleId: '3',
                  createdAt: '2023-04-09T19:40:10.314Z',
                  updatedAt: '2023-04-11T19:40:10.314Z',
                },
              ],
              status: 200,
              message: 'Roles fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Roles not found',
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
              message: 'No roles found',
            },
          },
        },
      },
    },
  },
};

export const getuserRoleById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['user/Role'],
  summary: 'Fetch a role with user by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the role to fetch',
    },
  ],
  responses: {
    200: {
      description: 'Role with user details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {},
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                userId: '4',
                roleId: '3',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },
              status: 200,
              message: 'Role with user fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Role with user not found',
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
              message: 'Role assigned to user with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const updateuserRoleById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['user/Role'],
  summary: 'Update a role with user by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the user with role to update',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            userId: '4',
            roleId: '3',
          },
        },
        example: {
          userId: '4',
          roleId: '3',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User with Role updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                userId: '4',
                roleId: '3',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                userId: '4',
                roleId: '3',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-17T10:21:33.000Z',
              },
              status: 200,
              message: 'User with Role updated successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'User with Role not found',
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
              message: 'User with Role with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const deleteuserRoleById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['user/Role'],
  summary: 'Delete a User with role by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the User with role to delete',
    },
  ],
  responses: {
    204: {
      description: 'User with Role deleted successfully',
    },
    404: {
      description: 'User with Role not found',
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
              message: 'Role with the given ID not found',
            },
          },
        },
      },
    },
  },
};

export const createrolePermission = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['role/Permission'],
  summary: 'Assign permission to role',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            userId: { type: 'integer' },
            roleId: { type: 'integer' },
          },
          required: ['roleId', 'permissionId'],
        },
        example: {
          permissionId: '4',
          roleId: '3',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Role Assigned to user successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                permissionId: '4',
                roleId: '3',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                permissionId: '4',
                roleId: '3',
                createdAt: '2023-04-17T12:00:00.000Z',
                updatedAt: '2023-04-17T12:00:00.000Z',
              },
              status: 201,
              message: 'permission Assigned to role successfully',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad Request',
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
                permissionId: '4',
                roleId: '3',
              },
              status: 400,
              message: 'Invalid request body',
            },
          },
        },
      },
    },
  },
};
export const getAllrolePermission = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['role/Permission'],
  summary: 'Fetch all roles with permission user',
  responses: {
    200: {
      description: 'List of roles with users',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                permissionId: '4',
                roleId: '3',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: [
                {
                  id: 1,
                  permissionId: '4',
                  roleId: '3',
                  createdAt: '2023-04-09T19:40:10.314Z',
                  updatedAt: '2023-04-11T19:40:10.314Z',
                },
              ],
              status: 200,
              message: 'Role with permission fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Role with permission not found',
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
              message: 'No roles found',
            },
          },
        },
      },
    },
  },
};

export const getrolePermissionById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['role/Permission'],
  summary: 'Fetch a role with permission by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the role with permission to fetch',
    },
  ],
  responses: {
    200: {
      description: 'Role with permission details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {},
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                permissionId: '4',
                roleId: '3',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-11T19:40:10.314Z',
              },
              status: 200,
              message: 'Role with user fetched successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'Role with user not found',
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
              message: 'Role assigned to user with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const updaterolePermissionById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['role/Permission'],
  summary: 'Update a role with permission by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the role with permission to update',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            permissionId: '4',
            roleId: '3',
          },
        },
        example: {
          permissionId: '4',
          roleId: '3',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Role with permission updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                permissionId: '4',
                roleId: '3',
              },
              status: { type: 'integer' },
              message: { type: 'string' },
            },
            example: {
              data: {
                id: 1,
                permissionId: '4',
                roleId: '3',
                createdAt: '2023-04-09T19:40:10.314Z',
                updatedAt: '2023-04-17T10:21:33.000Z',
              },
              status: 200,
              message: 'User with Role updated successfully',
            },
          },
        },
      },
    },
    404: {
      description: 'User with Role not found',
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
              message: 'Role with Permission with the given ID not found',
            },
          },
        },
      },
    },
  },
};
export const deleterolePermissionById = {
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: ['role/Permission'],
  summary: 'Delete a Role with Permission by ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'integer',
      },
      description: 'ID of the Role with permission to delete',
    },
  ],
  responses: {
    204: {
      description: 'Role with permission deleted successfully',
    },
    404: {
      description: 'Role with permission not found',
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
              message: 'Role with the given ID not found',
            },
          },
        },
      },
    },
  },
};
