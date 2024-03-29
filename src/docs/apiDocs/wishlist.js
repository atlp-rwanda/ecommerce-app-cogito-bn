/**
 * @swagger
 * tags:
 *  name: Wishlist
 *  description: Manage buyer's wishlist APIs
 * /wishlist:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Fetch buyer's wishlist
 *   tags: [Wishlist]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: Buyer's wishlist
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
 *                 message: "Wishlist fetched"
 */

/**
 * @swagger
 * /wishlist:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Add product to wishlist
 *   tags: [Wishlist]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                productId:
 *                  type: integer
 *              example:
 *                {
 *                   "productId": 1
 *                }
 *   responses:
 *    200:
 *      description: Product added to wishlist
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
 *                   {
 *                       "id": 1,
 *                       "productId": 1,
 *                       "userId": 1,
 *                       "updatedAt": "2023-04-26T05:27:37.617Z",
 *                       "createdAt": "2023-04-26T05:27:37.617Z"
 *                   }
 *                 status: 200
 *                 message: "Product added"
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: Empty buyer's wishlist
 *   tags: [Wishlist]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *   responses:
 *    200:
 *      description: Wishlist emptied successfully
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
 *    500:
 *      description: Error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 */

/**
 * @swagger
 * /wishlist/{id}:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: Deletes specific product from wishlist
 *   tags: [Wishlist]
 *   parameters:
 *     - name: Accept-Language
 *       in: header
 *       description: Preferred language
 *       default: en
 *       required: true
 *     - name: id
 *       in: path
 *       description: wishlist item id
 *       required: true
 *       schema:
 *           type: string
 *   responses:
 *    200:
 *      description: Product deleted successfully from wishlist
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
 *    500:
 *      description: Error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 */
