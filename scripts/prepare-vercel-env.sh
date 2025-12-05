#!/bin/bash

# Script to prepare environment variables for Vercel deployment
# This extracts values from .env.local and formats them for Vercel

echo "🔧 Preparing Environment Variables for Vercel"
echo "=============================================="
echo ""

if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found"
    exit 1
fi

echo "📋 Copy these environment variables to Vercel:"
echo ""
echo "---"
echo ""

# Extract and display each variable
echo "CONVEX_DEPLOYMENT"
grep "^CONVEX_DEPLOYMENT=" .env.local | cut -d'=' -f2 | cut -d'#' -f1 | xargs
echo ""

echo "NEXT_PUBLIC_CONVEX_URL"
grep "^NEXT_PUBLIC_CONVEX_URL=" .env.local | cut -d'=' -f2 | xargs
echo ""

echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
grep "^NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=" .env.local | cut -d'=' -f2 | xargs
echo ""

echo "CLERK_SECRET_KEY"
grep "^CLERK_SECRET_KEY=" .env.local | cut -d'=' -f2 | xargs
echo ""

echo "NEXT_PUBLIC_CLERK_SIGN_IN_URL"
echo "/sign-in"
echo ""

echo "NEXT_PUBLIC_CLERK_SIGN_UP_URL"
echo "/sign-up"
echo ""

echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL"
echo "/"
echo ""

echo "---"
echo ""
echo "✅ Ready to deploy to Vercel!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add each environment variable above"
echo "4. Click Deploy"
