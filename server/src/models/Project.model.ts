import mongoose, { Schema, Document } from 'mongoose';

interface ILanguage {
  name: string;
  percent: number;
}

export interface IProject extends Document {
  portfolioId: mongoose.Types.ObjectId;
  githubRepoId: number;
  repoName: string;
  repoUrl: string;
  defaultBranch: string;
  displayTitle: string;
  displayDescription: string;
  coverImageUrl?: string;
  liveUrl?: string;
  isPinned: boolean;
  stars: number;
  forks: number;
  primaryLanguage?: string;
  languages: ILanguage[];
  lastCommitDate: Date;
  repoCreatedAt: Date;
  isIncluded: boolean;
  order: number;
  tags: string[];
  readmeExcerpt?: string;
  syncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: 'Portfolio',
      required: true,
    },
    githubRepoId: {
      type: Number,
      required: true,
    },
    repoName: {
      type: String,
      required: true,
    },
    repoUrl: {
      type: String,
      required: true,
    },
    defaultBranch: {
      type: String,
      default: 'main',
    },
    displayTitle: {
      type: String,
      required: true,
    },
    displayDescription: {
      type: String,
      default: '',
    },
    coverImageUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    primaryLanguage: {
      type: String,
    },
    languages: [
      {
        name: String,
        percent: Number,
      },
    ],
    lastCommitDate: {
      type: Date,
      required: true,
    },
    repoCreatedAt: {
      type: Date,
      required: true,
    },
    isIncluded: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    tags: [String],
    readmeExcerpt: {
      type: String,
    },
    syncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProjectSchema.index({ portfolioId: 1, order: 1 });
ProjectSchema.index({ portfolioId: 1, isPinned: -1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
