// Deep linking utilities for forcing browser navigation
export interface DeepLinkOptions {
  forceNewWindow?: boolean;
  fallbackUrl?: string;
  delay?: number;
}

// Check if we're on a mobile device
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if we're on iOS
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if we're on Android
export const isAndroid = (): boolean => {
  return /Android/i.test(navigator.userAgent);
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

// Force open in default browser (main function)
export const handleDeepLink = (
  path: string, 
  forceExternal: boolean = true, 
  options: DeepLinkOptions = {}
): void => {
  const { forceNewWindow = true, delay = 100 } = options;
  const fullUrl = createDeepLink(path);
  
  console.log(`🔗 Deep Link: Attempting to open ${fullUrl}`);
  
  if (forceExternal) {
    if (isMobileDevice()) {
      handleMobileDeepLink(fullUrl, delay);
    } else {
      handleDesktopDeepLink(fullUrl, forceNewWindow, delay);
    }
  } else {
    // Regular navigation
    window.location.href = fullUrl;
  }
};

// Handle mobile deep linking
const handleMobileDeepLink = (url: string, delay: number): void => {
  if (isIOS()) {
    // iOS: Use location.replace for cleaner navigation
    setTimeout(() => {
      window.location.replace(url);
    }, delay);
  } else if (isAndroid()) {
    // Android: Try multiple methods for better compatibility
    setTimeout(() => {
      // Method 1: Try window.open first
      const newWindow = window.open(url, '_blank');
      
      // Method 2: Fallback to location.replace if window.open fails
      setTimeout(() => {
        if (!newWindow || newWindow.closed) {
          window.location.replace(url);
        }
      }, 500);
    }, delay);
  } else {
    // Other mobile devices
    setTimeout(() => {
      window.location.replace(url);
    }, delay);
  }
};

// Handle desktop deep linking
const handleDesktopDeepLink = (url: string, forceNewWindow: boolean, delay: number): void => {
  setTimeout(() => {
    if (forceNewWindow) {
      // Open in new tab/window
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // Fallback if popup blocked
      if (!newWindow) {
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