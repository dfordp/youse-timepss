import { createTask, deleteTaskById, getTasks, getTasksByUserId, updateTaskById } from "../mongodb/models/task.model";
import { Request, Response } from 'express';

export const getAllTasks= async (req: Request, res: Response): Promise<Response> => {

    try {
      const tasks = await getTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  
  export const getTaskByUserID= async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json({ message: 'No Id provided' });
          }

        const tasks = await getTasksByUserId(id);

      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const createNewTask = async (req: Request, res: Response) => {
    try {
      const { name , user_id, status, priority , dueDate } = req.body;
  
      if (!user_id || !user_id || !status || !priority || !dueDate || !name) {
        return res.status(400).json({ message: 'User ID, Plant ID, name and date of planting are required' });
      }
  
      const task = await createTask({  name , user_id, status, priority , dueDate });
  
      return res.status(201).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  

  export const deletetaskById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const deletedTask = await deleteTaskById(id);
      return res.json(deletedTask);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const updatePlant = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { name , user_id, status, priority , dueDate } = req.body;

      const updatedPlant = await updateTaskById(id, { name , user_id, status, priority , dueDate });
      return res.status(200).json(updatedPlant);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };