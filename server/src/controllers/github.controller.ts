import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/User.model';
import { Portfolio } from '../models/Portfolio.model';
import { Project } from '../models/Project.model';
import { getCachedGitHubData, cacheGitHubData } from '../config/redis';

export async function syncGitHub(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.accessToken) {
      return res.status(400).json({ error: 'GitHub not connected' });
    }

    // Check rate limiting (max once per 10 minutes)
    const cacheKey = `github:sync:${req.userId}`;
    const lastSync = await getCachedGitHubData(cacheKey);

    if (lastSync) {
      return res.status(429).json({
        error: 'Please wait 10 minutes between syncs',
      });
    }

    // TODO: Implement actual GitHub sync
    // 1. Fetch data from GitHub using user.accessToken
    // 2. Update Portfolio and Projects
    // 3. Cache the sync timestamp

    await cacheGitHubData(cacheKey, Date.now(), 600); // 10 minutes

    await User.findByIdAndUpdate(req.userId, {
      lastGithubSync: new Date(),
    });

    res.json({ message: 'GitHub sync completed' });
  } catch (error) {
    console.error('Error syncing GitHub:', error);
    res.status(500).json({ error: 'Failed to sync GitHub' });
  }
}

export async function getGitHubRepos(req: AuthRequest, res: Response) {
  try {
    const projects = await Project.find({
      portfolioId: req.params.portfolioId,
    }).sort({ order: 1 });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching repos:', error);
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
}
