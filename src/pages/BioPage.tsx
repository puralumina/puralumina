import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ExternalLink, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { PageData, Link as LinkType, Product } from '../types';
import { getPageData, trackLinkClick, trackPageView } from '../services/pageService';
import { handleEmailLink } from '../utils/emailDeepLinks';
import { useCart } from '../contexts/CartContext';
import PixelInjector from '../components/PixelInjector';
import ProductCarousel from '../components/ProductCarousel';
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

// Deep link handler for internal navigation
const handleDeepLink = (url: string, openInNewWindow: boolean = false) => {
  if (url.startsWith('/')) {
    if (openInNewWindow) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  } else {
    window.open(url, '_blank');
  }
};

const BioPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState<{ [key: string]: boolean }>({});
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [collapsedItems, setCollapsedItems] = useState<{ [key: string]: boolean }>({});

  // Background music for bio page
  // EDIT THIS PATH: Change '/biopage-music.mp3' to your desired music file
  useBackgroundMusic('/biopage-music.mp3', { volume: 0.2 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const pageData = await getPageData();
        setData(pageData);
        
        // Update favicon if provided
        if (pageData.media.faviconUrl) {
          const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = pageData.media.faviconUrl;
          document.getElementsByTagName('head')[0].appendChild(link);
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

  const handleLinkClick = async (link: LinkType, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }

    // Track the click
    await trackLinkClick(link.id);

    // Handle different link types
    if (link.url.startsWith('mailto:')) {
      handleEmailLink(link.url, event);
    } else if (link.url.startsWith('/')) {
      // Internal link
      if (link.openInNewWindow) {
        window.open(link.url, '_blank');
      } else {
        navigate(link.url);
      }
    } else {
      // External link
      window.open(link.url, link.openInNewWindow ? '_blank' : '_self');
    }
  };

  const handleImageNavigation = (linkId: string, direction: 'prev' | 'next', images: string[]) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[linkId] || 0;
      let newIndex;
      
      if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      } else {
        newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      }
      
      return { ...prev, [linkId]: newIndex };
    });
  };

  const toggleAudio = (linkId: string, audioUrl: string) => {
    const audio = audioElements[linkId];
    
    if (audio) {
      if (isPlaying[linkId]) {
        audio.pause();
        setIsPlaying(prev => ({ ...prev, [linkId]: false }));
      } else {
        audio.play();
        setIsPlaying(prev => ({ ...prev, [linkId]: true }));
      }
    } else {
      // Create new audio element
      const newAudio = new Audio(audioUrl);
      newAudio.addEventListener('ended', () => {
        setIsPlaying(prev => ({ ...prev, [linkId]: false }));
      });
      
      setAudioElements(prev => ({ ...prev, [linkId]: newAudio }));
      newAudio.play();
      setIsPlaying(prev => ({ ...prev, [linkId]: true }));
    }
  };

  const toggleMute = (linkId: string) => {
    const audio = audioElements[linkId];
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(prev => ({ ...prev, [linkId]: audio.muted }));
    }
  };

  const toggleCollapse = (linkId: string) => {
    setCollapsedItems(prev => ({ ...prev, [linkId]: !prev[linkId] }));
  };

  const getBlockStyle = (link: LinkType): React.CSSProperties => {
    const styling = link.styling || {};
    return {
      backgroundColor: styling.backgroundColor || 'rgba(255, 255, 255, 0.1)',
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      opacity: styling.opacity !== undefined ? styling.opacity / 100 : 1,
      borderRadius: styling.borderRadius ? `${styling.borderRadius}px` : '12px',
      filter: styling.dropShadow ? `drop-shadow(0 ${styling.dropShadow}px ${styling.dropShadow * 2}px rgba(0,0,0,0.1))` : 'none',
    };
  };

  const getButtonStyle = (link: LinkType): React.CSSProperties => {
    const buttonStyling = link.buttonStyling || {};
    return {
      backgroundColor: buttonStyling.backgroundColor || 'rgba(59, 130, 246, 0.8)',
      borderColor: buttonStyling.borderColor || 'rgba(59, 130, 246, 1)',
      borderRadius: buttonStyling.borderRadius || '8px',
      opacity: buttonStyling.opacity !== undefined ? buttonStyling.opacity / 100 : 1,
    };
  };

  const getSpacingStyle = (link: LinkType): React.CSSProperties => {
    const topSpacing = link.topSpacing || link.marginTop || 0;
    const bottomSpacing = link.bottomSpacing || link.marginBottom || 0;
    
    let spacing = 0;
    if (link.spacingSize) {
      switch (link.spacingSize) {
        case 'small': spacing = 8; break;
        case 'medium': spacing = 16; break;
        case 'large': spacing = 24; break;
        case 'xlarge': spacing = 32; break;
        case 'custom': spacing = link.customSpacing || 0; break;
      }
    }
    
    return {
      marginTop: `${topSpacing + spacing}px`,
      marginBottom: `${bottomSpacing + spacing}px`,
    };
  };

  const getLineStyle = (link: LinkType): React.CSSProperties => {
    const lineSettings = link.lineSettings || {};
    const width = lineSettings.width || 100;
    const color = lineSettings.color || 'rgba(255, 255, 255, 0.3)';
    const thickness = lineSettings.thickness || 1;
    const style = lineSettings.style || 'solid';
    
    let borderStyle = style;
    if (style === 'wavy') {
      borderStyle = 'solid';
    }
    
    return {
      width: `${width}%`,
      height: `${thickness}px`,
      backgroundColor: style === 'wavy' ? 'transparent' : color,
      borderTop: style !== 'wavy' ? `${thickness}px ${borderStyle} ${color}` : 'none',
      borderImage: style === 'wavy' ? `url("data:image/svg+xml,%3csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m0,10 q25,-10 50,0 t50,0' stroke='${encodeURIComponent(color)}' stroke-width='${thickness}' fill='none'/%3e%3c/svg%3e") 1` : 'none',
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div>Failed to load page data</div>
      </div>
    );
  }

  const getBackgroundStyle = () => {
    if (data.media.wallpaperUrl) {
      return { 
        backgroundImage: `url(${data.media.wallpaperUrl})`,
        opacity: data.media.wallpaperOpacity ? data.media.wallpaperOpacity / 100 : 1
      };
    } else if (data.theme.backgroundType === 'gradient') {
      const gradientColors = data.theme.gradientColors.join(', ');
      return { background: `linear-gradient(${data.theme.gradientDirection}, ${gradientColors})` };
    } else {
      return { backgroundColor: data.theme.backgroundColor };
    }
  };

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

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Premium T-Shirt',
      price: 29.99,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg',
      description: 'High-quality cotton t-shirt with modern design',
      category: 'apparel',
    },
    {
      id: '2',
      name: 'Designer Hoodie',
      price: 59.99,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg',
      description: 'Comfortable hoodie perfect for any season',
      category: 'apparel',
    },
  ];

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        ...getBackgroundStyle(),
        fontFamily: data.theme.font,
      }}
    >
      {/* Pixel Injection */}
      <PixelInjector pixels={data.pixels} />
      
      {/* Video Background */}
      {data.media.videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: data.media.videoOpacity ? data.media.videoOpacity / 100 : 1 }}
        >
          <source src={data.media.videoUrl} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <SafeImage
              src={data.profile.imageUrl}
              alt={data.profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 
              className="text-2xl font-bold"
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
          
          <p 
            className="text-sm leading-relaxed max-w-xs mx-auto mb-6"
            style={{ color: data.profile.bioColor || 'rgba(255, 255, 255, 0.9)' }}
          >
            {data.profile.bio}
          </p>

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
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
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
        <div className="space-y-4">
          {visibleLinks.map((link) => {
            const currentIndex = currentImageIndex[link.id] || 0;
            const isCollapsed = collapsedItems[link.id] || false;

            return (
              <div key={link.id} style={getSpacingStyle(link)}>
                {/* Standard Link */}
                {link.type === 'standardLink' && (
                  <button
                    onClick={(e) => handleLinkClick(link, e)}
                    className="w-full backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-all duration-300"
                    style={getBlockStyle(link)}
                  >
                    {link.thumbnailUrl && (
                      <SafeImage src={link.thumbnailUrl} alt={link.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-grow text-left">
                      <h3 className="font-semibold text-white">{link.title}</h3>
                      {link.description && (
                        <p className="text-sm text-white/70 mt-1" dangerouslySetInnerHTML={{ __html: link.description }} />
                      )}
                    </div>
                    <ExternalLink size={20} className="text-white/50 flex-shrink-0" />
                  </button>
                )}

                {/* Text Block */}
                {link.type === 'textBlock' && (
                  <div
                    className="w-full backdrop-blur-sm border p-4 rounded-lg"
                    style={getBlockStyle(link)}
                  >
                    {link.textContent?.map((content, index) => {
                      const Tag = content.type === 'heading' ? 'h2' : 'p';
                      return (
                        <Tag
                          key={index}
                          className={content.type === 'heading' ? 'text-xl font-bold mb-2' : 'text-sm leading-relaxed'}
                          style={{
                            fontSize: content.styles.fontSize || (content.type === 'heading' ? '1.25rem' : '0.875rem'),
                            fontFamily: content.styles.fontFamily || 'inherit',
                            fontWeight: content.styles.fontWeight || (content.type === 'heading' ? 'bold' : 'normal'),
                            fontStyle: content.styles.fontStyle || 'normal',
                            textAlign: content.styles.textAlign || 'left',
                            color: content.styles.color || '#ffffff',
                            textDecoration: content.styles.textDecoration || 'none',
                          }}
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Image Block */}
                {link.type === 'imageBlock' && (
                  <div
                    className="w-full backdrop-blur-sm border rounded-lg overflow-hidden cursor-pointer"
                    style={getBlockStyle(link)}
                    onClick={(e) => handleLinkClick(link, e)}
                  >
                    {link.thumbnailUrl && (
                      <div 
                        className="w-full bg-gray-200 overflow-hidden"
                        style={{ 
                          aspectRatio: link.aspectRatio || '16/9',
                        }}
                      >
                        <SafeImage 
                          src={link.thumbnailUrl} 
                          alt={link.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                    )}
                    {(link.title || link.description) && (
                      <div className="p-4">
                        {link.title && <h3 className="font-semibold text-white mb-1">{link.title}</h3>}
                        {link.description && (
                          <p className="text-sm text-white/70" dangerouslySetInnerHTML={{ __html: link.description }} />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Image Only */}
                {link.type === 'imageOnly' && link.thumbnailUrl && (
                  <div
                    className="cursor-pointer"
                    style={{
                      width: `${link.imageSize || 100}%`,
                      marginLeft: link.imageAlignment === 'center' ? 'auto' : link.imageAlignment === 'right' ? 'auto' : '0',
                      marginRight: link.imageAlignment === 'center' ? 'auto' : link.imageAlignment === 'right' ? '0' : 'auto',
                    }}
                    onClick={(e) => handleLinkClick(link, e)}
                  >
                    <div 
                      className="w-full bg-gray-200 overflow-hidden rounded-lg"
                      style={{ 
                        aspectRatio: link.aspectRatio || '16/9',
                      }}
                    >
                      <SafeImage 
                        src={link.thumbnailUrl} 
                        alt={link.title || 'Image'} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  </div>
                )}

                {/* Video Only */}
                {link.type === 'videoOnly' && link.thumbnailUrl && (
                  <div
                    className="cursor-pointer"
                    style={{
                      width: `${link.imageSize || 100}%`,
                      marginLeft: link.imageAlignment === 'center' ? 'auto' : link.imageAlignment === 'right' ? 'auto' : '0',
                      marginRight: link.imageAlignment === 'center' ? 'auto' : link.imageAlignment === 'right' ? '0' : 'auto',
                    }}
                    onClick={(e) => handleLinkClick(link, e)}
                  >
                    <div 
                      className="w-full bg-gray-900 overflow-hidden rounded-lg relative"
                      style={{ 
                        aspectRatio: link.aspectRatio || '16/9',
                      }}
                    >
                      <video 
                        src={link.thumbnailUrl} 
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                      />
                    </div>
                  </div>
                )}

                {/* Line Block */}
                {link.type === 'lineBlock' && (
                  <div
                    className="flex justify-center"
                    style={{
                      justifyContent: link.lineSettings?.alignment === 'left' ? 'flex-start' : 
                                    link.lineSettings?.alignment === 'right' ? 'flex-end' : 'center'
                    }}
                  >
                    <div style={getLineStyle(link)}></div>
                  </div>
                )}

                {/* Button Block */}
                {link.type === 'buttonBlock' && (
                  <div
                    className="flex"
                    style={{
                      justifyContent: link.buttonAlignment === 'left' ? 'flex-start' : 
                                    link.buttonAlignment === 'right' ? 'flex-end' : 'center'
                    }}
                  >
                    <button
                      onClick={(e) => handleLinkClick(link, e)}
                      className="px-6 py-3 rounded-lg font-medium text-white border hover:opacity-80 transition-all duration-300"
                      style={getButtonStyle(link)}
                    >
                      {link.title}
                    </button>
                  </div>
                )}

                {/* Product Block */}
                {link.type === 'productBlock' && (
                  <div
                    className="w-full backdrop-blur-sm border rounded-lg overflow-hidden"
                    style={getBlockStyle(link)}
                  >
                    {link.layout === 'twoColumns' && link.products && link.products.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {link.products.slice(0, 4).map((product, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
                               onClick={() => handleProductClick(product.id)}>
                            <SafeImage src={product.image} alt={product.name} className="w-full h-20 object-cover rounded mb-2" />
                            <h4 className="text-white text-xs font-medium truncate">{product.name}</h4>
                            <p className="text-white/70 text-xs">${product.price}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-2">{link.title}</h3>
                        {link.description && (
                          <p className="text-sm text-white/70 mb-3" dangerouslySetInnerHTML={{ __html: link.description }} />
                        )}
                        <ProductCarousel 
                          products={sampleProducts} 
                          title="Featured Products"
                          onProductClick={handleProductClick}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Music Block */}
                {link.type === 'musicBlock' && (
                  <div
                    className="w-full backdrop-blur-sm border p-4 rounded-lg"
                    style={getBlockStyle(link)}
                  >
                    <div className="flex items-center space-x-4">
                      {link.thumbnailUrl && (
                        <SafeImage src={link.thumbnailUrl} alt={link.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white">{link.title}</h3>
                        {link.artist && <p className="text-sm text-white/70">{link.artist}</p>}
                        {link.platform && <p className="text-xs text-white/50">{link.platform}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAudio(link.id, link.url)}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isPlaying[link.id] ? (
                            <Pause size={16} className="text-white" />
                          ) : (
                            <Play size={16} className="text-white" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleMute(link.id)}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isMuted[link.id] ? (
                            <VolumeX size={16} className="text-white" />
                          ) : (
                            <Volume2 size={16} className="text-white" />
                          )}
                        </button>
                        <button
                          onClick={(e) => handleLinkClick(link, e)}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* YouTube Embed */}
                {(link.type === 'youtubeEmbed' || link.type === 'youtubeExclusive' || link.type === 'youtubeLive') && (
                  <div
                    className="w-full backdrop-blur-sm border rounded-lg overflow-hidden"
                    style={getBlockStyle(link)}
                  >
                    {link.collapsible && (
                      <button
                        onClick={() => toggleCollapse(link.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-white">{link.title}</h3>
                          {link.description && (
                            <p className="text-sm text-white/70 mt-1" dangerouslySetInnerHTML={{ __html: link.description }} />
                          )}
                        </div>
                        <ChevronRight 
                          size={20} 
                          className={`text-white/50 transition-transform ${isCollapsed ? 'rotate-90' : ''}`} 
                        />
                      </button>
                    )}
                    
                    {(!link.collapsible || !isCollapsed) && (
                      <div>
                        {!link.collapsible && (link.title || link.description) && (
                          <div className="p-4 pb-0">
                            {link.title && <h3 className="font-semibold text-white mb-1">{link.title}</h3>}
                            {link.description && (
                              <p className="text-sm text-white/70" dangerouslySetInnerHTML={{ __html: link.description }} />
                            )}
                          </div>
                        )}
                        
                        {link.embedBehavior === 'embed' && link.embedCode ? (
                          <div 
                            className="w-full"
                            dangerouslySetInnerHTML={{ __html: link.embedCode }}
                          />
                        ) : (
                          <div className="p-4">
                            <button
                              onClick={(e) => handleLinkClick(link, e)}
                              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <Play size={16} />
                              <span>
                                {link.type === 'youtubeLive' ? 'Watch Live' : 
                                 link.type === 'youtubeExclusive' ? 'Watch Exclusive' : 'Watch Video'}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Photo Carousel */}
                {link.type === 'photoCarousel' && link.images && link.images.length > 0 && (
                  <div
                    className="w-full backdrop-blur-sm border rounded-lg overflow-hidden cursor-pointer"
                    style={getBlockStyle(link)}
                    onClick={(e) => handleLinkClick(link, e)}
                  >
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <SafeImage 
                          src={link.images[currentIndex]} 
                          alt={`${link.title} - Image ${currentIndex + 1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      
                      {link.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageNavigation(link.id, 'prev', link.images!);
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageNavigation(link.id, 'next', link.images!);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          >
                            <ChevronRight size={16} />
                          </button>
                          
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                            {currentIndex + 1} / {link.images.length}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {(link.title || link.description) && (
                      <div className="p-4">
                        {link.title && <h3 className="font-semibold text-white mb-1">{link.title}</h3>}
                        {link.description && (
                          <p className="text-sm text-white/70" dangerouslySetInnerHTML={{ __html: link.description }} />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Image Banner */}
                {link.type === 'imageBanner' && (
                  <button
                    onClick={(e) => handleLinkClick(link, e)}
                    className="w-full backdrop-blur-sm border rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300"
                    style={getBlockStyle(link)}
                  >
                    {link.thumbnailUrl && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <SafeImage 
                          src={link.thumbnailUrl} 
                          alt={link.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                    )}
                    {(link.title || link.description) && (
                      <div className="p-4 text-left">
                        {link.title && <h3 className="font-semibold text-white mb-1">{link.title}</h3>}
                        {link.description && (
                          <p className="text-sm text-white/70" dangerouslySetInnerHTML={{ __html: link.description }} />
                        )}
                      </div>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-xs">
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