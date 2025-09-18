import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Plus, Trash2, Upload, Eye, EyeOff } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Link, LinkType } from '../../types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

// Quill editor configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: Link | null;
  onSave: (link: Link) => void;
}

const EditLinkModal: React.FC<EditLinkModalProps> = ({ isOpen, onClose, link, onSave }) => {
  const [formData, setFormData] = useState<Link>({
    id: '',
    type: 'standardLink',
    title: '',
    url: '',
    order: 0,
    active: true,
    thumbnailUrl: '',
    openInNewWindow: false,
    styling: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      opacity: 100,
      borderRadius: 8,
    },
    marginTop: 0,
    marginBottom: 0,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (link) {
      setFormData({
        ...link,
        title: link.title ? link.title.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() || 'New Link' : 'New Link',
        styling: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          opacity: 100,
          ...link.styling,
        },
      });
    } else {
      setFormData({
        id: uuidv4(),
        type: 'standardLink',
        title: '',
        url: '',
        order: 0,
        active: true,
        thumbnailUrl: '',
        openInNewWindow: false,
        styling: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          opacity: 100,
        },
      });
    }
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure title is plain text
    const cleanTitle = formData.title.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() || 'New Link';
    
    const updatedLink: Link = {
      ...formData,
      title: cleanTitle,
      order: link?.order ?? 0,
    };
    onSave(updatedLink);
  };

  const handleInputChange = (field: keyof Link, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle rich text content for title
  const handleTitleChange = (content: string) => {
    // Convert HTML to plain text for title field
    const plainText = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    setFormData(prev => ({
      ...prev,
      title: plainText || 'New Link'
    }));
  };

  const handleDescriptionChange = (content: string) => {
    // Clean up empty Quill content
    const cleanContent = content === '<p><br></p>' ? '' : content;
    setFormData(prev => ({
      ...prev,
      description: cleanContent
    }));
  };

  const handleStylingChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      styling: { ...prev.styling, [field]: value }
    }));
  };

  const handleButtonStylingChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      buttonStyling: { ...prev.buttonStyling, [field]: value }
    }));
  };

  const handleTextContentChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      textContent: prev.textContent?.map((content, i) => 
        i === index ? { ...content, [field]: value } : content
      ) || []
    }));
  };

  const handleTextContentStyleChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      textContent: prev.textContent?.map((content, i) => 
        i === index ? { 
          ...content, 
          styles: { ...content.styles, [field]: value }
        } : content
      ) || []
    }));
  };

  const addTextContent = () => {
    setFormData(prev => ({
      ...prev,
      textContent: [
        ...(prev.textContent || []),
        {
          type: 'paragraph',
          content: '',
          styles: {
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            color: '#ffffff',
            textDecoration: 'none',
          }
        }
      ]
    }));
  };

  const removeTextContent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      textContent: prev.textContent?.filter((_, i) => i !== index) || []
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const updateImage = (index: number, url: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.map((img, i) => i === index ? url : img) || []
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const handleLineSettingsChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      lineSettings: { ...prev.lineSettings, [field]: value }
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [
        ...(prev.products || []),
        {
          id: uuidv4(),
          name: 'New Product',
          price: 0,
          currency: 'USD',
          image: '',
          description: '',
          category: '',
        }
      ]
    }));
  };

  const updateProduct = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products?.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      ) || []
    }));
  };

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products?.filter((_, i) => i !== index) || []
    }));
  };
  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'textBlock':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
              {formData.textContent?.map((content, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <select
                      value={content.type}
                      onChange={(e) => handleTextContentChange(index, 'type', e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="heading">Heading</option>
                      <option value="paragraph">Paragraph</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTextContent(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <ReactQuill
                      theme="snow"
                      value={content.content}
                      onChange={(value) => handleTextContentChange(index, 'content', value)}
                      modules={quillModules}
                      formats={quillFormats}
                      className="bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                      <select
                        value={content.styles.fontSize}
                        onChange={(e) => handleTextContentStyleChange(index, 'fontSize', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="28px">28px</option>
                        <option value="32px">32px</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                      <select
                        value={content.styles.fontFamily}
                        onChange={(e) => handleTextContentStyleChange(index, 'fontFamily', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                      <select
                        value={content.styles.fontWeight}
                        onChange={(e) => handleTextContentStyleChange(index, 'fontWeight', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
                      <select
                        value={content.styles.textAlign}
                        onChange={(e) => handleTextContentStyleChange(index, 'textAlign', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                      <input
                        type="color"
                        value={content.styles.color}
                        onChange={(e) => handleTextContentStyleChange(index, 'color', e.target.value)}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addTextContent}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
              >
                + Add Text Content
              </button>
            </div>
          </div>
        );

      case 'imageBlock':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Size: {formData.imageSize || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={formData.imageSize || 100}
                  onChange={(e) => handleInputChange('imageSize', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Alignment</label>
                <select
                  value={formData.imageAlignment || 'center'}
                  onChange={(e) => handleInputChange('imageAlignment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
              <select
                value={formData.aspectRatio || '16:9'}
                onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="4:3">4:3 (Standard)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="3:4">3:4 (Portrait)</option>
                <option value="9:16">9:16 (Vertical)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.description || ''}
                onChange={(value) => handleInputChange('description', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter image description..."
              />
            </div>
          </div>
        );

      case 'imageOnly':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Size: {formData.imageSize || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={formData.imageSize || 100}
                  onChange={(e) => handleInputChange('imageSize', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Alignment</label>
                <select
                  value={formData.imageAlignment || 'center'}
                  onChange={(e) => handleInputChange('imageAlignment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
              <select
                value={formData.aspectRatio || '16:9'}
                onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="4:3">4:3 (Standard)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="3:4">3:4 (Portrait)</option>
                <option value="9:16">9:16 (Vertical)</option>
              </select>
            </div>
          </div>
        );

      case 'videoOnly':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="url"
                value={formData.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Size: {formData.imageSize || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={formData.imageSize || 100}
                  onChange={(e) => handleInputChange('imageSize', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Alignment</label>
                <select
                  value={formData.imageAlignment || 'center'}
                  onChange={(e) => handleInputChange('imageAlignment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
              <select
                value={formData.aspectRatio || '16:9'}
                onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="4:3">4:3 (Standard)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="3:4">3:4 (Portrait)</option>
                <option value="9:16">9:16 (Vertical)</option>
              </select>
            </div>
          </div>
        );

      case 'buttonBlock':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter button text..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Alignment</label>
              <select
                value={formData.buttonAlignment || 'center'}
                onChange={(e) => handleInputChange('buttonAlignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Button Styling</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                  <input
                    type="color"
                    value={formData.buttonStyling?.backgroundColor || '#3B82F6'}
                    onChange={(e) => handleButtonStylingChange('backgroundColor', e.target.value)}
                    className="w-full h-8 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Border Color</label>
                  <input
                    type="color"
                    value={formData.buttonStyling?.borderColor || '#3B82F6'}
                    onChange={(e) => handleButtonStylingChange('borderColor', e.target.value)}
                    className="w-full h-8 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Border Radius</label>
                  <select
                    value={formData.buttonStyling?.borderRadius || '8px'}
                    onChange={(e) => handleButtonStylingChange('borderRadius', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="0px">None</option>
                    <option value="4px">Small</option>
                    <option value="8px">Medium</option>
                    <option value="12px">Large</option>
                    <option value="50px">Pill</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Opacity: {formData.buttonStyling?.opacity || 100}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={formData.buttonStyling?.opacity || 100}
                    onChange={(e) => handleButtonStylingChange('opacity', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'musicBlock':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Song Title (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter song title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Artist Name (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.artist || ''}
                onChange={(value) => handleInputChange('artist', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter artist name..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={formData.platform || 'Spotify'}
                onChange={(e) => handleInputChange('platform', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Spotify">Spotify</option>
                <option value="Apple Music">Apple Music</option>
                <option value="YouTube Music">YouTube Music</option>
                <option value="SoundCloud">SoundCloud</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Album Cover URL</label>
              <input
                type="url"
                value={formData.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://example.com/album-cover.jpg"
              />
            </div>
          </div>
        );

      case 'youtubeEmbed':
      case 'youtubeExclusive':
      case 'youtubeLive':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Title (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter video title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Description (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.description || ''}
                onChange={(value) => handleInputChange('description', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter video description..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
              <input
                type="url"
                value={formData.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Embed Behavior</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="embedBehavior"
                    value="url"
                    checked={formData.embedBehavior === 'url'}
                    onChange={(e) => handleInputChange('embedBehavior', e.target.value)}
                    className="mr-2"
                  />
                  Open URL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="embedBehavior"
                    value="embed"
                    checked={formData.embedBehavior === 'embed'}
                    onChange={(e) => handleInputChange('embedBehavior', e.target.value)}
                    className="mr-2"
                  />
                  Embed Video
                </label>
              </div>
            </div>

            {formData.embedBehavior === 'embed' && (
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.collapsible || false}
                    onChange={(e) => handleInputChange('collapsible', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Make Collapsible</span>
                </label>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Embed Code (Optional)</label>
              <textarea
                value={formData.embedCode || ''}
                onChange={(e) => handleInputChange('embedCode', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="<iframe src='...' width='560' height='315'></iframe>"
              />
            </div>
          </div>
        );

      case 'lineBlock':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width: {formData.lineSettings?.width || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={formData.lineSettings?.width || 100}
                  onChange={(e) => handleLineSettingsChange('width', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                <select
                  value={formData.lineSettings?.alignment || 'center'}
                  onChange={(e) => handleLineSettingsChange('alignment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Line Style</label>
                <select
                  value={formData.lineSettings?.style || 'solid'}
                  onChange={(e) => handleLineSettingsChange('style', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="wavy">Wavy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Line Color</label>
                <input
                  type="color"
                  value={formData.lineSettings?.color || '#ffffff'}
                  onChange={(e) => handleLineSettingsChange('color', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thickness: {formData.lineSettings?.thickness || 2}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={formData.lineSettings?.thickness || 2}
                  onChange={(e) => handleLineSettingsChange('thickness', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {(formData.lineSettings?.style === 'dashed' || formData.lineSettings?.style === 'dotted') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dash Spacing: {formData.lineSettings?.dashSpacing || 5}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={formData.lineSettings?.dashSpacing || 5}
                    onChange={(e) => handleLineSettingsChange('dashSpacing', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'productBlock':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Block Title (Rich Text)</label>
              <ReactQuill
                theme="snow"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white"
                placeholder="Enter block title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <select
                value={formData.layout || 'fullWidth'}
                onChange={(e) => handleInputChange('layout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="fullWidth">Full Width</option>
                <option value="twoColumns">Two Columns</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
              {formData.products?.map((product, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Product {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Product name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <div className="flex">
                        <select
                          value={product.currency}
                          onChange={(e) => updateProduct(index, 'currency', e.target.value)}
                          className="px-2 py-2 border border-gray-300 rounded-l-lg text-sm"
                        >
                          <option value="USD">$</option>
                          <option value="EUR">€</option>
                          <option value="GBP">£</option>
                        </select>
                        <input
                          type="number"
                          step="0.01"
                          value={product.price}
                          onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
                    <input
                      type="url"
                      value={product.image}
                      onChange={(e) => updateProduct(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="https://example.com/product-image.jpg"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={product.description}
                      onChange={(e) => updateProduct(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Product description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={product.category}
                        onChange={(e) => updateProduct(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Product category"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Payment Link</label>
                      <input
                        type="url"
                        value={product.stripePaymentLink || ''}
                        onChange={(e) => updateProduct(index, 'stripePaymentLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="https://buy.stripe.com/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addProduct}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
              >
                + Add Product
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter link title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
              <input
                type="url"
                value={formData.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Rich Text)</label>
              <ReactQuill
                value={formData.description || ''}
                onChange={(value) => {
                  // Clean up empty Quill content and ensure proper HTML handling
                  const cleanValue = value === '<p><br></p>' || value === '<p></p>' ? '' : value;
                  setFormData(prev => ({ ...prev, description: cleanValue }));
                }}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
                formats={[
                  'header', 'font', 'size',
                  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
                  'list', 'bullet', 'indent',
                  'link', 'image',
                  'color', 'background',
                  'align'
                ]}
                placeholder="Enter link description..."
                className="bg-white"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-lg font-semibold">
              {link ? 'Edit Link' : 'Add New Link'}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Basic Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as LinkType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="standardLink">Standard Link</option>
                    <option value="textBlock">Text Block</option>
                    <option value="imageBlock">Image Block</option>
                    <option value="imageOnly">Image Only</option>
                    <option value="videoOnly">Video Only</option>
                    <option value="buttonBlock">Button Block</option>
                    <option value="productBlock">Product Block</option>
                    <option value="musicBlock">Music Block</option>
                    <option value="youtubeEmbed">YouTube Embed</option>
                    <option value="youtubeExclusive">YouTube Exclusive</option>
                    <option value="youtubeLive">YouTube Live</option>
                    <option value="lineBlock">Line Block</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://example.com (leave empty if not needed)"
                  />
                </div>
              </div>

              {/* Type-specific fields */}
              {renderTypeSpecificFields()}

              {/* Advanced Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => handleInputChange('active', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.openInNewWindow || false}
                        onChange={(e) => handleInputChange('openInNewWindow', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Open in New Window</span>
                    </label>
                  </div>
                </div>

                {/* Link Scheduling */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Link Scheduling (Optional)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        value={formData.schedule?.start || ''}
                        onChange={(e) => handleInputChange('schedule', {
                          ...formData.schedule,
                          start: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">End Date & Time</label>
                      <input
                        type="datetime-local"
                        value={formData.schedule?.end || ''}
                        onChange={(e) => handleInputChange('schedule', {
                          ...formData.schedule,
                          end: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leave empty to show link permanently</p>
                </div>

                {/* Spacing Controls */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Spacing</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Top Margin: {formData.marginTop || 0}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formData.marginTop || 0}
                        onChange={(e) => handleInputChange('marginTop', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Bottom Margin: {formData.marginBottom || 0}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formData.marginBottom || 0}
                        onChange={(e) => handleInputChange('marginBottom', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                {/* Password Protection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Protection (Optional)</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password || ''}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg"
                      placeholder="Enter password to protect this link"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Styling */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Block Styling</h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                      <input
                        type="color"
                        value={formData.styling?.backgroundColor?.replace('rgba(255, 255, 255, 0.1)', '#ffffff') || '#ffffff'}
                        onChange={(e) => {
                          const hex = e.target.value;
                          const r = parseInt(hex.slice(1, 3), 16);
                          const g = parseInt(hex.slice(3, 5), 16);
                          const b = parseInt(hex.slice(5, 7), 16);
                          handleStylingChange('backgroundColor', `rgba(${r}, ${g}, ${b}, 0.1)`);
                        }}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Border Color</label>
                      <input
                        type="color"
                        value={formData.styling?.borderColor?.replace('rgba(255, 255, 255, 0.2)', '#ffffff') || '#ffffff'}
                        onChange={(e) => {
                          const hex = e.target.value;
                          const r = parseInt(hex.slice(1, 3), 16);
                          const g = parseInt(hex.slice(3, 5), 16);
                          const b = parseInt(hex.slice(5, 7), 16);
                          handleStylingChange('borderColor', `rgba(${r}, ${g}, ${b}, 0.2)`);
                        }}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Border Radius</label>
                      <select
                        value={formData.styling?.borderRadius || 8}
                        onChange={(e) => handleStylingChange('borderRadius', parseInt(e.target.value))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value={0}>None</option>
                        <option value={4}>Small</option>
                        <option value={8}>Medium</option>
                        <option value={12}>Large</option>
                        <option value={20}>Extra Large</option>
                        <option value={50}>Pill</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Opacity: {formData.styling?.opacity || 100}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value={formData.styling?.opacity || 100}
                        onChange={(e) => handleStylingChange('opacity', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-6">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {link ? 'Update Link' : 'Create Link'}
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditLinkModal;