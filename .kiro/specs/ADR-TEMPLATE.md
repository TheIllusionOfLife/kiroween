# ADR-NNN: [Short Title of Decision]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Date
YYYY-MM-DD

## Context

### Problem Statement
What is the issue we're trying to solve? What are the constraints and requirements?

### Background
What context is needed to understand this decision? What led us here?

### Goals
What are we trying to achieve with this decision?

- Goal 1
- Goal 2
- Goal 3

### Non-Goals
What are we explicitly NOT trying to solve?

- Non-goal 1
- Non-goal 2

## Decision

### What We Decided
Clear statement of the decision made.

### Why We Decided This
Rationale for the decision. What factors were most important?

### How It Works
Brief explanation of how the decision will be implemented.

## Consequences

### Positive Consequences
What benefits does this decision provide?

- ✅ **Benefit 1**: Description
- ✅ **Benefit 2**: Description
- ✅ **Benefit 3**: Description

### Negative Consequences
What drawbacks or costs does this decision have?

- ❌ **Drawback 1**: Description and mitigation strategy
- ❌ **Drawback 2**: Description and mitigation strategy

### Neutral Consequences
What other effects does this decision have?

- ℹ️ **Effect 1**: Description
- ℹ️ **Effect 2**: Description

### Risks
What could go wrong? How do we mitigate?

- ⚠️ **Risk 1**: Description and mitigation
- ⚠️ **Risk 2**: Description and mitigation

## Alternatives Considered

### Alternative 1: [Name]

**Description**: What is this alternative?

**Pros**:
- Pro 1
- Pro 2

**Cons**:
- Con 1
- Con 2

**Why Not Chosen**: Explanation

### Alternative 2: [Name]

**Description**: What is this alternative?

**Pros**:
- Pro 1
- Pro 2

**Cons**:
- Con 1
- Con 2

**Why Not Chosen**: Explanation

### Alternative 3: Do Nothing

**Description**: What happens if we don't make any decision?

**Pros**:
- Pro 1

**Cons**:
- Con 1
- Con 2

**Why Not Chosen**: Explanation

## Implementation

### Action Items
What needs to be done to implement this decision?

- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

### Timeline
When will this be implemented?

- **Start Date**: YYYY-MM-DD
- **Target Completion**: YYYY-MM-DD
- **Review Date**: YYYY-MM-DD

### Success Criteria
How will we know this decision was successful?

- Criterion 1
- Criterion 2
- Criterion 3

### Rollback Plan
If this doesn't work, how do we revert?

1. Step 1
2. Step 2
3. Step 3

## Related Decisions

### Depends On
- ADR-XXX: [Title]

### Supersedes
- ADR-XXX: [Title]

### Related To
- ADR-XXX: [Title]

## References

### Documentation
- [Link to relevant docs]
- [Link to design docs]

### Research
- [Link to research]
- [Link to benchmarks]

### Discussions
- [Link to discussion thread]
- [Link to meeting notes]

## Notes

### Open Questions
Questions that remain unanswered:

- Question 1?
- Question 2?

### Future Considerations
Things to revisit later:

- Consideration 1
- Consideration 2

### Lessons Learned
What did we learn from this decision? (Fill in after implementation)

- Lesson 1
- Lesson 2

---

## Example ADR

# ADR-001: Self-Host Audio Files Instead of External Hotlinking

## Status
Accepted

## Date
2024-12-05

## Context

### Problem Statement
The 90s Website Generator needs background music for generated sites. We need to decide how to provide audio files to users.

### Background
Initial implementation used direct hotlinks to Bensound.com. Code reviews flagged this as:
- Potential terms of service violation
- Unreliable (external dependency)
- No CORS support
- Could break at any time

### Goals
- Provide reliable background music
- Respect licensing and terms of service
- Ensure fast loading times
- Maintain control over availability

### Non-Goals
- Building a music streaming service
- Supporting user-uploaded audio
- Providing a large music library

## Decision

### What We Decided
Self-host audio files in the `public/audio/` directory of the Next.js application.

### Why We Decided This
- Eliminates external dependency
- Respects licensing (we control the files)
- Faster loading (same origin, no DNS lookup)
- Simple implementation
- Full control over availability

### How It Works
1. Download properly licensed audio files
2. Place in `public/audio/` directory
3. Reference with relative paths: `/audio/bgm-retrosoul.mp3`
4. Next.js serves them as static assets

## Consequences

### Positive Consequences
- ✅ **Reliability**: No external service can break our audio
- ✅ **Performance**: Same-origin requests are faster
- ✅ **Control**: We control when/how audio is served
- ✅ **Licensing**: Clear ownership and licensing
- ✅ **Offline**: Works in offline development

### Negative Consequences
- ❌ **Bundle Size**: Adds ~2MB to deployment (mitigated by CDN caching)
- ❌ **Maintenance**: Need to manage audio files ourselves
- ❌ **Licensing Cost**: May need to purchase licenses (~$50 one-time)

### Neutral Consequences
- ℹ️ **Flexibility**: Can easily switch to CDN later if needed
- ℹ️ **Scalability**: Vercel CDN handles distribution automatically

### Risks
- ⚠️ **Licensing**: Must ensure proper licenses (mitigation: purchase from reputable source)
- ⚠️ **Storage**: Could hit Vercel limits (mitigation: only 3 tracks, ~2MB total)

## Alternatives Considered

### Alternative 1: Continue Hotlinking to Bensound

**Description**: Keep using direct links to Bensound.com

**Pros**:
- No bundle size increase
- No licensing cost
- No file management

**Cons**:
- Violates Bensound terms of service
- Unreliable (could break anytime)
- No CORS support
- Slow (external DNS lookup)
- Unprofessional

**Why Not Chosen**: Violates terms of service and is unreliable

### Alternative 2: Use CDN Service (Cloudinary, etc.)

**Description**: Upload audio to a CDN service

**Pros**:
- Professional solution
- Good performance
- Scalable

**Cons**:
- Monthly cost ($10-50/month)
- Additional complexity
- Another service to manage
- Overkill for 3 audio files

**Why Not Chosen**: Unnecessary complexity and cost for MVP

### Alternative 3: No Audio Feature

**Description**: Remove background music entirely

**Pros**:
- No licensing issues
- No file management
- Smaller bundle

**Cons**:
- Loses authentic 90s feel
- Requirement explicitly asks for audio
- Users expect it

**Why Not Chosen**: Audio is a core feature requirement

## Implementation

### Action Items
- [x] Research royalty-free music sources
- [x] Purchase/download 3 audio tracks
- [x] Create `public/audio/` directory
- [x] Update `audioTracks` map in `site-generator.ts`
- [x] Test audio playback
- [x] Document licensing in README

### Timeline
- **Start Date**: 2024-12-05
- **Target Completion**: 2024-12-06
- **Review Date**: 2024-12-20 (after user feedback)

### Success Criteria
- Audio plays reliably in all browsers
- No external dependencies
- Licensing clearly documented
- Bundle size under 5MB total

### Rollback Plan
If this doesn't work:
1. Revert to external URLs temporarily
2. Evaluate CDN option
3. Consider removing audio feature

## Related Decisions

### Depends On
- None

### Supersedes
- None (first decision on audio)

### Related To
- Future: ADR-002 might cover CDN strategy

## References

### Documentation
- [Next.js Static Files](https://nextjs.org/docs/basic-features/static-file-serving)
- [Bensound Licensing](https://www.bensound.com/licensing)

### Research
- [Royalty-Free Music Sources](https://example.com/research)
- [Audio Format Comparison](https://example.com/formats)

### Discussions
- [PR #1 Review Comments](https://github.com/user/repo/pull/1)

## Notes

### Open Questions
- Should we add more tracks in the future?
- Should we allow users to upload their own audio?

### Future Considerations
- Consider adding audio format conversion (MP3 → OGG fallback)
- Consider adding volume controls
- Consider adding audio visualization

### Lessons Learned
(To be filled after implementation)
