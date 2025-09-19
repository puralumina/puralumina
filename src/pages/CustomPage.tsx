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
  
  'bundle-deal': {
    title: 'Save your couple',
    music: '/your-custom-music.mp3', // Optional
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Ultimate Relationship Spark Bundle - Massive Sale!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        /* Base styles */
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f6f2;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(45deg, #ff416c, #ff4b2b);
            color: #fff !important;
            padding: 20px 40px;
            font-size: 22px;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            text-align: center;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 25px rgba(0,0,0,0.2);
        }

        /* Responsive Video Container */
        .video-container {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            overflow: hidden;
            max-width: 100%;
            background: #000;
            border-radius: 10px;
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        /* FAQ Accordion Styles */
        .faq details {
            background: #fff;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .faq summary {
            padding: 20px;
            font-weight: 700;
            cursor: pointer;
            outline: none;
            font-size: 1.1em;
        }
        .faq details[open] summary {
            border-bottom: 1px solid #eee;
        }
        .faq div {
            padding: 0 20px 20px 20px;
            line-height: 1.6;
        }

        /* Exit-Intent Popup Styles */
        #exit-intent-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        #exit-intent-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            padding: 40px;
            border-radius: 10px;
            z-index: 1000;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        #exit-intent-popup.visible {
            display: block;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        #exit-intent-popup-overlay.visible {
            display: block;
            opacity: 1;
        }
        #exit-intent-popup .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 28px;
            font-weight: bold;
            color: #aaa;
            cursor: pointer;
        }
        #exit-intent-popup .close-btn:hover {
            color: #333;
        }
        
        /* Media query for smaller screens */
        @media (max-width: 600px) {
            h1 { font-size: 2.5em !important; }
            .cta-button { font-size: 18px; padding: 15px 30px; }
            .as-seen-on img { height: 20px !important; }
        }
    </style>
</head>
<body>

    <!-- HERO SECTION with VSL -->
    <div style="background-color: #1a1a1a; color: #fff; padding: 60px 20px; text-align: center;">
        <h1 style="font-size: 3.5em; font-weight: 900; margin: 0; line-height: 1.1; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">Ignite Unstoppable Passion & Deepen Your Connection</h1>
        <p style="font-size: 1.4em; margin-top: 20px; color: #eee;">[WATCH] Get All 14 Of Our Bestselling Relationship & Intimacy Guides In One Ultimate Bundle.</p>
        
        <!-- Video Sales Letter -->
        <div class="video-container">
            <!-- Replace this with your YouTube or Vimeo embed code -->
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <a href="YOUR_CHECKOUT_LINK_HERE" class="cta-button">
            YES! I Want The Bundle For Just $39.99!
            <span style="display: block; font-size: 0.7em; font-weight: 400; margin-top: 5px;">(Save 69% Today!)</span>
        </a>
    </div>

    <!-- AS SEEN ON BAR -->
    <div class="as-seen-on" style="background-color: #e9ecef; padding: 20px; text-align: center;">
        <span style="font-weight: 700; color: #6c757d; margin-right: 20px; display: inline-block; vertical-align: middle;">AS FEATURED IN</span>
        <img src="https://i.ibb.co/6y40F22/logo-placeholder1.png" alt="Featured on Cosmopolitan" style="height: 25px; margin: 5px 15px; vertical-align: middle; filter: grayscale(100%); opacity: 0.7;">
        <img src="https://i.ibb.co/F8SgWJq/logo-placeholder2.png" alt="Featured on Men's Health" style="height: 25px; margin: 5px 15px; vertical-align: middle; filter: grayscale(100%); opacity: 0.7;">
        <img src="https://i.ibb.co/1q2x6y5/logo-placeholder3.png" alt="Featured on Glamour" style="height: 25px; margin: 5px 15px; vertical-align: middle; filter: grayscale(100%); opacity: 0.7;">
    </div>

    <div class="container">

        <!-- URGENCY & BONUS SECTION -->
        <div style="background-color: #fff; border: 2px dashed #ff416c; padding: 30px; margin: 40px 0; border-radius: 10px; text-align: center;">
            <h2 style="margin-top:0; font-size: 1.8em; color: #ff416c;">LIMITED TIME OFFER!</h2>
            <p style="font-size: 1.1em;">The first <strong>50 buyers</strong> will receive our exclusive bonus:</p>
            <p style="font-size: 1.2em; font-weight: 700; background-color: #fff3cd; padding: 10px; border-radius: 5px;">"The 5-Day Intimacy Challenge" Video Course (A $49 Value, Absolutely FREE!)</p>
            <p style="font-weight: 700; margin-top: 30px;">Hurry, spots are filling up fast!</p>
            
            <div style="background-color: #e9ecef; border-radius: 50px; padding: 3px; margin: 10px auto; max-width: 400px;">
                <div style="background: linear-gradient(45deg, #ff416c, #ff4b2b); height: 25px; width: 68%; border-radius: 50px; text-align: center; color: white; line-height: 25px; font-weight: 700;">
                    34 of 50 Claimed!
                </div>
            </div>
        </div>

        <!-- PROBLEM & "WHO IS THIS FOR?" -->
        <div style="text-align: center; padding: 40px 0;">
            <h2 style="font-size: 2.2em; margin-bottom: 20px;">Is the "Honeymoon Phase" Feeling Like a Distant Memory?</h2>
            <p style="font-size: 1.2em; line-height: 1.6;">You love your partner, but the daily grind can make any relationship feel... routine. If you're ready to swap predictable evenings for unforgettable experiences, you're in the right place.</p>
            
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; text-align: left; margin-top: 40px;">
                <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; width:100%; max-width: 320px; margin-bottom: 20px;">
                    <h3 style="margin-top: 0; color: #2e7d32;">✅ This is for you if...</h3>
                    <ul style="padding-left: 20px;">
                        <li>You want to reignite the spark.</li>
                        <li>You're tired of the same old "date nights".</li>
                        <li>You want to explore deeper intimacy.</li>
                        <li>You believe your relationship is worth investing in.</li>
                    </ul>
                </div>
                <div style="background: #ffebee; padding: 20px; border-radius: 8px; width:100%; max-width: 320px;">
                    <h3 style="margin-top: 0; color: #c62828;">❌ This is NOT for you if...</h3>
                    <ul style="padding-left: 20px;">
                        <li>You're looking for a "magic pill" fix.</li>
                        <li>You're not willing to try new things.</li>
                        <li>You're happy with a "roommate" dynamic.</li>
                        <li>You're not open to honest communication.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- WHAT'S INSIDE THE BUNDLE -->
        <div style="background-color: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); margin-top: 20px;">
            <h2 style="text-align: center; font-size: 2.5em; margin-top: 0;">Introducing: The Ultimate Relationship Spark Bundle</h2>
            <p style="text-align: center; font-size: 1.2em; margin-bottom: 40px;">Your complete, all-in-one digital library for passion, connection, and fun. You get instant access to all 14 books, guides, and card decks.</p>
            
             <img src="https://images.unsplash.com/photo-1593696954577-ab3d39317b97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D" alt="A professional and appealing image of all 14 book covers spread out" style="max-width: 100%; height: auto; margin-bottom: 30px; border-radius: 10px;">
            
             <!-- Content list remains the same... -->

        </div>

        <!-- VISUALLY COMPELLING OFFER & GUARANTEE -->
        <div style="background: #1a1a1a; color: white; padding: 40px; margin-top: 40px; border-radius: 10px; text-align: center;">
            <h2 style="font-size: 2.5em; margin-top: 0;">Get Everything Today For One Insanely Low Price</h2>
            <p style="font-size: 1.8em; margin: 20px 0;">Total Value: <span style="text-decoration: line-through; opacity: 0.7;">$127.86</span></p>
            <p style="font-size: 1.2em;">Plus the "5-Day Intimacy Challenge" Bonus: <span style="font-weight: 700;">$49.00</span></p>
            <p style="font-size: 1.8em; font-weight: 700; margin-bottom: 30px;">Grand Total Value: $176.86</p>
            
            <div style="background: #fff; color: #333; padding: 20px; border-radius: 10px; max-width: 400px; margin: 0 auto;">
                <p style="margin: 0; font-size: 1.2em;">GET IT ALL TODAY FOR ONLY</p>
                <p style="margin: 10px 0; font-size: 4em; font-weight: 900; color: #ff416c; line-height: 1;">$39.99</p>
                <p style="margin: 0; font-size: 1.2em;">(This is a one-time payment)</p>
            </div>
            
            <a href="YOUR_CHECKOUT_LINK_HERE" class="cta-button" style="margin-top: 40px;">CLAIM MY 69% DISCOUNT NOW</a>

            <!-- Money-Back Guarantee -->
            <div style="margin-top: 40px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap;">
                <img src="https://i.ibb.co/L5hY5m9/guarantee-seal.png" alt="30-Day Money-Back Guarantee" style="height: 100px; margin-right: 20px;">
                <div style="text-align: left; max-width: 400px;">
                    <h3 style="margin: 0; font-size: 1.2em;">Our "Ignite The Spark" Guarantee</h3>
                    <p style="margin: 5px 0 0 0; color: #ddd; line-height: 1.5;">Try the entire bundle for a full 30 days. If you don't feel more connected, have more fun, and experience more passion in your relationship, just send us an email and we'll refund 100% of your money. No questions asked.</p>
                </div>
            </div>
        </div>
        
        <!-- SOCIAL PROOF / TESTIMONIALS -->
        <div style="padding: 60px 0;">
            <h2 style="text-align: center; font-size: 2.2em; margin-bottom: 40px;">Thousands of Couples Have Reignited Their Spark...</h2>
            <!-- Testimonial cards remain the same... -->
        </div>

        <!-- URGENCY SECTION 2 - COUNTDOWN TIMER -->
        <div style="background: #fff3cd; border: 2px solid #f9bf2d; padding: 30px; margin: 40px 0; border-radius: 10px; text-align: center;">
             <h2 style="margin-top:0; font-size: 1.8em; color: #856404;">⚠️ Price Warning! This Offer Is Ending!</h2>
             <p style="font-size: 1.2em;">This bundle price is for our launch promotion only. To protect the value for our customers, the price will return to $127.86 when the timer hits zero.</p>
             <div id="countdown-timer" style="display: flex; justify-content: center; margin-top: 20px;">
                <div style="text-align: center; margin: 0 10px; background: rgba(0,0,0,0.1); padding: 10px; border-radius: 5px; min-width: 60px;">
                    <span id="days" style="font-size: 2em; font-weight: 700; color: #856404;">00</span>
                    <div style="font-size: 0.8em; color: #856404;">Days</div>
                </div>
                <div style="text-align: center; margin: 0 10px; background: rgba(0,0,0,0.1); padding: 10px; border-radius: 5px; min-width: 60px;">
                    <span id="hours" style="font-size: 2em; font-weight: 700; color: #856404;">00</span>
                    <div style="font-size: 0.8em; color: #856404;">Hours</div>
                </div>
                <div style="text-align: center; margin: 0 10px; background: rgba(0,0,0,0.1); padding: 10px; border-radius: 5px; min-width: 60px;">
                    <span id="minutes" style="font-size: 2em; font-weight: 700; color: #856404;">00</span>
                    <div style="font-size: 0.8em; color: #856404;">Minutes</div>
                </div>
                <div style="text-align: center; margin: 0 10px; background: rgba(0,0,0,0.1); padding: 10px; border-radius: 5px; min-width: 60px;">
                    <span id="seconds" style="font-size: 2em; font-weight: 700; color: #856404;">00</span>
                    <div style="font-size: 0.8em; color: #856404;">Seconds</div>
                </div>
             </div>
        </div>

        <!-- FAQ SECTION -->
        <div class="faq" style="padding: 40px 0;">
            <h2 style="text-align: center; font-size: 2.2em; margin-bottom: 30px;">Your Questions, Answered</h2>
            <details>
                <summary>What format are the books in?</summary>
                <div>All 14 books are delivered as high-quality PDFs, compatible with any computer, smartphone, or tablet. You can read them on-screen or print them out.</div>
            </details>
            <details>
                <summary>Is this a subscription or a one-time payment?</summary>
                <div>This is a one-time payment. You pay $39.99 today and get lifetime access to all 14 resources and any future updates to them. There are no hidden fees or recurring charges.</div>
            </details>
            <details>
                <summary>How will I get the files after purchase?</summary>
                <div>Instantly! As soon as your payment is processed, you'll be redirected to a download page. You'll also receive an email with a secure link to download all the files at your convenience.</div>
            </details>
            <details>
                <summary>What if my partner isn't as enthusiastic as I am?</summary>
                <div>That's a common concern! We've designed these resources to be fun and non-intrusive. Start with the "Date Night Idea Cards" or "Couples Games" to gently introduce the idea of trying new things together. The positive experiences often open the door to deeper connection and exploration.</div>
            </details>
        </div>

        <!-- FINAL CTA -->
        <div style="text-align: center; padding: 40px 20px; background: #fff; border-radius: 10px;">
            <h2 style="font-size: 2.5em;">You're At a Crossroads...</h2>
            <p style="font-size: 1.2em; line-height: 1.6;">Continue with the same routine, or make a small, risk-free investment in your relationship that will pay dividends in passion, connection, and intimacy for years to come. The choice is yours.</p>
            <ul style="list-style-type: '✓ '; padding-left: 20px; text-align: left; max-width: 400px; margin: 30px auto; font-size: 1.1em; line-height: 1.8;">
                <li>Get all 14 Bestselling Guides ($127.86 Value)</li>
                <li>Instant Digital Access</li>
                <li>Bonus "Intimacy Challenge" Course ($49 Value)</li>
                <li>30-Day Money-Back Guarantee</li>
                <li>One-Time Payment, Lifetime Access</li>
            </ul>
            <a href="YOUR_CHECKOUT_LINK_HERE" class="cta-button" style="margin-top: 20px;">
                Yes, I'm Ready to Transform My Relationship!
                <span style="display: block; font-size: 0.7em; font-weight: 400; margin-top: 5px;">Click Here To Get Instant Access for $39.99</span>
            </a>
        </div>
        
    </div>

    <!-- FOOTER -->
    <footer style="background-color: #1a1a1a; color: #aaa; text-align: center; padding: 20px; margin-top: 40px;">
        <p>&copy; 2024 Your Brand Name. All Rights Reserved.</p>
        <p><a href="#" style="color: #aaa; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #aaa; text-decoration: none;">Terms of Service</a></p>
    </footer>

    <!-- EXIT-INTENT POPUP HTML -->
    <div id="exit-intent-popup-overlay"></div>
    <div id="exit-intent-popup">
        <span id="close-popup-btn" class="close-btn">&times;</span>
        <h2 style="font-size: 2em; margin-top: 0; color: #ff416c;">WAIT! Don't Leave Empty-Handed!</h2>
        <p style="font-size: 1.2em;">You're about to miss out on the biggest discount we've ever offered.</p>
        <p>Are you sure you want to pass up on reigniting your relationship's spark for less than the cost of a single dinner out?</p>
        <a href="YOUR_CHECKOUT_LINK_HERE" class="cta-button">OK, I'll Take The Bundle!</a>
    </div>

    <script>
        // --- COUNTDOWN TIMER SCRIPT ---
        (function() {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            // Set the end date: 7 days from now
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 7);

            function updateCountdown() {
                const now = new Date();
                const diff = endDate.getTime() - now.getTime();

                if (diff <= 0) {
                    clearInterval(timerInterval);
                    daysEl.innerHTML = '00';
                    hoursEl.innerHTML = '00';
                    minutesEl.innerHTML = '00';
                    secondsEl.innerHTML = '00';
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);

                daysEl.innerHTML = d < 10 ? '0' + d : d;
                hoursEl.innerHTML = h < 10 ? '0' + h : h;
                minutesEl.innerHTML = m < 10 ? '0' + m : m;
                secondsEl.innerHTML = s < 10 ? '0' + s : s;
            }

            const timerInterval = setInterval(updateCountdown, 1000);
            updateCountdown();
        })();

        // --- EXIT-INTENT POPUP SCRIPT ---
        (function() {
            const popup = document.getElementById('exit-intent-popup');
            const overlay = document.getElementById('exit-intent-popup-overlay');
            const closeBtn = document.getElementById('close-popup-btn');
            let popupShown = false;

            function showPopup() {
                if (popupShown) return;
                popup.classList.add('visible');
                overlay.classList.add('visible');
                popupShown = true;
            }

            function hidePopup() {
                popup.classList.remove('visible');
                overlay.classList.remove('visible');
            }
            
            // Show popup when mouse leaves the top of the viewport
            document.addEventListener('mouseout', (e) => {
                // e.clientY < 0 is a reliable way to check for this
                if (e.clientY < 0) {
                    showPopup();
                }
            });

            // Close popup when close button or overlay is clicked
            closeBtn.addEventListener('click', hidePopup);
            overlay.addEventListener('click', hidePopup);

        })();
    </script>

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