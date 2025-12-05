---
inclusion: manual
---

# Deployment Guide - 90s Website Generator

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository with all code
- ✅ Clerk account with GitHub OAuth configured
- ✅ Convex account with project created
- ✅ Vercel account (free tier is fine)
- ✅ All tests passing locally

## Deployment Checklist

### 1. Clerk Setup (5 minutes)

1. Go to https://clerk.com and create an account
2. Create a new application
3. Enable GitHub OAuth:
   - Navigate to "User & Authentication" → "Social Connections"
   - Enable "GitHub"
   - Follow GitHub OAuth setup wizard
4. Get your API keys:
   - Go to "API Keys"
   - Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy `CLERK_SECRET_KEY`

### 2. Convex Setup (5 minutes)

1. Go to https://convex.dev and create an account
2. Create a new project
3. Deploy your schema:
   ```bash
   cd vibe_coding/version2
   npx convex deploy
   ```
4. Get your deployment URL:
   - Copy the `CONVEX_DEPLOYMENT` URL
   - It looks like: `https://your-project.convex.cloud`

### 3. Vercel Setup (5 minutes)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `vibe_coding/version2`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

6. Click "Deploy"

### 4. Post-Deployment Verification

1. **Test Authentication**:
   - Visit your deployed URL
   - Click "Sign In with GitHub"
   - Verify you can sign in successfully

2. **Test Site Generation**:
   - Create a site without signing in (guest mode)
   - Download the site
   - Verify it works standalone

3. **Test Authenticated Features**:
   - Sign in
   - Create and save a site
   - Visit the gallery
   - Verify your site appears

4. **Test Guestbook**:
   - Visit a site page
   - Sign the guestbook
   - Verify entry appears

5. **Test Editing**:
   - Go to your gallery
   - Click edit on a site
   - Make changes and save
   - Verify changes persist

## Environment Variables Reference

### Required for Production

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Clerk URLs (use production domain)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Development Only

```bash
# Convex (dev deployment)
CONVEX_DEPLOYMENT=dev:your-dev-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-dev.convex.cloud

# Clerk (test keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To disable auto-deploy:
1. Go to Vercel project settings
2. Navigate to "Git"
3. Configure deployment branches

## Monitoring

### Vercel Analytics
- Automatically enabled
- View at: https://vercel.com/your-project/analytics
- Shows: Page views, performance, errors

### Convex Dashboard
- View at: https://dashboard.convex.dev
- Shows: Database queries, mutations, logs
- Monitor: Query performance, error rates

### Clerk Dashboard
- View at: https://dashboard.clerk.com
- Shows: User signups, active users, auth events
- Monitor: Sign-in success rate, OAuth issues

## Troubleshooting

### Issue: "Clerk is not configured"
**Solution**: Verify environment variables are set in Vercel:
1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Ensure all Clerk variables are present
4. Redeploy

### Issue: "Convex connection failed"
**Solution**: Check Convex URL:
1. Verify `NEXT_PUBLIC_CONVEX_URL` is correct
2. Ensure Convex deployment is active
3. Check Convex dashboard for errors

### Issue: "Authentication redirect loop"
**Solution**: Check Clerk URLs:
1. Verify all `NEXT_PUBLIC_CLERK_*_URL` variables
2. Ensure they match your actual routes
3. Check middleware configuration

### Issue: "Site generation fails"
**Solution**: Check browser console:
1. Look for JavaScript errors
2. Verify all assets load correctly
3. Check if audio URLs are accessible

### Issue: "Gallery shows no sites"
**Solution**: Check authentication:
1. Verify user is signed in
2. Check Convex queries in dashboard
3. Ensure userId is being passed correctly

## Performance Optimization

### Vercel Edge Caching
- Static assets cached automatically
- Configure in `next.config.ts`:
  ```typescript
  export default {
    images: {
      domains: ['your-cdn.com'],
    },
  };
  ```

### Convex Query Optimization
- Use indexes for frequently queried fields
- Limit query results with pagination
- Cache results on client with React Query (optional)

### Image Optimization
- Use Next.js Image component
- Serve images from CDN
- Use appropriate formats (WebP, AVIF)

## Security Checklist

- ✅ Environment variables stored securely in Vercel
- ✅ Clerk handles authentication (no passwords stored)
- ✅ Convex validates all inputs
- ✅ HTTPS enabled by default on Vercel
- ✅ CORS configured correctly
- ✅ Rate limiting enabled (Convex default)
- ✅ Input sanitization in place

## Cost Estimates

### Free Tier (Sufficient for MVP)
- **Vercel**: Free (100GB bandwidth, unlimited requests)
- **Convex**: Free (1M reads, 100K writes per month)
- **Clerk**: Free (10K monthly active users)

**Total**: $0/month for small-scale usage

### Paid Tier (If Needed)
- **Vercel Pro**: $20/month (1TB bandwidth)
- **Convex Pro**: $25/month (10M reads, 1M writes)
- **Clerk Pro**: $25/month (unlimited users)

**Total**: ~$70/month for production scale

## Rollback Procedure

If deployment fails:

1. **Instant Rollback** (Vercel):
   - Go to Vercel deployments
   - Find last working deployment
   - Click "Promote to Production"

2. **Convex Rollback**:
   ```bash
   npx convex deploy --prod --version <previous-version>
   ```

3. **Code Rollback** (Git):
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

## Support Resources

- **Vercel**: https://vercel.com/docs
- **Convex**: https://docs.convex.dev
- **Clerk**: https://clerk.com/docs
- **Next.js**: https://nextjs.org/docs

## Post-Launch Tasks

1. **Monitor Performance**:
   - Check Vercel Analytics daily
   - Review Convex query performance
   - Monitor error rates

2. **User Feedback**:
   - Set up feedback mechanism
   - Monitor social media mentions
   - Track feature requests

3. **Iterate**:
   - Fix bugs quickly
   - Add requested features
   - Optimize based on usage patterns

4. **Scale**:
   - Upgrade plans as needed
   - Optimize database queries
   - Add caching layers
