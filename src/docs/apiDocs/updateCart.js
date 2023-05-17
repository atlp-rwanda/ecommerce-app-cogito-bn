/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Manage Cart APIs
 * /cart/{id}:
 *  put:
 *   security:
 *     - bearerAuth: []
 *   summary: Update Cart item by ID as User
 *   tags: [Cart]
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
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                neededQuantity:
 *                  type: integer
 *                  example: 5
 *              required:
 *                - neededQuantity
 *   responses:
 *    200:
 *      description: Cart item updated successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                message:
 *                  type: string
 *                cart:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      price:
 *                        type: integer
 *                      quantity:
 *                        type: integer
 *                      totalPrice:
 *                        type: integer
 *                      image:
 *                        type: string
 *            example:
 *              message: "Cart item updated successfully"
 *              cart:
 *                - name: "Product 1"
 *                  price: 10
 *                  quantity: 5
 *                  totalPrice: 50
 *                  image: "product1.jpg"
 *    404:
 *      description: Cart item not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                message:
 *                  type: string
 *            example:
 *              message: "Cart item not found"
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                message:
 *                  type: string
 *            example:
 *              message: "You are not allowed to purchase more than {quantity} products"
 *    500:
 *      description: Updating cart failed
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *            example:
 *              status: "Failed to update cart item"
 *              message: "Internal Server Error"
 */
