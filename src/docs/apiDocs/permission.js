/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Manage Permission APIs
 * /permission:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Create a new Permission
 *   tags: [Permission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             PermissionName:
 *               type: string
 *             description:
 *               type: string
 *           example:
 *             PermissionName: "Admin"
 *             description: "Manage Permissions"
 *   responses:
 *    201:
 *      description: Permission created successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    {
 *                         "id": 1,
 *                         "PermissionName": "Admin",
 *                         "description": "Manage Permissions",
 *                         "createdAt": "2023-04-22T10:30:00.000Z",
 *                         "updatedAt": "2023-04-22T10:30:00.000Z"
 *                    }
 *                 status: 201
 *                 message: "Permission created successfully"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */

/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Manage Permission APIs
 * /permission:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Fetch all Permissions
 *   tags: [Permission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: Permissions list
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                        id:
 *                          type: integer
 *                        PermissionName:
 *                          type: string
 *                        description:
 *                          type: string
 *                        createdAt:
 *                          type: string
 *                        updatedAt:
 *                          type: string
 *            example:
 *                 "data":
 *                    [
 *                         {
 *                             "id": 1,
 *                             "PermissionName": "Admin",
 *                             "description": "Manage Permissions",
 *                             "createdAt": "2023-04-09T19:40:10.314Z",
 *                             "updatedAt": "2023-04-09T19:40:10.314Z"
 *                         },
 *                         {
 *                             "id": 2,
 *                             "PermissionName": "User",
 *                             "description": "Regular user",
 *                             "createdAt": "2023-04-09T19:42:20.216Z",
 *                             "updatedAt": "2023-04-09T19:42:20.216Z"
 *                         }
 *                     ]
 *                 status: 200
 *                 message: "Permissions fetched successfully"
 */

/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Manage Permission APIs
 * /permission/{id}:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Fetch user Permission by ID
 *   tags: [Permission]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: The ID of a user to return.
 *       schema:
 *         type: integer
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: User Permission
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    [
 *                         {
 *                             "id": 1,
 *                             "PermissionName": "Admin",
 *                             "description": "Manage Permissions",
 *                             "createdAt": "2023-04-09T19:40:10.314Z",
 *                             "updatedAt": "2023-04-09T19:40:10.314Z"
 *                         }
 *                     ]
 *                 status: 200
 *                 message: "Permission fetched successfully"
 *    404:
 *      description: Permission not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    []
 *                 status: 404
 *                 message: "Permission with the id 1 does not exist"
 *
 */

/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Blog managing APIs
 * /permission/{id}:
 *  put:
 *   security:
 *     - bearerAuth: []
 *   summary: Updating user Permission
 *   tags: [Permission]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: The id of a user to be updated.
 *       schema:
 *         type: integer
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                PermissionName:
 *                  type: string
 *                description:
 *                  type: string
 *
 *              example:
 *                {
 *                    "PermissionName": "Admin",
 *                    "description": "description",
 *
 *                }
 *   responses:
 *    200:
 *      description: Update user Permission
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: array
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    [
 *                         {
 *                             "id": 1,
 *                             "name": "Admin",
 *                             "email": "manage user",
 *                             "createdAt": "2023-04-09T19:40:10.314Z",
 *                             "updatedAt": "2023-04-11T19:40:10.314Z"
 *                         }
 *                     ]
 *                 status: 200
 *                 message: "Permission update successfully"
 *    422:
 *      description: Unprocessable Entity
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                status:
 *                  type: integer
 *                errors:
 *                  type: array
 *            example:
 *                status: 422
 *                errors:
 *                   [
 *                       {
 *                           "field": "name",
 *                           "message": "\"name\" must be a string"
 *                       },
 *                       {
 *                           "field": "email",
 *                           "message": "\"email\" must be a valid email"
 *                       }
 *                   ]
 */

/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Manage Permission APIs
 * /permission/{id}:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: Delete a Permission by ID
 *   tags: [Permission]
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID of the Permission to be deleted
 *       required: true
 *       schema:
 *         type: integer
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    204:
 *      description: Permission deleted successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 data: {}
 *                 status: 204
 *                 message: Permission deleted successfully
 *    404:
 *      description: Permission not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 data: {}
 *                 status: 404
 *                 message: Permission not found
 */

/**
 * @swagger
 * tags:
 *  name: rolePermission
 *  description: Manage role with permission APIs
 * /setpermission:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Assign permission to specific role
 *   tags: [rolePermission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             roleId:
 *               type: integer
 *             permissionId:
 *               type: integer
 *           example:
 *             permissionId:4
 *             roleId:1
 *   responses:
 *    201:
 *      description: Permission Assigned to Role successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    {
 *                         "id": 1,
 *                         "permissionId":4,
 *                         "roleId":1,
 *                         "createdAt": "2023-04-22T10:30:00.000Z",
 *                         "updatedAt": "2023-04-22T10:30:00.000Z"
 *                    }
 *                 status: 201
 *                 message: "Permission Assigned to Role successfully"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */

/**
 * @swagger
 * tags:
 *  name: rolePermission
 *  description: Manage role APIs
 * /roles/permissions:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Retrieve user role information
 *   tags: [rolePermission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: User role information retrieved successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    {
 *                         "id": 1,
 *                         "userId":4,
 *                         "roleId":1,
 *                         "createdAt": "2023-04-22T10:30:00.000Z",
 *                         "updatedAt": "2023-04-22T10:30:00.000Z"
 *                    }
 *                 status: 200
 *                 message: "User role information retrieved successfully"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */
/**
 * @swagger
 * tags:
 *  name: rolePermission
 *  description: Manage role APIs
 * /roles/permissions/{id}:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Retrieve user role information by ID
 *   tags: [rolePermission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *     - name: id
 *       in: path
 *       description: ID of the user role
 *       required: true
 *       schema:
 *         type: integer
 *   responses:
 *    200:
 *      description: User role information retrieved successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    {
 *                         "id": 1,
 *                         "permissionId":4,
 *                         "roleId":1,
 *                         "createdAt": "2023-04-22T10:30:00.000Z",
 *                         "updatedAt": "2023-04-22T10:30:00.000Z"
 *                    }
 *                 status: 200
 *                 message: "role with permission information retrieved successfully"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */
/**
 * @swagger
 * tags:
 *  name: rolePermission
 *  description: Manage role APIs
 * /roles/permissions/{id}:
 *  put:
 *   security:
 *     - bearerAuth: []
 *   summary: Update user role information by ID
 *   tags: [rolePermission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *     - name: id
 *       in: path
 *       description: ID of the role with permission
 *       required: true
 *       schema:
 *         type: integer
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             permissionId:
 *               type: integer
 *             roleId:
 *               type: integer
 *             description:
 *               type: string
 *           example:
 *             permissionId:4
 *             roleId:2
 *   responses:
 *    200:
 *      description: role with permission information updated successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data":
 *                    {
 *                         "id": 1,
 *                         "permissionId":4,
 *                         "roleId":2,
 *                         "createdAt": "2023-04-22T10:30:00.000Z",
 *                         "updatedAt": "2023-04-22T10:35:00.000Z"
 *                    }
 *                 status: 200
 *                 message: "User role information updated successfully"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */
/**
 * @swagger
 * tags:
 *  name: rolePermission
 *  description: Manage role with permission APIs
 * /roles/permissions/{id}:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: Delete role with permission information by ID
 *   tags: [rolePermission]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *     - name: id
 *       in: path
 *       description: ID of the role with permission
 *       required: true
 *       schema:
 *         type: integer
 *   responses:
 *    204:
 *      description: role with permission information deleted successfully
 *    404:
 *      description: role with permission not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 404
 *                 message: "role with permission not found"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                data:
 *                  type: object
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *            example:
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */
