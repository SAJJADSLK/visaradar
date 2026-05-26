# SpinPick Clone — Vercel Deployment Guide

## Quick Start

This project is ready for deployment on Vercel. Follow these steps:

### 1. Prerequisites
- GitHub account with the repository pushed
- Vercel account (free tier available)

### 2. Deploy to Vercel

**Option A: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will auto-detect Vite configuration
5. Click "Deploy"

**Option B: Using Vercel CLI**
```bash
npm install -g vercel
vercel
```

### 3. Build Configuration
- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install` (or `pnpm install`)

### 4. Environment Variables (Optional)
If needed, add these in Vercel dashboard under Settings → Environment Variables:
- `VITE_ANALYTICS_ENDPOINT` - Analytics tracking endpoint
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID
- `NODE_ENV` - Set to `production`

### 5. Post-Deployment
- Your site will be live at `https://your-project.vercel.app`
- Custom domain can be added in Vercel dashboard
- All features work out of the box (localStorage, sound effects, themes, etc.)

## Project Structure

```
spinpick_clone/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── index.css   # Global styles
│   ├── public/         # Static assets
│   └── index.html      # Entry HTML
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
└── vercel.json         # Vercel deployment config
```

## Features

✅ **Fully Functional**
- Create and save wheels (localStorage)
- Spin with sound effects
- Weighted entries
- Team division
- Custom themes (6 colors)
- CSV import/export
- Full-screen mode
- Responsive design

✅ **SEO Optimized**
- Meta tags for social sharing
- Open Graph tags
- robots.txt and sitemap.xml
- Semantic HTML

✅ **Performance**
- Optimized bundle size
- Fast load times
- Smooth animations
- No external API dependencies

## Troubleshooting

**Build fails on Vercel?**
- Check Node.js version (should be 18+)
- Verify all dependencies are listed in package.json
- Check for TypeScript errors: `npm run check`

**Wheels not saving after refresh?**
- localStorage works in production
- Check browser console for errors
- Verify no Content Security Policy issues

**Sound effects not working?**
- Check browser permissions
- Verify Web Audio API is enabled
- Test in different browser if needed

## Support

For issues or questions:
1. Check the browser console for errors
2. Review Vercel deployment logs
3. Test locally with `npm run dev` first

---

**Ready to deploy?** Push to GitHub and connect your repository to Vercel!
