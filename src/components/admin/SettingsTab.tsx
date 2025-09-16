import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PageData, Theme } from '../../types';

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

interface SettingsTabProps {
  data: PageData;
  setData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ data, setData }) => {
  if (!data) return null;

  const handleUpdate = (
    section: keyof PageData, 
    field: string, 
    value: string
  ) => {
    setData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        [section]: {
          ...(prevData[section] as object),
          [field]: value,
        },
      };
    });
  };

  const handleThemePresetChange = (preset: Theme['preset']) => {
    let newTheme: Partial<Theme> = {};
    
    switch (preset) {
      case 'Default Light':
        newTheme = { 
          backgroundColor: '#F8FAFC', 
          backgroundType: 'solid',
          gradientColors: ['#F8FAFC', '#E0E7FF'],
          primaryColor: '#3B82F6', 
          font: "'Inter', sans-serif" 
        };
        break;
      case 'Midnight Dark':
        newTheme = { 
          backgroundColor: '#111827', 
          backgroundType: 'solid',
          gradientColors: ['#111827', '#1F2937'],
          primaryColor: '#8B5CF6', 
          font: "'Inter', sans-serif" 
        };
        break;
      case 'Minimalist':
        newTheme = { 
          backgroundColor: '#FFFFFF', 
          backgroundType: 'solid',
          gradientColors: ['#FFFFFF', '#F3F4F6'],
          primaryColor: '#000000', 
          font: "'Inter', sans-serif" 
        };
        break;
    }
    
    setData(prev => {
        if (!prev) return null;
        return {
            ...prev,
            theme: {
                ...prev.theme,
                ...newTheme,
                preset: preset,
            }
        };
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Branding */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-pink-500">🎨</span>
          Page Branding
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
            <div className="flex items-center gap-4">
              <img 
                src={convertToDirectImageUrl(data.profile.imageUrl)} 
                alt="Profile" 
                className="!w-40 !h-40 rounded-full object-cover border-2 border-gray-300"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== 'https://d1yei2z3i6k35z.cloudfront.net/4704293/68933153d7ea4_wise3.jpg') {
                    target.src = 'https://d1yei2z3i6k35z.cloudfront.net/4704293/68933153d7ea4_wise3.jpg';
                  }
                }}
              />
              <input 
                type="url" 
                value={data.profile.imageUrl} 
                onChange={(e) => handleUpdate('profile', 'imageUrl', e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  value={data.profile.name} 
                  onChange={(e) => handleUpdate('profile', 'name', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input 
                type="text" 
                value={data.profile.subtitle} 
                onChange={(e) => handleUpdate('profile', 'subtitle', e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Verified Badge URL (Optional)</label>
            <div className="flex items-center gap-4">
              {data.profile.verifiedBadgeUrl && (
                <img 
                  src={convertToDirectImageUrl(data.profile.verifiedBadgeUrl)} 
                  alt="Verified Badge" 
                  className="w-6 h-6 object-cover"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <input 
                type="url" 
                value={data.profile.verifiedBadgeUrl || ''} 
                onChange={(e) => handleUpdate('profile', 'verifiedBadgeUrl', e.target.value)} 
                placeholder="https://example.com/verified-badge.png"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Add a verification badge that will appear next to your name</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              value={data.profile.location} 
              onChange={(e) => handleUpdate('profile', 'location', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea 
              value={data.profile.bio} 
              onChange={(e) => handleUpdate('profile', 'bio', e.target.value)} 
              rows={3} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
            />
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Text Colors</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.nameColor || '#ffffff'} 
                    onChange={(e) => handleUpdate('profile', 'nameColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.nameColor || '#ffffff'} 
                    onChange={(e) => handleUpdate('profile', 'nameColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.subtitleColor || '#bfdbfe'} 
                    onChange={(e) => handleUpdate('profile', 'subtitleColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.subtitleColor || '#bfdbfe'} 
                    onChange={(e) => handleUpdate('profile', 'subtitleColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.locationColor || 'rgba(255, 255, 255, 0.8)'} 
                    onChange={(e) => handleUpdate('profile', 'locationColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.locationColor || 'rgba(255, 255, 255, 0.8)'} 
                    onChange={(e) => handleUpdate('profile', 'locationColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.bioColor || 'rgba(255, 255, 255, 0.9)'} 
                    onChange={(e) => handleUpdate('profile', 'bioColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.bioColor || 'rgba(255, 255, 255, 0.9)'} 
                    onChange={(e) => handleUpdate('profile', 'bioColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                handleUpdate('profile', 'nameColor', '#ffffff');
                handleUpdate('profile', 'subtitleColor', '#bfdbfe');
                handleUpdate('profile', 'locationColor', 'rgba(255, 255, 255, 0.8)');
                handleUpdate('profile', 'bioColor', 'rgba(255, 255, 255, 0.9)');
              }}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Reset to Default Colors
            </button>
          </div>
          
          {/* Social Media Icons */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Social Media Icons (Optional)</h4>
            <div className="space-y-3">
              {(data.profile.socialMedia || []).map((social, index) => (
                <div key={social.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 flex-1">
                    <img 
                      src={convertToDirectImageUrl(social.iconUrl)} 
                      alt={social.platform} 
                      className="w-8 h-8 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/32x32/666/fff?text=?';
                      }}
                    />
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={social.platform}
                        onChange={(e) => {
                          const newSocialMedia = [...(data.profile.socialMedia || [])];
                          newSocialMedia[index] = { ...social, platform: e.target.value };
                          setData(prev => prev ? { 
                            ...prev, 
                            profile: { ...prev.profile, socialMedia: newSocialMedia }
                          } : null);
                        }}
                        placeholder="Platform name"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => {
                          const newSocialMedia = [...(data.profile.socialMedia || [])];
                          newSocialMedia[index] = { ...social, url: e.target.value };
                          setData(prev => prev ? { 
                            ...prev, 
                            profile: { ...prev.profile, socialMedia: newSocialMedia }
                          } : null);
                        }}
                        placeholder="https://..."
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="url"
                    value={social.iconUrl}
                    onChange={(e) => {
                      const newSocialMedia = [...(data.profile.socialMedia || [])];
                      newSocialMedia[index] = { ...social, iconUrl: e.target.value };
                      setData(prev => prev ? { 
                        ...prev, 
                        profile: { ...prev.profile, socialMedia: newSocialMedia }
                      } : null);
                    }}
                    placeholder="Icon URL"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={social.active}
                        onChange={(e) => {
                          const newSocialMedia = [...(data.profile.socialMedia || [])];
                          newSocialMedia[index] = { ...social, active: e.target.checked };
                          setData(prev => prev ? { 
                            ...prev, 
                            profile: { ...prev.profile, socialMedia: newSocialMedia }
                          } : null);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600">Active</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={social.openInNewTab}
                        onChange={(e) => {
                          const newSocialMedia = [...(data.profile.socialMedia || [])];
                          newSocialMedia[index] = { ...social, openInNewTab: e.target.checked };
                          setData(prev => prev ? { 
                            ...prev, 
                            profile: { ...prev.profile, socialMedia: newSocialMedia }
                          } : null);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600">New Tab</span>
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      const newSocialMedia = (data.profile.socialMedia || []).filter((_, i) => i !== index);
                      setData(prev => prev ? { 
                        ...prev, 
                        profile: { ...prev.profile, socialMedia: newSocialMedia }
                      } : null);
                    }}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const newSocialMedia = [
                    ...(data.profile.socialMedia || []),
                    {
                      id: uuidv4(),
                      platform: 'Instagram',
                      url: 'https://instagram.com/username',
                      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/32px-Instagram_icon.png',
                      active: true,
                      openInNewTab: true,
                    }
                  ];
                  setData(prev => prev ? { 
                    ...prev, 
                    profile: { ...prev.profile, socialMedia: newSocialMedia }
                  } : null);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 text-sm"
              >
                + Add Social Media Icon
              </button>
              
              {(data.profile.socialMedia || []).filter(social => social.active).length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Spacing: {data.profile.socialMediaSpacing || 12}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="36"
                    step="2"
                    value={data.profile.socialMediaSpacing || 12}
                    onChange={(e) => handleUpdate('profile', 'socialMediaSpacing', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>8px</span>
                    <span>22px</span>
                    <span>36px</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Theming */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-purple-500">🎭</span>
          Theming
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preset Themes</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Default Light', 'Midnight Dark', 'Minimalist'] as const).map((p) => (
                <button 
                  key={p} 
                  onClick={() => handleThemePresetChange(p)} 
                  className={`p-3 rounded-lg border text-left text-sm hover:border-blue-500 transition-colors ${
                    data.theme.preset === p ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium">{p}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="backgroundType"
                  value="solid"
                  checked={data.theme.backgroundType === 'solid'}
                  onChange={(e) => handleUpdate('theme', 'backgroundType', e.target.value)}
                  className="mr-2"
                />
                Solid Color
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="backgroundType"
                  value="gradient"
                  checked={data.theme.backgroundType === 'gradient'}
                  onChange={(e) => handleUpdate('theme', 'backgroundType', e.target.value)}
                  className="mr-2"
                />
                Gradient
              </label>
            </div>
          </div>
          
          {data.theme.backgroundType === 'solid' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={data.theme.backgroundColor} 
                  onChange={(e) => handleUpdate('theme', 'backgroundColor', e.target.value)} 
                  className="w-12 h-10 rounded border border-gray-300" 
                />
                <input 
                  type="text" 
                  value={data.theme.backgroundColor} 
                  onChange={(e) => handleUpdate('theme', 'backgroundColor', e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Direction</label>
              <select
                value={data.theme.gradientDirection}
                onChange={(e) => handleUpdate('theme', 'gradientDirection', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              >
                <option value="135deg">Diagonal (Top-left to Bottom-right)</option>
                <option value="45deg">Diagonal (Bottom-left to Top-right)</option>
                <option value="0deg">Horizontal (Left to Right)</option>
                <option value="90deg">Vertical (Top to Bottom)</option>
                <option value="180deg">Horizontal (Right to Left)</option>
                <option value="270deg">Vertical (Bottom to Top)</option>
              </select>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Colors</label>
              <div className="space-y-2">
                {data.theme.gradientColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={color} 
                      onChange={(e) => {
                        const newColors = [...data.theme.gradientColors];
                        newColors[index] = e.target.value;
                        handleUpdate('theme', 'gradientColors', newColors);
                      }} 
                      className="w-12 h-10 rounded border border-gray-300" 
                    />
                    <input 
                      type="text" 
                      value={color} 
                      onChange={(e) => {
                        const newColors = [...data.theme.gradientColors];
                        newColors[index] = e.target.value;
                        handleUpdate('theme', 'gradientColors', newColors);
                      }} 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                    {data.theme.gradientColors.length > 2 && (
                      <button
                        onClick={() => {
                          const newColors = data.theme.gradientColors.filter((_, i) => i !== index);
                          handleUpdate('theme', 'gradientColors', newColors);
                        }}
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {data.theme.gradientColors.length < 5 && (
                  <button
                    onClick={() => {
                      const newColors = [...data.theme.gradientColors, '#000000'];
                      handleUpdate('theme', 'gradientColors', newColors);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Color
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={data.theme.primaryColor} 
                onChange={(e) => handleUpdate('theme', 'primaryColor', e.target.value)} 
                className="w-12 h-10 rounded border border-gray-300" 
              />
              <input 
                type="text" 
                value={data.theme.primaryColor} 
                onChange={(e) => handleUpdate('theme', 'primaryColor', e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select 
              value={data.theme.font} 
              onChange={(e) => handleUpdate('theme', 'font', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
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
        </div>
      </div>
      
      {/* Media */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-green-500">🖼️</span>
          Media
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📱 Wallpaper Image URL</label>
            <input 
              type="url" 
              value={data.media.wallpaperUrl} 
              onChange={(e) => handleUpdate('media', 'wallpaperUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            {data.media.wallpaperUrl && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallpaper Opacity: {data.media.wallpaperOpacity || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={data.media.wallpaperOpacity || 100}
                  onChange={(e) => handleUpdate('media', 'wallpaperOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>40%</span>
                  <span>50%</span>
                  <span>60%</span>
                  <span>70%</span>
                  <span>80%</span>
                  <span>90%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📹 Video Wallpaper URL</label>
            <input 
              type="url" 
              value={data.media.videoUrl} 
              onChange={(e) => handleUpdate('media', 'videoUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            {data.media.videoUrl && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Opacity: {data.media.videoOpacity || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={data.media.videoOpacity || 100}
                  onChange={(e) => handleUpdate('media', 'videoOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>40%</span>
                  <span>50%</span>
                  <span>60%</span>
                  <span>70%</span>
                  <span>80%</span>
                  <span>90%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🌟 Favicon URL</label>
            <input 
              type="url" 
              value={data.media.faviconUrl} 
              onChange={(e) => handleUpdate('media', 'faviconUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
        </div>
      </div>

      {/* Marketing & Tracking Pixels */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing & Tracking Pixels</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add tracking pixels and scripts that will be injected into the public page.
        </p>
        <div className="space-y-4">
          {(Object.keys(data.pixels) as Array<keyof typeof data.pixels>).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <textarea
                value={data.pixels[key]}
                onChange={(e) => handleUpdate('pixels', key, e.target.value)}
                placeholder={`Paste your ${key.replace(/([A-Z])/g, ' $1')} code here...`}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;