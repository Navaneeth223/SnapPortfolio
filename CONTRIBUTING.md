# Contributing to SnapPortfolio

Thank you for your interest in contributing to SnapPortfolio!

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/snapportfolio.git
   cd snapportfolio
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   cd server && pnpm install
   ```
4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow existing patterns in the codebase
- Use functional components and hooks
- Keep components focused and single-responsibility
- Write meaningful commit messages

### File Organization

- Components: `/components`
- Pages: `/app`
- Utilities: `/lib`
- Types: `/types`
- Hooks: `/hooks`
- Backend: `/server/src`

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Utilities**: camelCase (`myUtil.ts`)
- **Types**: PascalCase (`MyType.ts`)
- **Constants**: UPPER_SNAKE_CASE

### TypeScript

- Always define types for props and state
- Avoid `any` - use proper types
- Use Zod for runtime validation
- Export types from dedicated type files

## 🎨 Adding a New Template

To add a new portfolio template:

1. Create folder: `components/portfolio-templates/your-template/`
2. Required files:
   - `YourTemplate.tsx` - Main component
   - `YourTemplateHero.tsx` - Hero section
   - `YourTemplateProjectCard.tsx` - Project display
3. Add to `lib/constants.ts`:
   ```typescript
   {
     id: 'your-template',
     name: 'Your Template',
     description: '...',
     bestFor: '...',
   }
   ```
4. Add to switch statement in `app/p/[username]/page.tsx`

### Template Requirements

- Must support all portfolio sections
- Must be fully responsive
- Must work in light/dark mode
- Must accept accent color as prop
- Must display projects, skills, and contact info

## 🔧 Adding Features

### Frontend Features

1. Create component in appropriate directory
2. Add to parent component
3. Update types if needed
4. Add to editor if user-configurable

### Backend Features

1. Add model if needed (`server/src/models/`)
2. Create controller (`server/src/controllers/`)
3. Add routes (`server/src/routes/`)
4. Update API documentation

## 🧪 Testing

Before submitting:

```bash
# Lint
pnpm lint

# Type check
pnpm build

# Test locally
pnpm dev
```

## 📤 Submitting Changes

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new template"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request**:
   - Clear title describing the change
   - Detailed description of what and why
   - Screenshots for UI changes
   - Link to related issues

## 🐛 Reporting Bugs

Open an issue with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment (browser, OS)

## 💡 Suggesting Features

Open an issue with:
- Clear description of the feature
- Use case / problem it solves
- Mockups or examples if applicable

## 📋 Pull Request Checklist

- [ ] Code follows project style
- [ ] TypeScript types are defined
- [ ] No console.logs or debug code
- [ ] Responsive design tested
- [ ] Works in Chrome, Firefox, Safari
- [ ] No breaking changes
- [ ] Documentation updated if needed

## 🎯 Priority Areas

We especially welcome contributions in:

- New portfolio templates
- GitHub API enhancements
- Analytics features
- Performance optimizations
- Accessibility improvements
- Documentation

## ❓ Questions?

- Open a GitHub issue
- Check existing documentation
- Review closed PRs for examples

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making SnapPortfolio better! 🙏
