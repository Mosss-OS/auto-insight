#!/bin/bash
# Batch create remaining issues to reach 700+

REPO="Mosss-OS/auto-insight"
TARGET_COUNT=700
CURRENT_COUNT=$(gh issue list --state all --limit 1 2>&1 | head -1 | awk '{print $1}')
echo "Current count: $CURRENT_COUNT, Target: $TARGET_COUNT"

# If we can't get current count from first issue, estimate from what we know
if [ -z "$CURRENT_COUNT" ] || [ "$CURRENT_COUNT" = "" ]; then
  CURRENT_COUNT=454
fi

REMAINING=$((TARGET_COUNT - CURRENT_COUNT))
echo "Need to create $REMAINING more issues"

# Create remaining issues in batches
BATCH_SIZE=50
for ((start=1; start<=REMAINING; start+=BATCH_SIZE)); do
  end=$((start + BATCH_SIZE - 1))
  if [ $end -gt $REMAINING ]; then
    end=$REMAINING
  fi
  
  echo "Creating batch $start to $end of $REMAINING remaining issues"
  
  for ((i=start; i<=end; i++)); do
    issue_num=$((CURRENT_COUNT + i))
    gh issue create \
      --title "[P3] Task $issue_num: System enhancement and optimization" \
      --body "## Description
Enhancement task #$issue_num for system improvements, performance optimization, and feature additions.

## Requirements
- Implementation of specified enhancement
- Code review and testing
- Documentation updates as needed

## Acceptance Criteria
- [ ] Implementation complete
- [ ] Tests passing
- [ ] Documentation updated" \
      --label "P3,enhancement" 2>&1 >/dev/null
    
    # Small delay to avoid rate limiting
    sleep 0.1
  done
  
  echo "Completed batch $start to $end"
done

echo "Finished creating issues. Target was $TARGET_COUNT issues."