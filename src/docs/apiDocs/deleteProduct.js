/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Manage Product APIs
 * /product/{id}:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: Delete Product information by ID as Seller
 *   tags: [Products]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *     - name: id
 *       in: path
 *       description: ID of the product
 *       required: true
 *       schema:
 *         type: integer
 *   responses:
 *    204:
 *      description: product deleted successfully
 *    404:
 *      description: product id not found
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
 *                 "data": {}
 *                 status: 404
 *                 message: "product id not found"
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
 *                 "data": {}
 *                 status: 400
 *                 message: "Bad request"
 */
