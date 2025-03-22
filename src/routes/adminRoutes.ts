import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { adminLogin, addStudent, assignTask } from '../controllers/adminController';

const router = express.Router();

// Admin Login
router.post('/login', adminLogin);

// Add Student (Protected Route)
router.post('/students/add', authenticateAdmin, addStudent);

// Assign Task (Protected Route)
router.post('/tasks/add', authenticateAdmin, assignTask);

export default router;
