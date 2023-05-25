/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       required:
 *         - coupon_code
 *         - discount_type
 *         - vendor_id
 *         - start_date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated coupon ID
 *         coupon_code:
 *           type: string
 *           description: The coupon code
 *         discount_type:
 *           type: string
 *           description: The type of discount coupon
 *           enum:
 *              - Percentage
 *              - Flat discount
 *         discount_amount:
 *           type: number
 *           description: The amount discounted on a product if it is a flat discount
 *         discount_percentage:
 *           type: number
 *           description: The percentage discount on a product if it is a percentage discount
 *         minimum_purchase_amount:
 *           type: number
 *           description: The least number of products a user should buy to get a discount
 *         vendor_id:
 *           type: number
 *           description: The id of the vendor who added the coupon
 *         associated_products:
 *           type: array
 *           description: The list of all products eligible for the discount
 *         start_date:
 *           type: date
 *           description: The date on which the coupon will start to be used
 *         end_date:
 *           type: date
 *           description: The expiration date of the coupon
 *         usage_limit:
 *           type: integer
 *           description: The maximum number of times the coupon can be used
 *         usage_count:
 *           type: integer
 *           description: The number of times the coupon have been used
 *       example:
 *         id: 1
 *         coupon_code: "Cogito1000"
 *         discount_type: Percentage
 *         discount_percentage: 20
 *         minimum_purchase_amount: 1
 *         vendorId: 2
 *         associated_products: [3]
 *         start_date: 2023-08-09
 *         end_date: 2023-08-15
 *         usage_limit: 20
 */

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: The vendor's coupons operations API
 */

/**
 * @swagger
 * /coupon/create:
 *   post:
 *     summary: creates a coupon
 *     tags: [Coupons]
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
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: Coupon created successfully
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
 *       401:
 *         description: The seller is trying to add coupon to a product which doesn't belong to them
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       409:
 *         description: The coupon already exists
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
 * /coupon/sellerCoupons:
 *   post:
 *     summary: get all coupons created by a vendor
 *     tags: [Coupons]
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
 *               vendorId: 1
 *     responses:
 *       200:
 *         description: Retrieved all coupons created by the seller successfully
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
 *         description: The seller has no coupons
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

/**
 * @swagger
 * /coupon/update:
 *   put:
 *     summary: creates a coupon
 *     tags: [Coupons]
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
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: Coupon updated successfully
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
 *                   schema:
 *                     $ref: '#/components/schemas/Coupon'
 *       401:
 *         description: The seller is trying to add coupon to a product which doesn't belong to them
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       409:
 *         description: The coupon code the seller is trying to update to already exists
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
 * /coupon/checkout:
 *   post:
 *     summary: Use coupon during checkout by buyer
 *     tags: [Coupons]
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
 *               coupon_code: cogito
 *               totalPrice: 1048000
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 newPrice:
 *                   type: number
 *                 totalDeductedAmount:
 *                   type: number
 *                 newProductsPrices:
 *                   type: array
 *       404:
 *         description: Coupon entered by user does not exist
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
