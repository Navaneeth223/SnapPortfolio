import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  getPortfolio,
  updatePortfolio,
  publishPortfolio,
} from '../controllers/portfolio.controller';

const router = Router();

router.get('/me', authenticateToken, getPortfolio);
router.patch('/me', authenticateToken, updatePortfolio);
router.post('/me/publish', authenticateToken, publishPortfolio);

export default router;
