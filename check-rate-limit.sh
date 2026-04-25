#!/bin/bash
# Rate limit check and deployment script

echo "====================================="
echo "Vercel Rate Limit Monitor"
echo "====================================="
echo ""

# Try to check if we can deploy
OUTPUT=$(vercel env ls 2>&1)

if echo "$OUTPUT" | grep -q "RATE_LIMIT" || echo "$OUTPUT" | grep -q "rate limit"; then
    echo "⏳ Vercel rate limit ACTIVE"
    echo "Waiting 5 minutes before retry..."
    sleep 300
    echo "Retrying..."
    vercel env ls
else
    echo "✅ Rate limit appears reset"
    echo ""
    echo "Deploying to production..."
    vercel --prod
fi