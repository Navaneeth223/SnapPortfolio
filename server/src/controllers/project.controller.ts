import { Response } from 'express';
import { Project } from '../models/Project.model';
import { Portfolio } from '../models/Portfolio.model';
import { AuthRequest } from '../middleware/auth.middleware';

export async function getProjects(req: AuthRequest, res: Response) {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    const projects = await Project.find({
      portfolioId: portfolio._id,
    }).sort({ order: 1 });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
}

export async function reorderProjects(req: AuthRequest, res: Response) {
  try {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds must be an array' });
    }

    // Update order field for each project
    const updatePromises = orderedIds.map((id, index) =>
      Project.findByIdAndUpdate(id, { order: index })
    );

    await Promise.all(updatePromises);

    res.json({ message: 'Projects reordered successfully' });
  } catch (error) {
    console.error('Error reordering projects:', error);
    res.status(500).json({ error: 'Failed to reorder projects' });
  }
}
