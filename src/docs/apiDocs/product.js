/**
 * @swagger
 * tags:
 *  name: Product
 *  description: seller adding product
 * /products/add:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Create a new Product
 *   tags: [Product]
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
 *             image1:
 *               type: string
 *               format: binary
 *               Description: image 1
 *             image2:
 *               type: string
 *               format: binary
 *               Description: image 2
 *             image3:
 *               type: string
 *               format: binary
 *               Description: image 3
 *             image4:
 *               type: string
 *               format: binary
 *               Description: image 4
 *             price:
 *               type: string
 *             quantity:
 *               type: string
 *             stock:
 *               type: string
 *             categoryId:
 *               type: integer
 *             expiryDate:
 *               type: date
 *           example:
 *             name: Laptop
 *             description: MacBook Pro
 *             image: imge
 *             price: 600$
 *             quantity: 1
 *             stock: In Stock
 *             category_id: 1
 *             vendor_id: 1
 *             expiryDate: '2030-04-22T10:30:00.000Z'
 *   responses:
 *    201:
 *      description: product created successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                status:
 *                  type: integer
 *                data:
 *                  type: object
 *                message:
 *                  type: string
 *            example:
 *                 status: 201
 *                 data:
 *                    {
 *                         id: 1,
 *                         name: Laptop,
 *                         description: MacBook Pro,
 *                         image: image,
 *                         price: 600$,
 *                         stock: In Stock,
 *                         expiredAt: '2030-04-22T10:30:00.000Z',
 *                         createdAt: '2023-04-22T10:30:00.000Z',
 *                         updatedAt: '2023-04-22T10:30:00.000Z'
 *                    }
 *                 message: Product added successfully
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
 *                 data: {}
 *                 status: 400
 *                 message: Bad request
 */
