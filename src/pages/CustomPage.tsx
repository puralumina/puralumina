import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

// Function to execute scripts in HTML content
const executeScripts = (container: HTMLElement) => {
  const scripts = container.querySelectorAll('script');
  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    if (script.src) {
      newScript.src = script.src;
    } else {
      newScript.textContent = script.textContent;
    }
    // Copy all attributes
    Array.from(script.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    document.head.appendChild(newScript);
    // Remove the new script after execution to prevent memory leaks
    setTimeout(() => {
      if (newScript.parentNode) {
        newScript.parentNode.removeChild(newScript);
      }
    }, 100);
  });
};

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
          const hours = document.querySelector('#hours');
          const minutes = document.querySelector('#minutes');
          const seconds = document.querySelector('#seconds');
          
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
        
        setTimeout(() => {
          updateCountdown();
          setInterval(updateCountdown, 1000);
        }, 100);
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
      
      <script>
        // Enhanced interactions
        function addHoverEffects() {
          const buttons = document.querySelectorAll('.hover-lift, .cta-button, .feature-card');
          buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-5px) scale(1.02)';
              this.style.transition = 'all 0.3s ease';
            });
            button.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0) scale(1)';
            });
          });
        }
        
        // Initialize when DOM is ready
        setTimeout(() => {
          addHoverEffects();
        }, 100);
      </script>
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
  
  'bundle-deal': {
    title: 'Save your couple',
    music: '/your-custom-music.mp3', // Optional
    content: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surge - Crafting Digital Experiences</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Basic reset and font settings */
        body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        /* Style for FAQ marker */
        summary::-webkit-details-marker {
            display: none;
        }
        summary {
            list-style: none;
        }
    </style>
</head>

<body style="background-color: #121212; color: #ffffff; background-image: url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.03\"/%3E%3C/svg%3E');">

    <!-- Main Container -->
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 40px;">

        <!-- ============================================= -->
        <!-- HEADER -->
        <!-- ============================================= -->
        <header style="padding: 24px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <a href="#" style="text-decoration: none; color: #fff; font-size: 24px; font-weight: 700;">
                    <span style="color: #FFC700;">◆</span> Surge
                </a>
                <nav style="display: flex; gap: 32px; align-items: center;">
                    <a href="#" style="text-decoration: none; color: #cccccc; font-size: 16px; font-weight: 500;">About Us</a>
                    <a href="#" style="text-decoration: none; color: #cccccc; font-size: 16px; font-weight: 500;">Services</a>
                    <a href="#" style="text-decoration: none; color: #cccccc; font-size: 16px; font-weight: 500;">Capabilities</a>
                    <a href="#" style="text-decoration: none; color: #cccccc; font-size: 16px; font-weight: 500;">Portfolio</a>
                    <a href="#" style="text-decoration: none; color: #cccccc; font-size: 16px; font-weight: 500;">Testimonials</a>
                </nav>
                <a href="#" style="background-color: #FFC700; color: #121212; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px;">Let's Talk</a>
            </div>
        </header>

        <!-- ============================================= -->
        <!-- HERO SECTION -->
        <!-- ============================================= -->
        <section style="padding: 80px 0; text-align: center;">
            <div style="max-width: 800px; margin: 0 auto; position: relative;">
                <div style="position: absolute; top: -20px; left: -40px; color: #FFC700;">
                    <svg width="60" height="60" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 L12.24 7.76 L20 10 L12.24 12.24 L10 20 L7.76 12.24 L0 10 L7.76 7.76 Z" /></svg>
                </div>
                <h1 style="font-size: 64px; line-height: 1.2; margin: 0 0 24px 0; font-weight: 700;">
                    CRAFTING DIGITAL EXPERIENCES WITH IMPACT
                </h1>
                <p style="color: #cccccc; font-size: 18px; max-width: 450px; margin: 0 auto 32px auto; line-height: 1.6;">
                    We Combine Creativity And Technology To Deliver Unique, High-Impact Solutions. Our Team Collaborates Closely With Clients To Bring Their Visions To Life, Creating Designs.
                </p>
                <a href="#" style="background-color: #ffffff; color: #121212; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                    WORK WITH US
                    <span style="background-color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </span>
                </a>
            </div>

            <div style="margin-top: 60px;">
                <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="A team collaborating in a modern office." style="width: 100%; max-width: 1000px; border-radius: 16px; display: block; margin: 0 auto;">
            </div>
        </section>

    </div><!-- End Main Container -->

    <!-- ============================================= -->
    <!-- TICKER / MARQUEE -->
    <!-- ============================================= -->
    <section style="background-color: #FFC700; color: #121212; padding: 24px 0; overflow: hidden; white-space: nowrap; margin: 40px 0;">
        <div style="font-size: 32px; font-weight: 700; display: inline-block;">
            <!-- Repeated for marquee effect -->
            Let's Talk <span style="font-size: 16px; font-weight: 500; opacity: 0.7; margin: 0 24px;">GET IN TOUCH</span>
            Let's Talk <span style="font-size: 16px; font-weight: 500; opacity: 0.7; margin: 0 24px;">GET IN TOUCH</span>
            Let's Talk <span style="font-size: 16px; font-weight: 500; opacity: 0.7; margin: 0 24px;">GET IN TOUCH</span>
            Let's Talk <span style="font-size: 16px; font-weight: 500; opacity: 0.7; margin: 0 24px;">GET IN TOUCH</span>
            Let's Talk <span style="font-size: 16px; font-weight: 500; opacity: 0.7; margin: 0 24px;">GET IN TOUCH</span>
            Let's Talk <span style="font-size: 16px; font-weight: 500; opacity: 0.7; margin: 0 24px;">GET IN TOUCH</span>
        </div>
    </section>

    <!-- Main Container Re-opens -->
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 40px;">
        
        <!-- ============================================= -->
        <!-- SERVICES SECTION -->
        <!-- ============================================= -->
        <section style="padding: 80px 0;">
            <h2 style="text-align: center; font-size: 48px; margin-bottom: 60px;">WHAT DO WE <span style="color: #FFC700; text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 8px;">PROVIDE</span>?</h2>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px;">
                
                <!-- Service Card 1 -->
                <div style="background-color: #FFC700; color: #121212; padding: 32px; border-radius: 16px; flex: 1 1 30%; min-width: 300px; max-width: 380px;">
                    <div style="width: 50px; height: 50px; background-color: #121212; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </div>
                    <h3 style="font-size: 22px; margin: 0 0 12px 0;">Theme Development</h3>
                    <p style="font-size: 16px; line-height: 1.6; margin: 0; opacity: 0.8;">You Need To Get Positive Results When You Spend Hard Eamed Marketing And Promotions.</p>
                </div>

                <!-- Service Card 2 -->
                <div style="background-color: #1E1E1E; padding: 32px; border-radius: 16px; flex: 1 1 30%; min-width: 300px; max-width: 380px;">
                     <div style="width: 50px; height: 50px; background-color: #121212; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <h3 style="font-size: 22px; margin: 0 0 12px 0;">Plugin Development</h3>
                    <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #cccccc;">You Need To Get Positive Results When You Spend Hard Eamed Marketing And Promotions.</p>
                </div>

                <!-- Service Card 3 -->
                <div style="background-color: #1E1E1E; padding: 32px; border-radius: 16px; flex: 1 1 30%; min-width: 300px; max-width: 380px;">
                     <div style="width: 50px; height: 50px; background-color: #121212; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </div>
                    <h3 style="font-size: 22px; margin: 0 0 12px 0;">Ecommerce Site</h3>
                    <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #cccccc;">You Need To Get Positive Results When You Spend Hard Eamed Marketing And Promotions.</p>
                </div>

                <!-- Service Card 4 -->
                <div style="background-color: #1E1E1E; padding: 32px; border-radius: 16px; flex: 1 1 30%; min-width: 300px; max-width: 380px;">
                     <div style="width: 50px; height: 50px; background-color: #121212; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                    </div>
                    <h3 style="font-size: 22px; margin: 0 0 12px 0;">Business Site</h3>
                    <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #cccccc;">You Need To Get Positive Results When You Spend Hard Eamed Marketing And Promotions.</p>
                </div>

                <!-- Service Card 5 -->
                <div style="background-color: #1E1E1E; padding: 32px; border-radius: 16px; flex: 1 1 30%; min-width: 300px; max-width: 380px;">
                     <div style="width: 50px; height: 50px; background-color: #121212; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line></svg>
                    </div>
                    <h3 style="font-size: 22px; margin: 0 0 12px 0;">Custom Coding</h3>
                    <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #cccccc;">You Need To Get Positive Results When You Spend Hard Eamed Marketing And Promotions.</p>
                </div>

                <!-- Service Card 6 -->
                <div style="background-color: #1E1E1E; padding: 32px; border-radius: 16px; flex: 1 1 30%; min-width: 300px; max-width: 380px;">
                     <div style="width: 50px; height: 50px; background-color: #121212; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <h3 style="font-size: 22px; margin: 0 0 12px 0;">UI/UX Design</h3>
                    <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #cccccc;">You Need To Get Positive Results When You Spend Hard Eamed Marketing And Promotions.</p>
                </div>

            </div>
        </section>

        <!-- ============================================= -->
        <!-- CTA SECTION -->
        <!-- ============================================= -->
        <section style="padding: 80px 0;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 30px;">
                <div style="flex: 1 1 50%; min-width: 300px; position: relative;">
                    <div style="position: absolute; top: -10px; right: 0; color: #FFC700; transform: rotate(90deg);">
                        <svg width="60" height="60" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 L12.24 7.76 L20 10 L12.24 12.24 L10 20 L7.76 12.24 L0 10 L7.76 7.76 Z" /></svg>
                    </div>
                    <h2 style="font-size: 48px; line-height: 1.3; margin: 0 0 24px 0;">TRANSFORM YOUR IDEAS INTO DIGITAL REALITY</h2>
                    <p style="color: #cccccc; font-size: 18px; line-height: 1.6;">We Combine Creativity And Technology To Deliver Unique, High-Impact Solutions. Our Powerful Team Collaborates Closely With Clients To Bring Their Visions To Life, Creating Designs.</p>
                </div>
                <div style="flex-shrink: 0;">
                    <a href="#" style="background-color: #ffffff; color: #121212; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                        WORK WITH US
                        <span style="background-color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>

        <!-- ============================================= -->
        <!-- PROJECTS SECTION -->
        <!-- ============================================= -->
        <section style="padding: 80px 0;">
            <h2 style="text-align: center; font-size: 48px; margin-bottom: 60px;">OUR <span style="color: #FFC700;">PROJECTS</span></h2>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 24px;">
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; width: 100%;">
                    
                    <!-- Project 1 -->
                    <div style="background-color: #1E1E1E; padding: 20px; border-radius: 16px; flex: 1 1 30%; min-width: 300px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h4 style="margin: 0 0 4px 0; font-size: 18px;">Landing Page UI</h4>
                                <p style="margin: 0; color: #cccccc;">Nike Landing Page</p>
                            </div>
                            <a href="#" style="background-color: #FFC700; width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; text-decoration: none;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            </a>
                        </div>
                        <img src="https://placehold.co/600x400/121212/FFC700?text=Project+1" alt="Project 1" style="width: 100%; border-radius: 8px;">
                    </div>

                    <!-- Project 2 (Taller) -->
                    <div style="background-color: #1E1E1E; padding: 20px; border-radius: 16px; flex: 1 1 30%; min-width: 300px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h4 style="margin: 0 0 4px 0; font-size: 18px;">Landing Page UI</h4>
                                <p style="margin: 0; color: #cccccc;">Website</p>
                            </div>
                            <a href="#" style="background-color: #FFC700; width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; text-decoration: none;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            </a>
                        </div>
                        <img src="https://placehold.co/600x800/121212/FFC700?text=Project+2" alt="Project 2" style="width: 100%; border-radius: 8px;">
                    </div>

                    <!-- Project 3 -->
                    <div style="background-color: #1E1E1E; padding: 20px; border-radius: 16px; flex: 1 1 30%; min-width: 300px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h4 style="margin: 0 0 4px 0; font-size: 18px;">Landing Page UI</h4>
                                <p style="margin: 0; color: #cccccc;">Nike Landing Page</p>
                            </div>
                            <a href="#" style="background-color: #FFC700; width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; text-decoration: none;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            </a>
                        </div>
                        <img src="https://placehold.co/600x400/121212/FFC700?text=Project+3" alt="Project 3" style="width: 100%; border-radius: 8px;">
                    </div>
                </div>

                <!-- Project 4 (Below middle) -->
                <div style="background-color: #1E1E1E; padding: 20px; border-radius: 16px; width: 100%; max-width: 380px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <div>
                            <h4 style="margin: 0 0 4px 0; font-size: 18px;">Landing Page UI</h4>
                            <p style="margin: 0; color: #cccccc;">Nike Landing Page</p>
                        </div>
                        <a href="#" style="background-color: #FFC700; width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; text-decoration: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </a>
                    </div>
                    <img src="https://placehold.co/600x400/121212/FFC700?text=Project+4" alt="Project 4" style="width: 100%; border-radius: 8px;">
                </div>

            </div>
        </section>

        <!-- ============================================= -->
        <!-- TESTIMONIALS SECTION -->
        <!-- ============================================= -->
        <section style="padding: 80px 0;">
            <h2 style="text-align: center; font-size: 48px; margin-bottom: 60px;">WHAT OUR <span style="color: #FFC700;">CLIENTS SAY</span>?</h2>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px;">

                <!-- Testimonial Card 1 -->
                <div style="background-color: #1E1E1E; padding: 40px; border-radius: 16px; flex: 1 1 45%; min-width: 300px; position: relative;">
                    <div style="position: absolute; top: 20px; right: 20px; font-size: 100px; color: #FFC700; opacity: 0.2; line-height: 1; font-family: serif;">“</div>
                    <p style="color: #cccccc; line-height: 1.8; font-size: 16px; margin: 0 0 24px 0;">Working with Webflow Studio has been an incredible experience. They have a talented team of designers and developers who went above and beyond our expectations. We couldn't be happier with the final product!</p>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <img src="https://placehold.co/60x60/FFC700/121212?text=AB" alt="Alan Baker" style="width: 60px; height: 60px; border-radius: 50%;">
                        <div>
                            <h4 style="margin: 0 0 4px 0; font-size: 18px;">Alan Baker</h4>
                            <p style="margin: 0; color: #cccccc;">CEO of Red Bull Company</p>
                        </div>
                    </div>
                </div>

                <!-- Testimonial Card 2 -->
                <div style="background-color: #1E1E1E; padding: 40px; border-radius: 16px; flex: 1 1 45%; min-width: 300px; position: relative;">
                     <div style="position: absolute; top: 20px; right: 20px; font-size: 100px; color: #FFC700; opacity: 0.2; line-height: 1; font-family: serif;">“</div>
                    <p style="color: #cccccc; line-height: 1.8; font-size: 16px; margin: 0 0 24px 0;">Working with Webflow Studio has been an incredible experience. They have a talented team of designers and developers who went above and beyond our expectations. We couldn't be happier with the final product!</p>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <img src="https://placehold.co/60x60/FFC700/121212?text=TW" alt="Theresa Webb" style="width: 60px; height: 60px; border-radius: 50%;">
                        <div>
                            <h4 style="margin: 0 0 4px 0; font-size: 18px;">Theresa Webb</h4>
                            <p style="margin: 0; color: #cccccc;">CEO of Red Bull Company</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    </div><!-- End Main Container -->

    <!-- ============================================= -->
    <!-- CLIENT LOGOS -->
    <!-- ============================================= -->
    <div style="padding: 40px 0; border-top: 1px solid #2a2a2a; border-bottom: 1px solid #2a2a2a;">
        <div style="max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 40px;">
            <span style="font-size: 24px; font-weight: 600; color: #555;">Qwave</span>
            <span style="font-size: 24px; font-weight: 600; color: #555;">✓ SpecBee</span>
            <span style="font-size: 24px; font-weight: 600; color: #555;">martino ▲</span>
            <span style="font-size: 24px; font-weight: 600; color: #555;">▽ Virosgen</span>
            <span style="font-size: 24px; font-weight: 600; color: #555;">7 VERTEX</span>
            <span style="font-size: 24px; font-weight: 600; color: #555;">A Armis</span>
            <span style="font-size: 24px; font-weight: 600; color: #555;">Natroma</span>
        </div>
    </div>
    
    <!-- Main Container Re-opens -->
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 40px;">

        <!-- ============================================= -->
        <!-- FAQ SECTION -->
        <!-- ============================================= -->
        <section style="padding: 80px 0;">
            <h2 style="text-align: center; font-size: 48px; margin-bottom: 60px;">Frequently Asked <span style="color: #FFC700;">Questions</span></h2>
            <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
                
                <!-- FAQ Item 1 -->
                <details style="background-color: #FFC700; color: #121212; border-radius: 16px; padding: 24px; cursor: pointer;">
                    <summary style="display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 600;">
                        What services do you offer?
                        <span style="background-color: #121212; color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">−</span>
                    </summary>
                    <p style="font-size: 16px; line-height: 1.6; margin-top: 16px; opacity: 0.8;">We offer a full range of digital services, including web design, UX/UI, branding, and digital marketing. Our goal is to deliver a customized digital solution that helps you achieve your business goals.</p>
                </details>

                <!-- FAQ Item 2 -->
                <details style="background-color: #1E1E1E; border-radius: 16px; padding: 24px; cursor: pointer;">
                    <summary style="display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 600;">
                        How long does a project typically take?
                        <span style="background-color: #121212; color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">+</span>
                    </summary>
                    <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-top: 16px;">The timeline for a project varies depending on its scope and complexity. We will provide a detailed project timeline after our initial consultation.</p>
                </details>

                <!-- FAQ Item 3 -->
                <details style="background-color: #1E1E1E; border-radius: 16px; padding: 24px; cursor: pointer;">
                    <summary style="display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 600;">
                        What is the cost of your services?
                        <span style="background-color: #121212; color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">+</span>
                    </summary>
                    <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-top: 16px;">We provide custom quotes for each project based on your specific needs. Contact us for a detailed estimate.</p>
                </details>

                <!-- FAQ Item 4 -->
                <details style="background-color: #1E1E1E; border-radius: 16px; padding: 24px; cursor: pointer;">
                    <summary style="display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 600;">
                        Can you redesign my existing website or app?
                        <span style="background-color: #121212; color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">+</span>
                    </summary>
                    <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-top: 16px;">Absolutely. We specialize in redesigning and modernizing existing digital products to improve user experience and performance.</p>
                </details>

                 <!-- FAQ Item 5 -->
                <details style="background-color: #1E1E1E; border-radius: 16px; padding: 24px; cursor: pointer;">
                    <summary style="display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 600;">
                        How involved will I be in the design process?
                        <span style="background-color: #121212; color: #FFC700; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">+</span>
                    </summary>
                    <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-top: 16px;">We believe in a collaborative process. You will be involved at every key stage, from initial concept to final launch, to ensure the final product aligns perfectly with your vision.</p>
                </details>
            </div>
        </section>

        <!-- ============================================= -->
        <!-- FINAL CTA -->
        <!-- ============================================= -->
        <section style="padding: 40px 0 80px 0;">
             <div style="background-color: #FFC700; color: #121212; padding: 32px 40px; border-radius: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
                <h3 style="font-size: 28px; font-weight: 600; margin: 0;">Ready to work with us ?</h3>
                <a href="#" style="background-color: #121212; color: #ffffff; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-flex; align-items: center; gap: 8px;">
                    Get Started
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
             </div>
        </section>


        <!-- ============================================= -->
        <!-- FOOTER -->
        <!-- ============================================= -->
        <footer style="padding: 80px 0 40px 0; text-align: center;">
            <p style="color: #FFC700; font-weight: 600; margin: 0;">HAVE SOMETHING IN MIND?</p>
            <h2 style="font-size: 48px; margin: 16px 0 32px 0;">GET <span style="color: #FFC700;">CONNECTED</span></h2>
            <a href="#" style="background-color: #FFC700; color: #121212; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; margin-bottom: 80px;">CONTACT US</a>
            
            <div style="border-top: 1px solid #2a2a2a; padding-top: 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
                <p style="color: #cccccc; margin: 0;">© 2023 Surge. All Rights Reserved.</p>
                <div style="display: flex; gap: 24px;">
                    <a href="#" style="color: #cccccc; text-decoration: none;">Privacy Policy</a>
                    <a href="#" style="color: #cccccc; text-decoration: none;">Terms & Conditions</a>
                </div>
            </div>
        </footer>

    </div><!-- End Main Container -->

</body>

</html>
    `
  },
  
  'privacy-policy': {
    title: 'Privacy Policy - Soulmates Desires',
    music: '/your-custom-music.mp3', // Optional
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Soulmates Desires</title>
    <link rel="icon" type="image/png" href="https://d1yei2z3i6k35z.cloudfront.net/4704293/68cac865f3b8b_SoulmatesDesiresPPBrown.png">
    <!-- Importing Montserrat Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; font-family: 'Montserrat', sans-serif; background-color: #f8f9fa; color: #212529; line-height: 1.7;">

    <!-- HEADER (Optional but recommended for consistency) -->
    <div style="background-color: #ffffff; border-bottom: 1px solid #dee2e6;">
        <div style="max-width: 900px; margin: 0 auto; padding: 15px 20px;">
            <a href="/" style="text-decoration: none; color: #212529; font-weight: 700; font-size: 20px;">
                SOULMATES DESIRES
            </a>
        </div>
    </div>

    <!-- Main Content Container -->
    <div style="max-width: 900px; margin: 0 auto; padding: 20px 20px 60px 20px; background-color: #ffffff;">

        <h1 style="font-size: 36px; font-weight: 700; margin-top: 20px; margin-bottom: 10px;">Privacy Policy</h1>
        <p style="color: #6c757d; margin-top: 0;"><strong>Effective Date:</strong> <strong>January 2025</strong></p>

        <p style="font-size: 16px;">Welcome to Soulmates Desires. Your privacy is critically important to us. This Privacy Policy describes how Soulmates Desires ("we", "us", or "our") collects, uses, and discloses your information when you visit our website, purchase our digital products, or otherwise interact with us.</p>
        <p style="font-size: 16px;">By using our Service, you agree to the collection and use of information in accordance with this policy.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">1. Information We Collect</h2>
        <p style="font-size: 16px;">We collect information in a few different ways to provide and improve our Service to you.</p>

        <h3 style="font-size: 20px; font-weight: 700; margin-top: 25px;">a) Information You Provide to Us Directly:</h3>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li style="margin-bottom: 10px;"><strong>Purchase Information:</strong> When you purchase a digital product, we collect information necessary to process your order. This includes your name, email address, and billing information. <strong>Please note: We do not directly store your full credit card information. All payments are securely processed by our third-party payment processors (e.g., Stripe, Paddle, PayPal).</strong></li>
            <li style="margin-bottom: 10px;"><strong>Contact Information:</strong> When you contact us with questions or for support, we collect your name and email address.</li>
            <li style="margin-bottom: 10px;"><strong>Communications:</strong> We may keep a record of any correspondence you have with us.</li>
        </ul>

        <h3 style="font-size: 20px; font-weight: 700; margin-top: 25px;">b) Information We Collect Automatically:</h3>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li style="margin-bottom: 10px;"><strong>Log and Usage Data:</strong> Like most websites, we automatically collect information that your browser sends whenever you visit our Service. This may include your computer's Internet Protocol (IP) address, browser type and version, the pages you visit on our site, the time and date of your visit, and other statistics.</li>
            <li style="margin-bottom: 10px;"><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service. Cookies are files with a small amount of data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</li>
        </ul>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">2. How We Use Your Information</h2>
        <p style="font-size: 16px;">We use the information we collect for various purposes, including:</p>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li style="margin-bottom: 10px;">To fulfill your orders, process your payments, and deliver the digital products you have purchased.</li>
            <li style="margin-bottom: 10px;">To provide, maintain, and improve our Service.</li>
            <li style="margin-bottom: 10px;">To communicate with you, respond to your inquiries, and provide customer support.</li>
            <li style="margin-bottom: 10px;">For marketing purposes, such as sending newsletters or special offers, only if you have opted-in to receive such communications. You can opt-out at any time.</li>
        </ul>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">3. How We Share Your Information</h2>
        <p style="font-size: 16px;">We do not sell your personal information. We may share your information with trusted third-party service providers only in the following circumstances:</p>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li style="margin-bottom: 10px;"><strong>Payment Processors:</strong> We share your purchase information with our payment processors (e.g., Stripe, Paddle) to securely handle transactions. Their use of your personal information is governed by their own privacy policies.</li>
            <li style="margin-bottom: 10px;"><strong>Service Providers:</strong> We may share information with vendors who perform services on our behalf, such as website hosting and analytics.</li>
            <li style="margin-bottom: 10px;"><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
        </ul>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">4. Data Security</h2>
        <p style="font-size: 16px;">We take the security of your data seriously and use reasonable administrative, technical, and physical security measures to help protect your personal information. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">5. Your Data Protection Rights</h2>
        <p style="font-size: 16px;">Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise any of these rights, please contact us at <strong><a href="mailto:soulmatesdesires@gmail.com" style="color: #0d6efd;"> soulmatesdesires@gmail.com</a></strong>.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">6. Children's Privacy and Age Limitation</h2>

<p style="font-size: 16px;">Our Service is not intended for or directed to individuals under the age of 18 ("Minors").</p>

<p style="font-size: 16px; font-weight: 700; background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px;">By accessing and using this website, you represent and warrant that you are at least 18 years of age and have the full legal capacity to enter into a binding agreement. Your use of the Service constitutes your full acknowledgment and agreement to this age requirement.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">7. Changes to This Privacy Policy</h2>
        <p style="font-size: 16px;">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">8. Contact Us</h2>
        <p style="font-size: 16px;">If you have any questions about this Privacy Policy, please contact us:</p>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li>By email: <strong><a href="mailto:soulmatesdesires@gmail.com" style="color: #0d6efd; font-weight: 700;">soulmatesdesires@gmail.com</a></strong></li>
            <li>By visiting this page on our website: <strong><a href="/custom/contact-us" style="color: #0d6efd; font-weight: 700;">Contact us</a></strong></li>
        </ul>

    </div>

    <!-- FOOTER -->
    <div style="border-top: 1px solid #dee2e6; padding: 40px 20px; text-align: center; background-color: #ffffff;">
        <p style="color: #6c757d; font-size: 14px; margin: 0;">© 2025 Soulmates Desires. All rights reserved.</p>
    </div>

</body>
</html>
    `
  },
  
  'contact-us': {
    title: 'Contact - Soulmates Desires',
    music: '/your-custom-music.mp3', // Optional
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Soulmates Desires</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        .contact-button:hover {
            background-color: #0b5ed7 !important;
            box-shadow: 0 8px 20px rgba(13, 110, 253, 0.4) !important;
            transform: translateY(-2px);
        }
    </style>
</head>
<body style="margin: 0; font-family: 'Montserrat', sans-serif; background-color: #f8f9fa; color: #212529; line-height: 1.6;">

    <!-- HEADER -->
    <div style="background-color: #ffffff; border-bottom: 1px solid #dee2e6;">
        <div style="max-width: 1100px; margin: 0 auto; padding: 15px 20px;">
            <a href="/" style="text-decoration: none; color: #212529; font-weight: 700; font-size: 20px;">
                SOULMATES DESIRES
            </a>
        </div>
    </div>

    <!-- Main Content Container with More Text -->
    <div style="max-width: 800px; margin: 0 auto; padding: 60px 20px; text-align: center; color: #495057;">
        <h3 style="font-size: 25px; text-align: center; font-weight: 900; margin-bottom: 15px;">We'd Love to Hear From You</h3>
        <p style="font-size: 18px; color: #6c757d; max-width: 650px; margin: 0 auto 40px auto; line-height: 1.7;">
            Whether you have a question about our products, need assistance with an order, or just want to share your thoughts, our inbox is always open. We do our best to respond to all inquiries within 24 hours.
        </p>

        <a href="mailto:soulmatesdesires@gmail.com" class="contact-button" style="background-color: #0d6efd; color: white; padding: 18px 40px; text-decoration: none; font-size: 20px; font-weight: 700; border-radius: 10px; display: inline-block; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: all 0.2s ease-in-out;">
            Email Us Directly
        </a></br></br></br>

        <!-- NEW TEXT ADDED HERE -->
        <div style="max-width: 650px; margin: 0 auto 40px auto; text-align: left; color: #495057;">
            <h3 style="font-size: 25px; text-align: center; font-weight: 900; margin-bottom: 15px;">Our Commitment to You</h3>
            <p style="font-size: 15px; color: #6c757d; max-width: 650px; margin: 0 auto 40px auto; line-height: 1.7;"">At Soulmates Desires, we are passionate about creating high-quality digital products that bring value and joy to your life. Your feedback is an essential part of our creative process and helps us improve every day. Please don't hesitate to reach out with suggestions or ideas!</p>
            <p style="font-size: 15px; color: #6c757d; max-width: 650px; margin: 0 auto 40px auto; line-height: 1.7;"">For technical support, please include your order number and the name of the product you are having trouble with so we can assist you as quickly as possible. For general inquiries, we look forward to connecting with you.</p>
        </div>
        <!-- END OF NEW TEXT -->
        <p style="margin-top: 30px; font-size: 16px; color: #495057;">
            Send us an email at: 
            <a href="mailto:soulmatesdesires@gmail.com" style="color: #0d6efd; font-weight: 700; text-decoration: none;">soulmatesdesires@gmail.com</a>
        </p>
    </div>

    <!-- FOOTER -->
    <div style="border-top: 1px solid #dee2e6; padding: 40px 20px; text-align: center; background-color: #ffffff;">
        <p style="color: #6c757d; font-size: 14px; margin-bottom: 15px;">
            <a href="/custom/privacy-policy" style="text-decoration: none; color: #495057; margin: 0 10px;">Privacy Policy</a> |
            <a href="/custom/terms" style="text-decoration: none; color: #495057; margin: 0 10px;">Terms of Service</a>
        </p>
        <p style="color: #6c757d; font-size: 14px; margin: 0;">© 2025 Soulmates Desires. All rights reserved.</p>
    </div>

</body>
</html>
    `
  },
  
  'terms': {
    title: 'Terms of service',
    music: '/your-custom-music.mp3', // Optional
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - Soulmates Desires</title>
    <link rel="icon" type="image/png" href="https://d1yei2z3i6k35z.cloudfront.net/4704293/68cac865f3b8b_SoulmatesDesiresPPBrown.png">
    <!-- Importing Montserrat Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; font-family: 'Montserrat', sans-serif; background-color: #f8f9fa; color: #212529; line-height: 1.7;">

    <!-- HEADER (Optional but recommended for consistency) -->
    <div style="background-color: #ffffff; border-bottom: 1px solid #dee2e6;">
        <div style="max-width: 900px; margin: 0 auto; padding: 15px 20px;">
            <a href="/" style="text-decoration: none; color: #212529; font-weight: 700; font-size: 20px;">
                SOULMATES DESIRES
            </a>
        </div>
    </div>

    <!-- Main Content Container -->
    <div style="max-width: 900px; margin: 0 auto; padding: 20px 20px 60px 20px; background-color: #ffffff;">

        <h1 style="font-size: 36px; font-weight: 700; margin-top: 20px; margin-bottom: 10px;">Terms of Service</h1>
        <p style="color: #6c757d; margin-top: 0;"><strong>Last Updated:</strong> <strong>January 2025</strong></p>

        <p style="font-size: 16px;">Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the <strong>soulmatesdesires.com</strong> website operated by Soulmates Desires ("us", "we", or "our").</p>
        <p style="font-size: 16px;">Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>
        <p style="font-size: 16px;"><strong>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.</strong></p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">1. Age Requirement</h2>
        <p style="font-size: 16px; font-weight: 700; background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px;">This website and its products are intended solely for users who are eighteen (18) years of age or older. Any registration by, use of, or access to the Service by anyone under 18 is unauthorized, unlicensed, and in violation of these Terms of Service. By using this Service, you represent and warrant that you are 18 or older and that you agree to and to abide by all of the terms and conditions of this Agreement.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">2. Intellectual Property and Digital Product License</h2>
        <p style="font-size: 16px;">The Service and its original content, features, and functionality are and will remain the exclusive property of Soulmates Desires.</p>
        
        <div style="font-size: 16px; background-color: #e7f1ff; border-left: 4px solid #0d6efd; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <h3 style="margin-top: 0; font-size: 20px;">Your License to Use Our Products</h3>
            <p style="margin-bottom: 0;">When you purchase a digital product (e.g., e-book, planner, game, worksheets) from us, you are granted one (1) revocable, non-exclusive, non-transferable license for personal, non-commercial use only. You are expressly prohibited from:</p>
            <ul style="padding-left: 20px;">
                <li style="margin-bottom: 5px;">Reselling, sharing, relicensing, or redistributing the files in any way.</li>
                <li style="margin-bottom: 5px;">Using the products for any commercial purpose.</li>
                <li style="margin-bottom: 5px;">Modifying or creating derivative works from the content.</li>
            </ul>
            <p style="margin-bottom: 0;">This license is granted to the single individual who made the purchase. Sharing your access or the files with others is a breach of these Terms.</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">3. Purchases, Payments, and Refunds</h2>
        <p style="font-size: 16px;">If you wish to purchase any product made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your name, email, and payment information.</p>
        <p style="font-size: 16px;">All payments are processed through secure third-party payment processors (e.g., Stripe, Paddle, PayPal). We do not store your credit card information. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Service.</p>
        
        <h3 style="font-size: 20px; font-weight: 700; margin-top: 25px;">Refund Policy</h3>
        <p style="font-size: 16px;">Due to the instant, digital nature of our products, all sales are final and non-refundable. Once a file is delivered to you, it cannot be returned. We encourage you to review the product description carefully before making a purchase. If you encounter a technical issue with a file, please contact us at <strong><a href="mailto:soulmatesdesires@gmail.com" style="color: #0d6efd;">soulmatesdesires@gmail.com</a></strong> for assistance.</p>
        
        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">4. Prohibited Uses</h2>
        <p style="font-size: 16px;">You may use the Service only for lawful purposes. You agree not to use the Service:</p>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li style="margin-bottom: 10px;">In any way that violates any applicable national or international law or regulation.</li>
            <li style="margin-bottom: 10px;">To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li style="margin-bottom: 10px;">To impersonate or attempt to impersonate Soulmates Desires, an employee, another user, or any other person or entity.</li>
            <li style="margin-bottom: 10px;">To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
        </ul>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">
        
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">5. Disclaimer of Warranties & Limitation of Liability</h2>
        <p style="font-size: 16px;">The Service and its products are provided on an "AS IS" and "AS AVAILABLE" basis. Soulmates Desires makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>
        <p style="font-size: 16px;">Our products are intended for informational and entertainment purposes only. We make no guarantees about the results you will achieve from using our products.</p>
        <p style="font-size: 16px;">In no event shall Soulmates Desires or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>

        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">6. Governing Law</h2>
        <p style="font-size: 16px;">These Terms shall be governed and construed in accordance with the laws of the <strong>United States of America, without regard to its conflict of law provisions.</p>
        
        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">
        
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">7. Changes to Terms</h2>
        <p style="font-size: 16px;">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page and updating the "Last Updated" date. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.</p>
        
        <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 40px 0;">

        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">8. Contact Us</h2>
        <p style="font-size: 16px;">If you have any questions about these Terms, please contact us:</p>
        <ul style="padding-left: 20px; font-size: 16px;">
            <li>By email: <strong><a href="mailto:soulmatesdesires@gmail.com" style="color: #0d6efd; font-weight: 700;">soulmatesdesires@gmail.com</a></strong></li>
        </ul>

    </div>

    <!-- FOOTER -->
    <div style="border-top: 1px solid #dee2e6; padding: 40px 20px; text-align: center; background-color: #ffffff;">
        <p style="color: #6c757d; font-size: 14px; margin: 0;">© 2025 Soulmates Desires. All rights reserved.</p>
    </div>

</body>
</html>
    `
  },
  
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
  }
};

const CustomPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageContent, setPageContent] = useState<string>('');
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  
  const currentPage = pageId ? customPages[pageId] : null;
  
  // Background music for custom pages
  useBackgroundMusic(currentPage?.music || '/default-custom-page-music.mp3', { volume: 0.2 });
  
  useEffect(() => {
    if (currentPage) {
      setPageContent(currentPage.content);
      
      // Execute scripts after content is set and DOM is updated
      setTimeout(() => {
        if (contentRef) {
          executeScripts(contentRef);
        }
      }, 100);
    }
  }, [currentPage, contentRef]);

  // Ref callback to get the content container
  const handleContentRef = (element: HTMLDivElement | null) => {
    setContentRef(element);
  };
  
  if (!currentPage) {
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
        ref={handleContentRef}
        dangerouslySetInnerHTML={{ __html: pageContent }}
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
        
        /* Ensure animations work */
        .custom-page-content .hover-lift,
        .custom-page-content .cta-button,
        .custom-page-content .feature-card {
          transition: all 0.3s ease !important;
        }
        
        .custom-page-content .hover-lift:hover,
        .custom-page-content .cta-button:hover,
        .custom-page-content .feature-card:hover {
          transform: translateY(-5px) scale(1.02) !important;
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