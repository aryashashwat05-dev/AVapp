// Extend the Window interface to include workbox
declare global {
  interface Window {
    workbox: any; // You can define a more specific type if needed
  }
}

export {}; // This file needs to be a module
