import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { githubSyncLimiter } from '../middleware/rateLimiter.middleware';
import { syncGitHub, getGitHubRepos } from '../controllers/github.controller';

const router = Router();

router.post('/sync', authenticateToken, githubSyncLimiter, syncGitHub);
router.get('/repos/:portfolioId', authenticateToken, getGitHubRepos);

export default router;
