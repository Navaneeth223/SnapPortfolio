# SnapPortfolio Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** (Download from [nodejs.org](https://nodejs.org))
- **pnpm** (Install: `npm install -g pnpm`)
- **MongoDB** (Local or MongoDB Atlas account)
- **Redis** (Local or Upstash account)
- **GitHub OAuth App** (Create at [github.com/settings/developers](https://github.com/settings/developers))

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd snapportfolio

# Install frontend dependencies
pnpm install

# Install backend dependencies
cd server
pnpm install
cd ..
```

### 2. Environment Setup

Create `.env.local` in the root directory:

```env
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32

# GitHub OAuth (Create at github.com/settings/developers)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth (Optional - Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database
MONGODB_URI=mongodb://localhost:27017/snapportfolio

# Redis
REDIS_URL=redis://localhost:6379

# Cloudinary (Sign up at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Encryption (Generate with: openssl rand -hex 16)
ENCRYPTION_KEY=your-32-character-encryption-key
```

Create `.env` in the `server/` directory with the same values.

### 3. GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: SnapPortfolio Local
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local`

### 4. MongoDB Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB locally (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Your URI: mongodb://localhost:27017/snapportfolio
```

#### Option B: MongoDB Atlas (Cloud)

1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string and add to `.env.local`

### 5. Redis Setup

#### Option A: Local Redis

```bash
# Install Redis (macOS with Homebrew)
brew install redis

# Start Redis
brew services start redis

# Your URI: redis://localhost:6379
```

#### Option B: Upstash (Cloud)

1. Sign up at [upstash.com](https://upstash.com)
2. Create a Redis database
3. Copy connection string to `.env.local`

### 6. Run the Application

Open **two terminal windows**:

**Terminal 1 - Frontend:**
```bash
pnpm dev
```

**Terminal 2 - Backend:**
```bash
cd server
pnpm dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## 🧪 Testing the App

1. Open http://localhost:3000
2. Enter a GitHub username (e.g., `octocat`)
3. Click "Generate"
4. Watch the generation animation
5. Explore the generated portfolio

## 🏗️ Project Structure

```
snapportfolio/
├── app/                    # Next.js pages
│   ├── (marketing)/       # Landing page
│   ├── (auth)/           # Login
│   ├── (app)/            # Dashboard & Editor
│   └── p/[username]/     # Public portfolios
├── components/
│   ├── marketing/        # Landing components
│   ├── portfolio-templates/  # 4 templates
│   └── ui/              # shadcn components
├── server/              # Express backend
│   └── src/
│       ├── models/      # MongoDB models
│       ├── controllers/
│       └── routes/
└── lib/                 # Utilities & GitHub API
```

## 🎨 Available Templates

1. **Monolith** - Minimal, typography-led
2. **Terminal** - Developer-flavored with terminal aesthetics
3. **Gallery** - Visual-first masonry grid
4. **Brutalist** - Bold, high-contrast design

## 🔧 Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### MongoDB Connection Error

- Check if MongoDB is running: `brew services list`
- Verify connection string in `.env.local`
- Ensure IP is whitelisted (for Atlas)

### Redis Connection Error

- Check if Redis is running: `redis-cli ping` (should return PONG)
- Verify Redis URL in `.env.local`

## 📚 Next Steps

1. **Setup NextAuth** - Uncomment auth code in `lib/auth.ts`
2. **Implement API Routes** - Add controllers and routes in `server/src/`
3. **Build Editor** - Complete the split-screen editor UI
4. **Add Analytics** - Implement view tracking
5. **Deploy** - Deploy to Vercel (frontend) + your choice for backend

## 🤝 Need Help?

- Check the main [README.md](./README.md)
- Review the code comments
- Open an issue on GitHub

## 📄 License

MIT License - see LICENSE file
