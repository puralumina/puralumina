import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link as LinkType } from '../../types';
import { GripVertical, Edit, Trash2, Copy, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';

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

const getLinkTypeLabel = (linkType: string) => {
  const labelMap: { [key: string]: string } = {
    'standardLink': 'Standard Block',
    'textBlock': 'Text Block',
    'imageBlock': 'Image Block',
   'imageOnly': 'Image Only',
    'buttonBlock': 'Button Block',
    'productBlock': 'Product Block',
    'musicBlock': 'Music Block',
    'youtubeEmbed': 'YouTube Embed',
    'youtubeExclusive': 'YouTube Exclusive',
    'youtubeLive': 'YouTube Live',
  };
  
  return labelMap[linkType] || linkType.replace(/([A-Z])/g, ' $1');
};

interface LinkItemProps {
  link: LinkType;
  onEdit: (link: LinkType) => void;
  onDelete: (id: string) => void;
  onDuplicate: (link: LinkType) => void;
  onToggleActive: (id: string, active: boolean) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({ 
  link, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onToggleActive,
  onMoveUp, 
  onMoveDown, 
  canMoveUp, 
  canMoveDown 
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200"
    >
      {isMobile ? (
        <div className="flex flex-col mr-3">
          <button
            onClick={() => onMoveUp?.(link.id)}
            disabled={!canMoveUp}
            className={`p-1 rounded ${canMoveUp ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={() => onMoveDown?.(link.id)}
            disabled={!canMoveDown}
            className={`p-1 rounded ${canMoveDown ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      ) : (
        <button 
          {...attributes} 
          {...listeners} 
          className="cursor-grab text-gray-400 mr-3 hover:text-gray-600 touch-none"
        >
          <GripVertical size={20} />
        </button>
      )}
      
      {link.thumbnailUrl ? (
        <SafeImage src={link.thumbnailUrl} alt="thumbnail" className="w-10 h-10 rounded-md object-cover mr-4" />
      ) : (
        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-4">
            <ImageIcon size={20} className="text-gray-400" />
        </div>
      )}

      <div className="flex-grow">
        <p className="font-medium text-gray-800">{link.title}</p>
        <p className="text-sm text-gray-500 truncate max-w-xs">{link.url || 'No URL'}</p>
      </div>

      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full mx-4 capitalize">
        {getLinkTypeLabel(link.type)}
      </span>

      
      <div className="flex items-center space-x-2">
        <label className="flex items-center gap-1 text-sm mr-2">
          <input
            type="checkbox"
            checked={link.active}
            onChange={(e) => {
              e.stopPropagation();
              onToggleActive(link.id, e.target.checked);
            }}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Active
        </label>
        
        <button 
          onClick={() => onEdit(link)} 
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDuplicate(link)} 
          className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-md transition-colors"
          title="Duplicate"
        >
          <Copy size={16} />
        </button>
        <button 
          onClick={() => onDelete(link.id)} 
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default LinkItem;