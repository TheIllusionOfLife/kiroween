# Clerk Authentication Setup

## Quick Setup (5 minutes)

### 1. Create Clerk Account
1. Go to https://clerk.com
2. Sign up for a free account
3. Create a new application

### 2. Enable GitHub OAuth
1. In Clerk Dashboard, go to "User & Authentication" → "Social Connections"
2. Enable "GitHub"
3. Follow the prompts to set up GitHub OAuth

### 3. Get API Keys
1. In Clerk Dashboard, go to "API Keys"
2. Copy your keys

### 4. Update Environment Variables
Edit `.env.local` and replace the placeholder values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 5. Test Authentication
1. Start the dev server: `npm run dev`
2. Click "Sign In with GitHub"
3. Authorize with GitHub
4. You should be signed in!

## Features Implemented

✅ GitHub OAuth sign-in
✅ User profile display (avatar + username)
✅ Sign out functionality
✅ Protected routes (gallery requires auth)
✅ Guest mode (can use generator without auth)
✅ Middleware protection for /gallery routes

## Protected Routes

- `/gallery` - Requires authentication
- `/gallery/*` - All gallery sub-routes require authentication

## Public Routes

- `/` - Home page (generator) - accessible to everyone
- `/site/[id]` - Individual site pages - accessible to everyone
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## User Data

Clerk provides:
- `user.id` - Unique user identifier
- `user.username` - GitHub username
- `user.imageUrl` - GitHub profile picture
- `user.firstName` - User's first name
- `user.emailAddresses` - User's email addresses

## Next Steps

After setting up Clerk:
1. Update Convex schema to include userId
2. Associate saved sites with user accounts
3. Filter gallery by authenticated user
4. Implement edit permissions (owner only)
