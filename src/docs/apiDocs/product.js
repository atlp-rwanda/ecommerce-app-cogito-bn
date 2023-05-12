/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Seller adding product
 * /products/add:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Create a new Product
 *   tags: [Products]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             image:
 *               type: array
 *               items:
 *                 type: string
 *                 format: binary
 *             price:
 *               type: string
 *             quantity:
 *               type: string
 *             stock:
 *               type: string
 *             category_id:
 *               type: integer
 *             expiredAt:
 *               type: string
 *               format: date-time
 *           example:
 *             name: Laptop
 *             description: MacBook Pro
 *             images:
 *              [
 *               - binary_image_data_1
 *               -binary_image_data_2;
 *               -binary_image_data_3;
 *               -binary_image_data_4;
 *              ]
 *             price: 600$
 *             quantity: 1
 *             stock: In Stock
 *             category_id: 1
 *             expiredAt: '2030-04-22T10:30:00.000Z'
 *   responses:
 *    201:
 *      description: Product created successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *              data:
 *                type: object
 *              message:
 *                type: string
 *            example:
 *              status: 201
 *              data:
 *                id: 1
 *                name: Laptop
 *                description: MacBook Pro
 *                image: image
 *                price: 600$
 *                stock: In Stock
 *                expiredAt: '2030-04-22T10:30:00.000Z'
 *                createdAt: '2023-04-22T10:30:00.000Z'
 *                updatedAt: '2023-04-22T10:30:00.000Z'
 *              message: Product added successfully
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *              status:
 *                type: integer
 *              message:
 *                type: string
 *            example:
 *              data: {}
 *              status: 400
 *              message: Bad request
 */
