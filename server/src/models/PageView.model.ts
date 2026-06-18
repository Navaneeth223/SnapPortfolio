import mongoose, { Schema, Document } from 'mongoose';

export interface IPageView extends Document {
  portfolioId: mongoose.Types.ObjectId;
  path: string;
  referrer?: string;
  country?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  date: Date;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: 'Portfolio',
      required: true,
    },
    path: {
      type: String,
      default: '/',
    },
    referrer: {
      type: String,
    },
    country: {
      type: String,
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes for analytics queries
PageViewSchema.index({ portfolioId: 1, date: -1 });
PageViewSchema.index({ portfolioId: 1, createdAt: -1 });

export const PageView = mongoose.model<IPageView>('PageView', PageViewSchema);
