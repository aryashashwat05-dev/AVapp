# Mobile App Setup Guide

## Prerequisites

### Android Development Environment
1. **Install Android Studio** from https://developer.android.com/studio
2. **Install Java JDK 17+** (Android Studio includes this)
3. **Set up Android SDK** through Android Studio
4. **Create an Android Virtual Device (AVD)** or connect a physical device

### Environment Variables (Optional but Recommended)
```bash
# For Windows (in System Properties > Environment Variables)
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
ANDROID_HOME=C:\Users\{YOUR_USERNAME}\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

## PWA Setup (Web-based)

### 1. Build the PWA
```bash
npm run build:static
```

### 2. Test PWA Locally
```bash
npm start
# Visit http://localhost:3000
# Open Chrome DevTools > Application > Manifest
# Click "Add to home screen" to test PWA installation
```

### 3. Deploy PWA
- Deploy the `out/` folder to any static hosting service
- Recommended: Netlify, Vercel, or GitHub Pages
- Ensure HTTPS is enabled (required for PWA)

## Capacitor Mobile App Setup

### 1. Build Static Export
```bash
npm run build:static
```

### 2. Initialize Capacitor (if not already done)
```bash
npx cap init "AgoraVote" "com.agoravote.app"
```

### 3. Add Platforms
```bash
# Android (required)
npx cap add android

# iOS (optional - requires macOS)
npx cap add ios
```

### 4. Sync Web Assets
```bash
npx cap sync
```

### 5. Open Android Studio
```bash
npx cap open android
```

### 6. Run on Device/Emulator
```bash
# Through Android Studio:
# 1. Select your device/emulator
# 2. Click "Run" button (green play icon)

# Or via command line:
npx cap run android
```

## Production Build

### 1. Create Signing Key (for Google Play Store)
```bash
# In your project root directory
keytool -genkey -v -keystore agoravote.keystore -alias agoravote -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Build Release APK
```bash
# In Android Studio:
# 1. Build > Generate Signed Bundle/APK
# 2. Select APK or AAB
# 3. Use your keystore file
# 4. Choose release variant

# Or via command line:
npx cap build android
```

### 3. Test Release Build
```bash
# Install APK on device:
adb install app-release.apk
```

## File Structure After Setup

```
windsurf-project/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── icon-*.png            # App icons
│   └── out/                  # Static build output
├── android/                  # Android project (auto-generated)
├── ios/                      # iOS project (auto-generated, optional)
├── capacitor.config.ts       # Capacitor configuration
└── next.config.ts           # Next.js configuration
```

## Common Issues & Solutions

### Build Issues
- **"Cannot find module"**: Run `npm install` to ensure dependencies
- **"TypeScript errors"**: Check `tsconfig.json` and ensure all types are installed
- **"Static export failed"**: Check for dynamic imports or server-side code

### Android Issues
- **"SDK not found"**: Verify `ANDROID_HOME` environment variable
- **"Device not detected"**: Enable USB debugging on device
- **"Build failed"**: Check Android Studio logs for specific errors

### PWA Issues
- **"Service worker not registering"**: Check HTTPS requirement
- **"Manifest not found"**: Verify file paths in `public/`
- **"Icons not loading"**: Ensure all icon sizes exist

## Testing Checklist

### PWA Testing
- [ ] Manifest loads correctly
- [ ] Service worker registers
- [ ] App works offline
- [ ] "Add to Home Screen" prompt appears
- [ ] App launches in standalone mode

### Mobile App Testing
- [ ] App builds without errors
- [ ] App installs on device
- [ ] All features work on mobile
- [ ] Push notifications (if implemented)
- [ ] Deep links work (if implemented)

## Deployment

### Google Play Store
1. Create Google Play Developer account ($25 one-time fee)
2. Upload signed APK/AAB
3. Complete store listing
4. Submit for review

### App Store (iOS)
1. Requires macOS and Xcode
2. Apple Developer account ($99/year)
3. Follow iOS-specific guidelines
4. Submit for review

### PWA Deployment
1. Deploy `out/` folder to hosting service
2. Ensure HTTPS is enabled
3. Test on mobile browsers
4. Submit to app stores (optional via PWA wrappers)
