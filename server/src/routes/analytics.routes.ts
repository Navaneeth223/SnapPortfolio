import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { trackView, getAnalytics } from '../controllers/analytics.controller';

const router = Router();

// Public route for tracking (no auth required)
router.post('/track', trackView);

// Protected route for viewing analytics
router.get('/me', authenticateToken, getAnalytics);

export default router;
