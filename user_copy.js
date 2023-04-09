/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              -firstName
 *              -lastName
 *              -email
 *              -password
 *              -phone
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto generated user id
 *              firstName:
 *                  type: string
 *                  description: the user's first name
 *              lastname:
 *                  type: string
 *                  description: the user's last name
 *              email:
 *                  type: string
 *                  description: the user's email
 *              password:
 *                  type: string
 *                  description: the user's password
 *              phone:
 *                  type: string
 *                  description: the user's phone number
 *             role:
 *                  type: string
 *                  description: the user's role must be user, vendor, or admin
 *          example:
 *              id: 1092
 *              firstName: John
 *              lastname: Doe
 *              email: john@gmail.com
 *              password: $2b$10$2wf.EnA8/taKGcG3O/DxqefTFhRzqSXzWv.gr5kB672xAMb46dP4m
 *              phone: +250791324567
 *              role: user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The user operations API
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Authenticate user email and password
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  example:
 *                      email: john@gmail.com
 *                      password: $2b$10$2wf.EnA8/taKGcG3O/DxqefTFhRzqSXzWv.gr5kB672xAMb46dP4m
 *      responses:
 *          200:
 *              description: The user logged in successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                              token:
 *                                  type: string
 *          400:
 *              description: The user did not provide their email or password
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *          401:
 *              description: The user provided incorrect password or they are not registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 */

/**
 * @swagger
 * /users/sendOtp:
 *   get:
 *      summary: Send OTP message to the user email after logging in
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: The OTP was sent to the user's email successfully
 *              headers:
 *                  Set-Cookie:
 *                      description: Authentication cookie
 *                      schema:
 *                          type: string
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *          401:
 *              description: The user is not registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *          500:
 *              description: The email with OTP was not sent successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              Error:
 *                                  type: string
 */

/**
 * @swagger
 * /users/verify:
 *   get:
 *      summary: verify if the OTP provided by the user matches the one that was sent to their email
 *      tags: [Users]
 *      security:
 *              - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  example:
 *                      otp: 111111
 *      responses:
 *          200:
 *              description: The OTP was successfully verified
 *              headers:
 *                  Set-Cookie:
 *                      description: Authentication cookie
 *                      schema:
 *                          type: string
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                              token:
 *                                  type: string
 *          400:
 *              description: The OTP was not provided in the request body
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 *          401:
 *              description: The OTP is invalid
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                              message:
 *                                  type: string
 */
