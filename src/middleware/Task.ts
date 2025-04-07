import { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      Task: ITask
    }
  }
}