/**
 * @swagger
 * components:
 *   schemas:
 *     Add Product To Cart:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - product_id
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: Cart ID
 *         user_id:
 *           type: string
 *           description: The User ID
 *         product_id:
 *           type: string
 *           description: The Product ID
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the Cart was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the Cart was updated
 *       example:
 *         id: 1
 *         user_id: 1
 *         product_id: 1
 *         quantity: 50
 *         createdAt: 2023-03-13T15:35:35.582Z
 *         updatedAt: 2023-03-13T15:35:35.582Z
 */

/**
 * @swagger
 * /products/cart/add/{id}:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add Product To Cart of the Logged in buyer
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enter Product Id
 *         schema:
 *           type: string
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Added the product to cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Add Product To Cart'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Server Error in adding the  Product to cart
 *       404:
 *         description: Product with the specified ID was not found or is not available
 */
