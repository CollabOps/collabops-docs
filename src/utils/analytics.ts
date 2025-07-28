/**
 * Analytics utilities for CollabOps Documentation Site
 * Provides type-safe event tracking for Google Analytics 4
 */

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

/**
 * Generic event tracking function
 * @param eventName - The name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Documentation-specific event tracking utilities
 * Tailored for CollabOps documentation site interactions
 */
export const trackDocEvent = {
  /**
   * Track sidebar navigation clicks
   * @param category - Documentation category (e.g., 'API Reference', 'Getting Started')
   * @param docTitle - Title of the document being navigated to
   * @param docPath - Path of the document
   */
  sidebarNavigation: (category: string, docTitle: string, docPath: string): void => {
    trackEvent('sidebar_navigation', {
      doc_category: category,
      doc_title: docTitle,
      doc_path: docPath,
      event_category: 'navigation',
    });
  },

  /**
   * Track search usage within the documentation
   * @param query - The search query entered by the user
   * @param resultsCount - Number of results returned
   * @param resultClicked - Whether a result was clicked (optional)
   */
  search: (query: string, resultsCount: number, resultClicked?: boolean): void => {
    trackEvent('search', {
      search_term: query,
      results_count: resultsCount,
      result_clicked: resultClicked || false,
      event_category: 'search',
    });
  },

  /**
   * Track GitHub edit button clicks
   * @param docPath - Path of the document being edited
   * @param section - Section of the site (docs, blog, etc.)
   */
  editOnGitHub: (docPath: string, section: string = 'docs'): void => {
    trackEvent('edit_on_github', {
      doc_path: docPath,
      doc_section: section,
      event_category: 'contribution',
    });
  },

  /**
   * Track code block copy events
   * @param language - Programming language of the copied code
   * @param docPath - Path of the document containing the code
   * @param blockIndex - Index of the code block on the page (optional)
   */
  codeCopy: (language: string, docPath: string, blockIndex?: number): void => {
    trackEvent('code_copy', {
      code_language: language,
      doc_path: docPath,
      block_index: blockIndex,
      event_category: 'engagement',
    });
  },

  /**
   * Track external link clicks from documentation
   * @param linkUrl - URL of the external link
   * @param linkText - Text of the link
   * @param docPath - Path of the document containing the link
   */
  externalLinkClick: (linkUrl: string, linkText: string, docPath: string): void => {
    trackEvent('external_link_click', {
      link_url: linkUrl,
      link_text: linkText,
      doc_path: docPath,
      event_category: 'outbound',
    });
  },

  /**
   * Track feedback interactions (helpful/not helpful buttons)
   * @param docPath - Path of the document
   * @param feedbackType - Type of feedback ('helpful' or 'not_helpful')
   * @param additionalComment - Optional additional comment
   */
  feedbackProvided: (
    docPath: string, 
    feedbackType: 'helpful' | 'not_helpful',
    additionalComment?: string
  ): void => {
    trackEvent('feedback_provided', {
      doc_path: docPath,
      feedback_type: feedbackType,
      additional_comment: additionalComment || '',
      event_category: 'feedback',
    });
  },

  /**
   * Track time spent reading documentation
   * @param docPath - Path of the document
   * @param timeSpent - Time spent in seconds
   * @param scrollDepth - How far down the page the user scrolled (0-100)
   */
  documentEngagement: (docPath: string, timeSpent: number, scrollDepth: number): void => {
    trackEvent('document_engagement', {
      doc_path: docPath,
      time_spent: timeSpent,
      scroll_depth: scrollDepth,
      event_category: 'engagement',
    });
  },

  /**
   * Track API documentation interactions
   * @param endpoint - API endpoint being viewed
   * @param method - HTTP method (GET, POST, etc.)
   * @param action - Action taken ('view', 'copy_example', 'test')
   */
  apiDocumentation: (endpoint: string, method: string, action: string): void => {
    trackEvent('api_documentation', {
      api_endpoint: endpoint,
      http_method: method,
      api_action: action,
      event_category: 'api_docs',
    });
  },

  /**
   * Track download events (PDFs, examples, etc.)
   * @param fileName - Name of the downloaded file
   * @param fileType - Type of file (pdf, zip, etc.)
   * @param docPath - Path of the document containing the download link
   */
  downloadFile: (fileName: string, fileType: string, docPath: string): void => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      doc_path: docPath,
      event_category: 'download',
    });
  },
};

/**
 * Performance tracking utilities
 */
export const trackPerformance = {
  /**
   * Track page load performance
   * @param docPath - Path of the document
   * @param loadTime - Load time in milliseconds
   */
  pageLoad: (docPath: string, loadTime: number): void => {
    trackEvent('page_performance', {
      doc_path: docPath,
      load_time: loadTime,
      event_category: 'performance',
    });
  },

  /**
   * Track search performance
   * @param query - Search query
   * @param responseTime - Time to return results in milliseconds
   */
  searchPerformance: (query: string, responseTime: number): void => {
    trackEvent('search_performance', {
      search_term: query,
      response_time: responseTime,
      event_category: 'performance',
    });
  },
};

/**
 * Utility to get current document path for tracking
 * @returns Current document path relative to site root
 */
export const getCurrentDocPath = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '';
};

/**
 * Utility to get document category from current path
 * @returns Document category based on URL structure
 */
export const getDocCategory = (): string => {
  const path = getCurrentDocPath();
  
  if (path.startsWith('/docs/api/')) return 'API Reference';
  if (path.startsWith('/docs/self-hosting/')) return 'Self-Hosting';
  if (path.startsWith('/docs/faq/')) return 'FAQ';
  if (path.startsWith('/docs/getting-started')) return 'Getting Started';
  if (path.startsWith('/docs/')) return 'Documentation';
  if (path.startsWith('/blog/')) return 'Release Notes';
  
  return 'General';
};

/**
 * Initialize analytics tracking for the current page
 * Call this on page load to set up automatic tracking
 * @returns Cleanup function to remove event listeners
 */
export const initializePageTracking = (): (() => void) => {
  const docPath = getCurrentDocPath();
  const category = getDocCategory();
  
  // Track page view with custom dimensions
  if (window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      custom_map: {
        dimension1: category,
        dimension2: 'v1.0', // Document version
      },
    });
  }
  
  // Set up scroll depth tracking
  let maxScrollDepth = 0;
  let startTime = Date.now();
  
  const trackScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
    
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
    }
  };
  
  // Track engagement when user leaves the page
  const trackEngagement = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent > 10) { // Only track if user spent more than 10 seconds
      trackDocEvent.documentEngagement(docPath, timeSpent, maxScrollDepth);
    }
  };
  
  // Set up event listeners
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  window.addEventListener('beforeunload', trackEngagement);
  
  // Clean up event listeners when needed
  return () => {
    window.removeEventListener('scroll', trackScrollDepth);
    window.removeEventListener('beforeunload', trackEngagement);
  };
}; 