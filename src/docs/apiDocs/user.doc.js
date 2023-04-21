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
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated user ID
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         role:
 *           type: string
 *           description: The user's role must be user, vendor, or admin
 *       example:
 *         id: 1092
 *         firstName: John
 *         lastName: Doe
 *         email: john@gmail.com
 *         password: $2b$10$2wf.EnA8/taKGcG3O/DxqefTFhRzqSXzWv.gr5kB672xAMb46dP4m
 *         phone: +250791324567
 *         role: user
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user operations API
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: john@gmail.com
 *               password: $2b$10$2wf.EnA8/taKGcG3O/DxqefTFhRzqSXzWv.gr5kB672xAMb46dP4m
 *     responses:
 *       200:
 *         description: The user logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 token:
 *                   type: string
 *       401:
 *         description: The user did not provide their email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 */
