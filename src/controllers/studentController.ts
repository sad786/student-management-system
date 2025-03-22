import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';
import Task from '../models/Task';
import {Request, Response} from 'express';

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
export const getTasks = async (req:Request, res:Response) => {
  const tasks = await Task.find({ studentId: req.body['user'].id }).populate('studentId', 'name email');
  res.status(200).json(tasks);
};

// Update Task Status
export const updateTaskStatus = async (req:Request, res:Response):Promise<any> => {
  const { taskId, status } = await req.body;

  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found.' });

  task.status = status;
  await task.save();

  res.status(200).json({ message: 'Task status updated successfully.', task });
};