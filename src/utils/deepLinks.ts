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

// Show social media browser exit instructions
const showSocialMediaInstructions = (platform: string): void => {
  const instructions = {
    instagram: "To open in your browser:\n1. Tap the three dots (⋯) at the top right\n2. Select 'Open in Browser'\n3. Choose your default browser",
    facebook: "To open in your browser:\n1. Tap the three dots (⋯) at the top right\n2. Select 'Open in Browser'\n3. Choose your default browser",
    tiktok: "To open in your browser:\n1. Tap 'Open in Browser' at the bottom\n2. Or tap the share button and select 'Open in Browser'",
    twitter: "To open in your browser:\n1. Tap the share button\n2. Select 'Open in Browser'",
    linkedin: "To open in your browser:\n1. Tap the three dots (⋯)\n2. Select 'Open in Browser'"
  };

  const instruction = instructions[platform as keyof typeof instructions] || 
    "To open in your browser:\n1. Look for 'Open in Browser' option\n2. Or use the share button to open externally";

  // Create a more prominent modal-style alert
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 90%;
    max-height: 80%;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;

  content.innerHTML = `
    <h2 style="color: #333; margin-bottom: 20px; font-size: 1.5rem;">🌐 Open in Browser</h2>
    <p style="color: #666; line-height: 1.6; margin-bottom: 20px; white-space: pre-line;">${instruction}</p>
    <button onclick="this.parentElement.parentElement.remove()" style="
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 10px;
    ">Got it!</button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 10000);
};

// Force open in default browser (main function)
export const handleDeepLink = (
  path: string, 
  forceExternal: boolean = true, 
  options: DeepLinkOptions = {}
): void => {
  const { forceNewWindow = true, delay = 100 } = options;
  const fullUrl = createDeepLink(path);
  
  console.log(`🔗 Deep Link: Attempting to open ${fullUrl}`);
  console.log(`📱 User Agent: ${navigator.userAgent}`);
  console.log(`🌐 Is Social Media Browser: ${isSocialMediaBrowser()}`);
  console.log(`📲 Is WebView: ${isWebView()}`);
  
  if (forceExternal) {
    // Handle social media in-app browsers with aggressive tactics
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

// Handle social media in-app browsers with multiple escape methods
const handleSocialMediaBrowser = (url: string, delay: number): void => {
  console.log('🚀 Attempting to escape social media browser...');
  
  // Method 1: Try multiple window.open attempts with different targets
  setTimeout(() => {
    console.log('Method 1: Multiple window.open attempts');
    
    // Try different window targets
    const targets = ['_blank', '_top', '_parent', '_self'];
    let success = false;
    
    targets.forEach((target, index) => {
      setTimeout(() => {
        if (!success) {
          console.log(`Trying window.open with target: ${target}`);
          const newWindow = window.open(url, target, 'noopener,noreferrer');
          if (newWindow && !newWindow.closed) {
            success = true;
            console.log(`✅ Success with target: ${target}`);
          }
        }
      }, index * 100);
    });
    
    // Method 2: Try location methods after window.open attempts
    setTimeout(() => {
      if (!success) {
        console.log('Method 2: Location-based navigation');
        
        // Try different location methods
        try {
          window.top!.location.href = url;
          console.log('✅ Success with window.top.location');
        } catch (e) {
          try {
            window.parent.location.href = url;
            console.log('✅ Success with window.parent.location');
          } catch (e2) {
            try {
              window.location.replace(url);
              console.log('✅ Success with location.replace');
            } catch (e3) {
              window.location.href = url;
              console.log('✅ Fallback to location.href');
            }
          }
        }
      }
    }, 500);
    
    // Method 3: Show instructions if all else fails
    setTimeout(() => {
      let platform = 'generic';
      if (isInstagramBrowser()) platform = 'instagram';
      else if (isFacebookBrowser()) platform = 'facebook';
      else if (isTikTokBrowser()) platform = 'tiktok';
      else if (isTwitterBrowser()) platform = 'twitter';
      else if (isLinkedInBrowser()) platform = 'linkedin';
      
      console.log('Method 3: Showing user instructions');
      showSocialMediaInstructions(platform);
    }, 1000);
    
  }, delay);
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

// Initialize deep linking system
export const initializeDeepLinking = (): void => {
  console.log('🚀 Initializing deep linking system...');
  console.log(`📱 Mobile: ${isMobileDevice()}`);
  console.log(`🌐 Social Media Browser: ${isSocialMediaBrowser()}`);
  console.log(`📲 WebView: ${isWebView()}`);
  
  setupBrowserSwitchDetection();
  
  // Show initial warning if in social media browser
  if (isSocialMediaBrowser()) {
    setTimeout(() => {
      let platform = 'generic';
      if (isInstagramBrowser()) platform = 'instagram';
      else if (isFacebookBrowser()) platform = 'facebook';
      else if (isTikTokBrowser()) platform = 'tiktok';
      
      console.log('⚠️ User is in social media browser, showing instructions');
    }, 2000);
  }
};