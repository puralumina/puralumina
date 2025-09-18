import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { PageData, Link } from '../types';
import { getPageData, trackPageView, trackLinkClick } from '../services/pageService';
import { handleEmailLink } from '../utils/emailDeepLinks';
import PixelInjector from '../components/PixelInjector';
import Cart from '../components/Cart';

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
}> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(convertToDirectImageUrl(src));
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc('https://d1yei2z3i6k35z.cloudfront.net/4704293/68c976f95af39_couple-1329349_1280.jpg');
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

// Utility function to clean HTML tags and render as plain text
const cleanHtmlContent = (htmlContent: string): string => {
  if (!htmlContent) return '';
  
  // Remove HTML tags and decode HTML entities
  return htmlContent
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with regular space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .trim(); // Remove leading/trailing whitespace
};

// Utility function to render HTML content safely
const renderHtmlContent = (htmlContent: string): JSX.Element => {
  if (!htmlContent) return <></>;
  
  // Clean empty Quill content
  if (htmlContent === '<p><br></p>' || htmlContent === '<p></p>') {
    return <></>;
  }
  
  return (
    <div 
      className="prose prose-sm max-w-none text-white/90"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

// Deep link handler for internal navigation
const handleDeepLink = (url: string, openInNewWindow: boolean = false) => {
  if (url.startsWith('/')) {
    // Internal link
    if (openInNewWindow) {
      window.open(window.location.origin + url, '_blank');
    } else {
      window.location.href = url;
    }
  } else if (url.startsWith('mailto:')) {
    // Email link
    handleEmailLink(url);
  } else {
    // External link
    if (openInNewWindow) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }
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

const BioPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [collapsedItems, setCollapsedItems] = useState<{ [key: string]: boolean }>({});
  
  // Background music for bio page
  // EDIT THIS PATH: Change '/biopage-music.mp3' to your desired music file
  useBackgroundMusic('/biopage-music.mp3', { volume: 0.2 });

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const data = await getPageData();
        setPageData(data);
        
        // Update page title
        document.title = data.profile.name || 'Soulmates Desires - Official';
        
        // Update favicon
        if (data.media.faviconUrl) {
          updateFavicon(data.media.faviconUrl);
        }
        
        // Track page view
        await trackPageView();
      } catch (error) {
        console.error('Error loading page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();
  }, []);

  const handleLinkClick = async (link: Link) => {
    // Track click
    await trackLinkClick(link.id);
    
    // Handle different link types
    if (link.password) {
      const enteredPassword = prompt('Enter password to access this link:');
      if (enteredPassword !== link.password) {
        alert('Incorrect password');
        return;
      }
    }
    
    // Handle link navigation
    handleDeepLink(link.url, link.openInNewWindow);
  };

  const getBackgroundStyle = () => {
    if (!pageData) return {};
    
    if (pageData.media.wallpaperUrl) {
      return { 
        backgroundImage: `url(${pageData.media.wallpaperUrl})`,
        opacity: pageData.media.wallpaperOpacity ? pageData.media.wallpaperOpacity / 100 : 1
      };
    } else if (pageData.theme.backgroundType === 'gradient') {
      const gradientColors = pageData.theme.gradientColors.join(', ');
      return { background: `linear-gradient(${pageData.theme.gradientDirection}, ${gradientColors})` };
    } else {
      return { backgroundColor: pageData.theme.backgroundColor };
    }
  };

  const getVideoBackgroundStyle = () => {
    if (!pageData?.media.videoUrl) return {};
    return {
      opacity: pageData.media.videoOpacity ? pageData.media.videoOpacity / 100 : 1
    };
  };

  const getBlockStyle = (link: Link): React.CSSProperties => {
    const styling = link.styling || {};
    return {
      backgroundColor: styling.backgroundColor || 'rgba(255, 255, 255, 0.1)',
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      opacity: styling.opacity !== undefined ? styling.opacity / 100 : 1,
      borderRadius: styling.borderRadius !== undefined ? `${styling.borderRadius}px` : '12px',
      boxShadow: styling.dropShadow ? `0 ${styling.dropShadow}px ${styling.dropShadow * 2}px rgba(0, 0, 0, 0.1)` : 'none',
    };
  };

  const handleImageNavigation = (linkId: string, direction: 'prev' | 'next', totalImages: number) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[linkId] || 0;
      let newIndex;
      
      if (direction === 'prev') {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      } else {
        newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
      }
      
      return { ...prev, [linkId]: newIndex };
    });
  };

  const toggleCollapse = (linkId: string) => {
    setCollapsedItems(prev => ({
      ...prev,
      [linkId]: !prev[linkId]
    }));
  };

  const renderTextContent = (textContent: any[]) => {
    if (!textContent || !Array.isArray(textContent)) return null;
    
    return textContent.map((item, index) => {
      const Tag = item.type === 'heading' ? 'h3' : 'p';
      const styles = item.styles || {};
      
      return (
        <Tag
          key={index}
          className="mb-2"
          style={{
            fontSize: styles.fontSize || (item.type === 'heading' ? '1.25rem' : '1rem'),
            fontFamily: styles.fontFamily || 'inherit',
            fontWeight: styles.fontWeight || (item.type === 'heading' ? 'bold' : 'normal'),
            fontStyle: styles.fontStyle || 'normal',
            textAlign: styles.textAlign || 'left',
            color: styles.color || 'inherit',
            textDecoration: styles.textDecoration || 'none',
          }}
        >
          {cleanHtmlContent(item.content)}
        </Tag>
      );
    });
  };

  const renderLineBlock = (link: Link) => {
    const settings = link.lineSettings || {};
    const width = settings.width || 100;
    const alignment = settings.alignment || 'center';
    const color = settings.color || 'rgba(255, 255, 255, 0.3)';
    const style = settings.style || 'solid';
    const thickness = settings.thickness || 1;
    const dashSpacing = settings.dashSpacing || 5;

    const lineStyle: React.CSSProperties = {
      width: `${width}%`,
      height: `${thickness}px`,
      backgroundColor: style === 'solid' ? color : 'transparent',
      margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0 auto 0 0',
    };

    if (style === 'dashed') {
      lineStyle.borderTop = `${thickness}px dashed ${color}`;
      lineStyle.backgroundColor = 'transparent';
    } else if (style === 'dotted') {
      lineStyle.borderTop = `${thickness}px dotted ${color}`;
      lineStyle.backgroundColor = 'transparent';
    } else if (style === 'wavy') {
      lineStyle.background = `repeating-linear-gradient(90deg, ${color} 0px, ${color} ${dashSpacing}px, transparent ${dashSpacing}px, transparent ${dashSpacing * 2}px)`;
      lineStyle.height = `${thickness * 2}px`;
    }

    return (
      <div 
        className="py-4"
        style={{
          marginTop: `${link.marginTop || 0}px`,
          marginBottom: `${link.marginBottom || 0}px`,
        }}
      >
        <div style={lineStyle}></div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>Unable to load page data.</p>
        </div>
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

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        ...getBackgroundStyle(),
        fontFamily: pageData.theme.font,
      }}
    >
      {/* Pixel Injection */}
      <PixelInjector pixels={pageData.pixels} />
      
      {/* Video Background */}
      {pageData.media.videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={getVideoBackgroundStyle()}
        >
          <source src={pageData.media.videoUrl} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 px-6 py-12 max-w-md mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <SafeImage
              src={pageData.profile.imageUrl}
              alt={pageData.profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 
              className="text-2xl font-bold"
              style={{ color: pageData.profile.nameColor || '#ffffff' }}
            >
              {pageData.profile.name}
            </h1>
            {pageData.profile.verifiedBadgeUrl && (
              <SafeImage
                src={pageData.profile.verifiedBadgeUrl}
                alt="Verified"
                className="w-6 h-6 object-cover"
              />
            )}
          </div>
          
          <p 
            className="font-medium mb-2"
            style={{ color: pageData.profile.subtitleColor || '#bfdbfe' }}
          >
            {pageData.profile.subtitle}
          </p>
          
          {pageData.profile.location && (
            <div className="flex items-center justify-center gap-1 mb-4">
              <MapPin className="w-4 h-4" style={{ color: pageData.profile.locationColor || 'rgba(255, 255, 255, 0.8)' }} />
              <span 
                className="text-sm"
                style={{ color: pageData.profile.locationColor || 'rgba(255, 255, 255, 0.8)' }}
              >
                {pageData.profile.location}
              </span>
            </div>
          )}
          
          <p 
            className="text-sm leading-relaxed max-w-xs mx-auto mb-6"
            style={{ color: pageData.profile.bioColor || 'rgba(255, 255, 255, 0.9)' }}
          >
            {pageData.profile.bio}
          </p>
          
          {/* Social Media Icons */}
          {pageData.profile.socialMedia && pageData.profile.socialMedia.filter(social => social.active).length > 0 && (
            <div 
              className="flex items-center justify-center mb-6"
              style={{ gap: `${pageData.profile.socialMediaSpacing || 12}px` }}
            >
              {pageData.profile.socialMedia
                .filter(social => social.active)
                .map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target={social.openInNewTab ? '_blank' : '_self'}
                    rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="transition-transform hover:scale-110"
                  >
                    <SafeImage
                      src={social.iconUrl}
                      alt={social.platform}
                      className="w-8 h-8 rounded object-cover"
                    />
                  </a>
                ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {visibleLinks.map((link) => {
            const currentIndex = currentImageIndex[link.id] || 0;
            
            // Line Block
            if (link.type === 'lineBlock') {
              return (
                <div key={link.id}>
                  {renderLineBlock(link)}
                </div>
              );
            }
            
            // Text Block
            if (link.type === 'textBlock') {
              return (
                <div 
                  key={link.id}
                  className="w-full backdrop-blur-sm border p-4 rounded-lg"
                  style={{
                    ...getBlockStyle(link),
                    marginTop: `${link.marginTop || 0}px`,
                    marginBottom: `${link.marginBottom || 0}px`,
                  }}
                >
                  {link.textContent && renderTextContent(link.textContent)}
                </div>
              );
            }
            
            // Image Only Block
            if (link.type === 'imageOnly') {
              if (!link.thumbnailUrl) return null;
              
              const imageSize = link.imageSize || 100;
              const alignment = link.imageAlignment || 'center';
              const aspectRatio = link.aspectRatio || '16:9';
              
              const alignmentClass = alignment === 'left' ? 'mr-auto' : 
                                   alignment === 'right' ? 'ml-auto' : 'mx-auto';
              
              return (
                <div 
                  key={link.id}
                  className="w-full"
                  style={{
                    marginTop: `${link.marginTop || 0}px`,
                    marginBottom: `${link.marginBottom || 0}px`,
                  }}
                >
                  <div 
                    className={`${alignmentClass} overflow-hidden rounded-lg`}
                    style={{ 
                      width: `${imageSize}%`,
                      aspectRatio: aspectRatio.replace(':', '/'),
                    }}
                    onClick={() => link.url && handleLinkClick(link)}
                  >
                    <SafeImage
                      src={link.thumbnailUrl}
                      alt={cleanHtmlContent(link.title)}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              );
            }
            
            // Video Only Block
            if (link.type === 'videoOnly') {
              if (!link.thumbnailUrl) return null;
              
              const imageSize = link.imageSize || 100;
              const alignment = link.imageAlignment || 'center';
              const aspectRatio = link.aspectRatio || '16:9';
              
              const alignmentClass = alignment === 'left' ? 'mr-auto' : 
                                   alignment === 'right' ? 'ml-auto' : 'mx-auto';
              
              return (
                <div 
                  key={link.id}
                  className="w-full"
                  style={{
                    marginTop: `${link.marginTop || 0}px`,
                    marginBottom: `${link.marginBottom || 0}px`,
                  }}
                >
                  <div 
                    className={`${alignmentClass} overflow-hidden rounded-lg relative`}
                    style={{ 
                      width: `${imageSize}%`,
                      aspectRatio: aspectRatio.replace(':', '/'),
                    }}
                    onClick={() => link.url && handleLinkClick(link)}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <source src={link.thumbnailUrl} type="video/mp4" />
                    </video>
                  </div>
                </div>
              );
            }
            
            // Button Block
            if (link.type === 'buttonBlock') {
              const buttonAlignment = link.buttonAlignment || 'center';
              const buttonStyling = link.buttonStyling || {};
              const alignmentClass = buttonAlignment === 'left' ? 'justify-start' : 
                                   buttonAlignment === 'right' ? 'justify-end' : 'justify-center';
              
              return (
                <div 
                  key={link.id}
                  className={`w-full flex ${alignmentClass}`}
                  style={{
                    marginTop: `${link.marginTop || 0}px`,
                    marginBottom: `${link.marginBottom || 0}px`,
                  }}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: buttonStyling.backgroundColor || pageData.theme.primaryColor,
                      borderColor: buttonStyling.borderColor || 'transparent',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: buttonStyling.borderRadius || '8px',
                      opacity: buttonStyling.opacity !== undefined ? buttonStyling.opacity / 100 : 1,
                      color: 'white',
                    }}
                  >
                    {cleanHtmlContent(link.title)}
                  </button>
                </div>
              );
            }
            
            // Standard Link Block
            return (
              <div 
                key={link.id}
                className="w-full backdrop-blur-sm border p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  ...getBlockStyle(link),
                  marginTop: `${link.marginTop || 0}px`,
                  marginBottom: `${link.marginBottom || 0}px`,
                }}
                onClick={() => handleLinkClick(link)}
              >
                <div className="flex items-center space-x-4">
                  {link.thumbnailUrl && (
                    <SafeImage
                      src={link.thumbnailUrl}
                      alt={cleanHtmlContent(link.title)}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-white mb-1">
                      {cleanHtmlContent(link.title)}
                    </h3>
                    {link.description && (
                      <div className="text-white/70 text-sm">
                        {renderHtmlContent(link.description)}
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            Copyright © 2025 Soulmates Desires. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Shopping Cart */}
      <Cart />
    </div>
  );
};

export default BioPage;