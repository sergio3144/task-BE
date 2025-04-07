import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string,
  description: string,
  status: TaskStatus
}

export const TaskSchema : Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  description: {
    type: String,
    trim: true,
    require: true
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  }
}, { timestamps: true })

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task