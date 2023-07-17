/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Manage role APIs
 * /role:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Create a new role
 *   tags: [Role]
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
 *             roleName:
 *               type: string
 *             description:
 *               type: string
 *           example:
 *             roleName: "Admin"
 *             description: "Manage roles"
 *   responses:
 *    201:
 *      description: Role created successfully
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
 *                         "roleName": "Admin",
 *                         "description": "Manage roles",
 *                         "createdAt": "2023-04-22T10:30:00.000Z",
 *                         "updatedAt": "2023-04-22T10:30:00.000Z"
 *                    }
 *                 status: 201
 *                 message: "Role created successfully"
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
 *  name: Role
 *  description: Manage role APIs
 * /role:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Fetch all roles
 *   tags: [Role]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: Roles list
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
 *                        roleName:
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
 *                             "roleName": "Admin",
 *                             "description": "Manage roles",
 *                             "createdAt": "2023-04-09T19:40:10.314Z",
 *                             "updatedAt": "2023-04-09T19:40:10.314Z"
 *                         },
 *                         {
 *                             "id": 2,
 *                             "roleName": "User",
 *                             "description": "Regular user",
 *                             "createdAt": "2023-04-09T19:42:20.216Z",
 *                             "updatedAt": "2023-04-09T19:42:20.216Z"
 *                         }
 *                     ]
 *                 status: 200
 *                 message: "Roles fetched successfully"
 */

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Manage role APIs
 * /role/{id}:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Fetch user role by ID
 *   tags: [Role]
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
 *      description: User role
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
 *                             "roleName": "Admin",
 *                             "description": "Manage roles",
 *                             "createdAt": "2023-04-09T19:40:10.314Z",
 *                             "updatedAt": "2023-04-09T19:40:10.314Z"
 *                         }
 *                     ]
 *                 status: 200
 *                 message: "role fetched successfully"
 *    404:
 *      description: role not found
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
 *                 message: "role with the id 1 does not exist"
 *
 */

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Blog managing APIs
 * /role/{id}:
 *  put:
 *   security:
 *     - bearerAuth: []
 *   summary: Updating user role
 *   tags: [Role]
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
 *                roleName:
 *                  type: string
 *                description:
 *                  type: string
 *
 *              example:
 *                {
 *                    "roleName": "Admin",
 *                    "description": "description",
 *
 *                }
 *   responses:
 *    200:
 *      description: Update user role
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
 *                 message: "role update successfully"
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
 *  name: Role
 *  description: Manage role APIs
 * /role/{id}:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: Delete a role by ID
 *   tags: [Role]
 *   parameters:
 *     - name: id
 *       in: path
 *       description: ID of the role to be deleted
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
 *      description: Role deleted successfully
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
 *                 message: Role deleted successfully
 *    404:
 *      description: Role not found
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
 *                 message: Role not found
 */

/**
 * @swagger
 * tags:
 *  name: userRole
 *  description: Manage role APIs
 * /setrole:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Assign role to user
 *   tags: [userRole]
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
 *             userId:
 *               type: integer
 *             roleId:
 *               type: integer
 *             description:
 *               type: string
 *           example:
 *              {
 *                  "userId":4,
 *                  "roleId":1
 *
 *              }
 *   responses:
 *    201:
 *      description: Role Assigned to User successfully
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
 *                 status: 201
 *                 message: "Role Assignes to User successfully"
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
