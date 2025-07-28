import React, { useEffect } from 'react';
import ConsentBanner from '@site/src/components/ConsentBanner';
import { initializePageTracking } from '@site/src/utils/analytics';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): React.ReactElement {
  useEffect(() => {
    // Initialize analytics tracking when the app loads
    const cleanup = initializePageTracking();
    
    // Cleanup on component unmount
    return cleanup;
  }, []);

  const handleConsentChange = (hasConsent: boolean) => {
    // Additional handling for consent changes can be added here
    console.log(`Analytics consent: ${hasConsent ? 'granted' : 'denied'}`);
  };

  return (
    <>
      {children}
      <ConsentBanner onConsentChange={handleConsentChange} />
    </>
  );
} 