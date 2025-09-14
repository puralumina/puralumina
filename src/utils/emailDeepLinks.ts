// Email service deep link utilities for mobile optimization
export interface EmailParams {
  to?: string;
  subject?: string;
  body?: string;
}

export const parseMailtoUrl = (mailtoUrl: string): EmailParams => {
  if (!mailtoUrl.startsWith('mailto:')) {
    return {};
  }

  const url = new URL(mailtoUrl);
  const to = url.pathname;
  const subject = url.searchParams.get('subject') || '';
  const body = url.searchParams.get('body') || '';

  return { to, subject, body };
};

export const handleEmailLink = (url: string, event?: Event): void => {
  // CRITICAL: Prevent browser navigation for mailto links
  if (url.startsWith('mailto:') && event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  // Check if it's a mailto link
  if (!url.startsWith('mailto:')) {
    // Regular link handling
    if (event) {
      event.preventDefault();
    }
    window.open(url, '_blank');
    return;
  }

  // Handle mailto links without browser navigation
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
      // Android: Use Intent with ACTION_SENDTO for app chooser
      const params = parseMailtoUrl(url);
      const encodedTo = encodeURIComponent(params.to || '');
      const encodedSubject = encodeURIComponent(params.subject || '');
      const encodedBody = encodeURIComponent(params.body || '');
      
      // Create Android Intent URL that shows email app chooser
      const intentUrl = `intent://send?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}#Intent;scheme=mailto;action=android.intent.action.SENDTO;end`;
      
      // Use location.replace to avoid navigation history
      setTimeout(() => {
        window.location.replace(intentUrl);
      }, 50);
    } else {
      // iOS and other mobile: Use location.replace for cleaner handling
      setTimeout(() => {
        window.location.replace(url);
      }, 50);
    }
  } else {
    // Desktop: Use location.replace to avoid navigation issues
    window.location.replace(url);
  }
};

// Enhanced click handler for email links
export const createEmailClickHandler = (url: string) => {
  return (event: React.MouseEvent) => {
    handleEmailLink(url, event);
  };
};