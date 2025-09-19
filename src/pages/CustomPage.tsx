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
    <title>The Ultimate Growth Hacker's Digital Library</title>
    <link rel="icon" type="image/png" href="https://d1yei2z3i6k35z.cloudfront.net/4704293/68cac865f3b8b_SoulmatesDesiresPPBrown.png">
    <!-- Importing Montserrat Font (Regular, Bold, Extra-Bold) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">

    <!-- STYLES FOR RESPONSIVE CARD GRID -->
    <style>
        .card-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px; /* This creates the space between cards */
        }

        .book-card {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-sizing: border-box; /* Ensures padding doesn't affect width calculation */
        }

        /* --- MOBILE STYLES (Default: 2 columns) --- */
        /* Each card takes up half the space, minus half the gap */
        .book-card {
            flex-basis: calc(50% - 10px); 
        }

        /* --- DESKTOP STYLES (4 columns) --- */
        /* This media query applies styles ONLY when the screen is 992px or wider */
        @media (min-width: 992px) {
            .book-card {
                /* Each card takes up a quarter of the space, minus gap adjustments */
                flex-basis: calc(25% - 15px);
            }
        }
    </style>

</head>
<body style="margin: 0; font-family: 'Montserrat', sans-serif; background-color: #f8f9fa; color: #212529; line-height: 1.6;">

    <!-- HEADER -->
    <div style="background-color: #ffffff; border-bottom: 1px solid #dee2e6;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 700; font-size: 20px;">
                SOULMATES DESIRES
            </div>
            <div style="display: none; md-display: flex; gap: 20px;"> <!-- Hide on mobile for simplicity -->
                <a href="#" style="text-decoration: none; color: #495057;">Home</a>
                <a href="#" style="text-decoration: none; color: #495057;">About</a>
                <a href="#" style="text-decoration: none; color: #495057;">Contact</a>
            </div>
            <a href="#cta" style="background-color: #0d6efd; color: white; padding: 10px 20px; text-decoration: none; font-weight: 700; border-radius: 6px;">Buy Now</a>
        </div>
    </div>

    <!-- Main Container -->
    <div style="max-width: 1100px; margin: 0 auto; padding: 20px;">

        <!-- HERO SECTION -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px; padding: 40px 0;">
            <!-- Left Column: Image -->
            <div style="flex: 2; min-width: 300px; text-align: center;">
                <div style="border-radius: 12px; padding: 20px; display: inline-block;">
                     <img src="https://images.unsplash.com/photo-1593696954577-ab3d39317b97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D" alt="Digital Book Bundle" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);">
                </div>
            </div>
            <!-- Right Column: Details -->
            <div style="flex: 2; min-width: 300px;">
                <h1 style="font-size: 48px; font-weight: 900; margin-bottom: 16px; line-height: 1.2;">The Ultimate Growth Hacker's Digital Library</h1>
                <p style="font-size: 18px; color: #495057; margin-bottom: 24px;">Supercharge your personal and professional development with this curated bundle of 14 essential digital books. Master new skills, cultivate a growth mindset, and unlock your full potential.</p>
                <div style="display: flex; align-items: center; gap: 15px; font-size: 14px; color: #6c757d; margin-bottom: 24px;">
                    <span>⭐⭐⭐⭐⭐ Rated 4.8/5 stars</span>
                    <span>|</span>
                    <a href="#" style="color: #0d6efd; text-decoration: none; font-weight: 700;">Join 1,500+ happy students!</a>
                </div>

                <div style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; padding: 25px;">
                    <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px;">
                        <span style="font-size: 48px; font-weight: 900; color: #0d6efd;">$39.99</span>
                        <span style="font-size: 24px; color: #6c757d; text-decoration: line-through;">$499</span>
                    </div>
                    <p style="margin: 0 0 20px 0; color: #495057;">Get the entire 14-book bundle and <strong>save over 80%!</strong></p>
                    <a href="#cta" style="background-color: #0d6efd; color: white; padding: 15px; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 8px; display: block; text-align: center;">Get The Bundle Now</a>
                </div>
                <div style="background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; padding: 15px; margin-top: 20px; text-align: center; font-size: 14px; color: #856404;">
                    ⚡ Hurry! The price will increase by <strong>$100</strong> every 3 days.
                </div>
            </div>
        </div>

        <!-- AS FEATURED ON -->
        <div style="text-align: center; padding: 40px 0; border-top: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6; margin-top: 20px;">
            <p style="margin: 0 0 20px 0; color: #6c757d; font-weight: 700; letter-spacing: 1px;">AS FEATURED ON</p>
            <div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap;">
                <span style="font-size: 24px; color: #adb5bd;">◎ LOGO</span>
                <span style="font-size: 24px; color: #adb5bd;">❖ BRAND</span>
                <span style="font-size: 24px; color: #adb5bd;">◎ COMPANY</span>
                <span style="font-size: 24px; color: #adb5bd;">❖ TRUST</span>
                <span style="font-size: 24px; color: #adb5bd;">◎ MARK</span>
            </div>
        </div>

        <!-- COUNTDOWN TIMER -->
        <div style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; padding: 30px; margin: 60px auto; max-width: 700px;">
            <h3 style="text-align: center; font-size: 20px; margin: 0 0 20px 0;">Limited Time Offer Ends In:</h3>
            <div id="countdown-container" style="display: flex; justify-content: center; gap: 20px; text-align: center;">
                <div>
                    <div id="days" style="background-color: #e9ecef; padding: 15px 25px; border-radius: 8px; font-size: 42px; font-weight: 900;">00</div>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">Days</div>
                </div>
                <div>
                    <div id="hours" style="background-color: #e9ecef; padding: 15px 25px; border-radius: 8px; font-size: 42px; font-weight: 900;">00</div>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">Hours</div>
                </div>
                <div>
                    <div id="minutes" style="background-color: #e9ecef; padding: 15px 25px; border-radius: 8px; font-size: 42px; font-weight: 900;">00</div>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">Mins</div>
                </div>
                <div>
                    <div id="seconds" style="background-color: #e9ecef; padding: 15px 25px; border-radius: 8px; font-size: 42px; font-weight: 900;">00</div>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">Secs</div>
                </div>
            </div>
            <div id="expired-message" style="display: none; text-align: center; font-size: 24px; font-weight: 700; color: #dc3545;">
                Sorry, this offer has expired!
            </div>
            <p style="font-size: 12px; color: #6c757d; margin: 20px 0 5px 0;">382 of 500 bundles sold!</p>
            <div style="background-color: #e9ecef; border-radius: 10px; height: 10px; overflow: hidden;">
                <div style="width: 76%; height: 10px; background-color: #0d6efd; border-radius: 10px;"></div>
            </div>
             <p style="font-size: 12px; color: #6c757d; margin: 5px 0 0 0; text-align: right;">Hurry up! Almost gone!</p>
        </div>
        
        <!-- PROBLEM/SOLUTION SECTION -->
        <div style="display: flex; flex-wrap: wrap; gap: 40px; padding: 40px 0;">
            <div style="flex: 1; min-width: 300px;">
                <h2 style="font-size: 32px; font-weight: 900; margin: 0 0 20px 0;">Are You Feeling Stuck in a Rut?</h2>
                <p style="color: #495057;">Does the weight of unfulfilled potential press down on you? You yearn for more—<strong>more growth, more success, more purpose</strong>.</p>
                <p style="color: #495057;">But the days blur into a monotonous cycle, leaving you drained and disconnected from your dreams. Each morning, you wake up with a fleeting spark of ambition, only to have it extinguished by the overwhelming demands of the day.</p>
                <p style="color: #495057;">The frustration gnaws at you, a constant reminder that you're capable of so much more, yet you're trapped in a state of stagnation.</p>
            </div>
            <div style="flex: 1; min-width: 300px;">
                <h2 style="font-size: 32px; font-weight: 900; margin: 0 0 20px 0;">Imagine a New You, Unburdened and Empowered</h2>
                <p style="color: #495057;">Now, picture a life where you wake up energized, driven by a clear sense of purpose. This bundle is your key to unlocking that reality. It's not just about reading books; it's about a profound <strong style="color: #0d6efd;">transformation.</strong></p>
                <ul style="list-style: none; padding: 0; margin-top: 20px;">
                    <li style="display: flex; align-items: start; gap: 10px; margin-bottom: 15px;">
                        <span style="color: #0d6efd; font-weight: 700; font-size: 20px;">✓</span>
                        <span>Feel the thrill of <strong>mastering new skills.</strong></span>
                    </li>
                    <li style="display: flex; align-items: start; gap: 10px; margin-bottom: 15px;">
                        <span style="color: #0d6efd; font-weight: 700; font-size: 20px;">✓</span>
                        <span>Gain the confidence of a <strong>growth mindset.</strong></span>
                    </li>
                    <li style="display: flex; align-items: start; gap: 10px; margin-bottom: 15px;">
                        <span style="color: #0d6efd; font-weight: 700; font-size: 20px;">✓</span>
                        <span>Embrace the freedom of <strong>financial wisdom.</strong></span>
                    </li>
                </ul>
                <p style="color: #495057;">This is more than a purchase; it's an investment in the person you were always meant to be. <a href="#cta" style="color: #0d6efd; font-weight: 700;">Step into this new chapter</a> and watch your life blossom in ways you never thought possible.</p>
            </div>
        </div>

        <!-- BOOKS GRID - EPHEMERA -->
        <div style="padding: 40px 0;">
            <h2 style="font-size: 28px; font-weight: 900; margin-bottom: 30px;">Ephemera</h2>
            <div class="card-container">
                <!-- Book Card -->
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="The Growth Mindset" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Mastering Her Pleasure: The Ultimate Guide for Men</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Embrace challenges and see failure as a stepping stone.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$11.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Atomic Habits" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Dirty Talks to make her 100x wet during Sex</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Build good habits and break bad ones with small, easy steps.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$11.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Mindful Moments" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Seducing His Senses: A Woman's Guide to Pleasuring Her Man</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Practice mindfulness to reduce stress and improve focus.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$11.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Mindful Moments" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Make Him Craving You: The Ultimate Guide to Teasing and Pleasing</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Practice mindfulness to reduce stress and improve focus.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$11.99</span>
                </div>
            </div>
        </div>
        
        <!-- BOOKS GRID - COUPLES GAMES -->
        <div style="padding: 40px 0;">
            <h2 style="font-size: 28px; font-weight: 900; margin-bottom: 30px;">Couples Games</h2>
            <div class="card-container">
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="The Growth Mindset" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Couples Games - The Spicy Edition</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Embrace challenges and see failure as a stepping stone.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Atomic Habits" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Couples Games - The Connection Edition</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Build good habits and break bad ones with small, easy steps.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Mindful Moments" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Couples Games - The Laughs & Giggles Edition</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Practice mindfulness to reduce stress and improve focus.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Mindful Moments" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Couples Games - The 5-Minute Connector Edition</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Practice mindfulness to reduce stress and improve focus.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
            </div>
        </div>
        
        <!-- BOOKS GRID - CARDS -->
        <div style="padding: 40px 0;">
            <h2 style="font-size: 28px; font-weight: 900; margin-bottom: 30px;">Cards</h2>
            <div class="card-container">
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="The Growth Mindset" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">"Truth or Dare" for Couples Cards</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Embrace challenges and see failure as a stepping stone.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Atomic Habits" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Date Night Idea Cards</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Build good habits and break bad ones with small, easy steps.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Mindful Moments" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">Couples' Affirmation Cards</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Practice mindfulness to reduce stress and improve focus.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
            </div>
        </div>
        
        <!-- BOOKS GRID - PLANNERS -->
        <div style="padding: 40px 0;">
            <h2 style="font-size: 28px; font-weight: 900; margin-bottom: 30px;">Planners & Worksheets</h2>
            <div class="card-container">
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="The Growth Mindset" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">The Growth Mindset</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Embrace challenges and see failure as a stepping stone.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Atomic Habits" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">The Ultimate Date Night Planner</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Build good habits and break bad ones with small, easy steps.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
                <div class="book-card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="Mindful Moments" style="max-width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; object-fit: cover;">
                    <h3 style="margin: 0 0 5px 0; font-size: 18px;">"State of the Union" Meeting Guide</h3>
                    <p style="font-size: 14px; color: #6c757d; margin: 0 0 15px 0;">Practice mindfulness to reduce stress and improve focus.</p>
                    <span style="background-color: #e7f1ff; color: #0d6efd; padding: 5px 15px; border-radius: 20px; font-weight: 700;">$7.99</span>
                </div>
            </div>
        </div>

        <!-- FINAL CTA -->
        <div id="cta" style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; padding: 40px 25px; margin: 60px auto; max-width: 800px; text-align: center;">
            <h2 style="font-size: 36px; font-weight: 900; margin: 0 0 15px 0;">Get the Entire 14-Book Bundle Today!</h2>
            <p style="font-size: 18px; color: #495057; margin-bottom: 30px;">Unlock a world of knowledge and save big. Get instant access to all 14 digital books for a one-time payment.</p>
            <div style="display: flex; justify-content: center; align-items: baseline; gap: 15px; margin-bottom: 30px;">
                <span style="font-size: 64px; font-weight: 900; color: #0d6efd;">$39.99</span>
                <span style="font-size: 32px; color: #6c757d; text-decoration: line-through;">$499</span>
            </div>
            <a href="/product/15" style="background-color: #0d6efd; color: white; padding: 18px 40px; text-decoration: none; font-size: 20px; font-weight: 700; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(13, 110, 253, 0.3);">Yes, I Want The Bundle!</a>
            <p style="margin: 20px 0 0 0;"><a href="#" style="color: #0d6efd; text-decoration: none; font-weight: 700; font-size: 14px;">The 'Confident Creator' 30-Day Guarantee</a></p>
            <p style="font-size: 12px; color: #6c757d; margin-top: 5px;">If you're not 100% satisfied, we'll refund your payment, no questions asked.</p>
        </div>

    </div>

    <!-- FOOTER -->
    <div style="border-top: 1px solid #dee2e6; padding: 40px 20px; text-align: center;">
        <div style="max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <a href="/privacy-policy" style="text-decoration: none; color: #495057;">Privacy Policy</a>
            <a href="/terms" style="text-decoration: none; color: #495057;">Terms of Service</a>
            <a href="/contact-us" style="text-decoration: none; color: #495057;">Contact Us</a>
        </div>
        <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">© 2025 Soulmates Desires. All rights reserved.</p>
    </div>

    <!-- JAVASCRIPT FOR COUNTDOWN TIMER -->
    <script>
        // --- ⬇️ EDIT THIS LINE TO SET YOUR OFFER END DATE ⬇️ ---
        const countDownDate = new Date("Sep 20, 2025 15:30:00").getTime();

        // Update the count down every 1 second
        const x = setInterval(function() {

            const now = new Date().getTime();
            const distance = countDownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            function formatTime(time) {
                return time < 10 ? "0" + time : time;
            }

            document.getElementById("days").innerHTML = formatTime(days);
            document.getElementById("hours").innerHTML = formatTime(hours);
            document.getElementById("minutes").innerHTML = formatTime(minutes);
            document.getElementById("seconds").innerHTML = formatTime(seconds);
            
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown-container").style.display = "none";
                document.getElementById("expired-message").style.display = "block";
            }
        }, 1000);
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
            <li>By visiting this page on our website: <strong><a href="/contact-us" style="color: #0d6efd; font-weight: 700;">Contact us</a></strong></li>
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

        <a href="soulmatesdesires@gmail.com" class="contact-button" style="background-color: #0d6efd; color: white; padding: 18px 40px; text-decoration: none; font-size: 20px; font-weight: 700; border-radius: 10px; display: inline-block; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: all 0.2s ease-in-out;">
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
            <a href="privacy" style="text-decoration: none; color: #495057; margin: 0 10px;">Privacy Policy</a> |
            <a href="terms" style="text-decoration: none; color: #495057; margin: 0 10px;">Terms of Service</a>
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