# Deployment Checklist for 90s Website Generator

## Prerequisites

### 1. Clerk Setup (Required)
- [ ] Create Clerk account at https://clerk.com
- [ ] Create new application in Clerk Dashboard
- [ ] Enable GitHub OAuth in Social Connections
- [ ] Copy Publishable Key (starts with `pk_test_` or `pk_live_`)
- [ ] Copy Secret Key (starts with `sk_test_` or `sk_live_`)
- [ ] Update `.env.local` with real keys (replace placeholders)
- [ ] Test authentication locally (`npm run dev`)

### 2. Convex Production Deployment
- [ ] Run `npx convex deploy --prod`
- [ ] Save production deployment name (e.g., `prod:exuberant-condor-617`)
- [ ] Save production URL (e.g., `https://exuberant-condor-617.convex.cloud`)

### 3. Local Build Test
- [ ] Run `npm run build` successfully
- [ ] Run `npm start` and test locally
- [ ] Verify all features work in production mode

## Deployment Steps

### Step 1: Prepare Environment Variables

Create a file `deployment-env.txt` with these values (DO NOT commit this file):

```
# Convex Production
CONVEX_DEPLOYMENT=prod:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk Production (or use test keys initially)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Clerk URLs (same for all environments)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
```

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import GitHub repository: `TheIllusionOfLife/kiroween`
3. Configure project:
   - **Root Directory:** Leave as `.` (project root)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

4. Add Environment Variables (from `deployment-env.txt`):
   - Click "Environment Variables"
   - Add each variable one by one
   - Select "Production" environment
   - Click "Add"

5. Click "Deploy"

6. Wait for deployment to complete (~2-3 minutes)

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Add environment variables
vercel env add CONVEX_DEPLOYMENT
vercel env add NEXT_PUBLIC_CONVEX_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL

# Deploy to production
vercel --prod
```

### Step 3: Verify Deployment

Visit your Vercel URL and test:

- [ ] Homepage loads
- [ ] Can generate a site (guest mode)
- [ ] Can sign in with GitHub
- [ ] Can save a site (authenticated)
- [ ] Gallery shows user's sites
- [ ] Can view individual site pages
- [ ] Guestbook works
- [ ] Download works
- [ ] Edit mode works (owner only)
- [ ] View counter increments

### Step 4: Configure Clerk for Production

1. Go to Clerk Dashboard
2. Navigate to your application
3. Go to "Domains"
4. Add your Vercel domain (e.g., `kiroween.vercel.app`)
5. Update OAuth redirect URLs if needed

### Step 5: Set Up Automatic Deployments

Vercel automatically deploys on every push to `main`:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Vercel will:
1. Detect the push
2. Build the app
3. Run tests (if configured)
4. Deploy to production

## Post-Deployment

### Monitoring

- [ ] Check Vercel Dashboard for deployment status
- [ ] Check Convex Dashboard for function calls
- [ ] Monitor error logs in both dashboards
- [ ] Set up Vercel Analytics (optional)

### Performance

- [ ] Test site speed with Lighthouse
- [ ] Check Core Web Vitals in Vercel
- [ ] Verify CDN is working (fast load times globally)

### Security

- [ ] Verify environment variables are not exposed
- [ ] Test authentication flow
- [ ] Verify authorization (can't edit others' sites)
- [ ] Check for XSS vulnerabilities (should be safe with React)

## Rollback Plan

If something breaks:

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find last working deployment
4. Click "..." menu
5. Click "Promote to Production"

## Troubleshooting

### Build Fails

**Error:** TypeScript compilation errors
**Fix:** Run `npx tsc --noEmit` locally and fix errors

**Error:** Missing environment variables
**Fix:** Add all required env vars in Vercel dashboard

**Error:** Clerk keys invalid
**Fix:** Verify keys are correct in Clerk dashboard

### Runtime Errors

**Error:** "Clerk publishableKey is invalid"
**Fix:** Check environment variables in Vercel dashboard

**Error:** "Convex connection failed"
**Fix:** Verify Convex production deployment is active

**Error:** 404 on routes
**Fix:** Check Next.js routing configuration

### Performance Issues

**Issue:** Slow page loads
**Fix:** Enable Vercel Edge Network, check Convex query performance

**Issue:** High function call usage
**Fix:** Review Convex queries, add caching where appropriate

## Cost Tracking

### Free Tier Limits

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- 100 GB-hours compute

**Convex:**
- 1M function calls/month
- 8GB storage
- 1GB bandwidth

### Monitoring Usage

- Check Vercel Dashboard → Usage
- Check Convex Dashboard → Usage
- Set up alerts for approaching limits

## Next Steps After Deployment

1. [ ] Update README with live URL
2. [ ] Share with users for testing
3. [ ] Gather feedback
4. [ ] Monitor for errors
5. [ ] Plan next features

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Convex Docs:** https://docs.convex.dev
- **Clerk Docs:** https://clerk.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Status:** Ready to deploy once Clerk is configured! 🚀
