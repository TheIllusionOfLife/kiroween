# Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Ready
- [x] All features working locally
- [x] No console errors
- [x] TypeScript compiles without errors
- [x] Build succeeds (`npm run build`)
- [ ] Environment variables documented
- [ ] README updated with live URL

### ✅ Convex Setup
- [x] Convex dev deployment working
- [ ] Convex production deployment created
- [ ] Production environment variables set

### ✅ Vercel Setup
- [ ] Vercel account created
- [ ] GitHub repo connected
- [ ] Environment variables configured
- [ ] Build settings configured

---

## Deployment Steps

### 1. Test Production Build Locally

```bash
cd vibe_coding/version2
npm run build
npm run start
```

Visit http://localhost:3000 and test everything.

### 2. Deploy Convex to Production

```bash
npx convex deploy --prod
```

This creates a production Convex deployment and gives you a production URL.

**Save these values:**
- `CONVEX_DEPLOYMENT`: (e.g., `prod:exuberant-condor-617`)
- `NEXT_PUBLIC_CONVEX_URL`: (e.g., `https://exuberant-condor-617.convex.cloud`)

### 3. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import `TheIllusionOfLife/kiroween`
3. Configure:
   - **Root Directory:** `vibe_coding/version2`
   - **Framework:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`

4. Add Environment Variables:
   ```
   CONVEX_DEPLOYMENT=prod:exuberant-condor-617
   NEXT_PUBLIC_CONVEX_URL=https://exuberant-condor-617.convex.cloud
   ```

5. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
npm i -g vercel
cd vibe_coding/version2
vercel
```

Follow the prompts and add environment variables when asked.

### 4. Verify Deployment

1. Visit your Vercel URL (e.g., `kiroween.vercel.app`)
2. Test all features:
   - [ ] Generate a site
   - [ ] View gallery
   - [ ] Sign guestbook
   - [ ] Download site
   - [ ] Check visitor counter

### 5. Set Up Custom Domain (Optional)

1. Buy domain from registrar
2. In Vercel: Settings → Domains → Add Domain
3. Update DNS records as shown by Vercel
4. Wait for DNS propagation (5-60 minutes)

---

## Environment Variables

### Development (.env.local)
```bash
CONVEX_DEPLOYMENT=dev:exuberant-condor-617
NEXT_PUBLIC_CONVEX_URL=https://exuberant-condor-617.convex.cloud
```

### Production (Vercel)
```bash
CONVEX_DEPLOYMENT=prod:exuberant-condor-617
NEXT_PUBLIC_CONVEX_URL=https://exuberant-condor-617.convex.cloud
```

---

## Post-Deployment

### Monitoring
- Vercel Dashboard: https://vercel.com/dashboard
- Convex Dashboard: https://dashboard.convex.dev
- Check logs for errors
- Monitor performance

### Updates
Every git push to `main` branch will auto-deploy to Vercel!

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your app
3. Deploy to production
4. Update the live site

### Rollback
If something breaks:
1. Go to Vercel Dashboard
2. Deployments tab
3. Click previous working deployment
4. Click "Promote to Production"

---

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Run `npm run build` locally
- Check for TypeScript errors
- Verify all dependencies are in package.json

### Convex Connection Issues
- Verify environment variables are set
- Check Convex dashboard for deployment status
- Ensure production deployment is active

### 404 Errors
- Check root directory is set to `vibe_coding/version2`
- Verify build output directory is `.next`

### Slow Performance
- Enable Vercel Analytics
- Check Convex query performance
- Consider adding caching

---

## Cost Estimate

### Free Tier (Perfect for this project)
- **Vercel:** Free (100GB bandwidth, unlimited deployments)
- **Convex:** Free (1M function calls/month, 8GB storage)
- **Total:** $0/month

### If You Grow
- **Vercel Pro:** $20/month (1TB bandwidth)
- **Convex Pro:** $25/month (10M function calls)
- **Total:** $45/month (handles thousands of users)

---

## Security Checklist

- [ ] No API keys in code
- [ ] Environment variables in Vercel only
- [ ] CORS configured properly
- [ ] Rate limiting on Convex mutations
- [ ] Input validation on all forms
- [ ] XSS protection (React handles this)

---

## Performance Optimization

### Already Optimized
- ✅ Next.js automatic code splitting
- ✅ Vercel Edge Network (CDN)
- ✅ Convex real-time subscriptions
- ✅ Image optimization (Next.js)

### Future Optimizations
- [ ] Add Redis caching (Vercel KV)
- [ ] Implement ISR for gallery
- [ ] Add service worker for offline
- [ ] Optimize bundle size

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Convex Docs:** https://docs.convex.dev
- **Next.js Docs:** https://nextjs.org/docs

---

**Ready to deploy?** Just follow steps 1-4 above! 🚀
