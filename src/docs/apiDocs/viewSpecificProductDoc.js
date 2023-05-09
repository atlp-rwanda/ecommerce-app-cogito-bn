/**
 * @swagger
 * tags:
 *  name: Products
 *  description: APIs for managing products
 * /user/products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language for response messages
 *         schema:
 *           type: string
 *           default: en
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   $ref: '#/components/schemas/Product'
 *                 status:
 *                   type: string
 *                   example: success
 *         examples:
 *           default:
 *             value:
 *               item:
 *                 id: 1
 *                 name: Example Product
 *                 description: This is an example product.
 *                 price: 19.99
 *                 available: true
 *               status: success
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request
 *                 status:
 *                   type: string
 *                   example: fail
 *         examples:
 *           default:
 *             value:
 *               status: fail
 *               message: Bad request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not allowed to perform this operation.
 *                 status:
 *                   type: string
 *                   example: fail
 *         examples:
 *           default:
 *             value:
 *               status: fail
 *               message: You are not allowed to perform this operation.
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found.
 *                 status:
 *                   type: string
 *                   example: fail
 *         examples:
 *           default:
 *             value:
 *               status: fail
 *               message: Product not found.
 */
