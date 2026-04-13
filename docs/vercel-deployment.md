# Vercel Deployment Guide

This guide covers deploying AutoInsight to Vercel.

## Prerequisites

- [Vercel account](https://vercel.com)
- GitHub repository connected

## Environment Variables

Set these in Vercel dashboard under Settings > Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_LOCUS_API_KEY` | Locus API key | No (demo mode) |
| `VITE_LOCUS_CHECKOUT_PUBLISHABLE_KEY` | Locus checkout key | No |
| `VITE_LOCUS_WALLET_ADDRESS` | Wallet for payments | No |
| `VITE_ANTHROPIC_API_KEY` | Anthropic Claude API key | No |

## Deploy Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Add each variable from `.env.example`
   - Click "Deploy"

## Production URL

Your app will be live at: `https://your-project.vercel.app`

## Custom Domain

1. Go to Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

## Troubleshooting

### Build Fails

- Check that `npm run build` works locally
- Verify all dependencies are in `package.json`

### Environment Variables Not Working

- Redeploy after adding new environment variables
- Check variable names match exactly

### API Keys Not Working

- Ensure production API keys have correct permissions
- Check API keys are not in demo/test mode