import React, { useState, useEffect } from 'react';
import { Lock, MapPin, Play, ShoppingCart, ExternalLink, Music } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Link as LinkType, PageData } from '../types';
import { getPageData, trackLinkClick, trackPageView } from '../services/pageService';
import PixelInjector from '../components/PixelInjector';
import IndividualPixelInjector from '../components/IndividualPixelInjector';
import { ChevronDown, ChevronUp } from 'lucide-react';
// Utility function to strip HTML tags and return clean text
const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  
  // Create a temporary div element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content and clean it up
  let text = tempDiv.textContent || tempDiv.innerText || '';
  
  // Clean up common HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
// Function to strip HTML tags and return clean text
const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  
  // Create a temporary div element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content and clean up
  let text = tempDiv.textContent || tempDiv.innerText || '';
  
  // Clean up common HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
  
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text || 'Untitled';
};

// Utility to convert Google Drive URLs to direct image URLs
const convertToDirectImageUrl = (url: string): string => {
  if (!url) return url;
  
  // Google Drive URL conversion
  if (url.includes('drive.google.com/file/d/')) {
    const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  
  // Google Drive sharing URL conversion
  if (url.includes('drive.google.com/open?id=')) {
    const fileId = url.match(/id=([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  
  // Dropbox URL conversion
  if (url.includes('dropbox.com') && url.includes('?dl=0')) {
    return url.replace('?dl=0', '?raw=1');
  }
  
  // OneDrive URL conversion
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    if (url.includes('?')) {
      return url + '&download=1';
    } else {
      return url + '?download=1';
    }
  }
  
  return url;
};

// Enhanced image component with fallback and error handling
const SafeImage: React.FC<{
  src: string;
  alt: string;
  className: string;
  fallbackSrc?: string;
}> = ({ src, alt, className, fallbackSrc }) => {
  const [imageSrc, setImageSrc] = useState(convertToDirectImageUrl(src));
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImageSrc(fallbackSrc);
      } else {
        // Use a default placeholder image
        setImageSrc('https://d1yei2z3i6k35z.cloudfront.net/4704293/68c976f95af39_couple-1329349_1280.jpg');
      }
    }
  };
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
};

// Favicon update utility
const updateFavicon = (faviconUrl: string) => {
  if (!faviconUrl) return;
  
  // Remove existing favicon links
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(link => link.remove());
  
  // Add new favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
  
  // Also add as shortcut icon for better browser support
  const shortcutLink = document.createElement('link');
  shortcutLink.rel = 'shortcut icon';
  shortcutLink.href = faviconUrl;
  document.head.appendChild(shortcutLink);
};

const getDeepLinkUrl = (url: string): string => {
  // YouTube deep linking
  // YouTube Videos
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `vnd.youtube://${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `vnd.youtube://${videoId}`;
  }
  
  // YouTube Shorts
  if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('/shorts/')[1]?.split('?')[0];
    return `vnd.youtube://${videoId}`;
  }
  
  // YouTube Channels
  if (url.includes('youtube.com/channel/')) {
    const channelId = url.split('channel/')[1]?.split('?')[0];
    return `youtube://www.youtube.com/channel/${channelId}`;
  }
  if (url.includes('youtube.com/@')) {
    const handle = url.split('@')[1]?.split('?')[0];
    return `youtube://www.youtube.com/@${handle}`;
  }
  if (url.includes('youtube.com/c/')) {
    const channelName = url.split('/c/')[1]?.split('?')[0];
    return `youtube://www.youtube.com/c/${channelName}`;
  }
  if (url.includes('youtube.com/user/')) {
    const username = url.split('/user/')[1]?.split('?')[0];
    return `youtube://www.youtube.com/user/${username}`;
  }

  // Facebook deep linking
  if (url.includes('facebook.com/') || url.includes('fb.com/')) {
    const path = url.split('.com/')[1];
    return `fb://profile/${path}`;
  }

  // Instagram deep linking
  if (url.includes('instagram.com/')) {
    const username = url.split('instagram.com/')[1]?.split('/')[0];
    return `instagram://user?username=${username}`;
  }

  // TikTok deep linking
  if (url.includes('tiktok.com/@')) {
    const username = url.split('@')[1]?.split('?')[0];
    return `tiktok://user/${username}`;
  }
  if (url.includes('tiktok.com/') && url.includes('/video/')) {
    const videoId = url.split('/video/')[1]?.split('?')[0];
    return `tiktok://video/${videoId}`;
  }

  // Twitter/X deep linking
  if (url.includes('twitter.com/') || url.includes('x.com/')) {
    const username = url.split('.com/')[1]?.split('/')[0];
    return `twitter://user?screen_name=${username}`;
  }

  // Twitch deep linking
  if (url.includes('twitch.tv/')) {
    const channel = url.split('twitch.tv/')[1]?.split('?')[0];
    return `twitch://stream/${channel}`;
  }

  // Spotify deep linking
  if (url.includes('open.spotify.com/')) {
    return url.replace('open.spotify.com', 'spotify');
  }

  // Apple Music deep linking
  if (url.includes('music.apple.com/')) {
    return url.replace('https://music.apple.com', 'music');
  }

  // LinkedIn deep linking
  if (url.includes('linkedin.com/in/')) {
    const profile = url.split('/in/')[1]?.split('?')[0];
    return `linkedin://profile/${profile}`;
  }
  if (url.includes('linkedin.com/company/')) {
    const company = url.split('/company/')[1]?.split('?')[0];
    return `linkedin://company/${company}`;
  }

  // Snapchat deep linking
  if (url.includes('snapchat.com/add/')) {
    const username = url.split('/add/')[1]?.split('?')[0];
    return `snapchat://add/${username}`;
  }

  // WhatsApp deep linking
  if (url.includes('wa.me/')) {
    const number = url.split('wa.me/')[1]?.split('?')[0];
    return `whatsapp://send?phone=${number}`;
  }

  // Telegram deep linking
  if (url.includes('t.me/')) {
    const username = url.split('t.me/')[1]?.split('?')[0];
    return `tg://resolve?domain=${username}`;
  }

  // Pinterest deep linking
  if (url.includes('pinterest.com/')) {
    const username = url.split('pinterest.com/')[1]?.split('/')[0];
    return `pinterest://user/${username}`;
  }

  // Return original URL if no deep link pattern matches
  return url;
};

const handleDeepLink = (url: string, openInNewWindow: boolean = true) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isMobile) {
    const deepLinkUrl = getDeepLinkUrl(url);
    
    if (deepLinkUrl !== url) {
      // For Android YouTube links, use intent URLs for better app detection
      if (isAndroid && url.includes('youtube.com')) {
        let intentUrl = '';
        
        if (url.includes('watch?v=') || url.includes('/shorts/')) {
          const videoId = url.split('v=')[1]?.split('&')[0];
          intentUrl = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
        } else if (url.includes('channel/')) {
          const channelId = url.split('channel/')[1]?.split('?')[0];
          intentUrl = `intent://www.youtube.com/channel/${channelId}#Intent;package=com.google.android.youtube;scheme=https;end`;
        } else if (url.includes('@')) {
          const handle = url.split('@')[1]?.split('?')[0];
          intentUrl = `intent://www.youtube.com/@${handle}#Intent;package=com.google.android.youtube;scheme=https;end`;
        } else if (url.includes('/c/')) {
          const channelName = url.split('/c/')[1]?.split('?')[0];
          intentUrl = `intent://www.youtube.com/c/${channelName}#Intent;package=com.google.android.youtube;scheme=https;end`;
        } else if (url.includes('/user/')) {
          const username = url.split('/user/')[1]?.split('?')[0];
          intentUrl = `intent://www.youtube.com/user/${username}#Intent;package=com.google.android.youtube;scheme=https;end`;
        } else if (url.includes('youtu.be/')) {
          const videoId = url.split('youtu.be/')[1]?.split('?')[0];
          intentUrl = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
        }
        
        if (intentUrl) {
          try {
            window.location.href = intentUrl;
            return;
          } catch (e) {
            console.log('YouTube app intent failed, trying deep link');
          }
        }
      }
      
      // For iOS and other platforms, try direct deep link with faster fallback
      if (isIOS) {
        // For iOS, use a more reliable method
        const startTime = Date.now();
        let appOpened = false;
        
        // Listen for page visibility change (app opened)
        const handleVisibilityChange = () => {
          if (document.hidden) {
            appOpened = true;
          }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Try to open the app
        window.location.href = deepLinkUrl;
        
        // Fallback after short delay
        setTimeout(() => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          
          if (!appOpened && (Date.now() - startTime) >= 300) {
            if (openInNewWindow) {
              window.open(url, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = url;
            }
          }
        }, 300);
        return;
      }
      
      // For other mobile devices, try deep link with quick fallback
      try {
        const startTime = Date.now();
        let appOpened = false;
        
        // Listen for page visibility change
        const handleVisibilityChange = () => {
          if (document.hidden) {
            appOpened = true;
          }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Try to open the app
        window.location.href = deepLinkUrl;
        
        // Fallback after short delay
        setTimeout(() => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          
          if (!appOpened && (Date.now() - startTime) >= 400) {
            if (openInNewWindow) {
              window.open(url, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = url;
            }
          }
        }, 400);
        return;
      } catch (e) {
        console.log('Deep link failed, falling back to web URL');
        if (openInNewWindow) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = url;
        }
        return;
      }
    }
  }
  
  // Default behavior for desktop or non-deep-linkable URLs
  if (openInNewWindow) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
};
const LinkBlock: React.FC<{ link: LinkType, onClick: (linkId: string) => void }> = ({ link, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getMarginStyle = (): React.CSSProperties => {
    return {
      marginTop: `${link.marginTop || 5}px`,
      marginBottom: `${link.marginBottom || 5}px`,
    };
  };

  const getBlockStyle = (link: LinkType): React.CSSProperties => {
    const styling = link.styling || {};
    
    // Handle background color with opacity - only affect background
    let backgroundColor = styling.backgroundColor || 'rgba(255, 255, 255, 0.1)';
    if (styling.opacity !== undefined && styling.opacity !== 100) {
      // If it's a hex color, convert to rgba with opacity
      if (backgroundColor.startsWith('#')) {
        const hex = backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        backgroundColor = `rgba(${r}, ${g}, ${b}, ${styling.opacity / 100})`;
      } else if (backgroundColor.startsWith('rgba')) {
        // If it's already rgba, replace the alpha value
        backgroundColor = backgroundColor.replace(/,\s*[\d.]+\)$/, `, ${styling.opacity / 100})`);
      } else if (backgroundColor.startsWith('rgb')) {
        // If it's rgb, convert to rgba
        backgroundColor = backgroundColor.replace('rgb', 'rgba').replace(')', `, ${styling.opacity / 100})`);
      }
    }
    
    // Handle drop shadow
    const dropShadowValue = styling.dropShadow !== undefined ? styling.dropShadow : 20;
    const boxShadow = dropShadowValue > 0 
      ? `0 ${Math.round(dropShadowValue * 0.25)}px ${Math.round(dropShadowValue * 0.5)}px rgba(0, 0, 0, ${dropShadowValue / 100})`
      : 'none';
    
    // Handle border radius
    const borderRadius = styling.borderRadius !== undefined ? `${styling.borderRadius}px` : '8px';
    
    return {
      backgroundColor,
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      boxShadow,
      borderRadius,
      ...getMarginStyle(),
    };
  };

  const getEmbedUrl = (url: string) => {
    // YouTube URL conversion
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    
    // Vimeo URL conversion
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // TikTok URL conversion
    if (url.includes('tiktok.com/')) {
      return url.replace('/video/', '/embed/');
    }
    
    // If already an embed URL or other platform, return as is
    return url;
  };

  const handleLinkAction = (link: LinkType) => {
    // Handle email links with deep link optimization
    if (link.url && link.url.startsWith('mailto:')) {
      handleEmailLink(link.url);
      return;
    }
    
    // For product blocks, prioritize Stripe payment link if available
    if (link.type === 'productBlock' && link.stripePaymentLink) {
      window.open(link.stripePaymentLink, '_blank', 'noopener,noreferrer');
      return;
    }
    
    if (link.embedBehavior === 'embed' && link.embedCode) {
      // Execute embed code safely
      try {
        console.log('Executing embed code for:', link.title);
        
        // Special handling for Calendly
        if (link.embedCode.includes('Calendly.initBadgeWidget')) {
          // Load Calendly CSS and JS if not already loaded
          if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
            const cssLink = document.createElement('link');
            cssLink.href = 'https://assets.calendly.com/assets/external/widget.css';
            cssLink.rel = 'stylesheet';
            document.head.appendChild(cssLink);
          }
          
          if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = () => {
              console.log('Calendly script loaded');
              // Extract URL from embed code
              const urlMatch = link.embedCode.match(/url:\s*['"]([^'"]+)['"]/);
              if (urlMatch && window.Calendly) {
                window.Calendly.initPopupWidget({ url: urlMatch[1] });
              }
            };
            document.head.appendChild(script);
          } else {
            // Script already loaded, execute immediately
            const urlMatch = link.embedCode.match(/url:\s*['"]([^'"]+)['"]/);
            if (urlMatch && window.Calendly) {
              window.Calendly.initPopupWidget({ url: urlMatch[1] });
            }
          }
          return;
        }
        
        // Generic embed code handling for other widgets
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = link.embedCode;
        
        const scripts = tempDiv.querySelectorAll('script');
        const stylesheets = tempDiv.querySelectorAll('link[rel="stylesheet"]');
        
        // Add stylesheets
        stylesheets.forEach(stylesheet => {
          const href = stylesheet.getAttribute('href');
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = href;
            document.head.appendChild(newLink);
          }
        });
        
        // Handle scripts
        const executeScripts = () => {
          scripts.forEach(script => {
            if (!script.src && script.textContent) {
              try {
                // Remove window.onload wrapper since DOM is already ready
                let scriptContent = script.textContent.replace(
                  /window\.onload\s*=\s*function\(\)\s*\{([\s\S]*)\}\s*;?\s*$/,
                  '$1'
                );
                
                const scriptFunction = new Function(scriptContent);
                scriptFunction();
                console.log('Script executed successfully');
              } catch (error) {
                console.error('Error executing script:', error);
              }
            }
          });
        };
        
        // Load external scripts first
        const externalScripts = Array.from(scripts).filter(s => s.src);
        if (externalScripts.length > 0) {
          let loaded = 0;
          externalScripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src && !document.querySelector(`script[src="${src}"]`)) {
              const newScript = document.createElement('script');
              newScript.src = src;
              newScript.async = true;
              newScript.onload = () => {
                loaded++;
                if (loaded === externalScripts.length) {
                  setTimeout(executeScripts, 200);
                }
              };
              document.head.appendChild(newScript);
            }
          });
        } else {
          executeScripts();
        }
        
        console.log('Embed code execution initiated');
        
      } catch (error) {
        console.error('Error executing embed code:', error);
        // Fallback to URL if embed code fails and URL exists
        if (link.url && link.url.trim() !== '') {
          handleDeepLink(link.url, link.openInNewWindow !== false);
        }
      }
    } else {
      // Default URL behavior - only if URL exists
      if (link.url && link.url.trim() !== '') {
        handleDeepLink(link.url, link.openInNewWindow !== false);
      }
    }
  };

  const handleProtectedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(link.id);
    if (link.password && link.password.trim() !== '') {
      const enteredPassword = prompt('This link is password protected. Please enter the password:');
      if (enteredPassword === link.password) {
        handleLinkAction(link);
      } else if (enteredPassword !== null) {
        alert('Incorrect password.');
      }
    } else {
      handleLinkAction(link);
    }
  };

  const handleStandardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(link.id);
    if (link.password && link.password.trim() !== '') {
      const enteredPassword = prompt('This link is password protected. Please enter the password:');
      if (enteredPassword === link.password) {
        handleLinkAction(link);
      } else if (enteredPassword !== null) {
        alert('Incorrect password.');
      }
    } else {
      handleLinkAction(link);
    }
  };

  const nextImage = () => {
    if (link.images) {
      setCurrentImageIndex((prev) => (prev + 1) % link.images!.length);
    }
  };

  const prevImage = () => {
    if (link.images) {
      setCurrentImageIndex((prev) => (prev - 1 + link.images!.length) % link.images!.length);
    }
  };

  switch (link.type) {
    case 'standardLink':
      return (
        <div className="w-full" style={getMarginStyle()}>
          <div
            onClick={handleStandardClick}
            className="group w-full backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            style={getBlockStyle(link)}
          >
            {link.thumbnailUrl && (
              <SafeImage 
                src={link.thumbnailUrl} 
                alt={link.title} 
                className="w-12 h-12 rounded-md object-cover flex-shrink-0" 
              />
            )}
            <div className="flex-grow">
              <p className="font-semibold text-white text-left">{link.title}</p>
            </div>
            {link.password && <Lock size={16} className="text-white/50" />}
            {(link.url && link.url.trim() !== '') && <ExternalLink size={16} className="text-white/50 flex-shrink-0" />}
          </div>
        </div>
      );

    case 'youtubeEmbed':
      return (
        <div className="w-full" style={getMarginStyle()}>
        <div 
          className="w-full backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <div className="w-full bg-black overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '200px' }}>
            <iframe
              src={getEmbedUrl(link.url)}
              title={link.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => onClick(link.id)}
              loading="lazy"
            />
          </div>
        </div>
        </div>
      );

    case 'musicBlock':
      return (
        <div className="w-full" style={getMarginStyle()}>
        <div
          onClick={handleStandardClick}
          className="group w-full backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
          style={getBlockStyle(link)}
        >
          {link.thumbnailUrl ? (
            <SafeImage
              src={link.thumbnailUrl}
              alt={link.title}
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-md bg-purple-600 flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex-grow">
            <p className="font-semibold text-white text-left">{link.title}</p>
            {link.artist && (
              <p className="text-sm text-white/70 text-left">{link.artist}</p>
            )}
          </div>
          <Play size={16} className="text-white/50 flex-shrink-0" />
        </div>
        </div>
      );

    case 'imageBanner':
      return (
        <div className="w-full" style={getMarginStyle()}>
          <div
            onClick={handleStandardClick}
            className="block w-full backdrop-blur-sm border rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300 cursor-pointer"
            style={getBlockStyle(link)}
          >
            <SafeImage
              src={link.thumbnailUrl}
              alt={link.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-white mb-1">{link.title}</h3>
              {link.description && (
                <p className="text-sm text-white/70">{link.description}</p>
              )}
            </div>
          </div>
        </div>
      );


    case 'youtubeExclusive':
      return (
        <div style={getMarginStyle()}>
        <div
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden hover:opacity-90 transition-all duration-300"
          style={{
            ...getBlockStyle(link),
          }}
        >
          
          <div className="p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">{link.title}</h3>
             <span className="bg-red-600 text-white px-2 py-1 rounded-2xl text-xs font-medium animate-pulse">
                ▶ EXCLUSIVE
              </span>
            </div>
          </div>
          <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`${getEmbedUrl(link.url)}&modestbranding=1&showinfo=0`}
              title={link.title}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => onClick(link.id)}
              loading="lazy"
            />
          </div>
        </div>
        </div>
      );

    case 'youtubeLive':
      return (
        <div style={getMarginStyle()}>
        <div
          className="w-full max-w-2xl backdrop-blur-sm rounded-lg border overflow-hidden hover:opacity-90 transition-all duration-300"
          style={{
            ...getBlockStyle(link),
          }}
        >
          
          <div className="p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">{link.title}</h3>
              <span className="bg-red-500 text-white px-2 py-1 rounded-2xl text-xs font-medium animate-pulse">
                ⚪ LIVE
              </span>
            </div>
          </div>
          <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`${getEmbedUrl(link.url)}&modestbranding=1&showinfo=0`}
              title={link.title}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => onClick(link.id)}
              loading="lazy"
            />
          </div>
        </div>
        </div>
      );

    case 'productBlock':
      return (
        <div style={getMarginStyle()}>
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden hover:opacity-90 transition-all duration-300"
          style={{
            ...getBlockStyle(link),
          }}
        >
          {link.thumbnailType === 'video' && link.thumbnailUrl ? (
            <div className="relative">
              <div className="bg-black overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '200px' }}>
                <iframe
                  src={getEmbedUrl(link.thumbnailUrl)}
                  title={`${link.title} - Product Preview`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {link.price && (
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {link.currency === 'USD' && '$'}{link.currency === 'EUR' && '€'}{link.currency === 'GBP' && '£'}{link.price}
                </div>
              )}
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                PRODUCT PREVIEW
              </div>
            </div>
          ) : (
            <div className="relative">
              <SafeImage
                src={link.thumbnailUrl || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'}
                alt={link.title}
                className="w-full h-48 object-cover"
              />
              {link.price && (
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {link.currency === 'USD' && '$'}{link.currency === 'EUR' && '€'}{link.currency === 'GBP' && '£'}{link.price}
                </div>
              )}
            </div>
          )}
          <div className="p-4">
            <h3 className="font-medium text-white mb-2">{link.title}</h3>
            {link.description && (
              <p className="text-sm text-white/70 mb-3">{link.description}</p>
            )}
            <button
              onClick={handleStandardClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {link.price ? (
                <>
                  Buy Now - {link.currency === 'USD' && '$'}{link.currency === 'EUR' && '€'}{link.currency === 'GBP' && '£'}{link.price}
                </>
              ) : (
                'Buy Now'
              )}
            </button>
          </div>
        </div>
        </div>
      );

    case 'imageBlock':
      return (
        <div style={getMarginStyle()}>
          <div
            onClick={handleStandardClick}
            className="block w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden hover:opacity-90 transition-all duration-300 cursor-pointer"
            style={getBlockStyle(link)}
          >
            <div 
              className="w-full bg-gray-200 overflow-hidden"
              style={{
                aspectRatio: link.aspectRatio || '16:9'
              }}
            >
              <SafeImage
                src={link.thumbnailUrl || 'https://d1yei2z3i6k35z.cloudfront.net/4704293/68c976f95af39_couple-1329349_1280.jpg'}
                alt={link.title}
                className="w-full h-full object-cover"
              />
            </div>
            {link.title && (
              <div className="p-4">
                <h3 className="font-medium text-white text-center">{link.title}</h3>
              </div>
            )}
          </div>
        </div>
      );

   case 'imageOnly':
     const getImageAlignment = () => {
       switch (link.imageAlignment) {
         case 'left': return 'justify-start';
         case 'right': return 'justify-end';
         default: return 'justify-center';
       }
     };

     const getImageSize = () => {
       const size = link.imageSize || 100;
       return `${size}%`;
     };

     return (
       <div style={getMarginStyle()}>
       <div className={`w-full flex ${getImageAlignment()}`}>
         <div
           onClick={handleStandardClick}
           className="block hover:opacity-90 transition-opacity duration-300 cursor-pointer"
           style={{ width: getImageSize() }}
         >
           <div 
             className="overflow-hidden"
             style={{
               aspectRatio: link.aspectRatio || '16:9'
             }}
           >
             <SafeImage
               src={link.thumbnailUrl}
               alt={link.title || 'Image'}
               className="w-full h-full object-contain"
             />
           </div>
         </div>
       </div>
       </div>
     );
    case 'textBlock':
      return (
        <div className="w-full max-w-2xl" style={getMarginStyle()}>
          <div className="space-y-4">
            {(link.textContent || []).map((textItem, index) => {
              const textStyles: React.CSSProperties = {
                fontSize: textItem.styles.fontSize || (textItem.type === 'heading' ? '24px' : '15px'),
                fontFamily: textItem.styles.fontFamily || "'Montserrat', sans-serif",
                fontWeight: textItem.styles.fontWeight || (textItem.type === 'heading' ? 'bold' : 'normal'),
                fontStyle: textItem.styles.fontStyle || 'normal',
                textAlign: textItem.styles.textAlign || 'center',
                color: textItem.styles.color || '#ffffff',
                textDecoration: textItem.styles.textDecoration || 'none',
                lineHeight: textItem.type === 'heading' ? '1.2' : '1.6',
                margin: 0,
                padding: 0,
              };

              if (textItem.type === 'heading') {
                return (
                  <h3 key={index} style={textStyles}>
                    {textItem.content}
                  </h3>
                );
              } else {
                return (
                  <p key={index} style={textStyles}>
                    {textItem.content}
                  </p>
                );
              }
            })}
          </div>
        </div>
      );

   case 'videoOnly':
     const getVideoAlignment = () => {
       switch (link.imageAlignment) {
         case 'left': return 'justify-start';
         case 'right': return 'justify-end';
         default: return 'justify-center';
       }
     };

     const getVideoSize = () => {
       const size = link.imageSize || 100;
       return `${size}%`;
     };

     const isGif = (url: string) => {
       return url.toLowerCase().includes('.gif');
     };

     return (
       <div style={getMarginStyle()}>
         <div className={`w-full flex ${getVideoAlignment()}`}>
           <div
             onClick={handleStandardClick}
             className="block hover:opacity-90 transition-opacity duration-300 cursor-pointer"
             style={{ width: getVideoSize() }}
           >
             <div 
               className="overflow-hidden rounded-lg"
               style={{
                 aspectRatio: link.aspectRatio || '16:9'
               }}
             >
               {isGif(link.thumbnailUrl || '') ? (
                 <img
                   src={link.thumbnailUrl}
                   alt={link.title || 'Video'}
                   className="w-full h-full object-cover"
                   style={{ pointerEvents: 'none' }}
                 />
               ) : (
                 <video
                   src={link.thumbnailUrl}
                   className="w-full h-full object-cover"
                   autoPlay
                   loop
                   muted
                   playsInline
                   controls={false}
                   style={{ pointerEvents: 'none' }}
                   onContextMenu={(e) => e.preventDefault()}
                 >
                   Your browser does not support the video tag.
                 </video>
               )}
             </div>
           </div>
         </div>
       </div>
     );

    case 'statusBlock':
      const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
      const statusItems = link.statusItems || [];
      const statusSettings = link.statusSettings || {};
      
      console.log('Rendering StatusBlock with data:', {
        linkId: link.id,
        statusItems: link.statusItems,
        statusSettings: link.statusSettings,
        styling: link.styling
      });
      
      useEffect(() => {
        if (statusSettings.autoSwipe !== false && statusItems.length > 1) {
          const interval = setInterval(() => {
            setCurrentStatusIndex(prev => (prev + 1) % statusItems.length);
          }, (statusSettings.swipeInterval || 3) * 1000);
          
          return () => clearInterval(interval);
        }
      }, [statusItems.length, statusSettings.autoSwipe, statusSettings.swipeInterval]);
      
      if (!statusItems || statusItems.length === 0) {
        return (
          <div className="w-full max-w-md" style={getMarginStyle()}>
            <div
              className="w-full backdrop-blur-sm border rounded-lg p-8 text-center"
              style={getBlockStyle(link)}
            >
              <p className="text-white/70 text-sm">No status items to display</p>
            </div>
          </div>
        );
      }
      
      const currentItem = statusItems[currentStatusIndex];
      
      const handlePrevStatus = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentStatusIndex(prev => (prev - 1 + statusItems.length) % statusItems.length);
      };
      
      const handleNextStatus = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentStatusIndex(prev => (prev + 1) % statusItems.length);
      };
      
      const handleDotClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentStatusIndex(index);
      };
      
      return (
        <div className="w-full max-w-md" style={getMarginStyle()}>
          <div
            className="w-full backdrop-blur-sm border rounded-lg overflow-hidden relative group"
            style={getBlockStyle(link)}
          >
            {/* Header */}
            {link.title && (
              <div className="p-3 border-b border-white/10">
                <h3 className="font-medium text-white text-center">{link.title}</h3>
              </div>
            )}
            
            {/* Content Area */}
            <div 
              className="relative bg-black overflow-hidden"
              style={{ aspectRatio: statusSettings.aspectRatio || '16:9' }}
            >
              {currentItem.type === 'video' ? (
                <video
                  src={currentItem.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  style={{ pointerEvents: 'none' }}
                />
              ) : (
                <SafeImage
                  src={currentItem.url}
                  alt={currentItem.caption || `Status ${currentStatusIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Navigation Arrows */}
              {statusSettings.showArrows !== false && statusItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrevStatus}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextStatus}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Item Counter */}
              {statusItems.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  {currentStatusIndex + 1}/{statusItems.length}
                </div>
              )}
            </div>
            
            {/* Caption */}
            {currentItem.caption && (
              <div className="p-3 border-t border-white/10">
                <p className="text-white/90 text-sm text-center">{currentItem.caption}</p>
              </div>
            )}
            
            {/* Navigation Dots */}
            {statusSettings.showDots !== false && statusItems.length > 1 && (
              <div className="flex justify-center space-x-2 p-3 border-t border-white/10">
                {statusItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleDotClick(e, index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentStatusIndex 
                        ? 'bg-white' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'paragraphSpacing':
      const getSpacingHeight = () => {
        switch (link.spacingSize) {
          case 'small': return '20px';
          case 'medium': return '40px';
          case 'large': return '60px';
          case 'xlarge': return '80px';
          case 'custom': return `${link.customSpacing || 40}px`;
          default: return '40px';
        }
      };

      return (
        <div 
          className="w-full max-w-2xl"
          style={{ 
            height: getSpacingHeight(),
            ...getMarginStyle()
          }}
        />
      );

    case 'buttonBlock':
      const getButtonAlignment = () => {
        switch (link.buttonAlignment) {
          case 'left': return 'justify-start';
          case 'right': return 'justify-end';
          default: return 'justify-center';
        }
      };

      const getButtonStyle = (): React.CSSProperties => {
        const buttonStyling = link.buttonStyling || {};
        return {
          backgroundColor: buttonStyling.backgroundColor || '#3B82F6',
          borderColor: buttonStyling.borderColor || '#3B82F6',
          borderRadius: buttonStyling.borderRadius || '8px',
          opacity: buttonStyling.opacity !== undefined ? buttonStyling.opacity / 100 : 1,
        };
      };

      return (
        <div className={`w-full max-w-md flex ${getButtonAlignment()}`} style={getMarginStyle()}>
          <div
            onClick={handleStandardClick}
            className="inline-flex items-center px-6 py-3 text-white font-medium border-2 hover:opacity-80 transition-all duration-300 cursor-pointer space-x-3"
            style={getButtonStyle()}
          >
            {link.thumbnailUrl && (
              <img src={link.thumbnailUrl} alt={link.title} className="w-5 h-5 rounded object-cover flex-shrink-0" />
            )}
            {link.title}
            {link.password && <Lock size={16} className="ml-2 opacity-70" />}
          </div>
        </div>
      );

    case 'lineBlock':
      const getLineAlignment = () => {
        switch (link.lineSettings?.alignment) {
          case 'left': return 'justify-start';
          case 'right': return 'justify-end';
          default: return 'justify-center';
        }
      };

      const getLineStyle = (): React.CSSProperties => {
        const settings = link.lineSettings || {};
        const width = `${settings.width || 100}%`;
        const color = settings.color || '#ffffff';
        const thickness = `${settings.thickness || 2}px`;
        const style = settings.style || 'solid';
        const dashSpacing = settings.dashSpacing || 5;

        let borderStyle = style;
        let borderImage = 'none';

        if (style === 'wavy') {
          // Create wavy line using SVG data URL
          const svgWave = `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q25,0 50,5 T100,5" stroke="${color}" stroke-width="${settings.thickness || 2}" fill="none"/>
            </svg>
          `)}`;
          
          return {
            width,
            height: thickness,
            backgroundImage: `url("${svgWave}")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '50px 100%',
            border: 'none',
          };
        } else {
          let strokeDasharray = 'none';
          if (style === 'dashed') {
            strokeDasharray = `${dashSpacing * 2}px ${dashSpacing}px`;
          } else if (style === 'dotted') {
            strokeDasharray = `${dashSpacing}px ${dashSpacing}px`;
          }

          return {
            width,
            height: '0px',
            borderTop: `${thickness} ${borderStyle} ${color}`,
            borderImage,
            ...(strokeDasharray !== 'none' && {
              borderImageSource: `url("data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${settings.thickness || 2}">
                  <line x1="0" y1="${(settings.thickness || 2) / 2}" x2="100" y2="${(settings.thickness || 2) / 2}" 
                        stroke="${color}" stroke-width="${settings.thickness || 2}" 
                        stroke-dasharray="${style === 'dashed' ? `${dashSpacing * 2} ${dashSpacing}` : `${dashSpacing} ${dashSpacing}`}"/>
                </svg>
              `)}")`,
              borderImageSlice: '1',
              borderImageRepeat: 'repeat',
            }),
          };
        }
      };

      return (
        <div className={`w-full max-w-md flex ${getLineAlignment()}`} style={getMarginStyle()}>
          <div style={getLineStyle()} />
        </div>
      );

    default:
      return null;
  }
};

const BioPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // BIO PAGE PIXEL TRACKING
  // Add your tracking pixels for the bio page here
  const bioPagePixels = {
    // metaPixel: `<!-- Meta Pixel Code for Bio Page -->
    // <script>
    // !function(f,b,e,v,n,t,s)
    // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    // n.queue=[];t=b.createElement(e);t.async=!0;
    // t.src=v;s=b.getElementsByTagName(e)[0];
    // s.parentNode.insertBefore(t,s)}(window, document,'script',
    // 'https://connect.facebook.net/en_US/fbevents.js');
    // fbq('init', 'YOUR_PIXEL_ID');
    // fbq('track', 'PageView');
    // </script>`,
    
    // googleTag: `<!-- Google Analytics for Bio Page -->
    // <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'GA_MEASUREMENT_ID');
    //   gtag('event', 'page_view', {
    //     page_title: 'Bio Page - Soulmates Desires',
    //     page_location: window.location.href,
    //     content_group1: 'Bio Pages'
    //   });
    // </script>`,
    
    // tiktokPixel: `<!-- TikTok Pixel for Bio Page -->
    // <script>
    // !function (w, d, t) {
    //   w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    //   ttq.load('YOUR_TIKTOK_PIXEL_ID');
    //   ttq.page();
    // }(window, document, 'ttq');
    // </script>`
  };
  
  // Background music for bio/links page
  // EDIT THIS PATH: Change '/biopage-music.mp3' to your desired music file
  useBackgroundMusic('/biopage-music.mp3', { volume: 0.1 });
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await getPageData();
        setPageData(data);
        
        // Update favicon if provided
        if (data.media.faviconUrl) {
          updateFavicon(data.media.faviconUrl);
        }
        
        // Update page title
        document.title = data.profile.name || 'Soulmates Desires';
        
        // Only track page view if we successfully loaded data
        if (data) {
          trackPageView();
        }
      } catch (err) {
        console.error(err);
        setError('This page could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  const visibleLinks = pageData.links.filter(link => {
    if (!link.active) return false;
    if (link.schedule) {
      const now = new Date();
      const start = new Date(link.schedule.start);
      const end = new Date(link.schedule.end);
      return now >= start && now <= end;
    }
    return true;
  }).sort((a, b) => a.order - b.order);

  const { profile, theme, media, pixels } = pageData;

  const getBackgroundStyle = () => {
    if (theme.backgroundType === 'gradient') {
      const gradientColors = theme.gradientColors.join(', ');
      return {
        background: `linear-gradient(${theme.gradientDirection}, ${gradientColors})`,
        fontFamily: theme.font,
      };
    } else {
      return {
        backgroundColor: theme.backgroundColor,
        color: theme.primaryColor,
        fontFamily: theme.font,
      };
    }
  };

  return (
    <>
      {/* Bio Page Pixel Tracking */}
      <IndividualPixelInjector 
        pixels={bioPagePixels} 
        pageId="bio-page" 
      />
      
      <PixelInjector pixels={pixels} />
      <main 
        style={getBackgroundStyle()} 
        className="min-h-screen w-full flex flex-col items-center justify-start p-4 transition-all duration-500 relative"
      >
        {media.wallpaperUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(${media.wallpaperUrl})`,
              opacity: media.wallpaperOpacity ? media.wallpaperOpacity / 100 : 1
            }}
          />
        )}
        {media.videoUrl && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ opacity: media.videoOpacity ? media.videoOpacity / 100 : 1 }}
          >
            <source src={media.videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/30 z-0" />
        
        <div className="relative z-10 w-full flex flex-col items-center pt-16">
          <header className="text-center flex flex-col items-center mb-10">
            <SafeImage 
              src={profile.imageUrl} 
              alt={profile.name} 
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white/20"
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 
                className="text-3xl md:text-4xl font-bold text-center"
                style={{ color: profile.nameColor || '#ffffff' }}
              >
                {profile.name}
              </h1>
              {profile.verifiedBadgeUrl && (
                <img
                  src={convertToDirectImageUrl(profile.verifiedBadgeUrl)}
                  alt="Verified"
                  className="w-6 h-6 object-cover"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
            </div>
            <p 
              className="text-lg mt-1" 
              style={{ color: profile.subtitleColor || '#bfdbfe' }}
            >
              {profile.subtitle}
            </p>
            {profile.location && (
              <div className="flex items-center justify-center gap-1 mt-2">
                <MapPin 
                  className="w-4 h-4" 
                  style={{ color: profile.locationColor || 'rgba(255, 255, 255, 0.8)' }}
                />
                <p 
                  className="text-sm" 
                  style={{ color: profile.locationColor || 'rgba(255, 255, 255, 0.8)' }}
                >
                  {profile.location}
                </p>
              </div>
            )}
            
            {/* Social Media Icons */}
            {profile.socialMedia && profile.socialMedia.filter(social => social.active).length > 0 && (
              <div 
                className="flex items-center justify-center mt-4"
                style={{ gap: '12px' }}
              >
                {profile.socialMedia
                  .filter(social => social.active)
                  .map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target={social.openInNewTab ? "_blank" : "_self"}
                      rel={social.openInNewTab ? "noopener noreferrer" : undefined}
                      className="hover:opacity-80 transition-opacity duration-200"
                      onClick={() => {
                        // Handle email links with deep link optimization
                        if (social.url.startsWith('mailto:')) {
                          handleEmailLink(social.url);
                          return;
                        }
                        trackLinkClick(`social-${social.id}`);
                      }}
                    >
                      <SafeImage
                        src={social.iconUrl}
                        alt={social.platform}
                        className="w-8 h-8 rounded object-cover"
                        fallbackSrc="https://via.placeholder.com/32x32/666/fff?text=?"
                      />
                    </a>
                  ))}
              </div>
            )}
            
            <p 
              className="max-w-md mt-4 text-base" 
              style={{ color: profile.bioColor || 'rgba(255, 255, 255, 0.9)' }}
            >
              {profile.bio}
            </p>
          </header>

          <div className="w-full flex flex-col items-center space-y-4">
            {visibleLinks.map(link => {
              if (link.layout === 'twoColumns') {
                // Find the next link that also has twoColumns layout
                const currentIndex = visibleLinks.indexOf(link);
                const nextLink = visibleLinks[currentIndex + 1];
                
                // Skip if this is the second link in a pair
                if (currentIndex > 0 && visibleLinks[currentIndex - 1].layout === 'twoColumns') {
                  return null;
                }
                
                return (
                  <div 
                    key={link.id} 
                    className="w-full max-w-md grid grid-cols-2 gap-4"
                    style={{
                      marginTop: `${link.marginTop || 5}px`,
                      marginBottom: `${link.marginBottom || 5}px`,
                    }}
                  >
                    <div>
                      <LinkBlock link={link} onClick={trackLinkClick} />
                    </div>
                    {nextLink && nextLink.layout === 'twoColumns' && (
                      <div>
                        <LinkBlock link={nextLink} onClick={trackLinkClick} />
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <div key={link.id} className="w-full max-w-md">
                  <LinkBlock link={link} onClick={trackLinkClick} />
                </div>
              );
            })}
          </div>

          <footer className="mt-16 mb-8 text-center">
            <p className="text-white/60 text-sm">
              Copyright © 2025 Soulmates Desires. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default BioPage;