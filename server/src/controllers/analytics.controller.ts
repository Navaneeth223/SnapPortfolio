import { Request, Response } from 'express';
import { PageView } from '../models/PageView.model';
import { Portfolio } from '../models/Portfolio.model';
import { AuthRequest } from '../middleware/auth.middleware';

export async function trackView(req: Request, res: Response) {
  try {
    const { portfolioId, path, referrer, userAgent } = req.body;

    // Parse device type from user agent
    const device = getDeviceType(userAgent);

    // Get country from IP (would use a service like MaxMind)
    const country = getCountryFromIP(req.ip);

    await PageView.create({
      portfolioId,
      path: path || '/',
      referrer: referrer || 'Direct',
      country,
      device,
      date: new Date(),
    });

    // Return 204 No Content (fire-and-forget)
    res.status(204).send();
  } catch (error) {
    console.error('Error tracking view:', error);
    // Don't fail the request if analytics fails
    res.status(204).send();
  }
}

export async function getAnalytics(req: AuthRequest, res: Response) {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    const period = parseInt(req.query.period as string) || 7; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    // Total views
    const totalViews = await PageView.countDocuments({
      portfolioId: portfolio._id,
      createdAt: { $gte: startDate },
    });

    // Views by day
    const viewsByDay = await PageView.aggregate([
      {
        $match: {
          portfolioId: portfolio._id,
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top referrers
    const topReferrers = await PageView.aggregate([
      {
        $match: {
          portfolioId: portfolio._id,
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$referrer',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Device breakdown
    const deviceBreakdown = await PageView.aggregate([
      {
        $match: {
          portfolioId: portfolio._id,
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$device',
          count: { $sum: 1 },
        },
      },
    ]);

    // Top countries
    const topCountries = await PageView.aggregate([
      {
        $match: {
          portfolioId: portfolio._id,
          createdAt: { $gte: startDate },
          country: { $ne: null },
        },
      },
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalViews,
      viewsByDay,
      topReferrers,
      deviceBreakdown,
      topCountries,
      period,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}

function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  if (!userAgent) return 'desktop';

  const ua = userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }

  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'mobile';
  }

  return 'desktop';
}

function getCountryFromIP(ip: string | undefined): string | undefined {
  // TODO: Implement IP to country lookup
  // Use a service like MaxMind GeoIP2 or ipapi.co
  return undefined;
}
