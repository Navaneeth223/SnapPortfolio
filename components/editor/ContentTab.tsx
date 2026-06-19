'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEditorStore } from '@/hooks/useEditorStore';
import { Sparkles, Trash2, GripVertical } from 'lucide-react';
import { SectionList } from './SectionList';

const contentSchema = z.object({
  displayName: z.string().min(1, 'Name is required').max(50),
  role: z.string().min(1, 'Role is required').max(100),
  tagline: z.string().max(200).optional(),
  bio: z.string().max(1000).optional(),
  location: z.string().max(100).optional(),
  email: z.string().email().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
});

type ContentFormData = z.infer<typeof contentSchema>;

export function ContentTab() {
  const { portfolio, updatePortfolio } = useEditorStore();

  const { register, formState: { errors }, watch } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      displayName: portfolio?.displayName || '',
      role: portfolio?.role || '',
      tagline: portfolio?.tagline || '',
      bio: portfolio?.bio || '',
      location: portfolio?.location || '',
      email: portfolio?.links?.email || '',
      linkedin: portfolio?.links?.linkedin || '',
      twitter: portfolio?.links?.twitter || '',
      website: portfolio?.links?.website || '',
    },
  });

  // Watch all fields and update store on change
  const watchedFields = watch();
  
  const handleFieldChange = (field: keyof ContentFormData, value: string) => {
    if (field === 'email' || field === 'linkedin' || field === 'twitter' || field === 'website') {
      updatePortfolio({
        links: {
          ...portfolio?.links,
          github: portfolio?.links?.github || '',
          [field]: value,
        },
      });
    } else {
      updatePortfolio({ [field]: value });
    }
  };

  const bioLength = watchedFields.bio?.length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Content</h2>
        <p className="text-sm text-text-secondary">
          Edit your portfolio information
        </p>
      </div>

      {/* Hero Section */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          Hero Section
        </h3>

        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            {...register('displayName')}
            onChange={(e) => handleFieldChange('displayName', e.target.value)}
            placeholder="Jane Doe"
          />
          {errors.displayName && (
            <p className="text-xs text-red-500 mt-1">{errors.displayName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Role / Title</Label>
          <Input
            id="role"
            {...register('role')}
            onChange={(e) => handleFieldChange('role', e.target.value)}
            placeholder="Full Stack Developer"
          />
          {errors.role && (
            <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tagline">
            Tagline
            <span className="text-text-muted ml-1">(optional, ~60 chars)</span>
          </Label>
          <Input
            id="tagline"
            {...register('tagline')}
            onChange={(e) => handleFieldChange('tagline', e.target.value)}
            placeholder="Building beautiful web experiences"
            maxLength={200}
          />
          <p className="text-xs text-text-muted mt-1">
            {watchedFields.tagline?.length || 0}/200
          </p>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register('location')}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </section>

      {/* About / Bio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
            About / Bio
          </h3>
          <Button variant="ghost" size="sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>

        <div>
          <Textarea
            {...register('bio')}
            onChange={(e) => handleFieldChange('bio', e.target.value)}
            placeholder="Tell visitors about yourself, your experience, and what you're passionate about..."
            rows={6}
            maxLength={1000}
          />
          <p className={`text-xs mt-1 ${bioLength > 400 ? 'text-orange-500' : 'text-text-muted'}`}>
            {bioLength}/1000 {bioLength > 400 && '(Shorter bios get read more)'}
          </p>
        </div>
      </section>

      {/* Links */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          Links
        </h3>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            {...register('linkedin')}
            onChange={(e) => handleFieldChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/janedoe"
          />
        </div>

        <div>
          <Label htmlFor="twitter">Twitter / X</Label>
          <Input
            id="twitter"
            {...register('twitter')}
            onChange={(e) => handleFieldChange('twitter', e.target.value)}
            placeholder="https://twitter.com/janedoe"
          />
        </div>

        <div>
          <Label htmlFor="website">Personal Website</Label>
          <Input
            id="website"
            {...register('website')}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            placeholder="https://janedoe.com"
          />
        </div>
      </section>

      {/* Section Visibility & Order */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          Section Visibility & Order
        </h3>
        <p className="text-xs text-text-muted">
          Drag to reorder, toggle to show/hide sections
        </p>
        <SectionList />
      </section>
    </div>
  );
}
