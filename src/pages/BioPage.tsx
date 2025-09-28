import React, { useEffect, useState } from 'react';
import { MapPin, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { getPageData, trackPageView, trackLinkClick } from '../services/pageService';
import { PageData, Link } from '../types';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { handleEmailLink } from '../utils/emailDeepLinks';
import { handleDeepLink } from '../utils/deepLinks';
import PixelInjector from '../components/PixelInjector';

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
  onError?: () => void;
}> = ({ src, alt, className, onError }) => {
  const [imageSrc, setImageSrc] = useState(convertToDirectImageUrl(src));
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc('https://d1yei2z3i6k35z.cloudfront.net/4704293/68c976f95af39_couple-1329349_1280.jpg');
      onError?.();
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

const BioPage: React.FC = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Background music for bio page
  // EDIT THIS PATH: Change '/biopage-music.mp3' to your desired music file
  useBackgroundMusic('/biopage-music.mp3', { volume: 0.2 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const pageData = await getPageData();
        setData(pageData);
        
        // Update page title
        document.title = `${pageData.profile.name} - Official`;
        
        // Update favicon
        if (pageData.media.faviconUrl) {
          updateFavicon(pageData.media.faviconUrl);
        }
        
        // Track page view
        await trackPageView();
      } catch (error) {
        console.error('Error loading page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLinkClick = async (link: Link, event?: React.MouseEvent) => {
    // Handle password protected links
    if (link.password) {
      const enteredPassword = prompt('This link is password protected. Please enter the password:');
      if (enteredPassword !== link.password) {
        alert('Incorrect password. Access denied.');
        return;
      }
    }

    // Track the click
    await trackLinkClick(link.id);

    // Handle email links specially
    if (link.url.startsWith('mailto:')) {
      if (event) {
        handleEmailLink(link.url, event);
      } else {
        handleEmailLink(link.url);
      }
      return;
    }

    // Handle regular links
    if (link.openInNewWindow !== false) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link.url;
    }
  };

  const getBackgroundStyle = () => {
    if (!data) return {};
    
    if (data.media.wallpaperUrl) {
      return { 
        backgroundImage: `url(${convertToDirectImageUrl(data.media.wallpaperUrl)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    } else if (data.theme.backgroundType === 'gradient') {
      const gradientColors = data.theme.gradientColors.join(', ');
      return { background: `linear-gradient(${data.theme.gradientDirection}, ${gradientColors})` };
    } else {
      return { backgroundColor: data.theme.backgroundColor };
    }
  };

  const getBlockStyle = (link: Link): React.CSSProperties => {
    const styling = link.styling || {};
    return {
      backgroundColor: styling.backgroundColor || 'rgba(255, 255, 255, 0.1)',
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      opacity: styling.opacity !== undefined ? styling.opacity / 100 : 1,
      boxShadow: styling.dropShadow ? `0 ${styling.dropShadow}px ${styling.dropShadow * 2}px rgba(0, 0, 0, 0.1)` : undefined,
      borderRadius: styling.borderRadius ? `${styling.borderRadius}px` : undefined,
    };
  };

  const renderTextContent = (textContent: any[]) => {
    return textContent.map((item, index) => {
      const Tag = item.type === 'heading' ? 'h3' : 'p';
      return (
        <Tag
          key={index}
          style={{
            fontSize: item.styles.fontSize || (item.type === 'heading' ? '1.25rem' : '1rem'),
            fontFamily: item.styles.fontFamily || data?.theme.font || "'Inter', sans-serif",
            fontWeight: item.styles.fontWeight || (item.type === 'heading' ? 'bold' : 'normal'),
            fontStyle: item.styles.fontStyle || 'normal',
            textAlign: item.styles.textAlign || 'left',
            color: item.styles.color || 'white',
            textDecoration: item.styles.textDecoration || 'none',
            margin: '0.5rem 0',
            lineHeight: '1.5'
          }}
        >
          {item.content}
        </Tag>
      );
    });
  };

  const renderImageBlock = (link: Link) => {
    const imageSize = link.imageSize || 100;
    const alignment = link.imageAlignment || 'center';
    const aspectRatio = link.aspectRatio || '16:9';
    
    const alignmentClass = {
      'left': 'justify-start',
      'center': 'justify-center',
      'right': 'justify-end'
    }[alignment];

    return (
      <div className={`flex ${alignmentClass} w-full`}>
        <div 
          style={{ 
            width: `${imageSize}%`,
            aspectRatio: aspectRatio.replace(':', '/'),
            maxWidth: '100%'
          }}
          className="overflow-hidden"
        >
          <SafeImage
            src={link.thumbnailUrl || ''}
            alt={link.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };

  const renderLineBlock = (link: Link) => {
    const lineSettings = link.lineSettings || {};
    const width = lineSettings.width || 100;
    const alignment = lineSettings.alignment || 'center';
    const color = lineSettings.color || 'rgba(255, 255, 255, 0.3)';
    const style = lineSettings.style || 'solid';
    const thickness = lineSettings.thickness || 1;
    const dashSpacing = lineSettings.dashSpacing || 5;
    
    const alignmentClass = {
      'left': 'justify-start',
      'center': 'justify-center', 
      'right': 'justify-end'
    }[alignment];

    let borderStyle = style;
    if (style === 'wavy') {
      // For wavy lines, we'll use a repeating linear gradient to simulate waves
      return (
        <div className={`flex ${alignmentClass} w-full`}>
          <div 
            style={{ 
              width: `${width}%`,
              height: `${thickness}px`,
              background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} ${dashSpacing}px, transparent ${dashSpacing}px, transparent ${dashSpacing * 2}px)`,
              borderRadius: `${thickness / 2}px`
            }}
          />
        </div>
      );
    }

    return (
      <div className={`flex ${alignmentClass} w-full`}>
        <div 
          style={{ 
            width: `${width}%`,
            height: `${thickness}px`,
            borderTop: `${thickness}px ${borderStyle} ${color}`,
            ...(style === 'dashed' || style === 'dotted' ? {
              borderImageSlice: 1,
              borderImageWidth: `${thickness}px`,
              borderImageOutset: 0,
              borderImageRepeat: 'repeat'
            } : {})
          }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Failed to load page data</p>
      </div>
    );
  }

  const visibleLinks = data.links.filter(link => {
    if (!link.active) return false;
    if (link.schedule) {
      const now = new Date();
      const start = new Date(link.schedule.start);
      const end = new Date(link.schedule.end);
      return now >= start && now <= end;
    }
    return true;
  }).sort((a, b) => a.order - b.order);

  const backgroundOpacity = data.media.wallpaperOpacity !== undefined ? data.media.wallpaperOpacity / 100 : 1;

  return (
    <div className="min-h-screen relative" style={{ fontFamily: data.theme.font }}>
      {/* Pixel Tracking */}
      <PixelInjector pixels={data.pixels} />
      
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          ...getBackgroundStyle(),
          opacity: backgroundOpacity
        }}
      />
      
      {/* Video Background */}
      {data.media.videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover"
          style={{ 
            opacity: data.media.videoOpacity ? data.media.videoOpacity / 100 : 1,
            zIndex: 1
          }}
        >
          <source src={convertToDirectImageUrl(data.media.videoUrl)} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40" style={{ zIndex: 2 }}></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 pt-8">
        {/* Profile Section */}
        <div className="text-center mb-6 max-w-md">
          {/* Profile Image - Only show if showProfileImage is not false */}
          {data.profile.showProfileImage !== false && (
            <div className="relative inline-block mb-4">
              <SafeImage
                src={data.profile.imageUrl}
                alt={data.profile.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Name and Verified Badge - Only show if showName is not false */}
          {data.profile.showName !== false && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: data.profile.nameColor || '#ffffff' }}
              >
                {data.profile.name}
              </h1>
              {data.profile.verifiedBadgeUrl && (
                <SafeImage
                  src={data.profile.verifiedBadgeUrl}
                  alt="Verified"
                  className="w-6 h-6 object-cover"
                />
              )}
            </div>
          )}
          
          <p 
            className="font-medium mb-2"
            style={{ color: data.profile.subtitleColor || '#bfdbfe' }}
          >
            {data.profile.subtitle}
          </p>
          
          {data.profile.location && (
            <div className="flex items-center justify-center gap-1 mb-4">
              <MapPin className="w-4 h-4" style={{ color: data.profile.locationColor || 'rgba(255, 255, 255, 0.8)' }} />
              <span 
                className="text-sm"
                style={{ color: data.profile.locationColor || 'rgba(255, 255, 255, 0.8)' }}
              >
                {data.profile.location}
              </span>
            </div>
          )}
          
          {/* Bio - Only show if showBio is not false */}
          {data.profile.showBio !== false && (
            <p 
              className="text-sm leading-relaxed mb-6"
              style={{ color: data.profile.bioColor || 'rgba(255, 255, 255, 0.9)' }}
            >
              {data.profile.bio}
            </p>
          )}
          
          {/* Social Media Icons */}
          {data.profile.socialMedia && data.profile.socialMedia.filter(social => social.active).length > 0 && (
            <div 
              className="flex items-center justify-center mb-6"
              style={{ gap: `${data.profile.socialMediaSpacing || 12}px` }}
            >
              {data.profile.socialMedia
                .filter(social => social.active)
                .map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target={social.openInNewTab ? '_blank' : '_self'}
                    rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="hover:scale-110 transition-transform duration-200"
                    onClick={() => trackLinkClick(`social-${social.id}`)}
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
        <div className="w-full max-w-md">
          {visibleLinks.map((link) => {
            // Handle spacing
            const topSpacing = link.topSpacing || link.marginTop || 0;
            const bottomSpacing = link.bottomSpacing || link.marginBottom || 0;
            
            return (
              <div 
                key={link.id}
                className="mb-4"
                style={{
                  marginTop: `${topSpacing}px`,
                  marginBottom: `${bottomSpacing}px`
                }}
              >
                {/* Text Block */}
                {link.type === 'textBlock' && link.textContent && (
                  <div className="w-full">
                    {renderTextContent(link.textContent)}
                  </div>
                )}

                {/* Image Block */}
                {link.type === 'imageBlock' && (
                  <div 
                    className="w-full cursor-pointer"
                    onClick={() => {
                      handleLinkClick(link);
                      if (link.url.startsWith('/')) {
                        handleDeepLink(link.url, true);
                      }
                    }}
                  >
                    {renderImageBlock(link)}
                  </div>
                )}

                {/* Image Only Block */}
                {link.type === 'imageOnly' && (
                  <div className="w-full -mx-4">
                    {renderImageBlock(link)}
                  </div>
                )}

                {/* Video Only Block */}
                {link.type === 'videoOnly' && link.thumbnailUrl && (
                  <div className="w-full">
                    <div className={`flex ${link.imageAlignment === 'left' ? 'justify-start' : link.imageAlignment === 'right' ? 'justify-end' : 'justify-center'} w-full`}>
                      <div 
                        style={{ 
                          width: `${link.imageSize || 100}%`,
                          aspectRatio: (link.aspectRatio || '16:9').replace(':', '/'),
                          maxWidth: '100%'
                        }}
                        className="overflow-hidden rounded-lg"
                      >
                        <video
                          src={link.thumbnailUrl}
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Line Block */}
                {link.type === 'lineBlock' && (
                  <div className="w-full py-2">
                    {renderLineBlock(link)}
                  </div>
                )}

                {/* Standard Link */}
                {link.type === 'standardLink' && (
                  <button
                    onClick={() => {
                      handleLinkClick(link);
                      if (link.url.startsWith('/')) {
                        handleDeepLink(link.url, true);
                      } else {
                        handleLinkClick(link);
                      }
                    }}
                    className="w-full backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:scale-105 transition-all duration-300 group"
                    style={getBlockStyle(link)}
                  >
                    {link.thumbnailUrl && (
                      <SafeImage
                        src={link.thumbnailUrl}
                        alt={link.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-grow text-left">
                      <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {link.title}
                      </h3>
                    </div>
                    <ExternalLink size={20} className="text-white/50 group-hover:text-white/80 transition-colors flex-shrink-0" />
                  </button>
                )}

                {/* Button Block */}
                {link.type === 'buttonBlock' && (
                  <div className={`w-full flex ${
                    link.buttonAlignment === 'left' ? 'justify-start' : 
                    link.buttonAlignment === 'right' ? 'justify-end' : 
                    'justify-center'
                  }`}>
                    <button
                      onClick={() => {
                        handleLinkClick(link);
                        if (link.url.startsWith('/')) {
                          handleDeepLink(link.url, true);
                        } else {
                          handleLinkClick(link);
                        }
                      }}
                      className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                      style={{
                        backgroundColor: link.buttonStyling?.backgroundColor || data.theme.primaryColor,
                        borderColor: link.buttonStyling?.borderColor || 'transparent',
                        borderRadius: link.buttonStyling?.borderRadius || '8px',
                        opacity: link.buttonStyling?.opacity !== undefined ? link.buttonStyling.opacity / 100 : 1,
                        color: 'white',
                        border: '1px solid'
                      }}
                    >
                      {link.title}
                    </button>
                  </div>
                )}

                {/* Music Block */}
                {link.type === 'musicBlock' && (
                  <button
                    onClick={() => {
                      handleLinkClick(link);
                      if (link.url.startsWith('/')) {
                        handleDeepLink(link.url, true);
                      } else {
                        handleLinkClick(link);
                      }
                    }}
                    className="w-full backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:scale-105 transition-all duration-300 group"
                    style={getBlockStyle(link)}
                  >
                    {link.thumbnailUrl && (
                      <SafeImage
                        src={link.thumbnailUrl}
                        alt={link.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-grow text-left">
                      <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {link.title}
                      </h3>
                      {link.artist && (
                        <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                          {link.artist}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Play size={16} className="text-white/70 group-hover:text-white transition-colors" />
                      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                        {link.platform || 'Music'}
                      </span>
                    </div>
                  </button>
                )}

                {/* YouTube Embed */}
                {(link.type === 'youtubeEmbed' || link.type === 'youtubeExclusive' || link.type === 'youtubeLive') && (
                  <div
                    className="w-full backdrop-blur-sm border rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
                    style={getBlockStyle(link)}
                  >
                    {link.embedBehavior === 'embed' && link.embedCode ? (
                      <div 
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: link.embedCode }}
                      />
                    ) : (
                      <button
                        onClick={() => {
                          handleLinkClick(link);
                          if (link.url.startsWith('/')) {
                            handleDeepLink(link.url, true);
                          } else {
                            handleLinkClick(link);
                          }
                        }}
                        className="w-full p-4 flex items-center space-x-4 group"
                      >
                        {link.thumbnailUrl && (
                          <div className="relative flex-shrink-0">
                            <SafeImage
                              src={link.thumbnailUrl}
                              alt={link.title}
                              className="w-16 h-12 rounded object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                              <Play size={16} className="text-white" />
                            </div>
                          </div>
                        )}
                        <div className="flex-grow text-left">
                          <h3 className="font-semibold text-white group-hover:text-red-200 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors">
                            {link.type === 'youtubeEmbed' ? 'YouTube Video' : 
                             link.type === 'youtubeExclusive' ? 'YouTube Exclusive' : 
                             'YouTube Live'}
                          </p>
                        </div>
                        <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                          <Play size={12} className="text-white ml-0.5" />
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* Product Block */}
                {link.type === 'productBlock' && (
                  <button
                    onClick={() => {
                      handleLinkClick(link);
                      if (link.url.startsWith('/')) {
                        handleDeepLink(link.url, true);
                      } else {
                        handleLinkClick(link);
                      }
                    }}
                    className="w-full backdrop-blur-sm border p-4 rounded-lg hover:scale-105 transition-all duration-300 group"
                    style={getBlockStyle(link)}
                  >
                    <div className="flex items-center space-x-4">
                      {link.thumbnailUrl && (
                        <SafeImage
                          src={link.thumbnailUrl}
                          alt={link.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-grow text-left">
                        <h3 className="font-semibold text-white group-hover:text-green-200 transition-colors">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors line-clamp-2">
                            {link.description}
                          </p>
                        )}
                        {link.price && (
                          <p className="text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                            {link.currency === 'USD' && '$'}
                            {link.currency === 'EUR' && '€'}
                            {link.currency === 'GBP' && '£'}
                            {link.price}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">🛒</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default BioPage;