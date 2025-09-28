import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { handleDeepLink } from '../utils/deepLinks';
import { initializeDeepLinking } from '../utils/deepLinks';

// Custom pages configuration
// Add your custom pages here with their HTML content
const customPages: { [key: string]: { title: string; music?: string; content: string } } = {
  'funnel-1': {
    title: 'Sales Funnel - Limited Time Offer',
    music: '/custom-page-music.mp3',
    content: `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; font-family: 'Arial', sans-serif;">
        <div style="max-width: 800px; margin: 0 auto; text-align: center; color: white;">
          <h1 style="font-size: 3rem; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🔥 LIMITED TIME OFFER 🔥</h1>
          <p style="font-size: 1.5rem; margin-bottom: 30px; opacity: 0.9;">Don't miss out on this exclusive deal!</p>
          
          <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 40px; margin: 40px 0; border: 1px solid rgba(255,255,255,0.2);">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">⏰ Countdown Timer</h2>
            <div id="countdown" style="font-size: 2.5rem; font-weight: bold; margin: 20px 0;">24:00:00</div>
            <p style="opacity: 0.8;">This offer expires soon!</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 40px 0;">
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">✨ Premium Package</h3>
              <p style="font-size: 3rem; font-weight: bold; color: #FFD700;">$97</p>
              <p style="text-decoration: line-through; opacity: 0.7;">$297</p>
              <button onclick="handleDeepLink('/shop', true)" style="background: #FFD700; color: #333; padding: 15px 30px; border: none; border-radius: 50px; font-size: 1.2rem; font-weight: bold; cursor: pointer; margin-top: 20px; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                GET IT NOW
              </button>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">🎯 What You Get</h3>
              <ul style="text-align: left; list-style: none; padding: 0;">
                <li style="margin: 10px 0;">✅ Instant Access</li>
                <li style="margin: 10px 0;">✅ Lifetime Updates</li>
                <li style="margin: 10px 0;">✅ 30-Day Guarantee</li>
                <li style="margin: 10px 0;">✅ Bonus Materials</li>
              </ul>
            </div>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin: 40px 0; backdrop-filter: blur(10px);">
            <h3 style="font-size: 1.8rem; margin-bottom: 20px;">💬 What Our Customers Say</h3>
            <blockquote style="font-style: italic; font-size: 1.2rem; margin: 20px 0; opacity: 0.9;">
              "This changed my life completely! I can't believe the results I got in just 30 days."
            </blockquote>
            <p style="font-weight: bold;">- Sarah M., Verified Customer</p>
          </div>
          
          <button onclick="handleDeepLink('/shop', true)" style="background: linear-gradient(45deg, #FF6B6B, #4ECDC4); color: white; padding: 20px 50px; border: none; border-radius: 50px; font-size: 1.5rem; font-weight: bold; cursor: pointer; margin: 30px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.3)'">
            🚀 CLAIM YOUR SPOT NOW
          </button>
          
          <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 30px;">
            * Limited time offer. Terms and conditions apply.
          </p>
        </div>
      </div>
      
      <script>
        // Countdown timer
        function updateCountdown() {
          const now = new Date().getTime();
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);
          const distance = tomorrow.getTime() - now;
          
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          document.getElementById('countdown').innerHTML = 
            String(hours).padStart(2, '0') + ':' + 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Deep link function for buttons
        function handleDeepLink(path, forceExternal) {
          if (typeof window !== 'undefined' && window.handleDeepLink) {
            window.handleDeepLink(path, forceExternal);
          } else {
            window.open(window.location.origin + path, '_blank');
          }
        }
        
        // Make handleDeepLink available globally
        window.handleDeepLink = handleDeepLink;
      </script>
    `
  },
  
  'landing-page': {
    title: 'Welcome to Our Amazing Product',
    music: '/landing-page-music.mp3',
    content: `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); font-family: 'Arial', sans-serif;">
        <!-- Hero Section -->
        <div style="padding: 80px 20px; text-align: center; color: white;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 4rem; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); animation: fadeInUp 1s ease-out;">
              Transform Your Life Today
            </h1>
            <p style="font-size: 1.5rem; margin-bottom: 50px; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; animation: fadeInUp 1s ease-out 0.2s both;">
              Discover the secret that thousands of people are using to achieve extraordinary results
            </p>
            <button onclick="handleDeepLink('/shop', true)" style="background: #00b894; color: white; padding: 20px 40px; border: none; border-radius: 50px; font-size: 1.3rem; font-weight: bold; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s; animation: fadeInUp 1s ease-out 0.4s both;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.3)'">
              🚀 Get Started Now
            </button>
          </div>
        </div>
        
        <!-- Features Section -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 80px 20px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 60px; color: white;">Why Choose Us?</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
              <div style="background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; text-align: center; color: white; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 4rem; margin-bottom: 20px;">⚡</div>
                <h3 style="font-size: 1.8rem; margin-bottom: 20px;">Lightning Fast</h3>
                <p style="opacity: 0.9; line-height: 1.6;">Get results in record time with our proven system that works for everyone.</p>
              </div>
              
              <div style="background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; text-align: center; color: white; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎯</div>
                <h3 style="font-size: 1.8rem; margin-bottom: 20px;">Targeted Results</h3>
                <p style="opacity: 0.9; line-height: 1.6;">Our approach is specifically designed to deliver exactly what you need.</p>
              </div>
              
              <div style="background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; text-align: center; color: white; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 4rem; margin-bottom: 20px;">🛡️</div>
                <h3 style="font-size: 1.8rem; margin-bottom: 20px;">100% Guaranteed</h3>
                <p style="opacity: 0.9; line-height: 1.6;">We're so confident you'll love it, we offer a full money-back guarantee.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- CTA Section -->
        <div style="padding: 80px 20px; text-align: center; color: white;">
          <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 3rem; margin-bottom: 30px;">Ready to Get Started?</h2>
            <p style="font-size: 1.3rem; margin-bottom: 40px; opacity: 0.9;">
              Join thousands of satisfied customers who have already transformed their lives
            </p>
            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
              <button onclick="handleDeepLink('/shop', true)" style="background: #00b894; color: white; padding: 20px 40px; border: none; border-radius: 50px; font-size: 1.3rem; font-weight: bold; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                🛒 Shop Now
              </button>
              <button onclick="handleDeepLink('/links', true)" style="background: transparent; color: white; padding: 20px 40px; border: 2px solid white; border-radius: 50px; font-size: 1.3rem; font-weight: bold; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='white'; this.style.color='#74b9ff'" onmouseout="this.style.background='transparent'; this.style.color='white'">
                📖 Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
      
      <script>
        function handleDeepLink(path, forceExternal) {
          if (typeof window !== 'undefined' && window.handleDeepLink) {
            window.handleDeepLink(path, forceExternal);
          } else {
            window.open(window.location.origin + path, '_blank');
          }
        }
        window.handleDeepLink = handleDeepLink;
      </script>
    `
  },
  
  'blank-template': {
    title: 'Custom Page Template',
    music: '/default-custom-page-music.mp3',
    content: `
      <div style="min-height: 100vh; background: #f8f9fa; padding: 40px 20px; font-family: 'Arial', sans-serif;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h1 style="text-align: center; color: #333; margin-bottom: 30px;">Custom Page Template</h1>
          <p style="text-align: center; color: #666; font-size: 1.2rem; margin-bottom: 40px;">
            This is a blank template. Customize it with your own content!
          </p>
          
          <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 20px;">Section 1</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Add your content here. You can include text, images, videos, and any HTML elements you want.
            </p>
            <button onclick="handleDeepLink('/shop', true)" style="background: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem;">
              Visit Shop
            </button>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 20px;">Section 2</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              This template supports deep linking to all pages of your website.
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button onclick="handleDeepLink('/', true)" style="background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Home</button>
              <button onclick="handleDeepLink('/links', true)" style="background: #17a2b8; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Bio Page</button>
              <button onclick="handleDeepLink('/shop', true)" style="background: #ffc107; color: #333; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Shop</button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        function handleDeepLink(path, forceExternal) {
          if (typeof window !== 'undefined' && window.handleDeepLink) {
            window.handleDeepLink(path, forceExternal);
          } else {
            window.open(window.location.origin + path, '_blank');
          }
        }
        window.handleDeepLink = handleDeepLink;
      </script>
    `
  }
};

const CustomPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageData, setPageData] = useState<{ title: string; music?: string; content: string } | null>(null);

  // Background music for custom pages
  useBackgroundMusic(pageData?.music || '/default-custom-page-music.mp3', { volume: 0.2 });

  useEffect(() => {
    // Initialize deep linking system
    initializeDeepLinking();
    
    if (pageId && customPages[pageId]) {
      const page = customPages[pageId];
      setPageData(page);
      
      // Update page title
      document.title = `${page.title} - Soulmates Desires`;
      
      // Make deep link function available globally for custom page buttons
      (window as any).handleDeepLink = handleDeepLink;
    } else {
      setPageData(null);
    }
  }, [pageId]);

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-4">The custom page you're looking for doesn't exist.</p>
          <button
            onClick={() => handleDeepLink('/links', true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Bio Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="custom-page-content"
      dangerouslySetInnerHTML={{ __html: pageData.content }}
    />
  );
};

export default CustomPage;