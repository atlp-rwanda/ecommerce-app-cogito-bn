/**
 * @swagger
 * tags:
 *   name: SEARCH
 *   description: Allows the user to search for a product
 */
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for products
 *     tags:
 *       - SEARCH
 *     description: Returns a list of products that match the specified criteria.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the product to search for.
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: The description of the product to search for.
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: The price of the product to search for.
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: A list of products that match the specified criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: The specified product was not found.
 *       '500':
 *         description: An error occurred while processing the request.
 */
