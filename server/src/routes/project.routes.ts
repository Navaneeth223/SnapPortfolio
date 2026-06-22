import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  getProjects,
  updateProject,
  reorderProjects,
} from '../controllers/project.controller';

const router = Router();

router.get('/', authenticateToken, getProjects);
router.patch('/:id', authenticateToken, updateProject);
router.post('/reorder', authenticateToken, reorderProjects);

export default router;
