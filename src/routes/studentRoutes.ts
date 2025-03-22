import express from 'express';
import { authenticateStudent } from '../middleware/authMiddleware';
import { studentLogin, getTasks, updateTaskStatus } from '../controllers/studentController';

const router = express.Router();

router.post('/login', studentLogin);
router.get('/tasks', authenticateStudent, getTasks);
router.put('/tasks/:taskId', authenticateStudent, updateTaskStatus);

export default router;