/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The order operations API
 */

/**
 * @swagger
 * /order/getStatus/{id}:
 *   get:
 *     summary: retrieve order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: accept-language
 *         required: false
 *         type: string
 *         enum: [de, en, es]
 *         description: Language preference for the response
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: order ID
 *     responses:
 *       201:
 *         description: status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Order does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 Error:
 *                   type: string
 */

/**
 * @swagger
 * /order/update/{id}:
 *   put:
 *     summary: update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: accept-language
 *         required: false
 *         type: string
 *         enum: [de, en, es]
 *         description: Language preference for the response
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               status: shipped
 *               deliveryDate: 2023-05-02T08:27:23.010Z
 *     responses:
 *       200:
 *         description: order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: The order is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 */
