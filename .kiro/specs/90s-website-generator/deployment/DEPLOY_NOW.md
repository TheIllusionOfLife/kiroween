# 🚀 Deploy Now - Step-by-Step Guide

Follow these steps in order to deploy your 90s Website Generator to production.

## Step 1: Set Up Clerk (5 minutes)

### 1.1 Create Clerk Account
1. Go to https://clerk.com
2. Click "Sign Up" (use GitHub for fastest setup)
3. Verify your email if needed

### 1.2 Create Application
1. Click "Create Application"
2. Name it: "90s Website Generator"
3. Select authentication methods:
   - ✅ GitHub (required)
   - ✅ Email (optional)
4. Click "Create Application"

### 1.3 Enable GitHub OAuth
1. In left sidebar, go to "User & Authentication" → "Social Connections"
2. Find "GitHub" and toggle it ON
3. Clerk will guide you through GitHub OAuth setup
4. Follow the prompts (Clerk handles most of it automatically)

### 1.4 Get API Keys
1. In left sidebar, go to "API Keys"
2. You'll see two keys:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)
3. Click "Copy" for each key

### 1.5 Update Local Environment
Edit `.env.local` in your project root:

```bash
# Replace these lines:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# With your actual keys:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 1.6 Test Locally
```bash
npm run dev
```

Visit http://localhost:3000 and click "Sign In" - you should see Clerk's sign-in modal.

---

## Step 2: Deploy Convex to Production (2 minutes)

### 2.1 Deploy
```bash
npx convex deploy --prod
```

### 2.2 Save Output
The command will output something like:

```
✓ Deployed to production!
  Deployment: prod:exuberant-condor-617
  URL: https://exuberant-condor-617.convex.cloud
```

**Save these values** - you'll need them for Vercel!

---

## Step 3: Test Production Build Locally (3 minutes)

### 3.1 Update Environment for Production Test
Create a new file `.env.production.local`:

```bash
# Convex Production (from Step 2)
CONVEX_DEPLOYMENT=prod:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk (same as .env.local)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
```

### 3.2 Build and Test
```bash
npm run build
npm start
```

Visit http://localhost:3000 and test:
- ✅ Generate a site
- ✅ Sign in with GitHub
- ✅ Save a site
- ✅ View gallery

If everything works, you're ready for Vercel!

---

## Step 4: Deploy to Vercel (5 minutes)

### 4.1 Go to Vercel
1. Visit https://vercel.com/new
2. Sign in with GitHub (if not already)

### 4.2 Import Repository
1. Click "Import Git Repository"
2. Find "TheIllusionOfLife/kiroween"
3. Click "Import"

### 4.3 Configure Project
Leave these settings as default:
- **Root Directory:** `.` (project root)
- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4.4 Add Environment Variables
Click "Environment Variables" and add these **one by one**:

```
Name: CONVEX_DEPLOYMENT
Value: prod:your-deployment-name
Environment: Production

Name: NEXT_PUBLIC_CONVEX_URL
Value: https://your-deployment.convex.cloud
Environment: Production

Name: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: pk_test_...
Environment: Production

Name: CLERK_SECRET_KEY
Value: sk_test_...
Environment: Production

Name: NEXT_PUBLIC_CLERK_SIGN_IN_URL
Value: /sign-in
Environment: Production

Name: NEXT_PUBLIC_CLERK_SIGN_UP_URL
Value: /sign-up
Environment: Production

Name: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
Value: /
Environment: Production
```

### 4.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll see "Congratulations!" when done

### 4.6 Get Your URL
Vercel will give you a URL like:
- `https://kiroween.vercel.app`
- or `https://kiroween-git-main-yourusername.vercel.app`

**Save this URL!**

---

## Step 5: Configure Clerk for Production (2 minutes)

### 5.1 Add Vercel Domain to Clerk
1. Go back to Clerk Dashboard
2. Go to "Domains" in left sidebar
3. Click "Add Domain"
4. Enter your Vercel URL (without https://):
   - Example: `kiroween.vercel.app`
5. Click "Add Domain"

### 5.2 Update OAuth Redirect URLs (if needed)
Clerk usually handles this automatically, but verify:
1. Go to "User & Authentication" → "Social Connections"
2. Click "GitHub"
3. Check that redirect URLs include your Vercel domain
4. If not, add them manually

---

## Step 6: Verify Deployment (5 minutes)

### 6.1 Run Verification Script
```bash
./scripts/verify-deployment.sh https://your-app.vercel.app
```

This will test:
- ✅ All pages load
- ✅ Content is present
- ✅ Convex is connected
- ✅ Clerk is connected

### 6.2 Manual Testing
Visit your Vercel URL and test:

1. **Homepage**
   - [ ] Generator form loads
   - [ ] Template presets work
   - [ ] Preview updates

2. **Authentication**
   - [ ] Click "Sign In"
   - [ ] Sign in with GitHub
   - [ ] See your profile in header
   - [ ] Sign out works

3. **Site Creation**
   - [ ] Fill out form
   - [ ] Click "Save Site"
   - [ ] Site appears in gallery

4. **Gallery**
   - [ ] Gallery shows your sites
   - [ ] Click on a site
   - [ ] Site page loads

5. **Site Features**
   - [ ] Guestbook works
   - [ ] Sign guestbook
   - [ ] Entry appears
   - [ ] Download works
   - [ ] View counter increments

6. **Edit Mode**
   - [ ] Click "Edit Site" (owner only)
   - [ ] Form populates with site data
   - [ ] Make changes
   - [ ] Click "Update Site"
   - [ ] Changes saved

---

## Step 7: Set Up Automatic Deployments

Already done! Vercel automatically deploys on every push to `main`:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Vercel will automatically build and deploy.

---

## Troubleshooting

### Build Fails in Vercel

**Check:**
1. Vercel build logs (click on failed deployment)
2. Environment variables are all set
3. Clerk keys are correct

**Fix:**
- Re-deploy with correct environment variables
- Check for TypeScript errors locally

### "Clerk publishableKey is invalid"

**Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is correct
3. Copy from Clerk Dashboard → API Keys
4. Update in Vercel
5. Re-deploy

### "Convex connection failed"

**Fix:**
1. Verify Convex production deployment is active
2. Check `NEXT_PUBLIC_CONVEX_URL` in Vercel
3. Run `npx convex dashboard` to check status

### Authentication Doesn't Work

**Fix:**
1. Go to Clerk Dashboard → Domains
2. Verify your Vercel domain is added
3. Check OAuth redirect URLs include Vercel domain

---

## Success Checklist

- [ ] Clerk account created
- [ ] GitHub OAuth enabled
- [ ] API keys copied
- [ ] Local environment updated
- [ ] Tested locally
- [ ] Convex deployed to production
- [ ] Production build tested locally
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Deployed to Vercel
- [ ] Clerk domain configured
- [ ] Verification script passed
- [ ] Manual testing completed
- [ ] All features working

---

## Next Steps

Once deployed:

1. **Share your site!**
   - Tweet about it
   - Share on Reddit
   - Show friends

2. **Monitor**
   - Check Vercel Dashboard for errors
   - Check Convex Dashboard for usage
   - Set up alerts

3. **Iterate**
   - Gather feedback
   - Fix bugs
   - Add features

---

## Support

If you get stuck:

1. Check Vercel build logs
2. Check Convex dashboard
3. Check Clerk dashboard
4. Review this guide
5. Check documentation:
   - Vercel: https://vercel.com/docs
   - Convex: https://docs.convex.dev
   - Clerk: https://clerk.com/docs

---

**Ready? Let's deploy! 🚀**

Start with Step 1 above and work through each step in order.
