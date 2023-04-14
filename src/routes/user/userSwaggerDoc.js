/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         orders_id:
 *           type: string
 *           description: Orders ID
 *         wishlists_id:
 *           type: string
 *           description: Wishlist ID
 *         carts_id:
 *           type: string
 *           description: Carts ID
 *         firstName:
 *           type: string
 *           description: The First Name of your User
 *         lastName:
 *           type: string
 *           description: The Last Name of your User
 *         email:
 *           type: string
 *           description: The User email
 *         password:
 *           type: string
 *           description: The User password
 *         role:
 *           type: string
 *           description: User Role
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the User was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the User was updated
 *       example:
 *         id: 1
 *         orders_id: 1
 *         wishlists_id: 1
 *         carts_id: 1
 *         firstName: Agnes
 *         lastName: Kunda
 *         email: kundaaggy@gmail.com
 *         password: kunda123
 *         status: admin
 *         createdAt: 2023-03-13T15:35:35.582Z
 *         updatedAt: 2023-03-13T15:35:35.582Z
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Users API
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get All Users Registered
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Succesfully Retrieved all Users from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error in retrieving User from the database
 *
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User Log In
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User have Succesfully Signed in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Input Validation Error.
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Server error - User Login Failed.
 *
 */
