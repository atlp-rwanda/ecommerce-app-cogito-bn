/**
 * @swagger
 * tags:
 *   name: Order Confirmation
 *   description: APIs for sending order confirmation emails
 *
 * /order/confirmation:
 *   post:
 *     summary: Send order confirmation email
 *     tags: [Order Confirmation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order to send confirmation for
 *               buyerEmail:
 *                 type: string
 *                 description: The email address of the buyer
 *             example:
 *               orderId: abc123
 *               buyerEmail: example@example.com
 *     responses:
 *       '200':
 *         description: Confirmation email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *               example:
 *                 code: 200
 *                 message: Confirmation email sent successfully
 *       '500':
 *         description: Failed to send confirmation email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *               example:
 *                 code: 500
 *                 message: Failed to send confirmation email
 *                 error: Internal server error
 */
