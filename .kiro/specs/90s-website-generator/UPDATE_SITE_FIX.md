# Update Site Functionality Fix

## Issue
The "update site" functionality from the gallery was failing with a "Server Error" when trying to edit existing sites.

## Root Cause
The `updateSite` mutation in `convex/sites.ts` was passing `undefined` values for optional fields to `ctx.db.patch()`, which Convex doesn't handle well. When optional fields like `soundEffects`, `bgmTrack`, `customFonts`, etc. were `undefined`, the patch operation would fail.

## Solution

### 1. Fixed `updateSite` Mutation (convex/sites.ts)
Added filtering logic to remove `undefined` values before patching:

```typescript
// Filter out undefined values to avoid Convex patch issues
const cleanedFields = Object.fromEntries(
  Object.entries(updateFields).filter(([_, value]) => value !== undefined)
);

// Update site configuration while preserving metadata
await ctx.db.patch(args.siteId, {
  ...cleanedFields,
  updatedAt: Date.now(),
});
```

### 2. Added Edit Button to Gallery (app/gallery/page.tsx)
Added an "Edit" button next to the "View Site" button in the gallery:

```typescript
<Link
  href={`/?edit=${site._id}`}
  className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  Edit ✏️
</Link>
```

### 3. Updated Home Page to Handle Edit Mode (app/page.tsx)
Made the home page a client component that:
- Reads the `edit` query parameter from the URL
- Fetches the site data using Convex
- Loads the site into edit mode using the Zustand store

```typescript
"use client";

// ... imports

export default function Home() {
  const searchParams = useSearchParams();
  const editSiteId = searchParams.get("edit");
  const { enterEditMode } = useGeneratorStore();
  
  // Fetch site data if in edit mode
  const siteData = useQuery(
    api.sites.get,
    editSiteId ? { id: editSiteId as Id<"sites"> } : "skip"
  );

  // Load site into edit mode when data is available
  useEffect(() => {
    if (editSiteId && siteData) {
      enterEditMode(editSiteId as Id<"sites">, {
        // ... load all config fields
      });
    }
  }, [editSiteId, siteData, enterEditMode]);
  
  // ... rest of component
}
```

## Testing
All existing property-based tests pass, including:
- ✅ Property 6: Site persistence round-trip
- ✅ Property 7: New sites initialize with zero views
- ✅ Property 8: Required fields are enforced
- ✅ Property 9: View count increments correctly
- ✅ Property 16: Edit preserves metadata (specifically tests the update functionality)

## User Flow
1. User navigates to `/gallery`
2. User clicks "Edit ✏️" button on a site card
3. User is redirected to `/?edit={siteId}`
4. Home page loads the site data and enters edit mode
5. Generator form shows "Edit Mode" banner with "Cancel Edit" button
6. User makes changes and clicks "UPDATE SITE"
7. `updateSite` mutation is called with cleaned fields (no undefined values)
8. Site is successfully updated in the database
9. User exits edit mode and can view the updated site

## Files Changed
- `convex/sites.ts` - Fixed `updateSite` mutation to filter undefined values
- `app/gallery/page.tsx` - Added "Edit" button
- `app/page.tsx` - Made client component, added edit mode handling

## Requirements Validated
- ✅ Requirement 19.1: User ownership verification
- ✅ Requirement 19.3-19.8: Field validation
- ✅ Requirement 19.9: Preserve createdAt timestamp
- ✅ Requirement 19.10: Preserve view count
