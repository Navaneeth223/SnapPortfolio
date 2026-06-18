import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface IUser extends Document {
  githubId?: string;
  githubUsername?: string;
  googleId?: string;
  name: string;
  email: string;
  avatar: string;
  accessToken?: string;
  plan: 'free' | 'pro';
  planExpiresAt?: Date;
  lastGithubSync?: Date;
  createdAt: Date;
  updatedAt: Date;
  encryptToken(token: string): string;
  decryptToken(encryptedToken: string): string;
}

const UserSchema = new Schema<IUser>(
  {
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubUsername: {
      type: String,
      sparse: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    planExpiresAt: {
      type: Date,
    },
    lastGithubSync: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Encryption methods
UserSchema.methods.encryptToken = function (token: string): string {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'utf-8');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
};

UserSchema.methods.decryptToken = function (encryptedToken: string): string {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'utf-8');

  const parts = encryptedToken.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

export const User = mongoose.model<IUser>('User', UserSchema);
