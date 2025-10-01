import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Link, LinkType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

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
    marginTop: 5,
    marginBottom: 5,
  });

  const [lineSettings, setLineSettings] = useState({
    width: 100,
    alignment: 'center' as 'left' | 'center' | 'right',
    color: '#ffffff',
    style: 'solid' as 'solid' | 'dashed' | 'dotted' | 'wavy',
    thickness: 2,
    dashSpacing: 5,
  });

  useEffect(() => {
    if (link) {
      setFormData(link);
      
      // Only set lineSettings for lineBlock type
      if (link.type === 'lineBlock' && link.lineSettings) {
        setLineSettings({
          width: link.lineSettings.width || 100,
          alignment: link.lineSettings.alignment || 'center',
          color: link.lineSettings.color || '#ffffff',
          style: link.lineSettings.style || 'solid',
          thickness: link.lineSettings.thickness || 2,
          dashSpacing: link.lineSettings.dashSpacing || 5,
        });
      }
    } else {
      setFormData({
        id: uuidv4(),
        type: 'standardLink',
        title: '',
        url: '',
        order: 0,
        active: true,
        marginTop: 5,
        marginBottom: 5,
      });
      setLineSettings({
        width: 100,
        alignment: 'center',
        color: '#ffffff',
        style: 'solid',
        thickness: 2,
        dashSpacing: 5,
      });
    }
  }, [link]);

  const handleLineSettingsChange = (field: string, value: any) => {
    if (formData.type !== 'lineBlock') return;
    
    setLineSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const linkToSave: Link = {
      ...formData,
      marginTop: Number(formData.marginTop) || 5,
      marginBottom: Number(formData.marginBottom) || 5,
    };

    // Only add lineSettings for lineBlock type
    if (formData.type === 'lineBlock') {
      linkToSave.lineSettings = {
        width: Number(lineSettings.width) || 100,
        alignment: lineSettings.alignment,
        color: lineSettings.color,
        style: lineSettings.style,
        thickness: Number(lineSettings.thickness) || 2,
        dashSpacing: Number(lineSettings.dashSpacing) || 5,
      };
    }

    // Ensure numeric values are properly converted
    if (linkToSave.imageSize !== undefined) {
      linkToSave.imageSize = Number(linkToSave.imageSize) || 100;
    }
    if (linkToSave.customSpacing !== undefined) {
      linkToSave.customSpacing = Number(linkToSave.customSpacing) || 40;
    }
    if (linkToSave.topSpacing !== undefined) {
      linkToSave.topSpacing = Number(linkToSave.topSpacing) || 0;
    }
    if (linkToSave.bottomSpacing !== undefined) {
      linkToSave.bottomSpacing = Number(linkToSave.bottomSpacing) || 0;
    }

  

    // Convert styling numeric values
    if (linkToSave.styling) {
      if (linkToSave.styling.opacity !== undefined) {
        linkToSave.styling.opacity = Number(linkToSave.styling.opacity) || 100;
      }
      if (linkToSave.styling.dropShadow !== undefined) {
        linkToSave.styling.dropShadow = Number(linkToSave.styling.dropShadow) || 0;
      }
      if (linkToSave.styling.borderRadius !== undefined) {
        linkToSave.styling.borderRadius = Number(linkToSave.styling.borderRadius) || 8;
      }
    }

    // Convert button styling numeric values
    if (linkToSave.buttonStyling) {
      if (linkToSave.buttonStyling.opacity !== undefined) {
        linkToSave.buttonStyling.opacity = Number(linkToSave.buttonStyling.opacity) || 100;
      }
    }

    onSave(linkToSave);
  };

  const addTextContent = () => {
    const newTextContent = {
      type: 'paragraph' as const,
      content: '...',
      styles: {
        fontSize: '15px',
        fontWeight: 'normal' as const,
        fontStyle: 'normal' as const,
        textAlign: 'center' as const,
        color: '#ffffff',
        textDecoration: 'none' as const,
      },
    };

    setFormData(prev => ({
      ...prev,
      textContent: [...(prev.textContent || []), newTextContent],
    }));
  };

  const removeTextContent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      textContent: (prev.textContent || []).filter((_, i) => i !== index),
    }));
  };

  const updateTextContent = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newTextContent = [...(prev.textContent || [])];
      if (field.startsWith('styles.')) {
        const styleField = field.replace('styles.', '');
        newTextContent[index] = {
          ...newTextContent[index],
          styles: {
            ...newTextContent[index].styles,
            [styleField]: value,
          },
        };
      } else {
        newTextContent[index] = {
          ...newTextContent[index],
          [field]: value,
        };
      }
      return { ...prev, textContent: newTextContent };
    });
  };

  const addImage = () => {
    const newImages = [...(formData.images || []), 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'];
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const removeImage = (index: number) => {
    const newImages = (formData.images || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = url;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addStatusItem = () => {
    const newStatusItem = {
      id: uuidv4(),
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      caption: '',
    };
    setFormData(prev => ({
      ...prev,
      statusItems: [...(prev.statusItems || []), newStatusItem],
    }));
  };

  const removeStatusItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      statusItems: (prev.statusItems || []).filter((_, i) => i !== index),
    }));
  };

  const updateStatusItem = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newStatusItems = [...(prev.statusItems || [])];
      newStatusItems[index] = {
        ...newStatusItems[index],
        [field]: value,
      };
      return { ...prev, statusItems: newStatusItems };
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-lg font-semibold">
              {link ? 'Edit Link' : 'Add New Link'}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Link Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as LinkType }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standardLink">Standard Block</option>
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

            {/* Basic Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* URL Field - Show for most types except textBlock, lineBlock*/}
            {!['textBlock', 'lineBlock'].includes(formData.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}  

            {/* Thumbnail URL - Show for most types except textBlock and lineBlock */}
            {!['textBlock', 'lineBlock'].includes(formData.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'imageOnly' || formData.type === 'videoOnly' ? 
                    (formData.type === 'videoOnly' ? 'Video URL' : 'Image URL') : 
                    'Thumbnail URL'
                  }
                </label>
                <input
                  type="url"
                  value={formData.thumbnailUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Layout Option - Show for specified types */}
            {['standardLink', 'textBlock', 'imageBlock', 'imageOnly', 'buttonBlock', 'productBlock', 'musicBlock', 'youtubeEmbed', 'youtubeExclusive', 'youtubeLive'].includes(formData.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="layout"
                      value="fullWidth"
                      checked={formData.layout === 'fullWidth' || !formData.layout}
                      onChange={(e) => setFormData(prev => ({ ...prev, layout: e.target.value as 'fullWidth' | 'twoColumns' }))}
                      className="mr-2"
                    />
                    Full Width
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="layout"
                      value="twoColumns"
                      checked={formData.layout === 'twoColumns'}
                      onChange={(e) => setFormData(prev => ({ ...prev, layout: e.target.value as 'fullWidth' | 'twoColumns' }))}
                      className="mr-2"
                    />
                    Two Columns
                  </label>
                </div>
              </div>
            )}

            {/* Music Block Specific Fields */}
            {formData.type === 'musicBlock' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artist</label>
                <input
                  type="text"
                  value={formData.artist || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Product Block Specific Fields */}
            {formData.type === 'productBlock' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="text"
                      value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="19.99"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={formData.currency || 'USD'}
                      onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Payment Link</label>
                  <input
                    type="url"
                    value={formData.stripePaymentLink || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, stripePaymentLink: e.target.value }))}
                    placeholder="https://buy.stripe.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="thumbnailType"
                        value="image"
                        checked={formData.thumbnailType !== 'video'}
                        onChange={(e) => setFormData(prev => ({ ...prev, thumbnailType: 'image' }))}
                        className="mr-2"
                      />
                      Image
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="thumbnailType"
                        value="video"
                        checked={formData.thumbnailType === 'video'}
                        onChange={(e) => setFormData(prev => ({ ...prev, thumbnailType: 'video' }))}
                        className="mr-2"
                      />
                      Video Embed
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Text Block Specific Fields */}
            {formData.type === 'textBlock' && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Text Content</label>
                  <button
                    type="button"
                    onClick={addTextContent}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Text
                  </button>
                </div>
                <div className="space-y-4">
                  {(formData.textContent || []).map((textItem, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <select
                          value={textItem.type}
                          onChange={(e) => updateTextContent(index, 'type', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="heading">Heading</option>
                          <option value="paragraph">Paragraph</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeTextContent(index)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <textarea
                        value={textItem.content}
                        onChange={(e) => updateTextContent(index, 'content', e.target.value)}
                        placeholder="..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 resize-none"
                      />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                          <input
                            type="text"
                            value={textItem.styles.fontSize || (textItem.type === 'heading' ? '24px' : '15px')}
                            onChange={(e) => updateTextContent(index, 'styles.fontSize', e.target.value)}
                            placeholder="24px"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Color</label>
                          <input
                            type="color"
                            value={textItem.styles.color || '#ffffff'}
                            onChange={(e) => updateTextContent(index, 'styles.color', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Font Family</label>
                          <select
                            value={textItem.styles.fontFamily || "'Montserrat', sans-serif"}
                            onChange={(e) => updateTextContent(index, 'styles.fontFamily', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="inherit">Inherit (Page Font)</option>
                            <option value="'Inter', sans-serif">Inter</option>
                            <option value="'Open Sans', sans-serif">Open Sans</option>
                            <option value="'Lato', sans-serif">Lato</option>
                            <option value="'Montserrat', sans-serif">Montserrat</option>
                            <option value="'Raleway', sans-serif">Raleway</option>
                            <option value="'Roboto', sans-serif">Roboto</option>
                            <option value="'Poppins', sans-serif">Poppins</option>
                            <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Weight</label>
                          <select
                            value={textItem.styles.fontWeight || 'bold'}
                            onChange={(e) => updateTextContent(index, 'styles.fontWeight', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Style</label>
                          <select
                            value={textItem.styles.fontStyle || 'normal'}
                            onChange={(e) => updateTextContent(index, 'styles.fontStyle', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Align</label>
                          <select
                            value={textItem.styles.textAlign || 'center'}
                            onChange={(e) => updateTextContent(index, 'styles.textAlign', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {(!formData.textContent || formData.textContent.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 mb-2">No text content added yet</p>
                      <button
                        type="button"
                        onClick={addTextContent}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Add your first text block
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Image/Video Size and Alignment - Show for imageOnly and videoOnly */}
            {(formData.type === 'imageOnly' || formData.type === 'videoOnly') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size: {formData.imageSize || 100}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={formData.imageSize || 100}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageSize: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                  <div className="flex gap-4">
                    {['left', 'center', 'right'].map((align) => (
                      <label key={align} className="flex items-center">
                        <input
                          type="radio"
                          name="imageAlignment"
                          value={align}
                          checked={formData.imageAlignment === align || (!formData.imageAlignment && align === 'center')}
                          onChange={(e) => setFormData(prev => ({ ...prev, imageAlignment: e.target.value as 'left' | 'center' | 'right' }))}
                          className="mr-2"
                        />
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Aspect Ratio - Show for imageBlock, imageOnly, videoOnly */}
            {['imageBlock', 'imageOnly', 'videoOnly'].includes(formData.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
                <select
                  value={formData.aspectRatio || '16:9'}
                  onChange={(e) => setFormData(prev => ({ ...prev, aspectRatio: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="16:9">16:9 (Widescreen)</option>
                  <option value="4:3">4:3 (Standard)</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="3:4">3:4 (Portrait)</option>
                  <option value="9:24">9:24 (Vertical)</option>
                </select>
              </div>
            )}

            {/* Button Alignment - Show for buttonBlock */}
            {formData.type === 'buttonBlock' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Alignment</label>
                <div className="flex gap-4">
                  {['left', 'center', 'right'].map((align) => (
                    <label key={align} className="flex items-center">
                      <input
                        type="radio"
                        name="buttonAlignment"
                        value={align}
                        checked={formData.buttonAlignment === align || (!formData.buttonAlignment && align === 'center')}
                        onChange={(e) => setFormData(prev => ({ ...prev, buttonAlignment: e.target.value as 'left' | 'center' | 'right' }))}
                        className="mr-2"
                      />
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Line Block Specific Settings */}
            {formData.type === 'lineBlock' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width: {lineSettings.width}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={lineSettings.width}
                    onChange={(e) => handleLineSettingsChange('width', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                  <div className="flex gap-4">
                    {['left', 'center', 'right'].map((align) => (
                      <label key={align} className="flex items-center">
                        <input
                          type="radio"
                          name="lineAlignment"
                          value={align}
                          checked={lineSettings.alignment === align}
                          onChange={(e) => handleLineSettingsChange('alignment', e.target.value)}
                          className="mr-2"
                        />
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={lineSettings.color}
                      onChange={(e) => handleLineSettingsChange('color', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={lineSettings.color}
                      onChange={(e) => handleLineSettingsChange('color', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                  <select
                    value={lineSettings.style}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thickness: {lineSettings.thickness}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={lineSettings.thickness}
                    onChange={(e) => handleLineSettingsChange('thickness', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {(lineSettings.style === 'dashed' || lineSettings.style === 'dotted') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dash Spacing: {lineSettings.dashSpacing}px
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={lineSettings.dashSpacing}
                      onChange={(e) => handleLineSettingsChange('dashSpacing', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
                
                {(link.type === 'youtubeEmbed' || link.type === 'youtubeExclusive' || link.type === 'youtubeLive') && (
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={link.collapsible || false}
                        onChange={(e) => setLink({ ...link, collapsible: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Collapsible Block</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      When enabled, the block appears as a standard link that expands to show the video when clicked
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Embed Behavior - Show for YouTube types */}
            {['youtubeEmbed', 'youtubeExclusive', 'youtubeLive'].includes(formData.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Embed Behavior</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="embedBehavior"
                      value="url"
                      checked={formData.embedBehavior !== 'embed'}
                      onChange={(e) => setFormData(prev => ({ ...prev, embedBehavior: 'url' }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, embedBehavior: 'embed' }))}
                      className="mr-2"
                    />
                    Show Embed
                  </label>
                </div>
              </div>
            )}

            {/* Embed Code - Show when embed behavior is selected */}
            {formData.embedBehavior === 'embed' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Embed Code</label>
                <textarea
                  value={formData.embedCode || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, embedCode: e.target.value }))}
                  placeholder="Paste your embed code here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono resize-none"
                />
              </div>
            )}

            {/* Password Protection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Protection (Optional)</label>
              <input
                type="text"
                value={formData.password || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Leave empty for no password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Open in New Window */}
            {!['textBlock', 'imageOnly', 'videoOnly', 'lineBlock'].includes(formData.type) && (
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.openInNewWindow !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, openInNewWindow: e.target.checked }))}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Open in new window</span>
                </label>
              </div>
            )}

            {/* Spacing Controls */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Spacing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Margin: {formData.marginTop || 5}px
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.marginTop || 5}
                    onChange={(e) => setFormData(prev => ({ ...prev, marginTop: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bottom Margin: {formData.marginBottom || 5}px
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.marginBottom || 5}
                    onChange={(e) => setFormData(prev => ({ ...prev, marginBottom: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Block Styling */}
            {!['textBlock', 'imageOnly', 'videoOnly', 'lineBlock', 'statusBlock'].includes(formData.type) && (
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Block Styling</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.styling?.backgroundColor || '#ffffff'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, backgroundColor: e.target.value }
                        }))}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={formData.styling?.backgroundColor || 'rgba(255, 255, 255, 0.1)'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, backgroundColor: e.target.value }
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.styling?.borderColor || '#ffffff'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, borderColor: e.target.value }
                        }))}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={formData.styling?.borderColor || 'rgba(255, 255, 255, 0.2)'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, borderColor: e.target.value }
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opacity: {formData.styling?.opacity || 100}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={formData.styling?.opacity || 100}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        styling: { ...prev.styling, opacity: parseInt(e.target.value) }
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Drop Shadow: {formData.styling?.dropShadow || 20}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formData.styling?.dropShadow || 20}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        styling: { ...prev.styling, dropShadow: parseInt(e.target.value) }
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Border Radius - Show for standardLink and musicBlock */}
                  {(formData.type === 'standardLink' || formData.type === 'musicBlock') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Border Radius: {formData.styling?.borderRadius || 8}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={formData.styling?.borderRadius || 8}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, borderRadius: parseInt(e.target.value) }
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Square</span>
                        <span>Default</span>
                        <span>Rounded</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Button Styling - Show for buttonBlock */}
            {formData.type === 'buttonBlock' && (
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Button Styling</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.buttonStyling?.backgroundColor || '#3B82F6'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          buttonStyling: { ...prev.buttonStyling, backgroundColor: e.target.value }
                        }))}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={formData.buttonStyling?.backgroundColor || '#3B82F6'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          buttonStyling: { ...prev.buttonStyling, backgroundColor: e.target.value }
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.buttonStyling?.borderColor || '#3B82F6'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          buttonStyling: { ...prev.buttonStyling, borderColor: e.target.value }
                        }))}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={formData.buttonStyling?.borderColor || '#3B82F6'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          buttonStyling: { ...prev.buttonStyling, borderColor: e.target.value }
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
                    <input
                      type="text"
                      value={formData.buttonStyling?.borderRadius || '8px'}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        buttonStyling: { ...prev.buttonStyling, borderRadius: e.target.value }
                      }))}
                      placeholder="8px"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opacity: {formData.buttonStyling?.opacity || 100}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={formData.buttonStyling?.opacity || 100}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        buttonStyling: { ...prev.buttonStyling, opacity: parseInt(e.target.value) }
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Schedule */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Schedule (Optional)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.schedule?.start || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, start: e.target.value, end: prev.schedule?.end || '' }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.schedule?.end || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, start: prev.schedule?.start || '', end: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {formData.schedule?.start && formData.schedule?.end && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, schedule: undefined }))}
                  className="text-red-600 hover:text-red-700 text-sm mt-2"
                >
                  Remove Schedule
                </button>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 p-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Link
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditLinkModal;