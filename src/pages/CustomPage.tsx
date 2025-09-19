import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

// Sample custom pages data - you can modify these or add more
const customPages: { [key: string]: { title: string; content: string; music?: string } } = {
  'funnel-1': {
    title: 'Sales Funnel Page 1',
    music: '/custom-page-music.mp3',
    content: `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; font-family: 'Arial', sans-serif;">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h1 style="color: white; font-size: 3rem; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            🚀 Transform Your Life Today!
          </h1>
          
          <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 40px; line-height: 1.6;">
            Discover the secrets that successful people don't want you to know. This exclusive offer is only available for the next 24 hours!
          </p>
          
          <div style="background: white; border-radius: 15px; padding: 40px; margin: 40px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <h2 style="color: #333; font-size: 2rem; margin-bottom: 20px;">
              ⚡ Limited Time Offer
            </h2>
            
            <div style="display: flex; justify-content: center; align-items: center; margin: 30px 0;">
              <span style="font-size: 1.5rem; color: #999; text-decoration: line-through; margin-right: 20px;">$297</span>
              <span style="font-size: 3rem; color: #e74c3c; font-weight: bold;">$97</span>
            </div>
            
            <button style="background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; border: none; padding: 20px 40px; font-size: 1.3rem; border-radius: 50px; cursor: pointer; box-shadow: 0 10px 20px rgba(238, 90, 36, 0.3); transition: transform 0.3s ease;" 
                    onmouseover="this.style.transform='scale(1.05)'" 
                    onmouseout="this.style.transform='scale(1)'">
              🎯 Get Instant Access Now!
            </button>
            
            <p style="color: #666; font-size: 0.9rem; margin-top: 20px;">
              ✅ 30-Day Money Back Guarantee<br>
              ✅ Instant Digital Download<br>
              ✅ Lifetime Access
            </p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 40px 0;">
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
              <h3 style="color: white; font-size: 1.5rem; margin-bottom: 15px;">📈 Proven Results</h3>
              <p style="color: rgba(255,255,255,0.8);">Over 10,000 satisfied customers have transformed their lives using our system.</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
              <h3 style="color: white; font-size: 1.5rem; margin-bottom: 15px;">⚡ Fast Implementation</h3>
              <p style="color: rgba(255,255,255,0.8);">See results in as little as 7 days with our step-by-step system.</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
              <h3 style="color: white; font-size: 1.5rem; margin-bottom: 15px;">🎯 Expert Support</h3>
              <p style="color: rgba(255,255,255,0.8);">Get direct access to our team of experts for personalized guidance.</p>
            </div>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin: 40px 0; backdrop-filter: blur(10px);">
            <h3 style="color: white; font-size: 1.8rem; margin-bottom: 20px;">⏰ This Offer Expires In:</h3>
            <div style="display: flex; justify-content: center; gap: 20px; font-size: 2rem; color: #ff6b6b; font-weight: bold;">
              <div style="text-align: center;">
                <div id="hours">23</div>
                <div style="font-size: 0.8rem; color: white;">Hours</div>
              </div>
              <div style="text-align: center;">
                <div id="minutes">59</div>
                <div style="font-size: 0.8rem; color: white;">Minutes</div>
              </div>
              <div style="text-align: center;">
                <div id="seconds">45</div>
                <div style="font-size: 0.8rem; color: white;">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        // Simple countdown timer
        function updateCountdown() {
          const hours = document.getElementById('hours');
          const minutes = document.getElementById('minutes');
          const seconds = document.getElementById('seconds');
          
          if (hours && minutes && seconds) {
            let h = parseInt(hours.textContent);
            let m = parseInt(minutes.textContent);
            let s = parseInt(seconds.textContent);
            
            s--;
            if (s < 0) {
              s = 59;
              m--;
              if (m < 0) {
                m = 59;
                h--;
                if (h < 0) {
                  h = 23;
                }
              }
            }
            
            hours.textContent = h.toString().padStart(2, '0');
            minutes.textContent = m.toString().padStart(2, '0');
            seconds.textContent = s.toString().padStart(2, '0');
          }
        }
        
        setInterval(updateCountdown, 1000);
      </script>
    `
  },
  
  'landing-page': {
    title: 'Landing Page Template',
    music: '/landing-page-music.mp3',
    content: `
      <div style="min-height: 100vh; background: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <!-- Hero Section -->
        <section style="background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); color: white; padding: 100px 20px; text-align: center;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 3.5rem; margin-bottom: 20px; font-weight: 700;">
              Welcome to the Future
            </h1>
            <p style="font-size: 1.3rem; margin-bottom: 40px; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto;">
              Transform your business with our cutting-edge solutions. Join thousands of satisfied customers worldwide.
            </p>
            <button style="background: #e74c3c; color: white; border: none; padding: 18px 40px; font-size: 1.2rem; border-radius: 30px; cursor: pointer; box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3); transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 35px rgba(231, 76, 60, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(231, 76, 60, 0.3)'">
              Get Started Today
            </button>
          </div>
        </section>
        
        <!-- Features Section -->
        <section style="padding: 80px 20px; background: white;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 60px; color: #2c3e50;">Why Choose Us?</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
              <div style="padding: 40px 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease;"
                   onmouseover="this.style.transform='translateY(-10px)'"
                   onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 3rem; margin-bottom: 20px;">🚀</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #2c3e50;">Lightning Fast</h3>
                <p style="color: #7f8c8d; line-height: 1.6;">Experience blazing fast performance with our optimized solutions.</p>
              </div>
              
              <div style="padding: 40px 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease;"
                   onmouseover="this.style.transform='translateY(-10px)'"
                   onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 3rem; margin-bottom: 20px;">🔒</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #2c3e50;">Secure & Reliable</h3>
                <p style="color: #7f8c8d; line-height: 1.6;">Your data is protected with enterprise-grade security measures.</p>
              </div>
              
              <div style="padding: 40px 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease;"
                   onmouseover="this.style.transform='translateY(-10px)'"
                   onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 3rem; margin-bottom: 20px;">💎</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #2c3e50;">Premium Quality</h3>
                <p style="color: #7f8c8d; line-height: 1.6;">Built with attention to detail and premium materials.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- CTA Section -->
        <section style="background: linear-gradient(135deg, #8e44ad 0%, #3498db 100%); color: white; padding: 80px 20px; text-align: center;">
          <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 2.5rem; margin-bottom: 20px;">Ready to Get Started?</h2>
            <p style="font-size: 1.2rem; margin-bottom: 40px; opacity: 0.9;">
              Join thousands of satisfied customers and transform your business today.
            </p>
            <button style="background: white; color: #8e44ad; border: none; padding: 18px 40px; font-size: 1.2rem; border-radius: 30px; cursor: pointer; font-weight: 600; box-shadow: 0 8px 25px rgba(255,255,255,0.2); transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 35px rgba(255,255,255,0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(255,255,255,0.2)'">
              Start Your Journey
            </button>
          </div>
        </section>
      </div>
    `
  },
  
  'blank-template': {
    title: 'Blank Template',
    content: `
      <div style="min-height: 100vh; padding: 40px 20px; font-family: 'Arial', sans-serif; background: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h1 style="text-align: center; color: #333; font-size: 2.5rem; margin-bottom: 40px;">
            Your Custom Content Here
          </h1>
          
          <div style="background: #f8f9fa; padding: 40px; border-radius: 10px; border: 2px dashed #dee2e6; text-align: center;">
            <p style="color: #6c757d; font-size: 1.1rem; margin-bottom: 20px;">
              This is a blank template. Replace this content with your own HTML and inline CSS.
            </p>
            
            <p style="color: #6c757d; font-size: 0.9rem;">
              You can add any HTML elements, styling, JavaScript, and content you want here.
            </p>
          </div>
          
          <!-- Example sections you can customize -->
          <div style="margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            <div style="background: #e3f2fd; padding: 30px; border-radius: 10px;">
              <h3 style="color: #1976d2; margin-bottom: 15px;">Section 1</h3>
              <p style="color: #424242;">Add your content here...</p>
            </div>
            
            <div style="background: #f3e5f5; padding: 30px; border-radius: 10px;">
              <h3 style="color: #7b1fa2; margin-bottom: 15px;">Section 2</h3>
              <p style="color: #424242;">Add your content here...</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 30px; border-radius: 10px;">
              <h3 style="color: #388e3c; margin-bottom: 15px;">Section 3</h3>
              <p style="color: #424242;">Add your content here...</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  
          <!-- COPY TEMPLATE FOR NEXT CUSTOM PAGE. Open page at /custom/template -->
  
  'template': {
    title: 'Template',
    music: '/your-custom-music.mp3', // Optional
    content: `
      <!-- Your full HTML content here -->
      <div style="min-height: 100vh; background: #f0f0f0; padding: 40px;">
        <h1 style="text-align: center; color: #333;">Your Custom Page</h1>
        <!-- Add any HTML, CSS, and JavaScript you want -->
      </div>
    `
  },
  
  'save-your-couple': {
    title: 'Save Your Couple',
    music: '/your-custom-music.mp3', // Optional
    content: `
      <!-- Your full HTML content here -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Product Name] - [A Short Benefit]</title>
    <!-- Importing Montserrat Font from Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; font-family: 'Montserrat', sans-serif; background-color: #f8f9fa; color: #212529;">

    <!-- Main Container for content centering -->
    <div style="max-width: 800px; margin: 0 auto; padding: 15px;">

        <!-- HERO SECTION -->
        <div style="text-align: center; padding: 40px 10px;">
            <h1 style="font-size: 42px; font-weight: 900; margin-bottom: 16px; line-height: 1.2;">[Achieve Desired Outcome] without [Common Pain Point]</h1>
            <p style="font-size: 18px; color: #495057; margin-bottom: 32px; line-height: 1.7;">[A quick sentence explaining what your product is and who it is for.]</p>
            <img src="https://via.placeholder.com/600x400.png?text=Your+Product+Mockup" alt="[Your Product Name] Mockup" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 32px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);">
            <a href="#" style="background-color: #007bff; color: white; padding: 16px 32px; text-decoration: none; font-size: 20px; font-weight: 700; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);">Get Instant Access for $[XX]</a>
        </div>

        <!-- PROBLEM SECTION -->
        <div style="background-color: #ffffff; padding: 40px 25px; border-radius: 8px; margin-top: 40px; border: 1px solid #dee2e6;">
            <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 24px; margin-top: 0;">Is This You?</h2>
            <p style="font-size: 18px; color: #495057; line-height: 1.7; text-align: center;">[Describe the pain points in 2-3 sentences. Use question format to talk about their frustrations. Make them feel understood.]</p>
        </div>

        <!-- SOLUTION SECTION -->
        <div style="padding: 60px 10px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 700; margin-bottom: 24px;">The Solution You've Been Waiting For</h2>
            <p style="font-size: 18px; color: #495057; line-height: 1.7; margin-bottom: 16px;">Introducing <strong>[Your Product Name]</strong>.</p>
            <p style="font-size: 18px; color: #495057; line-height: 1.7; margin-bottom: 32px;">[Explain the transformation. Focus on the positive outcome and feeling. Paint a vivid picture of their successful future.]</p>
            <div style="text-align: left; max-width: 500px; margin: 0 auto; background-color: #e9ecef; padding: 25px; border-radius: 8px;">
                <h3 style="margin-top: 0; font-weight: 700;">This is for you if...</h3>
                <ul style="list-style: none; padding: 0; font-size: 18px; line-height: 1.8;">
                    <li style="margin-bottom: 10px;">✔️ [Ideal customer #1]</li>
                    <li style="margin-bottom: 10px;">✔️ [Ideal customer #2]</li>
                    <li style="margin-bottom: 10px;">✔️ [Ideal customer #3]</li>
                </ul>
            </div>
        </div>
        
        <!-- FEATURES & BENEFITS SECTION -->
        <div style="background-color: #ffffff; padding: 40px 25px; border-radius: 8px; margin-top: 40px; border: 1px solid #dee2e6;">
            <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 32px; margin-top: 0;">Here's What You'll Get Inside</h2>
            <ul style="list-style: none; padding: 0; font-size: 18px; line-height: 1.8;">
                <li style="margin-bottom: 24px;"><strong>Feature 1:</strong> [Describe the feature] so you can [achieve this benefit].</li>
                <li style="margin-bottom: 24px;"><strong>Feature 2:</strong> [Describe the feature] so you can [achieve this benefit].</li>
                <li style="margin-bottom: 24px;"><strong>Feature 3:</strong> [Describe the feature] so you can [achieve this benefit].</li>
            </ul>
        </div>
        
        <!-- SOCIAL PROOF SECTION -->
        <div style="padding: 60px 10px;">
            <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 40px;">What Our Customers Are Saying</h2>
            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border: 1px solid #dee2e6;">
                <p style="font-size: 18px; color: #495057; line-height: 1.7; margin-top: 0; font-style: italic;">"[Amazing testimonial from Customer A that highlights a key benefit.]"</p>
                <div style="display: flex; align-items: center; margin-top: 20px;">
                    <img src="https://via.placeholder.com/60x60.png?text=Photo" alt="Customer A" style="border-radius: 50%; margin-right: 15px;">
                    <p style="margin: 0; font-weight: 700;">[Customer A's Full Name]</p>
                </div>
            </div>
            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border: 1px solid #dee2e6;">
                <p style="font-size: 18px; color: #495057; line-height: 1.7; margin-top: 0; font-style: italic;">"[Amazing testimonial from Customer B that overcomes an objection.]"</p>
                <div style="display: flex; align-items: center; margin-top: 20px;">
                    <img src="https://via.placeholder.com/60x60.png?text=Photo" alt="Customer B" style="border-radius: 50%; margin-right: 15px;">
                    <p style="margin: 0; font-weight: 700;">[Customer B's Full Name]</p>
                </div>
            </div>
        </div>

        <!-- THE OFFER & CTA SECTION -->
        <div style="background-color: #e9ecef; border: 2px solid #ced4da; border-radius: 8px; padding: 40px 25px; margin-top: 40px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 700; margin-top: 0; margin-bottom: 32px;">Get Instant Access to [Your Product Name] Today</h2>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: left; max-width: 500px; margin: 0 auto 32px auto;">
                <h3 style="margin-top: 0; font-weight: 700;">Here's a recap of everything you get:</h3>
                <ul style="list-style: none; padding: 0; font-size: 18px; line-height: 1.8;">
                    <li style="margin-bottom: 10px;">✔️ [Your Core Product] (Value: $[XXX])</li>
                    <li style="margin-bottom: 10px;">✔️ [Bonus #1] (Value: $[XX])</li>
                    <li style="margin-bottom: 10px;">✔️ [Bonus #2] (Value: $[XX])</li>
                </ul>
                <hr style="border: 0; border-top: 1px solid #e9ecef; margin: 20px 0;">
                <p style="font-size: 18px; text-align: right;"><strong>Total Value: <span style="text-decoration: line-through;">$[XXX]</span></strong></p>
                <p style="font-size: 24px; text-align: center; font-weight: 700;">Your Price Today: Only $[XX]</p>
            </div>

            <div style="margin-bottom: 32px;">
                <h3 style="font-weight: 700;">My 100% Risk-Free Guarantee</h3>
                <p style="font-size: 16px; color: #495057; line-height: 1.7;">[Explain your 30-day (or similar) money-back guarantee here. Be clear and confident.]</p>
            </div>
            
            <a href="#" style="background-color: #007bff; color: white; padding: 16px 32px; text-decoration: none; font-size: 20px; font-weight: 700; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);">Get Instant Access Now</a>
        </div>

        <!-- FAQ SECTION -->
        <div style="padding: 60px 10px;">
            <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 40px;">Frequently Asked Questions</h2>
            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 20px; margin-bottom: 8px; font-weight: 700;">[Common Question 1?]</h3>
                    <p style="font-size: 16px; color: #495057; line-height: 1.7; margin-top: 0;">[Clear and concise answer.]</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 20px; margin-bottom: 8px; font-weight: 700;">[Common Question 2?]</h3>
                    <p style="font-size: 16px; color: #495057; line-height: 1.7; margin-top: 0;">[Clear and concise answer.]</p>
                </div>
            </div>
        </div>
        
        <!-- FINAL CTA SECTION -->
        <div style="background-color: #343a48; color: white; padding: 40px 25px; border-radius: 8px; margin-top: 40px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Ready to [Achieve the Main Benefit]?</h2>
            <p style="font-size: 18px; color: #ced4da; line-height: 1.7; margin-bottom: 32px;">[Don't wait another day to solve their problem. Click the button below to get started.]</p>
            <a href="#" style="background-color: #007bff; color: white; padding: 16px 32px; text-decoration: none; font-size: 20px; font-weight: 700; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);">Get Instant Access for $[XX]</a>
        </div>

    </div>

</body>
</html>
    `
  }
};

const CustomPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageData, setPageData] = useState<{ title: string; content: string; music?: string } | null>(null);
  
  useEffect(() => {
    if (pageId && customPages[pageId]) {
      setPageData(customPages[pageId]);
    }
  }, [pageId]);
  
  // Background music for custom pages
  useBackgroundMusic(pageData?.music || '/default-custom-page-music.mp3', { volume: 0.2 });
  
  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
          {/* <Link to="/links" className="text-blue-600 hover:text-blue-700 underline">
            Back to Home
          </Link> */}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Optional Header - Remove if you want full custom control 
      <div className="bg-white shadow-sm border-b p-4">
        <Link to="/links" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div> */}
      
      {/* Custom HTML Content */}
      <div 
        dangerouslySetInnerHTML={{ __html: pageData.content }}
        className="custom-page-content"
      />
      
      {/* Custom CSS for additional styling if needed */}
      <style>{`
        .custom-page-content {
          /* Add any global styles for custom pages here */
        }
        
        .custom-page-content * {
          box-sizing: border-box;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .custom-page-content h1 {
            font-size: 2rem !important;
          }
          
          .custom-page-content h2 {
            font-size: 1.5rem !important;
          }
          
          .custom-page-content .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomPage;