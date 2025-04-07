import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { HandleInputErrors } from "../middleware/Validation";
import { body, param } from "express-validator";

const router = Router()

/**
*  @swagger
*  components:
*    schemas:
*      Task:
*        type: object
*        properties:
*          _id: 
*            name:
*            type: string
*            description: The Product ID
*            example: 67f3eadd30629a334e04c535
*          name:
*            type: string
*            description: The Product name
*            example: Realizar actividad deportiva
*          description: 
*            type: string
*            description: The Product description
*            example: Tiempo esperado para completar la tarea
*          status: 
*            type: string
*            description: The Product status
*            example: pending
*    
*/



router.post("/task", 
  body('name')
  .notEmpty().withMessage('El nombre es obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción es obligatoria'),
  HandleInputErrors, 
  TaskController.createTask
)

/**
 * @swagger
 * /api/task:
 *    post:
 *      summary: Creates a new task
 *      tags:
 *        - Tasks
 *      description: Returns a new record in the database
 *      requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:  
 *                  type: string,
 *                  example: Realizar actividad deportiva
 *                description:  
 *                  type: string,
 *                  example: Tiempo esperado para completar la tarea
 *      responses:
 *        201:
 *          description: Successful Response
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Task'
 *        400:
 *          description: Bad Request - Invalid input
 *        409:
 *          description: Conflic - Task exist
 *                
 */

router.get("/tasks", HandleInputErrors, TaskController.getAllTasks)

/**
 * @swagger
 * /api/tasks:
 *    get: 
 *      summary: Get a list tasks
 *      tags: 
 *        - Tasks
 *      description: Return a list of tasks
 *      responses: 
 *        200: 
 *          description: Successful response
 *          content: 
 *            application/json:
 *              schema: 
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Task'
 *  
 *
 */ 

router.get("/task/:id", 
  param('id').isMongoId().withMessage("ID no válido"),
  HandleInputErrors, 
  TaskController.getTaskById
)

/**
 * @swagger
 * /api/task/{id}:
 *    get: 
 *      summary: Get a task by ID
 *      tags: 
 *          - Tasks
 *      description: Get a product based on its unique ID
 *      parameters: 
 *          - in: path
 *            name: id
 *            description: Get a product unique ID
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        200:
 *          description: Successful Response
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Task'
 *        404:
 *          description: Not found
 *        400:
 *          description: Bad Request - Invalid ID
 */ 

router.delete("/task/:id", 
  param('id').isMongoId().withMessage("ID no válido"),
  HandleInputErrors, 
  TaskController.deleteTask
)

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a product by a given ID
 *     tags:
 *       - Tasks
 *     description: Returns a confirmation message
 *     parameters: 
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *              type: string
 *     responses: 
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *                schema:
 *                    type: string
 *                    value: 'Producto eliminado'
 *        404:
 *          description: Not found
 *        400:
 *          description: Bad Request - Invalid ID or Invalid input data
 */ 



router.put("/task/:id", 
  param('id').isMongoId().withMessage("ID no válido"),
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  HandleInputErrors, 
  TaskController.updateTask
)

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags:
 *       - Tasks
 *     description: Returns the updated product
 *     parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: string
 *     requestBody: 
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:  
 *                  type: string,
 *                  example: Realizar actividad deportiva
 *                description:  
 *                  type: string,
 *                  example: Tiempo esperado para completar la tarea
 *     responses: 
 *        200:
 *          description: Successful Response
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Task'
 *        404:
 *          description: Not found
 *        400:
 *          description: Bad Request - Invalid ID or Invalid input data
 */ 


router.post("/task/:id/status", 
  param('id').isMongoId().withMessage("ID no válido"),
  body('status')
    .notEmpty().withMessage('El estado es obligatorio'),
  HandleInputErrors, 
  TaskController.updateStatus
)

/**
 * @swagger
 * /api/task/{id}/status:
 *    post:
 *      summary: Updated status by task
 *      tags:
 *        - Tasks
 *      description: Returns a new status task
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *             type: string
 *      requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: in-progress
 *      responses:
 *        200:
 *          description: Successful Response
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Task'
 *        400:
 *          description: Bad Request - Invalid input
 *         
 */

export default router