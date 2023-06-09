/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first Name of your user
 *         lastName:
 *           type: string
 *           description: The last Name of your user
 *         email:
 *           type: string
 *           description: The user email
 *         status:
 *           type: string
 *           description: user Status
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the User was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the User was updated
 *       example:
 *         id: 2
 *         firstName: ntwari
 *         lastName: charles
 *         email: ntwarichar@gmail.com
 *         password: 12345
 *         status: ACTIVE
 */

// user signIn SWagger description

/**
 * @swagger
 * components:
 *   schemas:
 *     userUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         email:
 *           type: string
 *           description: The user status
 *       example:
 *         status: inactive
 */

/**
 * @swagger
 * tags:
 *   name: user
 *   description: The users API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get All users Registered
 *     tags: [user]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved all users from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Error in retrieving User from the database
 *
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get user Information by ID
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Get user By Id
 *         schema:
 *           type: string
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved user from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Error in retrieving user with ID from the database
 *       404:
 *         description: user with the specified ID was not found
 */

/**
 *  @swagger
 * /users/status/{id}:
 *  put:
 *    security:
 *     - bearerAuth: []
 *    summary: Update the user with the specified id
 *    tags: [user]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user you want to update
 *      - name: Accept-Language
 *        in: header
 *        description: Preferred language
 *        default: en
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/userUpdate'
 *    responses:
 *      200:
 *        description: The user was updated Succesfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userUpdate'
 *      500:
 *        description: user Update Error
 *      404:
 *        description: user with specified ID Not Available
 */
