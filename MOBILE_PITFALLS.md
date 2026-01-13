# Mobile Development Pitfalls & Solutions

## 🔴 Critical Issues (Must Fix)

### Environment Variables
**Problem**: Environment variables from `.env` files don't work in static exports.
**Solution**: 
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Consider runtime configuration or API routes for sensitive data
- Test thoroughly after building static version

```bash
# ❌ Wrong - won't work in static build
API_KEY=secret_key

# ✅ Correct - available on client
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Firebase Configuration
**Problem**: Firebase config may expose sensitive data in static builds.
**Solution**:
- Keep Firebase config in environment variables
- Use Firebase security rules to protect data
- Consider server-side API routes for sensitive operations

### Dynamic Imports
**Problem**: Dynamic imports fail in static export.
**Solution**:
- Use `next/dynamic` with `ssr: false`
- Test all dynamic components in static build
- Consider loading critical components statically

## 🟡 Common Issues (Important)

### Image Optimization
**Problem**: Next.js image optimization doesn't work in static export.
**Solution**:
- Set `images.unoptimized: true` in `next.config.ts`
- Use static image imports or external CDN
- Pre-optimize images before deployment

### API Routes
**Problem**: API routes don't work in static exports.
**Solution**:
- Move API logic to external services
- Use serverless functions (Vercel, Netlify)
- Consider Firebase Cloud Functions

### Canvas/WebGL
**Problem**: Canvas-based features may not work on all mobile devices.
**Solution**:
- Test on actual devices, not just emulators
- Provide fallbacks for older devices
- Check WebGL support before using canvas features

### Touch Events
**Problem**: Desktop hover states don't translate well to mobile.
**Solution**:
- Use touch-specific event handlers
- Add proper touch feedback
- Test tap targets (minimum 44px recommended)

## 🟢 Performance Issues (Recommended)

### Bundle Size
**Problem**: Large JavaScript bundles slow mobile loading.
**Solution**:
- Use code splitting with `next/dynamic`
- Remove unused dependencies
- Optimize imports (tree shaking)

### Service Worker
**Problem**: Aggressive caching may serve stale content.
**Solution**:
- Implement proper cache invalidation
- Use network-first for critical API calls
- Provide cache refresh mechanism

### Memory Usage
**Problem**: Memory leaks cause app crashes on mobile.
**Solution**:
- Clean up event listeners and timers
- Use React.memo for expensive components
- Monitor memory usage in Chrome DevTools

## 🔧 Platform-Specific Issues

### Android
- **Back Button**: Handle Android back button properly
- **Permissions**: Request permissions at appropriate times
- **Deep Links**: Configure app links for deep navigation
- **Keyboard**: Adjust layout when keyboard appears

### iOS (if applicable)
- **Safe Areas**: Account for notches and home indicators
- **Gestures**: Handle iOS-specific gestures
- **Permissions**: iOS has stricter permission requirements
- **App Store**: Follow App Store guidelines strictly

### PWA Limitations
- **Push Notifications**: Limited support on iOS
- **Camera/Microphone**: Requires HTTPS and user permission
- **Background Sync**: Not supported on all browsers
- **File System**: Limited file system access

## 🚨 Security Concerns

### Client-Side Secrets
**Never expose**:
- API keys with admin privileges
- Database connection strings
- Private encryption keys
- Third-party service secrets

**Safe to expose**:
- Public API endpoints
- Firebase public config
- Analytics tracking IDs
- Public CDN URLs

### CORS Issues
**Problem**: Mobile apps may face CORS restrictions.
**Solution**:
- Configure proper CORS headers on your API
- Use proxy servers if needed
- Test API calls from mobile context

### Content Security Policy
**Problem**: CSP may block legitimate mobile app features.
**Solution**:
- Start with a lenient CSP policy
- Gradually tighten restrictions
- Test all features with CSP enabled

## 📱 Testing Pitfalls

### Emulator vs Real Device
**Don't rely solely on emulators**:
- Test on actual devices
- Check performance on older devices
- Test different screen sizes and densities
- Verify network conditions (3G, 4G, WiFi)

### Browser Differences
**Test across mobile browsers**:
- Chrome (Android)
- Safari (iOS)
- Samsung Internet
- Firefox Mobile

### Network Conditions
**Test poor connectivity**:
- Slow 3G networks
- Intermittent connectivity
- Offline scenarios
- Network timeouts

## 🔄 Build & Deployment Issues

### Static Export Failures
**Common causes**:
- Server-side code in components
- Dynamic routing without `generateStaticParams`
- Missing environment variables
- File system operations

### Capacitor Sync Issues
**Common problems**:
- Outdated web assets
- Missing platform files
- Version conflicts
- Permission issues

### App Store Rejection
**Common reasons**:
- Missing metadata
- Inadequate privacy policy
- Crashes on startup
- Inappropriate content

## 📋 Pre-Launch Checklist

### Technical
- [ ] All features work on target devices
- [ ] App handles offline gracefully
- [ ] Performance meets expectations
- [ ] Memory usage is reasonable
- [ ] No console errors in production
- [ ] Security scan passes

### User Experience
- [ ] Onboarding flow is clear
- [ ] Touch targets are appropriately sized
- [ ] App responds to orientation changes
- [ ] Loading states are handled
- [ ] Error messages are user-friendly

### Legal & Compliance
- [ ] Privacy policy is accessible
- [ ] Terms of service are clear
- [ ] Permissions are justified
- [ ] Data handling complies with regulations
- [ ] Age requirements are met

## 🆘 Emergency Fixes

### Quick Production Fixes
```bash
# 1. Hotfix deployment
npm run build:static
npx cap sync
npx cap run android

# 2. Rollback to previous version
git checkout previous-tag
npm run build:static
npx cap sync

# 3. Emergency debugging
npx cap run android -- --livereload --external
```

### Debugging Tools
- **Chrome DevTools**: Remote debugging for Android
- **Safari Web Inspector**: Debug iOS web views
- **Android Studio Logcat**: Native Android logs
- **Firebase Crashlytics**: Production crash reporting

## 📚 Additional Resources

### Documentation
- [Next.js Static Exports](https://nextjs.org/docs/advanced-features/static-html-export)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Android Developer Guide](https://developer.android.com/guide)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - PWA analysis
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Bundle size analysis
- [Device Testing](https://browserstack.com) - Cross-device testing
- [Performance Monitoring](https://firebase.google.com/docs/perf-mon) - Runtime performance
