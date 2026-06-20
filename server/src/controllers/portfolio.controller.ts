import { Request, Response } from 'express';
import { Portfolio } from '../models/Portfolio.model';
import { AuthRequest } from '../middleware/auth.middleware';

export async function getPortfolio(req: AuthRequest, res: Response) {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
}

export async function updatePortfolio(req: AuthRequest, res: Response) {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
}

export async function publishPortfolio(req: AuthRequest, res: Response) {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      {
        $set: {
          isPublished: true,
          publishedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error publishing portfolio:', error);
    res.status(500).json({ error: 'Failed to publish portfolio' });
  }
}
