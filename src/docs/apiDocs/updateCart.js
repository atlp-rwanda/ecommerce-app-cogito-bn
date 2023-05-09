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
 *
 *     - name: productId
 *       in: path
 *       description: ID of the product
 *       required: true
 *       schema:
 *         type: integer
 *     - name: body
 *       in: body
 *       description: Request body
 *       required: true
 *       schema:
 *         type: object
 *         required:
 *           - neededQuantity
 *         properties:
 *           neededQuantity:
 *             type: integer
 *             description: Quantity needed to be updated
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
 *                Message:
 *                  type: string
 *            example:
 *              Message: "The remaining quantity in stock is 3"
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
