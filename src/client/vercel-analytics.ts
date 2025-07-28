import { inject } from '@vercel/analytics';

// Extend the global window object to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export function onClientLoad() {
  inject({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    debug: process.env.NODE_ENV !== 'production',
    beforeSend: (event) => {
      // Filter out specific paths you don't want to track
      if (event.url.includes('/internal/') || event.url.includes('/draft/')) {
        return null;
      }
      
      // Return the event as-is (Vercel Analytics handles most tracking automatically)
      return event;
    },
  });

  // Set up Google Analytics consent mode defaults
  if (typeof window !== 'undefined' && window.gtag) {
    // Initialize GA4 with consent mode defaults
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      wait_for_update: 500,
    });
  }
} 