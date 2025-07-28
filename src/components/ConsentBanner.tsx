import React, { useState, useEffect } from 'react';
import styles from './ConsentBanner.module.css';

interface ConsentBannerProps {
  onConsentChange?: (hasConsent: boolean) => void;
}

export default function ConsentBanner({ onConsentChange }: ConsentBannerProps): React.ReactElement | null {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved consent preference
    const savedConsent = localStorage.getItem('collabops-analytics-consent');
    
    if (savedConsent !== null) {
      const hasConsent = savedConsent === 'true';
      setConsent(hasConsent);
      onConsentChange?.(hasConsent);
    } else {
      // Show banner if no preference is saved
      setIsVisible(true);
    }
  }, [onConsentChange]);

  const handleConsent = (hasConsent: boolean) => {
    localStorage.setItem('collabops-analytics-consent', String(hasConsent));
    setConsent(hasConsent);
    setIsVisible(false);
    onConsentChange?.(hasConsent);

    // Enable/disable GA4 based on consent
    if (typeof window !== 'undefined' && window.gtag) {
      if (hasConsent) {
        // Grant analytics storage consent
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied', // We don't use ads
        });
      } else {
        // Deny analytics storage consent
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
        });
      }
    }
  };

  // Don't render if consent has been set or banner shouldn't be visible
  if (consent !== null || !isVisible) {
    return null;
  }

  return (
    <div className={styles.consentBanner}>
      <div className={styles.consentContent}>
        <div className={styles.consentText}>
          <h4 className={styles.consentTitle}>🍪 Cookie Notice</h4>
          <p className={styles.consentDescription}>
            We use analytics cookies to understand how you use our documentation and to improve it. 
            We also use privacy-friendly Vercel Analytics that doesn't require cookies.
            <br />
            <a 
              href="/privacy-policy" 
              className={styles.privacyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more about our privacy practices
            </a>
          </p>
        </div>
        <div className={styles.consentButtons}>
          <button 
            onClick={() => handleConsent(true)}
            className={`${styles.consentButton} ${styles.acceptButton}`}
            type="button"
          >
            Accept All
          </button>
          <button 
            onClick={() => handleConsent(false)}
            className={`${styles.consentButton} ${styles.declineButton}`}
            type="button"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
} 