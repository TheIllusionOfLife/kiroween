# 🌈 90s Website Generator

**Create authentic 1990s-style personal homepages with modern technology!**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://kiroween-mu.vercel.app)
[![Status](https://img.shields.io/badge/status-production-success)](https://kiroween-mu.vercel.app)
[![Tests](https://img.shields.io/badge/tests-35%20passing-success)](#testing)

**🌐 Live Site:** [https://kiroween-mu.vercel.app](https://kiroween-mu.vercel.app)

---

## ✨ Features

### Core Features
- 🎨 **6 Authentic 90s Themes** - Neon, Space, Rainbow, Matrix, GeoCities, Angelfire
- 🚀 **6 Template Presets** - One-click starter templates with pre-configured personas
- 👁️ **Real-Time Preview** - See your site update as you type (debounced)
- ⬇️ **Download as HTML** - Export standalone, self-contained websites
- 🎵 **Audio Support** - Background music (BGM) and sound effects
- ✨ **All the 90s Effects** - Animated GIFs, marquee text, Comic Sans, visitor counters, and more!

### User Features
- 🔐 **Dual Authentication** - Sign in with GitHub OAuth or Email/Password
- 👤 **Guest Mode** - Create and download sites without signing in
- 🖼️ **Private Gallery** - Save and manage your sites (requires sign-in)
- ✏️ **Edit Mode** - Modify saved sites after creation
- 📖 **Guestbook** - Visitors can leave messages on your sites
- 📊 **View Tracking** - Real visitor counters for each site

### Technical Features
- ⚡ **Real-Time Database** - Instant updates with Convex
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🧪 **Fully Tested** - 35 unit/property tests + E2E tests
- 🔒 **Secure** - Input sanitization, authentication, protected routes
- 🚀 **Fast** - Edge-deployed on Vercel with global CDN

---

## 🚀 Quick Start

### Try It Out (No Installation)

Visit **[https://kiroween-mu.vercel.app](https://kiroween-mu.vercel.app)** and start creating!

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/TheIllusionOfLife/kiroween.git
cd kiroween
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.local.example .env.local
# Edit .env.local with your Clerk and Convex credentials
```

4. **Start Convex dev server** (Terminal 1):
```bash
npx convex dev
```

5. **Start Next.js dev server** (Terminal 2):
```bash
npm run dev
```

6. **Open your browser:**
```
http://localhost:3000
```

---

## 🔐 Authentication

### Sign In Options

Users can authenticate using:

1. **GitHub OAuth** - One-click sign-in with GitHub account
2. **Email/Password** - Traditional email and password authentication

### For Testing & Development

Create test accounts easily:

```
Email: test@example.com
Password: Kiroween2025!
```

**Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Must not be in breach databases

See [EMAIL_PASSWORD_AUTH.md](.kiro/specs/90s-website-generator/EMAIL_PASSWORD_AUTH.md) for detailed authentication documentation.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - App Router with React Server Components
- **React 19** - Latest features and performance
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Zustand** - Lightweight state management

### Backend
- **Convex** - Real-time database with reactive queries
- **Clerk** - Authentication (GitHub OAuth + Email/Password)

### Testing
- **Vitest** - Fast unit test runner
- **fast-check** - Property-based testing library
- **Playwright** - E2E testing via MCP

### Deployment
- **Vercel** - Frontend hosting + CDN
- **Convex Cloud** - Database hosting
- **GitHub Actions** - CI/CD (auto-deploy on push)

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Clerk + Convex
│   ├── page.tsx           # Home page (generator)
│   ├── providers.tsx      # Convex provider
│   ├── gallery/           # Private gallery (auth required)
│   ├── site/[id]/         # Individual site pages (public)
│   ├── sign-in/           # Clerk sign-in
│   └── sign-up/           # Clerk sign-up
├── components/            # React components
│   ├── Header.tsx         # Navigation with auth
│   ├── generator/         # Site generator form
│   ├── guestbook/         # Guestbook widget
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities and business logic
│   ├── site-generator.ts  # HTML generation logic
│   ├── store.ts           # Zustand state management
│   ├── themes.ts          # Theme configurations
│   ├── presets.ts         # Template presets
│   └── __tests__/         # Test files
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── sites.ts           # Site queries/mutations
│   └── guestbook.ts       # Guestbook queries/mutations
├── proxy.ts               # Clerk auth middleware (Next.js 15+)
└── vitest.config.ts       # Test configuration
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run specific test file
npm test site-generator.test.ts
```

### Test Coverage

- **35 tests** passing (5 test files)
- **13 property-based tests** (100+ iterations each)
- **8 E2E test flows** (Playwright)
- **100% of correctness properties** validated

### Test Files

- `lib/__tests__/presets.test.ts` (12 tests)
- `lib/__tests__/validation.test.ts` (10 tests)
- `lib/__tests__/site-persistence.test.ts` (5 tests)
- `lib/__tests__/site-generator.test.ts` (6 tests)
- `lib/__tests__/guestbook.test.ts` (2 tests)

---

## 📚 Documentation

### Spec Documents (`.kiro/specs/90s-website-generator/`)

- **[requirements.md](/.kiro/specs/90s-website-generator/requirements.md)** - EARS-formatted requirements
- **[design.md](/.kiro/specs/90s-website-generator/design.md)** - Architecture and correctness properties
- **[tasks.md](/.kiro/specs/90s-website-generator/tasks.md)** - Implementation task list (22 tasks complete)
- **[EMAIL_PASSWORD_AUTH.md](/.kiro/specs/90s-website-generator/EMAIL_PASSWORD_AUTH.md)** - Authentication guide
- **[E2E_TEST_REPORT.md](/.kiro/specs/90s-website-generator/E2E_TEST_REPORT.md)** - E2E testing results
- **[FINAL_STATUS.md](/.kiro/specs/90s-website-generator/FINAL_STATUS.md)** - Project completion summary

### Steering Documents (`.kiro/steering/`)

- **[product.md](/.kiro/steering/product.md)** - Product overview and features
- **[tech.md](/.kiro/steering/tech.md)** - Technical stack and conventions
- **[structure.md](/.kiro/steering/structure.md)** - Project organization
- **[coding-standards.md](/.kiro/steering/coding-standards.md)** - Code style guide
- **[testing-guide.md](/.kiro/steering/testing-guide.md)** - Testing philosophy and patterns

---

## 🚀 Deployment

### Production Deployment

**Live at:** [https://kiroween-mu.vercel.app](https://kiroween-mu.vercel.app)

**Infrastructure:**
- Frontend: Vercel (Edge CDN)
- Database: Convex Cloud
- Authentication: Clerk

### Deploy Your Own

1. **Fork this repository**

2. **Set up Clerk:**
   - Create account at [clerk.com](https://clerk.com)
   - Enable GitHub OAuth and Email/Password
   - Get API keys

3. **Set up Convex:**
   - Create account at [convex.dev](https://convex.dev)
   - Create new project
   - Get deployment URL

4. **Deploy to Vercel:**
   - Connect GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_CONVEX_URL`
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - Clerk redirect URLs
   - Deploy!

See [DEPLOYMENT.md](/.kiro/specs/90s-website-generator/DEPLOYMENT.md) for detailed instructions.

---

## 🎯 Development Status

### ✅ Completed (22/22 Tasks)

- [x] Clerk authentication (GitHub OAuth + Email/Password)
- [x] Convex schema with user association
- [x] Zustand store for client state
- [x] Audio support (BGM + sound effects)
- [x] Template presets with audio
- [x] Site generation with all features
- [x] Generator form with live preview
- [x] Guest mode (no auth required)
- [x] Gallery with user filtering
- [x] Site viewing with visitor tracking
- [x] Guestbook system
- [x] Edit mode for saved sites
- [x] Download functionality
- [x] Iframe popup suppression
- [x] Responsive layouts
- [x] Error handling and validation
- [x] Deployment to Vercel
- [x] E2E testing
- [x] Final testing and polish
- [x] Email/password authentication

### 📊 Metrics

- **Test Pass Rate:** 100% (35/35 tests)
- **Property Tests:** 13 properties (100+ iterations each)
- **E2E Tests:** 9/10 flows passing
- **Code Coverage:** Comprehensive
- **Deployment:** Production-ready

---

## 🤝 Contributing

This project uses **spec-driven development** with property-based testing:

1. **Requirements** - EARS syntax with INCOSE quality rules
2. **Design** - Architecture with correctness properties
3. **Implementation** - Tasks with property tests
4. **Testing** - Unit tests + Property tests + E2E tests

See [spec-workflow.md](/.kiro/steering/spec-workflow.md) for the complete workflow.

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- Inspired by the golden age of GeoCities, Angelfire, and Tripod
- Built with modern tools: Next.js, Convex, Clerk, Vercel
- Tested with Vitest, fast-check, and Playwright
- Developed using spec-driven development methodology

---

## 📧 Contact

- **Live Demo:** [https://kiroween-mu.vercel.app](https://kiroween-mu.vercel.app)
- **GitHub:** [https://github.com/TheIllusionOfLife/kiroween](https://github.com/TheIllusionOfLife/kiroween)
- **Issues:** [GitHub Issues](https://github.com/TheIllusionOfLife/kiroween/issues)

---

**Made with 💜 and a healthy dose of 90s nostalgia**

*Best viewed in Netscape Navigator 4.0 at 800x600 resolution* 😉
