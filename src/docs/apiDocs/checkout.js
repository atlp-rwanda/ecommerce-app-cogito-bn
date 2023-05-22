/**
 * @swagger
 * /checkout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Process the checkout and create an order
 *     description: |
 *       This endpoint processes the checkout for a user, creates an order in the database,
 *       and initiates the payment process. It requires the user to be authenticated.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the authenticated user.
 *                 example: 123
 *     responses:
 *       200:
 *         description: OK - Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   description: The created order object.
 *       400:
 *         description: Bad Request - An order has already been processed for the user.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Order has already been processed
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User not authenticated
 *       404:
 *         description: Not Found - Cart not found or empty, User not found, or Products not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Cart not found
 *     produces:
 *       - application/json
 */

/**
 * @swagger
 * /checkout/pay:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Process payment for an order
 *     description: |
 *       This endpoint processes the payment for an order using the provided payment details.
 *       It requires the order ID, card details, and authentication as a buyer with the appropriate role.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *                 description: The ID of the order to be paid.
 *                 example: 123
 *               cardNumber:
 *                 type: string
 *                 description: The card number for payment.
 *                 example: 4242424242424242
 *               expMonth:
 *                 type: integer
 *                 description: The expiration month of the card.
 *                 example: 12
 *               expYear:
 *                 type: integer
 *                 description: The expiration year of the card.
 *                 example: 2024
 *               cvc:
 *                 type: string
 *                 description: The CVC/CVV code of the card.
 *                 example: 123
 *     responses:
 *       200:
 *         description: OK - Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: Payment successful
 *                 confirmation:
 *                   type: object
 *                   properties:
 *                     orderNumber:
 *                       type: integer
 *                       description: The order number.
 *                       example: 123
 *                     totalCost:
 *                       type: number
 *                       description: The total cost of the order.
 *                       example: 99.99
 *                     expectedDeliveryDate:
 *                       type: string
 *                       description: The expected delivery date of the order.
 *                       example: 2023-05-20
 *       400:
 *         description: Bad Request - Invalid request body or order already paid
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid request body
 *       403:
 *         description: Forbidden - Unauthorized access or buyer does not have the required role
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized access
 *       404:
 *         description: Not Found - Order not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Order not found
 *     produces:
 *       - application/json
 */
