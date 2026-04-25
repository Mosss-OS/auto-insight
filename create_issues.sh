#!/bin/bash
# Batch create issues

declare -a titles=(
  "[P3] Implement database query optimization"
  "[P3] Add Redis caching layer"
  "[P3] Optimize bundle size with code splitting"
  "[P3] Implement lazy loading for routes"
  "[P3] Optimize images with CDN integration"
  "[P3] Add connection pooling"
  "[P3] Implement API response compression"
  "[P3] Optimize React re-renders"
  "[P3] Implement virtual scrolling for lists"
  "[P3] Add request deduplication"
  "[P3] Implement SWR for data fetching"
  "[P3] Optimize chart rendering performance"
  "[P3] Add prefetching for resources"
  "[P3] Implement optimistic updates"
  "[P3] Optimize state management"
  "[P3] Add memoization for expensive computations"
  "[P3] Implement query caching strategy"
  "[P3] Optimize Supabase queries"
  "[P3] Add response pagination"
  "[P3] Implement request batching"
  "[P3] Add WebSocket message compression"
  "[P3] Optimize CSS bundle"
  "[P3] Implement tree shaking"
  "[P3] Add dynamic imports"
  "[P3] Optimize font loading"
  "[P3] Implement critical CSS inline"
  "[P3] Add service worker caching"
  "[P3] Implement Brotli compression"
  "[P3] Optimize chart data processing"
  "[P3] Add query result memoization"
  "[P3] Implement component lazy loading"
  "[P3] Add bundle analysis workflow"
  "[P3] Optimize chart tooltip rendering"
  "[P3] Implement data pagination"
  "[P3] Add virtual DOM optimization"
  "[P3] Optimize form validation"
  "[P3] Implement state persistence"
  "[P3] Add API rate limit caching"
  "[P3] Optimize modal rendering"
  "[P3] Implement infinite scroll"
  "[P3] Add chart data aggregation"
  "[P3] Optimize animation performance"
  "[P3] Implement chunk loading strategy"
  "[P3] Add prefetch hints"
  "[P3] Optimize tooltip rendering"
  "[P3] Implement loading skeletons"
  "[P3] Add query retry logic"
  "[P3] Optimize list virtualization"
  "[P3] Implement error boundary caching"
  "[P3] Add transaction batching"
  "[P3] Optimize WebSocket reconnection"
)

# Get repository info
REPO="Mosss-OS/auto-insight"

# Create issues
for title in "${titles[@]}"; do
  echo "Creating: $title"
  gh issue create \
    --repo "$REPO" \
    --title "$title" \
    --body "## Description
Performance optimization task for improved application efficiency.

## Requirements
- Identify performance bottlenecks
- Implement optimization
- Measure improvements
- Document changes

## Acceptance Criteria
- [ ] Bottleneck identified
- [ ] Optimization applied
- [ ] Improvement measured
- [ ] Documentation updated" \
    --label "P3,performance" 2>&1
  sleep 0.5
done

echo "Performance issues batch complete"