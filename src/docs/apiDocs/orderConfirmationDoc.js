/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order-related endpoints
 */

/**
 * @swagger
 * /send-confirmation/{orderId}:
 *   post:
 *     summary: Send order confirmation email
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to send confirmation email for
 *     responses:
 *       200:
 *         description: Confirmation email sent successfully
 *       400:
 *         description: Bad request or order is not paid
 *       500:
 *         description: Internal server error
 *     security:
 *       - apiKey: []
 */
