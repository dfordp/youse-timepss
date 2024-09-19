import mongoose from "mongoose";

export interface IUser {
  name: string;
  user_id: string;
  status : string;
  priority : string;
}

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, required: true, enum: ["To do" , "In Progress" , "Completed"] },
  priority: { type: String, required: true, enum: ["Low","Medium", "High"] },
  dueDate : {type: Date , required : false },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;

// Task Actions
export const getTasks = () => Task.find();
export const getTaskById = (id: string) => Task.findById(id);
export const createTask = (values: any) => {
  console.log('Creating task with values:', values);
  return new Task(values).save()
    .then((task) => task.toObject())
    .catch((error) => {
      console.error('Error creating task:', error);
      throw error;
    });
};
export const updateTaskById = (id: string, values: Partial<any>) => {
  return Task.findByIdAndUpdate(id, values, { new: true });
};
export const getTasksByUserId = (userId: string) => {
  return Task.find({ user_id: userId });
};
export const deleteTaskById = (id: string) => {
  return Task.findByIdAndDelete(id)
    .then((task) => {
      if (task) {
        console.log('Task deleted:', task);
        return task.toObject();
      } else {
        console.log('Task not found');
        return null;
      }
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
      throw error;
    });
};