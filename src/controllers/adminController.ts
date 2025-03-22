import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';
import Task from '../models/Task';
import { Request, Response } from 'express';

// Admin Login
export async function adminLogin (req:Request, res:Response): Promise<any>  {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.status(200).json({ token });
};

// Add Student
export const addStudent = async (req:Request, res:Response) => {
  try{
  const { name, email, department, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const student = new Student({ name, email, department, password: hashedPassword });

  await student.save();
  res.status(201).json({ message: 'Student added successfully.', student });
  }catch(err){
    res.status(400).json({message:'Error ->'+err});
  }
};

// Assign Task
export const assignTask = async (req:Request, res:Response) => {
  try{
    const { studentId, title, description, dueDate } = req.body;

    const task = new Task({ studentId, title, description, dueDate });
    await task.save();

    res.status(201).json({ message: 'Task assigned successfully.', task });
  }catch(err){
    res.status(400).json({message:'Error ->'+err});
  }
};
