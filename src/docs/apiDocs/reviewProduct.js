/**
 * @swagger
 * tags:
 *  name: Review product
 *  description: Review product managing APIs
 * /review:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Review a product
 *   tags: [Review product]
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
 *                productId:
 *                  type: integer
 *                rating:
 *                  type: integer
 *                review:
 *                  type: string
 *              example:
 *                {
 *                    "productId": 1,
 *                    "rating": 2,
 *                    "message": "Good product",
 *                }
 *   responses:
 *    200:
 *      description: Review product
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
 *                 "data":
 *                    [
 *                         {
 *                             "productId": 1,
 *                             "rating": 2,
 *                             "review": "Good product",
 *                         }
 *                     ]
 *                 status: 200
 *                 message: "Review added"
 *    422:
 *      description: Unprocessable Entity
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                status:
 *                  type: integer
 *                errors:
 *                  type: array
 *            example:
 *                status: 422
 *                errors:
 *                   [
 *                       {
 *                           "field": "review",
 *                           "message": "\"review\" must be a text"
 *                       },
 *                       {
 *                           "field": "rating",
 *                           "message": "\"rating\" must be an integer"
 *                       }
 *                   ]
 */
