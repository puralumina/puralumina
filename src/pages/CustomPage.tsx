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
    <title>Discover Our Collection of Books</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            background-color: #1a202c;
            color: #ffffff;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 15px;
        }
        .hero, .section, .offer, .faq, .final-cta {
            text-align: center;
            padding: 40px 10px;
        }
        .hero h1, .section h2, .offer h2, .faq h2, .final-cta h2 {
            font-size: 44px;
            font-weight: 900;
            margin-bottom: 16px;
            line-height: 1.2;
            color: #ff6f61;
        }
        .hero p, .section p, .offer p, .faq p, .final-cta p {
            font-size: 20px;
            color: #ffffff;
            margin-bottom: 32px;
            line-height: 1.7;
        }
        .hero img, .section img, .offer img, .faq img, .final-cta img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 32px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .hero button, .offer button, .final-cta button {
            background-color: #ff6f61;
            color: white;
            padding: 18px 36px;
            text-decoration: none;
            font-size: 22px;
            font-weight: 700;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 5px 15px rgba(255, 111, 97, 0.4);
        }
        .urgency-bar {
            background-color: #ffc107;
            color: #1a202c;
            text-align: center;
            padding: 12px;
            font-weight: 700;
            font-size: 16px;
        }
        .trust-bar {
            text-align: center;
            padding: 20px 10px;
            border-top: 1px solid #e9ecef;
            border-bottom: 1px solid #e9ecef;
        }
        .trust-bar span {
            font-weight: 700;
            color: #6c757d;
            margin-right: 20px;
        }
        .trust-bar img {
            height: 30px;
            vertical-align: middle;
            margin: 5px 10px;
        }
        .problem, .solution, .features, .testimonials, .offer, .faq, .final-cta {
            padding: 60px 25px;
            margin-top: 40px;
            text-align: center;
        }
        .problem, .solution, .features, .testimonials, .offer, .faq, .final-cta h2 {
            font-size: 36px;
            font-weight: 900;
            margin-bottom: 24px;
            margin-top: 0;
        }
        .problem, .solution, .features, .testimonials, .offer, .faq, .final-cta p {
            font-size: 18px;
            color: #ffffff;
            line-height: 1.7;
        }
        .features ul {
            list-style: none;
            padding: 0;
            font-size: 18px;
            line-height: 1.8;
        }
        .features li {
            margin-bottom: 24px;
        }
        .testimonials {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .testimonials img {
            border-radius: 50%;
            margin-bottom: 10px;
        }
        .testimonials p {
            font-style: italic;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .offer ul {
            list-style: none;
            padding: 0;
            font-size: 18px;
            line-height: 2;
        }
        .offer li {
            margin-bottom: 10px;
        }
        .faq p {
            font-size: 18px;
            color: #ffffff;
            line-height: 1.7;
        }
        .countdown {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        .countdown div {
            background-color: #ffffff;
            color: #1a202c;
            padding: 20px;
            border-radius: 8px;
            margin: 0 10px;
            font-size: 24px;
            font-weight: 700;
        }
        .book-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .book-item {
            background-color: #2c3e50;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s;
        }
        .book-item:hover {
            transform: scale(1.05);
        }
        .book-item img {
            width: 100%;
            height: auto;
            display: block;
        }
        .book-item p {
            padding: 15px;
            margin: 0;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- URGENCY BAR -->
    <div class="urgency-bar">
        ⚠️ Limited Time Offer: Get the "Seducing His Senses" Bonus FREE when you order in the next 24 hours!
    </div>

    <!-- Main Container for content centering -->
    <div class="container">
        <!-- HERO SECTION -->
        <div class="hero">
            <h1>Discover Our Collection of Books</h1>
            <p>Dive into a world of captivating stories and profound insights. Our curated selection of books is designed to inspire and enrich your mind.</p>
            <img src="https://via.placeholder.com/600x400.png?text=Showcase+Your+Books" alt="Book Collection">
            <a href="#offer">Explore Our Books →</a>
            <p>Join 1,500+ avid readers!</p>
        </div>

        <!-- AS SEEN ON / TRUST BAR -->
        <div class="trust-bar">
            <span>AS FEATURED IN</span>
            <img src="https://via.placeholder.com/100x40.png?text=Logo+1" alt="As Seen On Logo 1">
            <img src="https://via.placeholder.com/100x40.png?text=Logo+2" alt="As Seen On Logo 2">
            <img src="https://via.placeholder.com/100x40.png?text=Logo+3" alt="As Seen On Logo 3">
        </div>

        <!-- COUNTDOWN TIMER -->
        <div class="countdown">
            <div id="days">00</div>
            <div id="hours">00</div>
            <div id="minutes">00</div>
            <div id="seconds">00</div>
        </div>

        <!-- PROBLEM SECTION -->
        <div class="problem">
            <h2>Are You Tired of Ordinary Reading?</h2>
            <p>Do you yearn for stories that truly captivate your imagination and leave you craving more? Our collection is crafted to satisfy even the most discerning readers, offering a blend of genres and styles to suit every taste.</p>
        </div>

        <!-- SOLUTION SECTION -->
        <div class="solution">
            <h2>The Solution You've Been Waiting For</h2>
            <p>Introducing our curated collection of books, each selected for its unique ability to transport you to new worlds and challenge your perspectives. Whether you're into mystery, romance, or self-improvement, we have something that will resonate with you.</p>
            <p>This collection is for you if...</p>
            <ul>
                <li>✓ You're a passionate reader seeking new adventures</li>
                <li>✓ You want to expand your literary horizons</li>
                <li>✓ You're ready to dive into stories that matter</li>
            </ul>
        </div>

        <!-- FEATURES & BENEFITS SECTION (2-Column on Desktop, 1 on Mobile) -->
        <div class="features">
            <h2>What You'll Discover Inside</h2>
            <ul>
                <li>✔️ <strong>Diverse Genres:</strong> From thrilling mysteries to heartwarming romances, our collection spans a wide range of genres to cater to every reader's taste.</li>
                <li>✔️ <strong>Quality Content:</strong> Each book is carefully vetted to ensure high-quality writing and engaging narratives that keep you hooked from start to finish.</li>
                <li>✔️ <strong>Expert Recommendations:</strong> Our team of literary experts handpicks each book, ensuring that you only get the best of the best.</li>
            </ul>
        </div>

        <!-- BOOK GRID -->
        <div class="book-grid">
            <div class="book-item">
                <img src="https://via.placeholder.com/200x300.png?text=Book+1" alt="Book 1">
                <p>Title: "The Enigmatic Enchantress"</p>
                <p>Genre: Fantasy</p>
                <p>Description: Embark on a magical journey with a young sorceress as she uncovers ancient secrets and battles dark forces.</p>
            </div>
            <div class="book-item">
                <img src="https://via.placeholder.com/200x300.png?text=Book+2" alt="Book 2">
                <p>Title: "Whispers of the Past"</p>
                <p>Genre: Historical Fiction</p>
                <p>Description: Travel back in time to the roaring 1920s, where secrets and scandals lurk in every shadow.</p>
            </div>
            <div class="book-item">
                <img src="https://via.placeholder.com/200x300.png?text=Book+3" alt="Book 3">
                <p>Title: "Echoes of Love"</p>
                <p>Genre: Romance</p>
                <p>Description: A heartwarming tale of two souls destined to find each other, overcoming obstacles to be together.</p>
            </div>
            <!-- Add more books as needed -->
        </div>

        <!-- SOCIAL PROOF SECTION -->
        <div class="testimonials">
            <h2>Don't Just Take Our Word For It...</h2>
            <!-- Testimonial 1 -->
            <div>
                <p>"I've been an avid reader for years, but this collection has truly expanded my horizons. Each book is a gem!"</p>
                <div>
                    <img src="https://via.placeholder.com/60x60.png?text=Photo" alt="Customer A">
                    <div>
                        <p>Emma Thompson</p>
                        <p>Book Enthusiast</p>
                    </div>
                </div>
            </div>
            <!-- Testimonial 2 -->
            <div>
                <p>"The diversity of genres and the quality of the writing are unparalleled. I can't get enough!"</p>
                <div>
                    <img src="https://via.placeholder.com/60x60.png?text=Photo" alt="Customer B">
                    <div>
                        <p>Michael Brown</p>
                        <p>Literary Critic</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- THE OFFER & CTA SECTION -->
        <div id="offer" class="offer">
            <h2>Get Instant Access to Our Book Collection Today</h2>
            <div>
                <h3>Here's What You'll Receive:</h3>
                <ul>
                    <li>✔️ Access to our entire collection of curated books (Value: $199)</li>
                    <li>✔️ Exclusive member-only discounts on new releases (Value: $49)</li>
                    <li>✔️ Personalized book recommendations from our experts (Value: $29)</li>
                </ul>
                <p>### Total Value: $277</p>
                <p>### Your Price Today: Only $49</p>
                <p><strong>My 100% Risk-Free Guarantee</strong></p>
                <p>If you're not completely satisfied with your reading experience, simply let me know within 30 days, and I'll refund your purchase. No questions asked.</p>
                <a href="#offer">Get Instant Access Now</a>
            </div>
        </div>

        <!-- FAQ SECTION -->
        <div class="faq">
            <h2>Frequently Asked Questions</h2>
            <p><strong>Q: How do I access the books?</strong></p>
            <p>A: Once you sign up, you'll receive instant access to our digital library, where you can read or download your favorite books.</p>
            <p><strong>Q: Can I cancel my membership anytime?</strong></p>
            <p>A: Yes, you can cancel your membership at any time with no questions asked. Your access will remain active until the end of your current billing cycle.</p>
        </div>

        <!-- FINAL CTA SECTION -->
        <div class="final-cta">
            <h2>Ready to Embark on a Literary Journey?</h2>
            <p>Don't wait another day to dive into a world of captivating stories. Click the button below to get started.</p>
            <a href="#offer">Get Instant Access for $49</a>
        </div>
    </div>

    <script>
        async function startTimer() {
            const response = await fetch('/start-timer');
            if (response.ok) {
                console.log('Timer started');
            } else {
                console.error('Failed to start timer');
            }
        }

        async function getRemainingTime() {
            const response = await fetch('/get-timer');
            if (response.ok) {
                const data = await response.json();
                return data.remainingTime;
            } else {
                console.error('Failed to get timer data');
                return null;
            }
        }

        function updateTimerDisplay(remainingTime) {
$const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));$
$const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));$
$const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));$
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        }

        async function initTimer() {
            await startTimer();
            const remainingTime = await getRemainingTime();
            if (remainingTime !== null) {
                updateTimerDisplay(remainingTime);
                const interval = setInterval(() => {
                    remainingTime -= 1000;
                    if (remainingTime <= 0) {
                        clearInterval(interval);
                        document.getElementById('days').innerText = '00';
                        document.getElementById('hours').innerText = '00';
                        document.getElementById('minutes').innerText = '00';
                        document.getElementById('seconds').innerText = '00';
                    } else {
                        updateTimerDisplay(remainingTime);
                    }
                }, 1000);
            }
        }

        initTimer();
    </script>

    <script>
        const express = require('express');
        const app = express();
        const bodyParser = require('body-parser');
        const cookieParser = require('cookie-parser');
        const fs = require('fs');

        app.use(bodyParser.json());
        app.use(cookieParser());

        let timerData = {};

        app.get('/start-timer', (req, res) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const startTime = Date.now();
$timerData[ip] = { startTime, duration: 24 * 60 * 60 * 1000 }; // 24 hours in milliseconds$
            res.cookie('timerStart', startTime, { httpOnly: true });
            res.send('Timer started!');
        });

        app.get('/get-timer', (req, res) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const timerInfo = timerData[ip];
            if (timerInfo) {
                const remainingTime = timerInfo.duration - (Date.now() - timerInfo.startTime);
                res.json({ remainingTime });
            } else {
                res.status(404).send('No timer data found');
            }
        });

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    </script>
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