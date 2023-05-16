/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Manage buyer's Cart APIs
 * /cart:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Fetch buyer's items inside a cart
 *   tags: [Cart]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: Buyer's cart
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
 *                 data:
 *                  [
 *                      {
 *                          "id": 1,
 *                          "userId": 1,
 *                          "productId": 1,
 *                          "createdAt": "2023-04-26T05:27:37.617Z",
 *                          "updatedAt": "2023-04-26T05:27:37.617Z",
 *                          "product":
 *                          {
 *                              "id": 1,
 *                              "name": "Potatoes",
 *                              "description": null,
 *                              "image": null,
 *                              "price": null,
 *                              "category_id": 1,
 *                              "createdAt": "2023-04-26T05:26:22.136Z",
 *                              "updatedAt": "2023-04-26T05:26:22.136Z"
 *                          }
 *                      }
 *                  ]
 *                 status: 200
 *                 message: "Cart items fetched"
 */
