# Vercel Deployment Guide

## Prerequisites
- Backend API deployed and accessible (e.g., Railway, Heroku, AWS)
- Vercel account (free tier available)

## Step 1: Environment Variables
In Vercel dashboard, set these environment variables:
```
VITE_API_URL=https://my-bank-api-p57h.onrender.com/api
```

## Step 2: Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. Add environment variables in the deployment settings
7. Click "Deploy"

## Step 3: Configuration Files Created
- `vercel.json` - Vercel deployment configuration
- `.env.example` - Environment variable template

## Important Notes
- The app uses SPA routing - all routes redirect to `index.html`
- API calls in production use direct backend URL (no proxy)
- Development still uses Vite proxy at `/api`
- Build creates optimized static assets in `dist/`

## Troubleshooting
- **API Errors**: Ensure `VITE_API_URL` is set correctly in Vercel
- **404 Errors**: SPA routing handles client-side routing
- **Build Issues**: Run `npm run build` locally first

## Post-Deployment
1. Test all API endpoints
2. Verify authentication flow
3. Check responsive design
4. Monitor Vercel logs for any issues
