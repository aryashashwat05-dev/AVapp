# Quick Mobile App Guide

## Where to Find Your Mobile App Files

### Android APK/AAB Files Location:
```
android/app/build/outputs/
├── apk/
│   ├── debug/app-debug.apk        # For testing
│   └── release/app-release.apk    # For distribution
└── bundle/
    └── release/app-release.aab    # For Google Play Store
```

## How to Generate Mobile App Files

### Method 1: Android Studio (Recommended)
1. Open Android Studio
2. Open your project: `npx cap open android`
3. Build > Generate Signed Bundle/APK
4. Choose APK or AAB
5. Select release variant
6. Sign with your keystore

### Method 2: Command Line
```bash
# Build the web app
npm run build

# Sync with Capacitor
npx cap sync

# Build Android app
npx cap build android
```

### Method 3: Direct APK Build
```bash
# After sync
cd android
./gradlew assembleDebug    # For testing
./gradlew assembleRelease   # For production
```

## Current Project Status

Your AgoraVote app has **dynamic routes** (`/room/[roomId]`) which means:
- ✅ PWA will work (needs server)
- ✅ Mobile app will work (connects to your server)
- ❌ Pure static export won't work

## Next Steps

1. **Fix build issues** (Firebase config, window object errors)
2. **Generate APK** using method above
3. **Test on device** with: `npx cap run android`
4. **Deploy to Play Store** with the release AAB

## File Locations After Build

```
windsurf-project/
├── android/
│   └── app/
│       └── build/
│           └── outputs/
│               ├── apk/debug/app-debug.apk      # ← YOUR APP FILE
│               └── bundle/release/app-release.aab # ← PLAY STORE FILE
├── .next/           # Web build assets
└── public/          # Static assets
```

The APK file is what you can install directly on Android devices.
The AAB file is for publishing to Google Play Store.
