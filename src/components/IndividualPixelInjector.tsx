import { useEffect } from 'react';

interface IndividualPixels {
  metaPixel?: string;
  googleTag?: string;
  tiktokPixel?: string;
  snapchatPixel?: string;
  pinterestTag?: string;
  customHeaderScripts?: string;
}

interface IndividualPixelInjectorProps {
  pixels: IndividualPixels;
  pageId: string; // Unique identifier for the page (e.g., 'product-1', 'bio-page')
}

const IndividualPixelInjector: React.FC<IndividualPixelInjectorProps> = ({ pixels, pageId }) => {
  useEffect(() => {
    const scripts: { id: string, content: string }[] = [];
    
    Object.entries(pixels).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        scripts.push({ id: `${pageId}-pixel-${key}`, content: value });
      }
    });

    scripts.forEach(({ id, content }) => {
      // Remove existing script if it exists
      const existingElement = document.getElementById(id);
      if (existingElement) {
        existingElement.remove();
      }

      const scriptElement = document.createElement('div');
      scriptElement.id = id;
      scriptElement.innerHTML = content;
      
      while (scriptElement.firstChild) {
        document.head.appendChild(scriptElement.firstChild);
      }
    });

    return () => {
      scripts.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, [pixels, pageId]);

  return null;
};

export default IndividualPixelInjector;