/**
 * @swagger
 * components:
 *   schemas:
 *     category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated category ID
 *         image:
 *           type: string
 *           description: The category cover image
 *       example:
 *         id: 1000
 *         name: Kids
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The products category operations API
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: gets all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *       404:
 *         description: No categories found
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
 *                 Error:
 *                   type: string
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: gets all products in a category
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: wishlist item id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products in category retrieved successfully
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
 *                 Error:
 *                   type: string
 */
