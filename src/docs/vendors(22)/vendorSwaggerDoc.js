/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       required:
 *         - userId
 *         - businessName
 *         - businessAddress
 *         - businessPhoneNumber
 *         - businessEmail
 *         - businessWebsite
 *         - businessDescription
 *         - businessLogo
 *         - productCategories
 *         - paymentMethods
 *         - status
 *       properties:
 *         userId:
 *           type: integer
 *           description: UserId mapped from the users table
 *         businessName:
 *           type: string
 *           description: Business Name
 *         businessAddress:
 *           type: array
 *           description: Business Address
 *         businessPhoneNumber:
 *           type: string
 *           description: Business Phone Number
 *         businessEmail:
 *           type: string
 *           description: Business Email
 *         businessWebsite:
 *           type: string
 *           description: Business Website
 *         businessDescription:
 *           type: string
 *           description: Vendor Business Description
 *         businessLogo:
 *           type: string
 *           description: Vendor Business Logo
 *         productCategories:
 *           type: array
 *           description: Product Categoriesthe vendor will offer
 *         paymentMethods:
 *           type: array
 *           description: Vendor Business Payment Methods
 *         status:
 *           type: string
 *           description: Vendor Status
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the Vendor was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the Vendor was updated
 *       example:
 *         userId: 1
 *         businessName: "ITH"
 *         businessAddress: ["KN 48B ST, KG 192 St B"]
 *         businessPhoneNumber: "+250781346188"
 *         businessEmail: "ith.querries@gmail.com"
 *         businessWebsite: "http://www.ith.com"
 *         businessDescription: "We are the Number One Wholesale company of all IT related product"
 *         businessLogo: "https://www.pexels.com/photo/photo-of-computers-near-windows-3747481/"
 *         productCategories: [1,3]
 *         paymentMethods: [1,2,3]
 *         status: "active"
 */

// Vendor Login SWagger description

/**
 * @swagger
 * components:
 *   schemas:
 *     VendorLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The Vendor email
 *         password:
 *           type: string
 *           description: The Vendor password
 *       example:
 *         email: ndahayosibertin17@gmail.com
 *         password: NDABer123
 *
 */

/**
 * @swagger
 * tags:
 *   name: Vendor
 *   description: The Vendors API
 */

/**
 * @swagger
 * /vendors/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get All Vendors Registered
 *     tags: [Vendor]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved all Vendors from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       500:
 *         description: Error in retrieving Vendor from the database
 *
 */

/**
 * @swagger
 * /vendors/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new Vendor
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       201:
 *         description: Succesfully created a new Vendor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Input Validation Error.
 *       409:
 *         description: Vendor with this email already exists.
 *       500:
 *         description: Vendor Creation Error
 */

/**
 * @swagger
 * /vendors/login:
 *   post:
 *     summary: Vendor Log In
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorLogin'
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Vendor have Succesfully Signed in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VendorLogin'
 *       400:
 *         description: Input Validation Error.
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Server error - Vendor Login Failed.
 *
 */

/**
 * @swagger
 * /vendors/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Vendor Information by ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Get Vendor By Id
 *         schema:
 *           type: string
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved the Vendor from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       500:
 *         description: Error in retrieving Vendor with ID from the database
 *       404:
 *         description: Vendor with the specified ID was not found
 */

/**
 *  @swagger
 * /vendors/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Vendor with the specified id
 *    tags: [Vendor]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the Vendor you want to update
 *      - name: Accept-Language
 *        in: header
 *        description: Preferred language
 *        default: en
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vendor'
 *    responses:
 *      200:
 *        description: The Vendor was updated Succesfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vendor'
 *      500:
 *        description: Vendor Update Error
 *      404:
 *        description: Vendor with specified ID Not Available
 */

/**
 *  @swagger
 * /vendors/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete the Vendor with the specified id
 *    tags: [Vendor]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the Vendor you want to delete
 *      - name: Accept-Language
 *        in: header
 *        description: Preferred language
 *        default: en
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vendor'
 *    responses:
 *      200:
 *        description: The Vendor was deleted Successfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vendor'
 *      500:
 *        description: Vendor delete Error
 *      404:
 *        description: Vendor with specified ID Not Available
 */
