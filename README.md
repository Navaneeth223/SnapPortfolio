# SnapPortfolio

**GitHub to Portfolio in 30 Seconds** 🚀

Turn your GitHub repos into a beautiful, customizable portfolio site. No manual data entry. No drag-and-drop builder. Just GitHub in, polished portfolio out.

[![Status](https://img.shields.io/badge/status-90%25%20complete-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Node](https://img.shields.io/badge/node-20%2B-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/typescript-5.4-blue)]()

[Live Demo](#) • [Setup Guide](./SETUP.md) • [Deploy Now](./DEPLOYMENT.md) • [Contributing](./CONTRIBUTING.md)

## 🎯 Features

- **Instant Generation**: Paste your GitHub username and get a complete portfolio
- **Four Unique Templates**: Monolith, Terminal, Gallery, and Brutalist designs
- **Live Customization**: Real-time preview as you edit
- **Auto-Sync**: Pull latest repos, languages, and contribution data from GitHub
- **Custom Domains**: Use your own domain (Pro)
- **Analytics**: Track portfolio views and visitor stats
- **Zero Config**: No environment setup needed to get started

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **React Query** for server state
- **Zustand** for editor state
- **shadcn/ui** components

### Backend
- **Express.js** + TypeScript
- **MongoDB** + Mongoose
- **Redis** for caching
- **Octokit** for GitHub API
- **NextAuth.js** for authentication

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)
- MongoDB instance
- Redis instance
- GitHub OAuth App

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snapportfolio.git
   cd snapportfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   cd server && pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials:
   - GitHub OAuth credentials
   - MongoDB URI
   - Redis URL
   - NextAuth secret
   - Encryption key

4. **Start the development servers**
   
   Terminal 1 (Frontend):
   ```bash
   pnpm dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   cd server && pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
snapportfolio/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Landing, pricing, templates
│   ├── (auth)/           # Login/signup
│   ├── (app)/            # Generator (authenticated)
│   └── p/[username]/     # Public portfolio pages
├── components/
│   ├── marketing/        # Landing page components
│   ├── editor/          # Portfolio editor UI
│   ├── portfolio-templates/  # The 4 portfolio templates
│   ├── shared/          # Reusable components
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── github/          # GitHub API integration
│   ├── utils.ts
│   └── constants.ts
├── server/              # Express backend
│   └── src/
│       ├── models/     # MongoDB models
│       ├── controllers/
│       ├── routes/
│       └── middleware/
├── types/              # TypeScript definitions
└── hooks/              # Custom React hooks
```

## 🎨 Templates

### Monolith
Minimal, typography-led design with generous whitespace. Perfect for backend developers and minimalists.

### Terminal
Developer-flavored with terminal/IDE aesthetics. Features monospace typography and contribution heatmap.

### Gallery
Visual-first magazine-style masonry grid. Best for frontend developers with visual projects.

### Brutalist
Bold, high-contrast with black borders. For developers who want to stand out.

## 🔑 Environment Variables

See `.env.example` for the complete list of required environment variables.

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md first.

## 🐛 Bug Reports

Found a bug? Please open an issue with detailed steps to reproduce.

## 💬 Support

- Documentation: [docs.snapportfolio.app](https://docs.snapportfolio.app)
- Email: support@snapportfolio.app
- Twitter: [@snapportfolio](https://twitter.com/snapportfolio)

---

**Built with ❤️ for developers who want portfolios that don't look generated.**
