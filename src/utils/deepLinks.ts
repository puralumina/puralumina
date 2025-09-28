// Deep linking utilities for forcing browser navigation from social media apps
export interface DeepLinkOptions {
  forceNewWindow?: boolean;
  fallbackUrl?: string;
  delay?: number;
}

// Enhanced device and browser detection
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  return /Android/i.test(navigator.userAgent);
};

// Detect social media in-app browsers
export const isInstagramBrowser = (): boolean => {
  return /Instagram/i.test(navigator.userAgent);
};

export const isFacebookBrowser = (): boolean => {
  return /FBAN|FBAV|FB_IAB|FB4A/i.test(navigator.userAgent);
};

export const isTikTokBrowser = (): boolean => {
  return /TikTok/i.test(navigator.userAgent) || /musical_ly/i.test(navigator.userAgent);
};

export const isTwitterBrowser = (): boolean => {
  return /Twitter/i.test(navigator.userAgent);
};

export const isLinkedInBrowser = (): boolean => {
  return /LinkedInApp/i.test(navigator.userAgent);
};

export const isSocialMediaBrowser = (): boolean => {
  return isInstagramBrowser() || isFacebookBrowser() || isTikTokBrowser() || 
         isTwitterBrowser() || isLinkedInBrowser();
};

export const isWebView = (): boolean => {
  // Detect various WebView implementations
  const ua = navigator.userAgent;
  return /wv|WebView|Version.*Chrome/i.test(ua) || 
         !/Safari/i.test(ua) && /Chrome/i.test(ua) ||
         isSocialMediaBrowser();
};

// Get the current domain
export const getCurrentDomain = (): string => {
  return window.location.origin;
};

// Create deep link URL with proper scheme
export const createDeepLink = (path: string): string => {
  const domain = getCurrentDomain();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${domain}${cleanPath}`;
};

// NUCLEAR OPTION: Multiple simultaneous escape attempts
const nuclearEscape = (url: string): void => {
  console.log('🚨 NUCLEAR ESCAPE: Attempting all methods simultaneously');
  
  // Method 1: Rapid-fire window.open attempts
  const targets = ['_blank', '_top', '_parent', '_self', 'newWindow'];
  targets.forEach((target, index) => {
    setTimeout(() => {
      try {
        const newWindow = window.open(url, target, 'noopener,noreferrer,width=800,height=600');
        console.log(`🎯 Window.open attempt ${index + 1} (${target}):`, newWindow ? 'Success' : 'Blocked');
      } catch (e) {
        console.log(`❌ Window.open ${target} failed:`, e);
      }
    }, index * 50); // Stagger attempts by 50ms
  });

  // Method 2: Location manipulation attempts
  setTimeout(() => {
    const locationMethods = [
      () => { if (window.top) window.top.location.href = url; },
      () => { if (window.parent) window.parent.location.href = url; },
      () => { window.location.replace(url); },
      () => { window.location.assign(url); },
      () => { window.location.href = url; }
    ];

    locationMethods.forEach((method, index) => {
      setTimeout(() => {
        try {
          method();
          console.log(`🎯 Location method ${index + 1}: Attempted`);
        } catch (e) {
          console.log(`❌ Location method ${index + 1} failed:`, e);
        }
      }, index * 100);
    });
  }, 300);

  // Method 3: Create invisible iframe and try to navigate it
  setTimeout(() => {
    try {
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;top:-100px;left:-100px;opacity:0;pointer-events:none;';
      iframe.src = url;
      document.body.appendChild(iframe);
      
      setTimeout(() => {
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.location.href = url;
          }
        } catch (e) {
          console.log('❌ Iframe navigation failed:', e);
        }
        iframe.remove();
      }, 500);
      
      console.log('🎯 Iframe method: Attempted');
    } catch (e) {
      console.log('❌ Iframe method failed:', e);
    }
  }, 600);

  // Method 4: Try to trigger download which might open browser
  setTimeout(() => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.cssText = 'position:absolute;top:-100px;left:-100px;opacity:0;pointer-events:none;';
      document.body.appendChild(link);
      
      // Simulate multiple click events
      ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'].forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
      });
      
      setTimeout(() => link.remove(), 1000);
      console.log('🎯 Link simulation method: Attempted');
    } catch (e) {
      console.log('❌ Link simulation failed:', e);
    }
  }, 800);

  // Method 5: Android Intent URL (for Android devices)
  if (isAndroid()) {
    setTimeout(() => {
      try {
        const intentUrl = `intent://${url.replace(/https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
        window.location.href = intentUrl;
        console.log('🎯 Android Intent method: Attempted');
      } catch (e) {
        console.log('❌ Android Intent failed:', e);
      }
    }, 1000);
  }

  // Method 6: iOS Universal Link attempt (for iOS devices)
  if (isIOS()) {
    setTimeout(() => {
      try {
        // Try to trigger iOS to open in Safari
        const safariUrl = `x-web-search://?${encodeURIComponent(url)}`;
        window.location.href = safariUrl;
        
        // Fallback to regular URL after short delay
        setTimeout(() => {
          window.location.href = url;
        }, 500);
        
        console.log('🎯 iOS Safari method: Attempted');
      } catch (e) {
        console.log('❌ iOS Safari method failed:', e);
      }
    }, 1200);
  }

  // Method 7: Force page refresh with new URL
  setTimeout(() => {
    try {
      window.location.replace(url);
      console.log('🎯 Force replace method: Attempted');
    } catch (e) {
      console.log('❌ Force replace failed:', e);
    }
  }, 1500);

  // Method 8: Try document.location
  setTimeout(() => {
    try {
      (document as any).location = url;
      console.log('🎯 Document location method: Attempted');
    } catch (e) {
      console.log('❌ Document location failed:', e);
    }
  }, 1800);

  // Method 9: History manipulation
  setTimeout(() => {
    try {
      window.history.replaceState(null, '', url);
      window.location.reload();
      console.log('🎯 History manipulation method: Attempted');
    } catch (e) {
      console.log('❌ History manipulation failed:', e);
    }
  }, 2000);
};

// Force open in default browser (main function)
export const handleDeepLink = (
  path: string, 
  forceExternal: boolean = true, 
  options: DeepLinkOptions = {}
): void => {
  const { forceNewWindow = true, delay = 50 } = options;
  const fullUrl = createDeepLink(path);
  
  console.log(`🔗 Deep Link: Attempting to open ${fullUrl}`);
  console.log(`📱 User Agent: ${navigator.userAgent}`);
  console.log(`🌐 Is Social Media Browser: ${isSocialMediaBrowser()}`);
  console.log(`📲 Is WebView: ${isWebView()}`);
  
  if (forceExternal) {
    // Handle social media in-app browsers with NUCLEAR approach
    if (isSocialMediaBrowser() || isWebView()) {
      handleSocialMediaBrowser(fullUrl, delay);
    } else if (isMobileDevice()) {
      handleMobileDeepLink(fullUrl, delay);
    } else {
      handleDesktopDeepLink(fullUrl, forceNewWindow, delay);
    }
  } else {
    // Regular navigation
    window.location.href = fullUrl;
  }
};

// Handle social media in-app browsers with NUCLEAR option (NO POPUP)
const handleSocialMediaBrowser = (url: string, delay: number): void => {
  console.log('🚀 NUCLEAR APPROACH: Escaping social media browser silently...');
  
  // Immediate nuclear escape - no popup, no user interaction
  setTimeout(() => {
    nuclearEscape(url);
  }, delay);
  
  // Additional aggressive attempts
  setTimeout(() => {
    // Try meta refresh
    try {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'refresh';
      meta.content = `0;url=${url}`;
      document.head.appendChild(meta);
      console.log('🎯 Meta refresh method: Attempted');
    } catch (e) {
      console.log('❌ Meta refresh failed:', e);
    }
  }, 2500);

  // Final desperate attempt
  setTimeout(() => {
    try {
      window.open(url, '_self');
      console.log('🎯 Final self-navigation: Attempted');
    } catch (e) {
      console.log('❌ Final attempt failed:', e);
    }
  }, 3000);
};

// Handle mobile deep linking
const handleMobileDeepLink = (url: string, delay: number): void => {
  console.log('📱 Mobile deep link handling');
  
  if (isIOS()) {
    // iOS: Multiple fallback methods
    setTimeout(() => {
      console.log('🍎 iOS handling');
      
      // Try window.open first
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // Fallback methods
      setTimeout(() => {
        if (!newWindow || newWindow.closed) {
          console.log('iOS fallback: location.replace');
          window.location.replace(url);
        }
      }, 300);
      
    }, delay);
  } else if (isAndroid()) {
    // Android: Try multiple methods for better compatibility
    setTimeout(() => {
      console.log('🤖 Android handling');
      
      // Method 1: Intent URL for Android
      const intentUrl = `intent://${url.replace(/https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
      
      try {
        window.location.href = intentUrl;
        console.log('✅ Android intent URL attempted');
      } catch (e) {
        console.log('Android intent failed, trying window.open');
        
        // Method 2: Regular window.open
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        
        // Method 3: Fallback to location.replace
        setTimeout(() => {
          if (!newWindow || newWindow.closed) {
            console.log('Android fallback: location.replace');
            window.location.replace(url);
          }
        }, 500);
      }
      
    }, delay);
  } else {
    // Other mobile devices
    setTimeout(() => {
      console.log('📱 Other mobile device handling');
      window.location.replace(url);
    }, delay);
  }
};

// Handle desktop deep linking
const handleDesktopDeepLink = (url: string, forceNewWindow: boolean, delay: number): void => {
  console.log('💻 Desktop deep link handling');
  
  setTimeout(() => {
    if (forceNewWindow) {
      // Open in new tab/window
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // Fallback if popup blocked
      if (!newWindow) {
        console.log('Desktop popup blocked, using location.href');
        window.location.href = url;
      }
    } else {
      // Same window navigation
      window.location.href = url;
    }
  }, delay);
};

// Create deep link for specific page types
export const createPageDeepLink = (pageType: string, identifier?: string): string => {
  switch (pageType) {
    case 'home':
      return createDeepLink('/');
    case 'links':
    case 'bio':
      return createDeepLink('/links');
    case 'shop':
      return createDeepLink('/shop');
    case 'product':
      return createDeepLink(`/product/${identifier}`);
    case 'custom':
      return createDeepLink(`/custom/${identifier}`);
    case 'admin':
      return createDeepLink('/admin');
    case 'admin-login':
      return createDeepLink('/admin/login');
    default:
      return createDeepLink(pageType);
  }
};

// Handle deep link with page type
export const handlePageDeepLink = (
  pageType: string, 
  identifier?: string, 
  forceExternal: boolean = true,
  options: DeepLinkOptions = {}
): void => {
  const path = createPageDeepLink(pageType, identifier);
  handleDeepLink(path, forceExternal, options);
};

// Create shareable deep links for social media, etc.
export const createShareableLink = (pageType: string, identifier?: string): string => {
  return createPageDeepLink(pageType, identifier);
};

// Handle email deep links (special case)
export const handleEmailDeepLink = (email: string, subject?: string, body?: string): void => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const mailtoUrl = `mailto:${email}${params.toString() ? '?' + params.toString() : ''}`;
  
  if (isMobileDevice()) {
    // Mobile: Use location.replace for better email app integration
    window.location.replace(mailtoUrl);
  } else {
    // Desktop: Use window.location.href
    window.location.href = mailtoUrl;
  }
};

// Generate QR code URL for deep links (using external service)
export const generateQRCodeUrl = (pageType: string, identifier?: string): string => {
  const deepLink = createPageDeepLink(pageType, identifier);
  const encodedUrl = encodeURIComponent(deepLink);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
};

// Analytics tracking for deep links
export const trackDeepLinkUsage = (pageType: string, identifier?: string): void => {
  const deepLink = createPageDeepLink(pageType, identifier);
  console.log(`📊 Deep Link Analytics: ${pageType}${identifier ? ` (${identifier})` : ''} - ${deepLink}`);
  
  // You can integrate with your analytics service here
  // Example: gtag('event', 'deep_link_click', { page_type: pageType, identifier });
};

// Batch create deep links for multiple pages
export const createBatchDeepLinks = (pages: Array<{type: string, identifier?: string}>): string[] => {
  return pages.map(page => createPageDeepLink(page.type, page.identifier));
};

// Validate deep link format
export const isValidDeepLink = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.origin === getCurrentDomain();
  } catch {
    return false;
  }
};

// Copy deep link to clipboard
export const copyDeepLinkToClipboard = async (pageType: string, identifier?: string): Promise<boolean> => {
  try {
    const deepLink = createPageDeepLink(pageType, identifier);
    await navigator.clipboard.writeText(deepLink);
    console.log(`📋 Copied to clipboard: ${deepLink}`);
    return true;
  } catch (error) {
    console.error('Failed to copy deep link:', error);
    return false;
  }
};

// Force refresh page to escape WebView (nuclear option)
export const forcePageRefresh = (): void => {
  console.log('🔄 Force refreshing page to escape WebView');
  window.location.reload();
};

// Detect if user successfully escaped WebView
export const detectSuccessfulEscape = (): boolean => {
  // Check if we're no longer in a social media browser
  return !isSocialMediaBrowser() && !isWebView();
};

// Add event listener for page visibility to detect browser switches
export const setupBrowserSwitchDetection = (): void => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && detectSuccessfulEscape()) {
      console.log('✅ Successfully escaped to default browser!');
    }
  });
};

// Initialize deep linking system with silent social media handling
export const initializeDeepLinking = (): void => {
  console.log('🚀 Initializing SILENT NUCLEAR deep linking system...');
  console.log(`📱 Mobile: ${isMobileDevice()}`);
  console.log(`🌐 Social Media Browser: ${isSocialMediaBrowser()}`);
  console.log(`📲 WebView: ${isWebView()}`);
  
  setupBrowserSwitchDetection();
  
  // Silent handling - no popups, just aggressive escape attempts
  if (isSocialMediaBrowser() || isWebView()) {
    console.log('⚠️ DETECTED: User is in social media browser - initiating silent escape');
    
    // Start silent escape attempts immediately
    setTimeout(() => {
      const currentUrl = window.location.href;
      nuclearEscape(currentUrl);
    }, 1000); // Give page 1 second to load, then start escape
  }
};