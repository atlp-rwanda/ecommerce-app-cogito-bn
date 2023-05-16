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
*         description: Successful response. Confirmation email sent.
*       400:
*         description: Bad request. Returns an error message.
*/
