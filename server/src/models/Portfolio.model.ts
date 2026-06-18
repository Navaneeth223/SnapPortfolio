import mongoose, { Schema, Document } from 'mongoose';

interface ILink {
  github: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
  resumeUrl?: string;
}

interface ISkill {
  name: string;
  category: 'language' | 'framework' | 'tool';
  proficiency: number;
}

interface ISection {
  id: string;
  isVisible: boolean;
  order: number;
}

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  subdomain: string;
  customDomain?: string;
  isPublished: boolean;
  template: 'monolith' | 'terminal' | 'gallery' | 'brutalist';
  accentColor: string;
  colorMode: 'light' | 'dark' | 'auto';
  fontPair: string;
  displayName: string;
  role: string;
  tagline: string;
  bio: string;
  location?: string;
  avatarUrl: string;
  links: ILink;
  skills: ISkill[];
  sections: ISection[];
  showContributionGraph: boolean;
  showGithubStats: boolean;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    customDomain: {
      type: String,
      unique: true,
      sparse: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
      enum: ['monolith', 'terminal', 'gallery', 'brutalist'],
      default: 'monolith',
    },
    accentColor: {
      type: String,
      default: '#FF5A1F',
    },
    colorMode: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light',
    },
    fontPair: {
      type: String,
      default: 'editorial',
    },
    displayName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    links: {
      github: { type: String, required: true },
      linkedin: String,
      twitter: String,
      website: String,
      email: String,
      resumeUrl: String,
    },
    skills: [
      {
        name: String,
        category: {
          type: String,
          enum: ['language', 'framework', 'tool'],
        },
        proficiency: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
    sections: [
      {
        id: String,
        isVisible: Boolean,
        order: Number,
      },
    ],
    showContributionGraph: {
      type: Boolean,
      default: true,
    },
    showGithubStats: {
      type: Boolean,
      default: true,
    },
    metaTitle: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
    },
    ogImageUrl: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PortfolioSchema.index({ subdomain: 1 });
PortfolioSchema.index({ customDomain: 1 });
PortfolioSchema.index({ userId: 1 });

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
