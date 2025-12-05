#!/bin/bash

# Deployment Verification Script
# Run this after deploying to verify everything works

set -e

echo "🔍 90s Website Generator - Deployment Verification"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if URL is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Please provide deployment URL${NC}"
    echo "Usage: ./scripts/verify-deployment.sh https://your-app.vercel.app"
    exit 1
fi

DEPLOYMENT_URL=$1
echo "Testing deployment at: $DEPLOYMENT_URL"
echo ""

# Function to check HTTP status
check_url() {
    local url=$1
    local expected=$2
    local description=$3
    
    echo -n "Testing $description... "
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" -eq "$expected" ]; then
        echo -e "${GREEN}✓ Pass${NC} (HTTP $status)"
        return 0
    else
        echo -e "${RED}✗ Fail${NC} (Expected HTTP $expected, got $status)"
        return 1
    fi
}

# Function to check if content exists
check_content() {
    local url=$1
    local search_text=$2
    local description=$3
    
    echo -n "Testing $description... "
    
    content=$(curl -s "$url")
    
    if echo "$content" | grep -q "$search_text"; then
        echo -e "${GREEN}✓ Pass${NC}"
        return 0
    else
        echo -e "${RED}✗ Fail${NC} (Content not found)"
        return 1
    fi
}

# Track failures
FAILURES=0

echo "📄 Testing Pages"
echo "----------------"

# Test homepage
check_url "$DEPLOYMENT_URL" 200 "Homepage" || ((FAILURES++))

# Test sign-in page
check_url "$DEPLOYMENT_URL/sign-in" 200 "Sign-in page" || ((FAILURES++))

# Test sign-up page
check_url "$DEPLOYMENT_URL/sign-up" 200 "Sign-up page" || ((FAILURES++))

# Test gallery (should redirect to sign-in if not authenticated)
check_url "$DEPLOYMENT_URL/gallery" 200 "Gallery page" || ((FAILURES++))

echo ""
echo "🔍 Testing Content"
echo "------------------"

# Check homepage has generator form
check_content "$DEPLOYMENT_URL" "Your Name" "Generator form present" || ((FAILURES++))

# Check homepage has theme selector
check_content "$DEPLOYMENT_URL" "Neon Dreams" "Theme selector present" || ((FAILURES++))

# Check homepage has presets
check_content "$DEPLOYMENT_URL" "Quick Start Templates" "Template presets present" || ((FAILURES++))

echo ""
echo "🔧 Testing API Endpoints"
echo "------------------------"

# Check if Convex is connected (look for Convex script in HTML)
check_content "$DEPLOYMENT_URL" "convex" "Convex integration" || ((FAILURES++))

# Check if Clerk is connected (look for Clerk script in HTML)
check_content "$DEPLOYMENT_URL" "clerk" "Clerk integration" || ((FAILURES++))

echo ""
echo "📊 Summary"
echo "----------"

if [ $FAILURES -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "🎉 Deployment verified successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Test authentication flow manually"
    echo "2. Create a test site"
    echo "3. Verify guestbook works"
    echo "4. Test download functionality"
    echo "5. Check edit mode"
    exit 0
else
    echo -e "${RED}✗ $FAILURES check(s) failed${NC}"
    echo ""
    echo "⚠️  Deployment has issues. Please check:"
    echo "1. Environment variables in Vercel"
    echo "2. Convex production deployment status"
    echo "3. Clerk configuration"
    echo "4. Build logs in Vercel dashboard"
    exit 1
fi
