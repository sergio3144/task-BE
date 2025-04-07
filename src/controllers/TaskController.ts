import Task from '../models/Task';
import { NextFunction, Request, Response } from "express"
import { TaskSchema } from '../models/Task';

export class TaskController {
  static createTask = async (req: Request, res: Response) => {

    const newTask = new Task(req.body)
    const taskExist = await Task.find({  })

    const taskExistDB = taskExist.some((task) => task.name === newTask.name)

    
    try {

      if(taskExistDB) {
        const error = new Error(`La tarea con el nombre ${ newTask.name } ya existe`)
        res.status(409).json({
          error: error.message
        })
        return
      }

      await newTask.save()
      res.status(201).send({
        message: 'Tarea creada correctamente'
      })
    } catch (error) {
      console.log(error)
    }
  }

  static getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({  })
      res.json({
        tasks: tasks
      })
    } catch (error) {
      console.log(error)
    }
  }

  static getTaskById = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

      const task = await Task.findById(id)

      if(!task) {
        const error = new Error('Tarea no encontrada')
        res.status(404).json({
          error: error.message
        })

        return
      }

      res.json(task)
      return
    } catch (error) {
      console.log(error)
    }
  }

  static deleteTask = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
      const task = await Task.findById(id)
      if(!task) {
        const error = new Error('Tarea no encontrada')
        res.status(404).json({
          error: error.message
        })
        return
      }

      await task.deleteOne()
      res.send({
        message: `Tarea ${task.name} eliminada`
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  static updateTask = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
      const task = await Task.findByIdAndUpdate(id, req.body)

      if(!task) {
        const error = new Error('Tarea no encontrada')
        res.status(404).json({ error: error.message })
        return
      }

      await task.save()
      res.send({
        message: `Tarea ${task.name} actualizada correctamente`
      })

    } catch (error) {
      console.log(error)
    }
  }

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body
      const { id } = req.params

      const validStatuses = ['pending', 'in-progress', 'completed'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ message: `Estado no válido, pueden ser los valores ${validStatuses.map((value) => `${value}`)}` });
        return
      }

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )
      
      if (!updatedTask) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return
      }
      
      res.send({
        message: 'Tarea actualizada'
      })

    } catch (error) {
      console.log(error)
    }
  }
}