import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'agoravote.netlify.app',
  appName: 'AgoraVote',
  webDir: '.next',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'agoravote.keystore',
      keystoreAlias: 'agoravote',
      releaseSigningEnabled: false
    }
  }
};

export default config;
