import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updatedAvailability, updatedProduct } from "./handlers/product"
import { handleInputErrors } from "./middeleware"

const router = Router()

/**
 * @swagger
 * components:
 *        schemas:    
 *             Product:
 *                  type: object
 *                  properties:
 *                       id:
 *                           type: integer
 *                           description: The Product ID
 *                           example: 1
 *                       name:
 *                           type: string
 *                           description: The Product name
 *                           example: Monitor curvo de 49 pulgadas
 *                       price: 
 *                           type: number
 *                           description: The Product price
 *                           example: 300
 * 
 *                       availability: 
 *                           type: boolean
 *                           description: The Product availability
 *                           example: true
 */

/**
 * @swagger
 * /api/products:
 *     get:
 *        summary: Get a list of products
 *        tags: 
 *             - Products
 *        description: Return a lis of products
 *        responses: 
 *             200:
 *                  description: Successful response
 *                  content: 
 *                       application/json:
 *                            schema:  
 *                                 type: array
 *                                 items: 
 *                                      $ref: '#/components/schemas/Product'
 */

//routing
router.get('/', getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *       get:
 *           summary: Get a product by id
 *           tags: 
 *              - Products
 *           description: Return a product based on its unique ID
 *           parameters: 
 *             - in: path
 *               name: id
 *               description: The id of the product to retrieve
 *               required: true
 *               schema:
 *                  type: integer
 *           responses:
 *              200:
 *                  description: Successful response
 *                  content: 
 *                            application/json:
 *                                 schema:
 *                                      $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - Invalid id
 */

router.get('/:id', 
     
     param('id').isInt().withMessage('Id no valido'),
     handleInputErrors,
     getProductById
)

/**
 * @swagger
 * /api/products:
 *      post:
 *        summary: Creates a new product
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody:
 *             required: true
 *             content: 
 *                  application/json:
 *                       schema:
 *                            type: object
 *                            properties:
 *                                 name: 
 *                                    type: string
 *                                    example: 'Monitor curvo'
 *                                 price:
 *                                     type: number
 *                                     example: 399
 *        responses:
 *             201:
 *                  description: Product created successful
 *                  content:
 *                       application/json:
 *                            schema:
 *                                 $ref: '#/components/schemas/Product'
 *             400:  
 *                  description: Bad request - invalid input data
 * 
 */

router.post('/', 
     //validacion
     body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
     body('price')
          .isNumeric().withMessage('valor no valido')
          .notEmpty().withMessage('El precio del producto no puede ir vacio')
          .custom(value => value > 0).withMessage('Precio no valido'),
          
     handleInputErrors,     
     createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *        put:
 *           summary: Updates a product with user input
 *           tags: 
 *              - Products
 *           description: Returns the updated product
 *           parameters: 
 *             - in: path
 *               name: id
 *               description: The id of the product to retrieve
 *               required: true
 *               schema:
 *                  type: integer
 *           requestBody:
 *             required: true
 *             content: 
 *                  application/json:
 *                       schema:
 *                            type: object
 *                            properties:
 *                                 name: 
 *                                    type: string
 *                                    example: 'Monitor curvo'
 *                                 price:
 *                                     type: number
 *                                     example: 399
 *                                 availability:
 *                                      type: boolean
 *                                      example: true
 *           responses:
 *               200:
 *                  description: Successful response
 *                  content:
 *                       application/json:
 *                            schema:
 *                                 $ref: '#/components/schemas/Product'
 *               400:
 *                  description: Bad request - invalid id or invalid input data
 *               404:
 *                  description: Product not found
 */

router.put('/:id', 
     
     //validacion
     body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
     body('price')
          .isNumeric().withMessage('valor no valido')
          .notEmpty().withMessage('El precio del producto no puede ir vacio')
          .custom(value => value > 0).withMessage('Precio no valido'),
     body('availability')
          .isBoolean().withMessage('valor para disponibilidad no valido'),     
     
     handleInputErrors,     
     updatedProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *     patch:
 *        summary: update product availability
 *        tags:
 *            - Products
 *        description: Returns the updated availability
 *        parameters:
 *             - in: path
 *               name: id
 *               description: The id of the product to retrieve
 *               required: true
 *               schema:
 *                  type: integer
 *        responses:
 *               200:
 *                  description: Successful response
 *                  content:
 *                       application/json:
 *                            schema:
 *                                 $ref: '#/components/schemas/Product'
 *               400:
 *                  description: Bad request - invalid id
 *               404:
 *                  description: Product not found
 */

router.patch('/:id', 
     
     param('id').isInt().withMessage('Id no valido'),
     handleInputErrors,     
     updatedAvailability
)


/**
 * @swagger
 * /api/products/{id}:
 *     delete:
 *        summary: Deletes a product by a given id
 *        tags:
 *            - Products
 *        description: Returns a cofirmation message
 *        parameters:
 *             - in: path
 *               name: id
 *               description: The id of the product to retrieve
 *               required: true
 *               schema:
 *                  type: integer
 *        responses:
 *               200:
 *                  description: Successful response
 *                  content:
 *                       application/json:
 *                            schema:
 *                                 type: string
 *                                 value: 'Producto eliminado'
 *               400:
 *                  description: Bad request - invalid id
 *               404:
 *                  description: Product not found
 */

router.delete('/:id', 
     
     param('id').isInt().withMessage('Id no valido'),
     handleInputErrors,     
     deleteProduct
)

export default router