import { z } from 'zod';

export const projectSchema = z.object({
  displayTitle: z.string().min(1, 'Title is required').max(100),
  displayDescription: z.string().max(500).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).max(10),
  isPinned: z.boolean(),
  isIncluded: z.boolean(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
