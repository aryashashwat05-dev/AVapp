# 🚀 Next.js Runtime Deployment Fixes

## 🚨 Common Issues & Solutions

### 1. Memory Issues (Out of Memory)
**Problem**: Build fails with "Zone Allocation failed - process out of memory"

**Solution**:
```bash
# Use increased memory limit
export NODE_OPTIONS=--max-old-space-size=4096
npm run build

# Or in package.json:
"build:prod": "NODE_ENV=production NODE_OPTIONS=--max-old-space-size=4096 next build"
```

### 2. Canvas Package Issues
**Problem**: Canvas package causes runtime errors in production

**Fixed in next.config.ts**:
```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      encoding: false,
    };
  }
  if (isServer) {
    config.externals = config.externals || [];
    config.externals.push('canvas');
  }
  return config;
}
```

### 3. Deprecated Turbopack Config
**Problem**: "experimental.turbo is deprecated" warning

**Fixed**: Changed to `turbopack` instead of `experimental.turbo`

### 4. Firebase Runtime Issues
**Problem**: Firebase initialization fails in production

**Fixed**: Always use config object instead of environment variables

## 📋 Deployment Commands

### For Production Build:
```bash
npm run build:prod
```

### For Static Export (if needed):
```bash
npm run build:static
```

### Start Production Server:
```bash
npm start
```

## 🔧 Environment Variables

Create `.env.production`:
```
NODE_ENV=production
```

## 🌐 Deployment Platforms

### Vercel (Recommended):
1. Connect your repo
2. Vercel automatically handles builds
2. No additional configuration needed

### Netlify:
1. Build command: `npm run build:prod`
2. Publish directory: `.next`
3. Node version: 18+

### Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod
EXPOSE 3000
CMD ["npm", "start"]
```

### Railway/Render:
- Build command: `npm run build:prod`
- Start command: `npm start`
- Node version: 18+

## ⚡ Performance Optimizations

1. **Memory**: 4GB RAM recommended for builds
2. **Node version**: Use Node 18+ 
3. **Cache**: Enable build caching on your platform
4. **CDN**: Use CDN for static assets

## 🐛 Debug Tips

1. Check build logs for memory warnings
2. Monitor Node.js process during build
3. Use `--debug` flag for detailed logs
4. Clear node_modules and reinstall if needed

## 📱 Mobile App Deployment

Your mobile app (APK) is already built and ready:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

For Play Store, sign the release APK with your keystore.
