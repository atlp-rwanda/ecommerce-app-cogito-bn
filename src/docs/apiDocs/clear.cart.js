/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Manage product APIs
 * /cart/clear:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Clear cart
 *     tags: [Cart]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 seller_info:
 *                   $ref: '#/components/schemas/SellerInfo'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Product A
 *         price:
 *           type: number
 *           example: 10.99
 *         vendor_id:
 *           type: integer
 *           example: 1
 *     SellerInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 * 
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Unauthorized
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Internal server error
 */