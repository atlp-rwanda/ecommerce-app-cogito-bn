/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category_id
 *         - vendor_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated product ID
 *         name:
 *           type: string
 *           description: The product's name
 *         category_id:
 *           type: number
 *           description: The id of the category in which the product beongs to
 *         vendor_id:
 *           type: number
 *           description: The id of the vendor whom the product belongs to
 *         description:
 *           type: string
 *           description: The product description
 *         image:
 *           type: array
 *           description: The product's images
 *         price:
 *           type: number
 *           description: The product's price
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *         stock:
 *           type: string
 *           enum:
 *              - In Stock
 *              - Out of Stock
 *              - Expired
 *           description: The product stock status
 *         expiryDate:
 *           type: date
 *           description: The expiration date of the product
 *         available:
 *           type: boolean
 *           description: The user's role must be user, vendor, or admin
 *       example:
 *         name: Laptop
 *         vendor_id: 90
 *         description: MacBook Pro
 *         category_id: 3
 *         image: [image1, image2, image3, image4]
 *         price: 250.79
 *         quantity: 100
 *         stock: In Stock
 *         expiryDate: 2035-03-27
 *         available: true
 */

/**
 * @swagger
 * tags:
 *   name: Products Availability
 *   description: The user operations API
 */

/**
 * @swagger
 * /product/availability:
 *   post:
 *     summary: Changes product availability due to different reasons like being out of stock
 *     tags: [Products Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: accept-language
 *         required: false
 *         type: string
 *         enum: [de, en, es]
 *         description: Language preference for the response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               productId: 10
 *               vendorId: 20
 *               stockStatus: Out of Stock
 *     responses:
 *       200:
 *         description: product availability status changed successfully
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
 *       400:
 *         description: The user needs to provide seller id and product Id to change product status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: The product user is trying to update does not exist
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
