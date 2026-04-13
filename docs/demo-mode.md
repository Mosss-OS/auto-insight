# Demo Mode

AutoInsight includes a comprehensive demo mode perfect for hackathon presentations and demonstrations.

## Activating Demo Mode

Demo mode is enabled by default when running locally. It allows you to:

- Simulate payments without real money
- Watch the autonomous agent loop in action
- Test all UI features without API keys

## Demo Walkthrough (60 seconds)

### Phase 1: Landing Page (0-10s)

1. Open the app at `http://localhost:5173`
2. Show the hero section with "Read this week's report" CTA
3. Click the button to navigate to the report view

### Phase 2: Report Preview (10-25s)

1. Show the free preview (~100 words)
2. Point out the "Pay $0.50 USDC" button
3. Explain the preview system

### Phase 3: Payment (25-35s)

1. Click "Pay $0.50 USDC"
2. In demo mode, this simulates a payment
3. Watch the payment confirmation
4. See the full report unlock

### Phase 4: Dashboard (35-50s)

1. Switch to the Dashboard tab
2. Show earnings metrics ($0.50 earned)
3. Point out the spending chart
4. Explain the transaction history

### Phase 5: Agent Loop (50-60s)

1. Click "Advance to Next Week"
2. Watch the agent autonomously:
   - Check wallet balance
   - Fetch reader payments
   - Purchase data APIs via Locus
   - Generate new report with Claude
   - Update stats in real-time
3. Observe the activity log

## Demo Controls

### Payment Simulation

In demo mode, clicking "Pay $0.50 USDC":
- Simulates a successful payment
- Adds $0.50 to earnings
- Unlocks the full report immediately

### Agent Loop Simulation

The "Advance to Next Week" button simulates:

```
┌─────────────────────────────────────────────────────────────┐
│                     ADVANCE TO NEXT WEEK                    │
├─────────────────────────────────────────────────────────────┤
│  Step 1: Checking wallet balance...      ✓ Complete        │
│  Step 2: Fetching recent earnings...     ✓ Complete        │
│  Step 3: Selecting APIs to purchase...  ✓ Complete        │
│  Step 4: Purchasing data APIs...        ✓ Complete        │
│  Step 5: Generating new report...        ✓ Complete        │
│  Step 6: Updating dashboard metrics...   ✓ Complete        │
└─────────────────────────────────────────────────────────────┘
```

### Budget Slider

Adjust the max weekly budget:
- Range: $0.50 - $10.00
- Default: $5.00
- Agent will not exceed this limit

## Presenter Tips

### Before Your Demo

1. **Reset State**: Clear any previous demo runs
2. **Prepare Data**: Have a few weeks of data pre-generated
3. **Test Flow**: Run through the entire demo once

### During Your Demo

1. **Narrate the Economic Loop**: Explain how the agent earns and spends
2. **Show the Dashboard**: Point to specific metrics
3. **Pause on Agent Actions**: Let the audience see each step
4. **Connect to Real World**: Mention how this applies to real AI services

### Key Talking Points

- "The agent earns real money from readers"
- "It reinvests that money into data APIs"
- "This creates a self-sustaining economic loop"
- "No human intervention required"

## Demo vs Production

| Feature | Demo Mode | Production |
|---------|-----------|------------|
| Payments | Simulated | Real USDC |
| AI Generation | Mock responses | Claude API |
| API Purchases | Mock data | Real Locus APIs |
| Wallet | Demo balance | Real wallet |
| Agent Loop | Fast-forward | Real-time |

## Troubleshooting Demo Issues

### Nothing Happens When Clicking Pay

- Check that demo mode is active
- Refresh the page
- Check browser console for errors

### Agent Loop Doesn't Advance

- Ensure you have demo data loaded
- Try clicking "Advance to Next Week" again
- Check the activity log for errors

### Dashboard Shows No Data

- This is normal for a fresh start
- Complete a payment first
- Then try advancing the week

---

Next: [Project Structure](project-structure.md)