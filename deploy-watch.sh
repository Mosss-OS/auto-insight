#!/bin/bash
# Deployment watch script
START_TIME=$(date +%s)
LIMIT_RESET=$((START_TIME + 86400))  # 24 hours

echo "🚀 Deployment Monitor Started"
echo "⏰ Rate limit resets at: $(date -d @$LIMIT_RESET '+%Y-%m-%d %H:%M:%S')"
echo ""

while true; do
  CURRENT=$(date +%s)
  REMAINING=$((LIMIT_RESET - CURRENT))
  
  if [ $REMAINING -le 0 ]; then
    echo "✅ Rate limit window open! Attempting deploy..."
    vercel --prod
    break
  fi
  
  HOURS=$((REMAINING / 3600))
  MINS=$(((REMAINING % 3600) / 60))
  SECS=$((REMAINING % 60))
  
  echo "⏳ Rate limit active - ${HOURS}h ${MINS}m ${SECS}s remaining"
  sleep 300  # Check every 5 minutes
done
