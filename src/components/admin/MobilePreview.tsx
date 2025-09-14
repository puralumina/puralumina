import React from 'react';
import { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { PageData, Link } from '../../types';

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
      setImageSrc('https://d1yei2z3i6k35z.cloudfront.net/5640649/688fe1f5c64cc_Signaturegold.png');
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

interface MobilePreviewProps {
  data: PageData;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ data }) => {
  const getBlockStyle = (link: Link): React.CSSProperties => {
    const styling = link.styling || {};
    return {
      backgroundColor: styling.backgroundColor || 'rgba(255, 255, 255, 0.1)',
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      opacity: styling.opacity !== undefined ? styling.opacity / 100 : 1,
    };
  };

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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full max-h-[800px] sticky top-4">
      <div className="bg-gray-900 h-6 rounded-t-lg flex items-center justify-center">
        <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
      </div>
      
      <div className="h-full max-h-[774px] overflow-y-auto">
        <div 
          className="min-h-full bg-cover bg-center bg-no-repeat relative"
          style={getBackgroundStyle()}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <div className="relative z-10 px-4 py-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-3">
                <SafeImage
                  src={data.profile.imageUrl}
                  alt={data.profile.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white">{data.profile.name}</h1>
                {data.profile.verifiedBadgeUrl && (
                  <SafeImage
                    src={data.profile.verifiedBadgeUrl}
                    alt="Verified"
                    className="w-5 h-5 object-cover"
                  />
                )}
              </div>
              <p className="text-blue-200 font-medium mb-1 text-sm">{data.profile.subtitle}</p>
              
              {data.profile.location && (
                <div className="flex items-center justify-center gap-1 text-white/80 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{data.profile.location}</span>
                </div>
              )}
              
              <p className="text-white/90 text-xs leading-relaxed max-w-xs mx-auto">
                {data.profile.bio}
              </p>
            </div>

            <div className="space-y-3">
              {visibleLinks.map((link) => (
                <div key={link.id} className="transform scale-90 origin-top">
                  <div 
                    className="w-full backdrop-blur-sm border p-3 rounded-lg flex items-center space-x-3"
                    style={{
                      backgroundColor: getBlockStyle(link).backgroundColor,
                      borderColor: getBlockStyle(link).borderColor,
                    }}
                  >
                    {link.thumbnailUrl && link.thumbnailType !== 'video' && (
                      <img src={link.thumbnailUrl} alt={link.title} className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
                    )}
                    {link.thumbnailType === 'video' && (
                      <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🎥</span>
                      </div>
                    )}
                    {link.type === 'textBlock' && (
                      <div className="w-8 h-8 rounded-md bg-red-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">📺</span>
                      </div>
                    )}
                    {(link.type === 'youtubeEmbed' || link.type === 'youtubeExclusive' || link.type === 'youtubeLive') && (
                      <div className="w-8 h-8 rounded-md bg-red-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🔴</span>
                      </div>
                    )}
                    {link.type === 'imageBlock' && (
                      <p className="text-xs text-white/70 text-left">Single Image ({link.aspectRatio || '16:9'})</p>
                    )}
                   {link.type === 'imageOnly' && (
                     <p className="text-xs text-white/70 text-left">Image Only ({link.aspectRatio || '16:9'})</p>
                   )}
                   {link.type === 'imageOnly' && (
                     <p className="text-xs text-white/70 text-left">Image Only ({link.aspectRatio || '16:9'}, {link.imageSize || 100}%)</p>
                   )}
                   {link.type === 'videoOnly' && (
                     <p className="text-xs text-white/70 text-left">Video Only ({link.aspectRatio || '16:9'}, {link.imageSize || 100}%)</p>
                   )}
                  {link.type === 'lineBlock' && (
                    <p className="text-xs text-white/70 text-left">Line ({link.lineSettings?.style || 'solid'}, {link.lineSettings?.width || 100}%)</p>
                  )}
                    {(link.type === 'youtubeEmbed' || link.type === 'youtubeExclusive' || link.type === 'youtubeLive') && (
                      <p className="text-xs text-white/70 text-left">
                        YouTube {link.type === 'youtubeEmbed' ? 'Embed' : link.type === 'youtubeExclusive' ? 'Exclusive' : 'Live'} 
                        {link.collapsible ? ' (Collapsible)' : ''}
                      </p>
                    )}
                    {link.type === 'buttonBlock' && (
                      <p className="text-xs text-white/70 text-left">Button ({link.buttonAlignment || 'center'})</p>
                    )}
                    <div className="flex-grow">
                      <p className="font-semibold text-white text-sm text-left">{link.title}</p>
                      {link.type === 'musicBlock' && link.artist && (
                        <p className="text-xs text-white/70 text-left">{link.artist}</p>
                      )}
                    </div>
                    <ExternalLink size={12} className="text-white/50 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;