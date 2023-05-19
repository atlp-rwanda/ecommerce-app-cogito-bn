/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User Management APIs
 * /updatepassword/{id}:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/UpdateUserPasswordRequest"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/UpdateUserPasswordResponse"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/ErrorResponse"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/ErrorResponse"
 * definitions:
 *   UpdateUserPasswordRequest:
 *     type: object
 *     properties:
 *       old_password:
 *         type: string
 *       new_password:
 *         type: string
 *       confirm_password:
 *         type: string
 *     required:
 *       - old_password
 *       - new_password
 *       - confirm_password
 *   UpdateUserPasswordResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *     example:
 *       message: Password updated successfully
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *     example:
 *       message: Unauthorized
 */
