# Testing Guide for SnapPortfolio

## 🧪 Testing Checklist

### Pre-Launch Testing

#### 1. Authentication Flow
- [ ] GitHub OAuth login works
- [ ] Google OAuth login works (optional)
- [ ] Session persists across page refreshes
- [ ] Logout works correctly
- [ ] Protected routes redirect to login
- [ ] Logged-in users can't access /login

#### 2. Onboarding Flow
- [ ] GitHub username input validates correctly
- [ ] Generation animation shows all 6 steps
- [ ] Progress indicators animate properly
- [ ] Confetti appears on completion
- [ ] Navigate to customize page works
- [ ] Template selection works
- [ ] Continue button navigates to dashboard

#### 3. Dashboard
- [ ] Portfolio stats display correctly
- [ ] GitHub sync button works
- [ ] "View live" opens public portfolio
- [ ] "Edit Portfolio" navigates to editor
- [ ] Quick actions work
- [ ] Recent projects load

#### 4. Editor - Content Tab
- [ ] All form fields update portfolio state
- [ ] Character counters work
- [ ] Section drag & drop works
- [ ] Section visibility toggles work
- [ ] Bio regenerate button works (if implemented)
- [ ] Changes reflect in live preview
- [ ] Save draft button works

#### 5. Editor - Projects Tab
- [ ] Projects load from GitHub
- [ ] Search filters projects correctly
- [ ] Filter buttons (all/included/excluded/pinned) work
- [ ] Project expand/collapse works
- [ ] Edit fields update project data
- [ ] Pin/unpin toggles work
- [ ] Include/exclude toggles work
- [ ] Cover image upload works (if implemented)

#### 6. Editor - Design Tab
- [ ] Template selection changes preview
- [ ] Color picker updates accent color
- [ ] Preset colors work
- [ ] Custom hex input validates
- [ ] Auto color from avatar works (if implemented)
- [ ] Color mode toggle works
- [ ] Font pair selection works
- [ ] GitHub stats toggles work

#### 7. Editor - Domain Tab
- [ ] Subdomain availability check works
- [ ] Reserved subdomain validation works
- [ ] Subdomain save works
- [ ] Custom domain UI shows (Pro users)
- [ ] DNS instructions display correctly

#### 8. Live Preview
- [ ] Preview updates within 500ms of changes
- [ ] Desktop/mobile toggle works
- [ ] Preview accurately reflects portfolio
- [ ] All template switches work in preview

#### 9. Analytics
- [ ] Total views display
- [ ] Charts render correctly
- [ ] Top countries list populates
- [ ] Top referrers list populates
- [ ] Device breakdown shows
- [ ] Date range selector works
- [ ] Pro upsell displays for free users

#### 10. Public Portfolio
- [ ] All 4 templates render correctly
- [ ] Projects display with correct data
- [ ] Skills section shows
- [ ] Social links work
- [ ] About section displays
- [ ] GitHub stats show (if enabled)
- [ ] Contact section works
- [ ] Footer displays
- [ ] Analytics tracking fires

### Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Testing

Test breakpoints:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)
- [ ] Large Desktop (1440px+)

### Performance Testing

- [ ] Lighthouse score 90+ (all categories)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No console errors
- [ ] No console warnings in production
- [ ] Images optimized
- [ ] Fonts loaded efficiently

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader compatible
- [ ] Alt text on all images
- [ ] ARIA labels where needed

### SEO Testing

- [ ] Meta tags present
- [ ] OpenGraph tags present
- [ ] Twitter card tags present
- [ ] Sitemap generates correctly
- [ ] Robots.txt configured
- [ ] URLs are clean (no query params)
- [ ] Canonical URLs set

### Backend API Testing

```bash
# Health check
curl https://your-api.com/health

# GitHub sync (requires auth)
curl -X POST https://your-api.com/api/v1/github/sync \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get portfolio
curl https://your-api.com/api/v1/portfolio/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update portfolio
curl -X PATCH https://your-api.com/api/v1/portfolio/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tagline":"New tagline"}'
```

### Error Testing

Test error states:
- [ ] Network errors display correctly
- [ ] 404 page displays
- [ ] Error boundary catches errors
- [ ] Invalid GitHub username shows error
- [ ] Rate limiting shows message
- [ ] Expired session redirects to login
- [ ] Invalid form data shows validation errors

### Edge Cases

- [ ] Very long names/descriptions
- [ ] Special characters in inputs
- [ ] Empty GitHub profile (0 repos)
- [ ] GitHub profile with 100+ repos
- [ ] No README in repos
- [ ] Forked repos handled correctly
- [ ] Private repos excluded
- [ ] Rate limited GitHub API
- [ ] Slow network conditions
- [ ] Offline behavior

## 🔍 Manual Testing Script

### Full User Flow Test (20 minutes)

1. **Landing Page** (2 min)
   - Visit homepage
   - Read hero section
   - Watch Repo Morph Animation
   - Scroll through all sections
   - Click template previews

2. **Sign Up** (2 min)
   - Click "Sign in with GitHub"
   - Authorize OAuth
   - Verify redirect to onboarding

3. **Onboarding** (3 min)
   - Enter GitHub username
   - Watch generation animation (all 6 steps)
   - View generated portfolio
   - Try different templates
   - Click "Continue"

4. **Dashboard** (2 min)
   - View portfolio stats
   - Check GitHub sync status
   - Open "View live" in new tab
   - Verify public portfolio works
   - Return to dashboard
   - Click "Edit Portfolio"

5. **Editor - Content** (3 min)
   - Change display name
   - Update role and tagline
   - Edit bio
   - Update social links
   - Drag reorder sections
   - Toggle section visibility
   - Verify preview updates

6. **Editor - Projects** (3 min)
   - Search for a project
   - Pin a project
   - Hide a project
   - Expand and edit project details
   - Add custom description
   - Verify preview updates

7. **Editor - Design** (2 min)
   - Switch templates (try all 4)
   - Change accent color
   - Try different font pairs
   - Toggle color mode
   - Toggle GitHub stats
   - Verify all changes in preview

8. **Editor - Domain** (1 min)
   - Check current subdomain
   - Test subdomain availability
   - View custom domain options

9. **Publish** (1 min)
   - Click "Publish"
   - Verify success message
   - Open public portfolio
   - Verify all changes visible

10. **Analytics** (1 min)
    - Navigate to analytics
    - Check view counts
    - Verify charts display
    - Check device breakdown

## 🐛 Bug Report Template

When you find a bug:

```
**Bug Title**: Brief description

**Severity**: Critical / High / Medium / Low

**Steps to Reproduce**:
1. Go to...
2. Click on...
3. See error

**Expected Behavior**:
What should happen

**Actual Behavior**:
What actually happens

**Screenshots**:
If applicable

**Environment**:
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop
- URL: https://...

**Console Errors**:
Paste any console errors
```

## ✅ Sign-Off Criteria

Before launching:
- [ ] All critical bugs fixed
- [ ] All high-priority bugs fixed
- [ ] Performance metrics met
- [ ] Accessibility requirements met
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] Error handling verified
- [ ] Analytics working
- [ ] SEO optimized
- [ ] Security reviewed

---

**Ready to test? Start with the Full User Flow Test above!**
