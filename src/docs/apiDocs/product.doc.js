/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manage product APIs
 * /seller/items:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all items of a seller
 *     tags: [Products]
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
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manage product APIs
 * /buyer/items:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all items of a seller
 *     tags: [Products]
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

/**
 * @swagger
 * /products/buyer/{id}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Product Information by ID
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
 *         description: Succesfully Retrieved the Product from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving Product with ID from the database
 *       404:
 *         description: Product with the specified ID was not found
 */

/**
 * @swagger
 * /products/buyer2/{id}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Product Information by ID
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
 *         description: Succesfully Retrieved the Product from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving Product with ID from the database
 *       404:
 *         description: Product with the specified ID was not found
 */

/**
 * @swagger
 * /products/buyer:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get All Product Information
 *     tags: [Products]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved the Product from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving Product with ID from the database
 *       404:
 *         description: Product with the specified ID was not found
 */
