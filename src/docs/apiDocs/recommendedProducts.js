/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - name
 *         - category_id
 *         - orders_id
 *         - wishlists_id
 *         - carts_id
 *         - vendor_id
 *         - description
 *         - image
 *         - price
 *         - quantity
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Product
 *         name:
 *           type: string
 *           description: The Name of your Product
 *         category_id:
 *           type: string
 *           description: Category Id of the product
 *         orders_id:
 *           type: string
 *           description: Image ID of the produc
 *         wishlists_id:
 *           type: string
 *           description: Wishlist ID of the product
 *         carts_id:
 *           type: string
 *           description: Carts Id of the product
 *         vendor_id:
 *           type: string
 *           description: Vendor Id of the Vendor
 *         description:
 *           type: string
 *           description: The description of the product
 *         image:
 *           type: string
 *           description: Image link of the product
 *         price:
 *           type: string
 *           description: Price of the product
 *         quantity:
 *           type: string
 *           description: Quantity of the product
 *         stock:
 *           type: string
 *           description: Product stock status
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the Product was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the Product was updated
 *       example:
 *         id: 1
 *         name: Laptop
 *         category_id: 1
 *         orders_id: 1
 *         wishlist_id: 1
 *         carts_id: ITH
 *         vendor_id: 1
 *         description: MacBook Pro
 *         image: https://www.pexels.com/photo/photo-of-computers-near-windows-3747481/
 *         price: 500$
 *         quantity: 50
 *         stock: IN Stock
 *         createdAt: 2023-03-13T15:35:35.582Z
 *         updatedAt: 2023-03-13T15:35:35.582Z
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Recommended Products API
 */

/**
 * @swagger
 * /products/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get All Products
 *     tags: [Products]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved all Products from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving Product from the database
 *
 */

/**
 * @swagger
 * /products/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new Product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       201:
 *         description: Succesfully created a new Product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       400:
 *         description: Input Validation Error.
 *       409:
 *         description: Product was already registered.
 *       500:
 *         description: Product Registration failed
 */

/**
 * @swagger
 * /products/{id}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Product Information by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enter Product Id
 *         schema:
 *           type: string
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved the Product from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving Product with ID from the database
 *       404:
 *         description: Product with the specified ID was not found
 */

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Product with the specified id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Enter the ID of the Product you want to update
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
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        description: The Product was updated Succesfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      403:
 *        description: Forbidden.
 *      500:
 *        description: Product Update Error
 *      404:
 *        description: Product with specified ID Not Available
 */

/**
 *  @swagger
 * /products/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete the Product with the specified id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the Product you want to delete
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
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        description: The Product was deleted Successfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      403:
 *        description: Forbidden.
 *      500:
 *        description: Product delete Error
 *      404:
 *        description: Product with specified ID Not Available
 */

/**
 * @swagger
 * /products/recommended/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Recommended products to the user
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enter the user ID
 *         schema:
 *           type: string
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfully Retrieved recommended products of the user with the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: User with this ID is not registered.
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving Product with ID from the database
 */

/**
 * @swagger
 * /products/viewed/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get All Products You have Viewed
 *     tags: [Products]
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Preferred language
 *         default: en
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved all data in product views table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       403:
 *         description: Forbidden.
 *       500:
 *         description: Error in retrieving products viewed from the database
 *
 */
