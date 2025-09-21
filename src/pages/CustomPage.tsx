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
    <title>The Ultimate Relationship Bundle | Soulmates Desires</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* ============================================= */
        /* CSS VARIABLES & BASIC RESET */
        /* ============================================= */
        :root {
            --bg-dark: #191C1E;
            --bg-medium: #1E2225;
            --text-light: #E0E0E0;
            --text-medium: #BDBDBD;
            --text-white: #FFFFFF;
            --primary-color: #C27005;
            --primary-color-hover: #E68A0D;
        }

        body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-light);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Fluid typography for better responsiveness */
        h1, h2, h3 {
            font-weight: 700;
            color: var(--text-white);
        }

        h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.2; }
        h2 { font-size: clamp(2rem, 4vw, 2.75rem); line-height: 1.3; }
        p { font-size: clamp(1rem, 1.5vw, 1.1rem); line-height: 1.7; color: var(--text-medium); }
        
        a { text-decoration: none; color: inherit; }
        img { max-width: 100%; display: block; }
        section { padding: 80px 0; }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }
        
        .text-primary {
            color: var(--primary-color);
        }

        /* ============================================= */
        /* BUTTON STYLES */
        /* ============================================= */
        .btn {
            display: inline-block;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
        }
        .btn-primary {
            background-color: var(--primary-color);
            color: var(--text-white);
            box-shadow: 0 4px 15px rgba(194, 112, 5, 0.2);
        }
        .btn-primary:hover {
            background-color: var(--primary-color-hover);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(194, 112, 5, 0.3);
        }
        .btn-primary-large {
            padding: 18px 36px;
            font-size: 18px;
        }
        
        /* ============================================= */
        /* HEADER & HERO SECTION */
        /* ============================================= */
        .header {
            padding: 24px 0;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: var(--text-white);
        }
        .hero-section {
            padding: 60px 0 120px 0;
            background-image: linear-gradient(rgba(25, 28, 30, 0.9), rgba(25, 28, 30, 0.9)), url('https://images.pexels.com/photos/3771077/pexels-photo-3771077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
            background-size: cover;
            background-position: center;
        }
        .hero-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        .hero-content h1 {
            margin: 0 0 24px 0;
        }
        .hero-content p {
            max-width: 600px;
            margin: 0 auto 32px auto;
            font-size: 1.15rem;
            color: var(--text-light);
        }

        /* ============================================= */
        /* BUNDLE CONTENTS SECTION */
        /* ============================================= */
        .section-intro {
            text-align: center;
            max-width: 700px;
            margin: 0 auto 60px auto;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 24px;
        }
        .product-card {
            text-align: center;
        }
        .product-card img {
            border-radius: 8px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 16px;
        }
        .product-card img:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        .product-card h3 {
            font-size: 1rem;
            font-weight: 500;
            margin: 0;
            color: var(--text-light);
        }

        /* ============================================= */
        /* VALUE & PRICING SECTION */
        /* ============================================= */
        .value-section {
            background-color: var(--bg-medium);
            border-radius: 16px;
            padding: 60px 40px;
        }
        .value-content {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 40px;
        }
        .value-list {
            flex: 1 1 50%;
            min-width: 300px;
        }
        .value-list h2 {
            margin-top: 0;
        }
        .value-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 1.1rem;
        }
        .value-item svg {
            color: var(--primary-color);
            flex-shrink: 0;
        }
        .pricing-box {
            flex: 1 1 40%;
            background-color: var(--bg-dark);
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            border: 1px solid #333;
            min-width: 300px;
        }
        .pricing-box .price-old {
            font-size: 1.5rem;
            text-decoration: line-through;
            color: var(--text-medium);
            margin: 0;
        }
        .pricing-box .price-new {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--primary-color);
            margin: 0 0 16px 0;
        }

        /* ============================================= */
        /* TESTIMONIALS SECTION */
        /* ============================================= */
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
        }
        .testimonial-card {
            background-color: var(--bg-medium);
            padding: 32px;
            border-radius: 12px;
            border: 1px solid #333;
        }
        .testimonial-card p {
            margin: 0 0 24px 0;
            font-style: italic;
        }
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .testimonial-author img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        .author-info h4 { margin: 0; font-weight: 600; color: var(--text-white); }
        .author-info span { font-size: 0.9rem; color: var(--text-medium); }

        /* ============================================= */
        /* FINAL CTA & FOOTER */
        /* ============================================= */
        .final-cta-section {
            background-color: var(--bg-medium);
        }
        .final-cta-content {
            text-align: center;
            max-width: 700px;
            margin: 0 auto;
        }
        .footer {
            padding: 30px 0;
            text-align: center;
            font-size: 0.9rem;
            color: var(--text-medium);
            border-top: 1px solid #333;
        }

        /* ============================================= */
        /* RESPONSIVE STYLES */
        /* ============================================= */
        @media (max-width: 768px) {
            .navbar .btn { display: none; }
            .hero-content { padding: 0; }
            section { padding: 60px 0; }
            .value-content { flex-direction: column; }
            .pricing-box { width: 100%; box-sizing: border-box; }
        }

    </style>
</head>

<body>

    <!-- ============================================= -->
    <!-- HERO SECTION -->
    <!-- ============================================= -->
    <section class="hero-section">
        <header class="header container">
            <nav class="navbar">
                <a href="#" class="logo">SOULMATES <span class="text-primary">DESIRES</span></a>
                <a href="#pricing" class="btn btn-primary">DOWNLOAD BUNDLE</a>
            </nav>
        </header>
        <div class="hero-content container">
            <h1>Ignite the Passion & Deepen Your <span class="text-primary">Connection</span></h1>
            <p>The ultimate collection of 16 digital guides, games, and planners designed to bring you closer, spark desire, and create unforgettable moments together.</p>
            <a href="#pricing" class="btn btn-primary btn-primary-large">Get The Ultimate Bundle Now</a>
        </div>
    </section>

    <!-- ============================================= -->
    <!-- BUNDLE CONTENTS SECTION -->
    <!-- ============================================= -->
    <section id="bundle-contents">
        <div class="container">
            <div class="section-intro">
                <h2>What You'll <span class="text-primary">Discover Inside</span></h2>
                <p>This isn't just a collection of books; it's a complete toolkit for a more exciting, connected, and passionate relationship. Explore every facet of your love life with these 16 powerful resources.</p>
            </div>
            <div class="product-grid">
                <!-- Using placeholder images that look like book covers -->
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="The Art of making Love Book Cover"><h3>The Art of Making Love</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="365 Days, 365 Sex Positions Book Cover"><h3>365 Days, 365 Positions</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Mastering Her Pleasure Book Cover"><h3>Mastering Her Pleasure</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Dirty Talks Guide Book Cover"><h3>Dirty Talks Guide</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Seducing His Senses Book Cover"><h3>Seducing His Senses</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Make Him Craving You Book Cover"><h3>Make Him Crave You</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Couples Games - Spicy Edition Cover"><h3>Games: Spicy Edition</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Couples Games - Connection Edition Cover"><h3>Games: Connection Edition</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Truth or Dare for Couples Cards Cover"><h3>Truth or Dare Cards</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Date Night Idea Cards Cover"><h3>Date Night Idea Cards</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Couples' Affirmation Cards Cover"><h3>Couples' Affirmation Cards</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="The Ultimate Date Night Planner Cover"><h3>Date Night Planner</h3></div>
                 <!-- Added missing items from your list to make 16 total -->
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Couples Games - Laughs & Giggles Edition"><h3>Games: Laughs & Giggles</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="Couples Games - 5-Minute Connector Edition"><h3>Games: 5-Min Connector</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="The Growth Mindset Worksheets"><h3>The Growth Mindset</h3></div>
                <div class="product-card"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="State of the Union Meeting Guide"><h3>'State of the Union' Guide</h3></div>
            </div>
        </div>
    </section>

    <!-- ============================================= -->
    <!-- VALUE & PRICING SECTION -->
    <!-- ============================================= -->
    <section id="pricing">
        <div class="container">
            <div class="value-section">
                <div class="value-content">
                    <div class="value-list">
                        <h2>Get <span class="text-primary">$150+</span> of Value in One Bundle</h2>
                        <p>We've combined our most popular and effective resources into one incredible package. Separately, these would cost a fortune. Today, you get it all for a fraction of the price.</p>
                        <div class="value-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>6 In-Depth Guides on Seduction & Pleasure</span>
                        </div>
                        <div class="value-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>4 Unique Couple's Games for Fun & Connection</span>
                        </div>
                        <div class="value-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>3 Sets of Printable Cards (Truth or Dare, Ideas, Affirmations)</span>
                        </div>
                        <div class="value-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>3 Planners & Worksheets for Growth & Organization</span>
                        </div>
                         <div class="value-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>Instant Digital Download & Lifetime Access</span>
                        </div>
                    </div>
                    <div class="pricing-box">
                        <p class="price-old">Total Value: $153.74</p>
                        <p class="price-new">$29</p>
                        <a href="#" class="btn btn-primary btn-primary-large" style="width: 100%;">Download Now & Save 80%</a>
                        <p style="font-size: 0.8rem; margin-top: 16px; color: var(--text-medium);">Limited Time Offer. 100% Secure Payment.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================= -->
    <!-- TESTIMONIALS SECTION -->
    <!-- ============================================= -->
    <section id="testimonials">
        <div class="container">
            <div class="section-intro">
                <h2>Loved by <span class="text-primary">Couples Everywhere</span></h2>
                <p>Don't just take our word for it. Here's what people who have used the bundle are saying about the change in their relationship.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <p>"Honestly, this bundle changed everything. We were in a rut and the Date Night cards alone were worth the price. We feel like we're dating all over again. Highly recommend!"</p>
                    <div class="testimonial-author">
                        <img src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Happy customer Jessica M.">
                        <div class="author-info">
                            <h4>Jessica M.</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <p>"My partner was skeptical at first, but the 'Spicy Edition' game had us laughing and connecting on a level we haven't in years. The guides are tasteful and incredibly helpful. It's the best $29 we've ever spent on our relationship."</p>
                    <div class="testimonial-author">
                        <img src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Happy customer David L.">
                        <div class="author-info">
                            <h4>David L.</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <p>"I bought this bundle just to get some new ideas, and I was blown away by the quality and amount of content. The 'Mastering Her Pleasure' guide was insightful and respectful. It's opened up so much communication between us."</p>
                    <div class="testimonial-author">
                        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Happy customer Sarah P.">
                        <div class="author-info">
                            <h4>Sarah P.</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- ============================================= -->
    <!-- FINAL CTA SECTION -->
    <!-- ============================================= -->
    <section class="final-cta-section">
        <div class="container final-cta-content">
            <h2>Ready to Reignite Your <span class="text-primary">Relationship?</span></h2>
            <p>Don't wait for the spark to fade. Take action now and get instant access to the complete 16-in-1 Relationship Bundle. Your next chapter of passion, fun, and deep connection starts today.</p>
            <a href="#pricing" class="btn btn-primary btn-primary-large">Yes! I Want The Bundle For Just $29</a>
        </div>
    </section>
    
    <!-- ============================================= -->
    <!-- FOOTER -->
    <!-- ============================================= -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Soulmates Desires. All Rights Reserved.</p>
        </div>
    </footer>

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