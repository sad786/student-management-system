import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';
import Task from '../models/Task';
import {Request, Response} from 'express';

interface AuthRequest extends Request {
  user?: any;
}

// Student Login
export const studentLogin = async (req:Request, res:Response):Promise<any> => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (!student) return res.status(401).json({ message: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.status(200).json({ token });
};

// Get Tasks
export const getTasks = async (req:AuthRequest, res:Response) => {
  try{
  const tasks = await Task.find({ studentId: req.user.id }).populate('studentId', 'name email');
  res.status(200).json(tasks);
  }catch(err){
    res.status(400).json({message:'Error ->'+err});
  }
};

// Update Task Status
export const updateTaskStatus = async (req:Request, res:Response):Promise<any> => {
  try{
      const { status } = await req.body;
      const taskId = req.params.taskId;


      const task = await Task.findById(taskId);
      if (!task) return res.status(404).json({ message: 'Task not found.' });

      task.status = status;
      await task.save();

      res.status(200).json({ message: 'Task status updated successfully.', task });
    }catch(err){
      res.status(400).json({message:'Error ->'+err});
    }
};
