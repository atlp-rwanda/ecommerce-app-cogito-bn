/**
 * @swagger
 * /chat/messages/send:
 *   post:
 *     summary: Create a new chat message
 *     tags: [Chat]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *             example:
 *               "sender": "theo"
 *               "message": "how is everything"
 *     responses:
 *       201:
 *         description: Successful response. Returns the newly created message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Bad request. Returns an error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /chat/messages/all:
 *   get:
 *     summary: Get all chat messages
 *     tags: [Chat]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of chat messages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageListResponse'
 *               example:
 *                 "id": 5
 *                 "message": "how is everything"
 *                 "sender": "theo"
 *                 "createdAt": "2023-05-21T15:39:31.627Z"
 *                 "updatedAt": "2023-05-21T15:39:31.627Z"
 *       400:
 *         description: Bad request. Returns an error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
