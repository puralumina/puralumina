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
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>The Ultimate Relationship & Seduction Bundle</title>
    <link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap" rel="stylesheet"/>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#d90429", // A slightly more modern, vibrant red
                        "secondary": "#2d3142", // A deep, contrasting secondary color
                        "background-light": "#fdfdfd",
                        "background-dark": "#1a1a1a",
                        "text-light": "#fdfdfd",
                        "text-dark": "#2d3142",
                    },
                    fontFamily: {
                        "display": ["Newsreader", "serif"]
                    },
                    borderRadius: { "DEFAULT": "0.375rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
                    animation: {
                        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }
                },
            },
        }
    </script>
    <style>
        body {
            min-height: 100dvh;
        }
    </style>
</head>

<body class="bg-background-light dark:bg-background-dark font-display text-text-dark dark:text-text-light antialiased">
<div class="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden">
    
    <!-- HEADER -->
    <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-black/5 dark:border-white/5">
        <div class="container mx-auto flex items-center p-4 justify-between">
            <h2 class="text-lg font-bold">The Seduction Library</h2>
            <a href="#purchase" class="hidden sm:inline-flex items-center justify-center rounded-md h-10 px-6 bg-primary/10 text-primary font-bold hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                Get The Bundle
            </a>
        </div>
    </header>

    <main>
        <!-- HERO SECTION -->
        <section class="relative text-center py-16 sm:py-24 px-6 overflow-hidden">
            <div class="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Couple reading together" class="w-full h-full object-cover opacity-10 dark:opacity-5">
                <div class="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/80 to-transparent dark:from-background-dark dark:via-background-dark/80"></div>
            </div>
            <div class="relative z-10 max-w-3xl mx-auto">
                <p class="font-bold text-primary uppercase tracking-widest">The Ultimate Relationship & Seduction Bundle</p>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mt-3">Ignite Passion, Master Seduction & Deepen Your Connection.</h1>
                <p class="mt-6 text-lg sm:text-xl text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto">Your complete library of 14 best-selling guides to irresistible confidence, unforgettable nights, and a love life you've only dreamed of.</p>
                <div class="mt-10">
                    <a href="#purchase" class="w-full sm:w-auto inline-flex items-center justify-center bg-primary text-white text-xl font-bold h-16 px-12 rounded-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform animate-pulse-slow">
                        Get Instant Access - Only $39.99
                    </a>
                    <p class="mt-4 text-sm text-text-dark/60 dark:text-text-light/60">
                        <span class="line-through">Regular Price: $199.99</span> &bull; 30-Day Money-Back Guarantee
                    </p>
                </div>
            </div>
        </section>

        <!-- SCARCITY / SOCIAL PROOF BAR -->
        <div class="px-6 py-6 sm:py-8 bg-secondary/5 dark:bg-secondary/20">
            <div class="max-w-2xl mx-auto">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-sm sm:text-base font-bold text-primary">LIMITED BUNDLES AVAILABLE AT THIS PRICE</p>
                    <p class="text-sm sm:text-base font-medium">812 / 1000 Sold</p>
                </div>
                <div class="w-full bg-black/10 dark:bg-white/10 rounded-full h-3.5">
                    <div class="bg-primary h-3.5 rounded-full transition-all duration-500" style="width: 81.2%"></div>
                </div>
            </div>
        </div>

        <!-- WHAT'S INCLUDED SECTION -->
        <section class="py-16 sm:py-24">
            <div class="text-center px-6">
                <h2 class="text-3xl sm:text-4xl font-bold">Here's Everything You'll Master</h2>
                <p class="mt-3 max-w-2xl mx-auto text-text-dark/70 dark:text-text-light/70">A glimpse into your new library of seduction secrets and connection tools.</p>
            </div>
            <div class="relative mt-12">
                <div class="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background-light to-transparent dark:from-background-dark z-10 pointer-events-none"></div>
                <div class="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background-light to-transparent dark:from-background-dark z-10 pointer-events-none"></div>
                <div class="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6">
                    <div class="flex items-stretch gap-6 mx-auto">
                        <!-- Book covers with thematic placeholders -->
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><img src="https://placehold.co/300x400/d90429/fdfdfd/png?text=Mastering\nHer\nPleasure" class="w-full aspect-[3/4] rounded-lg shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"/><p class="text-sm font-medium">Mastering Her Pleasure</p></div>
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><img src="https://placehold.co/300x400/2d3142/fdfdfd/png?text=Dirty\nTalks" class="w-full aspect-[3/4] rounded-lg shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"/><p class="text-sm font-medium">Dirty Talks Masterclass</p></div>
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><img src="https://placehold.co/300x400/d90429/fdfdfd/png?text=Seducing\nHis\nSenses" class="w-full aspect-[3/4] rounded-lg shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"/><p class="text-sm font-medium">Seducing His Senses</p></div>
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><img src="https://placehold.co/300x400/2d3142/fdfdfd/png?text=Make\nHim\nCrave You" class="w-full aspect-[3/4] rounded-lg shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"/><p class="text-sm font-medium">Make Him Crave You</p></div>
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><img src="https://placehold.co/300x400/d90429/fdfdfd/png?text=The\nSpicy\nEdition" class="w-full aspect-[3/4] rounded-lg shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"/><p class="text-sm font-medium">The Spicy Edition</p></div>
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><img src="https://placehold.co/300x400/2d3142/fdfdfd/png?text=The\nConnection\nEdition" class="w-full aspect-[3/4] rounded-lg shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"/><p class="text-sm font-medium">The Connection Edition</p></div>
                        <div class="flex flex-col gap-3 w-44 flex-shrink-0 text-center"><div class="w-full aspect-[3/4] bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-center p-4 text-primary"><p class="font-bold text-2xl">+7 <br/> more titles</p></div><p class="text-sm font-medium">And so much more...</p></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- BENEFITS SECTION -->
        <section class="px-6 py-16 sm:py-24 bg-primary/5 dark:bg-secondary/10">
            <div class="max-w-4xl mx-auto">
                <div class="text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold">This Bundle Is Your Unfair Advantage</h2>
                    <p class="mt-3 max-w-2xl mx-auto text-text-dark/70 dark:text-text-light/70">Stop guessing. Start connecting on a level you never thought possible.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M239.81,189.44A20,20,0,0,1,220,208H160a8,8,0,0,1,0-16h48.34l-48.2-48.2a8,8,0,0,1,11.32-11.32l48.2,48.2V136a8,8,0,0,1,16,0v52A19.85,19.85,0,0,1,239.81,189.44ZM96,32H47.66l48.2,48.2a8,8,0,0,1-11.32,11.32L36.34,43.34V88a8,8,0,0,1-16,0V36a20,20,0,0,1,20-20H88a8,8,0,0,1,0,16Zm123.66,23.34a8,8,0,0,0-11.32,0L160,103.54,111.82,55.34a8,8,0,0,0-11.32,11.32L148.69,115,35.34,228.34a8,8,0,0,0,11.32,11.32L152,135.25l48.18,48.2a8,8,0,0,0,11.32-11.32L163.31,126.3,219.66,70A8,8,0,0,0,219.66,55.34Z"></path></svg></div>
                        <h3 class="text-xl font-bold mt-4">Become Irresistible</h3>
                        <p class="mt-2 text-text-dark/70 dark:text-text-light/70">Master the art of attraction with proven techniques that build undeniable chemistry.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M239.9,136.21a8,8,0,0,1-8.21,7.79H152a8,8,0,0,1-8-8V56.39A88,88,0,1,0,56.39,144H136a8,8,0,0,1,8,8v79.61a8,8,0,0,1-13.66,5.66L96,192.49V160a8,8,0,0,1-8-8H16.21a8,8,0,0,1-7.79-8.21,128.2,128.2,0,0,1,23.6-71.62A128,128,0,0,1,239.9,136.21ZM128,24A112,112,0,1,0,240,136c0,1.48-.09,3-.15,4.42l-29-29A8,8,0,0,0,205.17,106,72,72,0,1,1,106,205.17a8,8,0,0,0,5.66-2.34l34,34A112.5,112.5,0,0,0,240,136,112.13,112.13,0,0,0,128,24Z"></path></svg></div>
                        <h3 class="text-xl font-bold mt-4">Unlock Deeper Intimacy</h3>
                        <p class="mt-2 text-text-dark/70 dark:text-text-light/70">Learn the secrets to emotional and physical connection that create an unbreakable bond.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M244.27,132.83,141.64,30.19a20,20,0,0,0-27.28,0L11.73,132.83a20,20,0,0,0,0,27.28l102.64,102.64a20,20,0,0,0,27.28,0l102.62-102.64a20,20,0,0,0,0-27.28ZM128,224.51,36.24,132.76,128,41.05l91.76,91.71Z"></path></svg></div>
                        <h3 class="text-xl font-bold mt-4">Build Bulletproof Confidence</h3>
                        <p class="mt-2 text-text-dark/70 dark:text-text-light/70">Gain the self-assurance to go after what you want, both in and out of the bedroom.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- TESTIMONIALS SECTION -->
        <section class="px-6 py-16 sm:py-24">
            <div class="max-w-3xl mx-auto">
                <div class="text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold">Real Results from People Like You</h2>
                    <p class="mt-3 text-text-dark/70 dark:text-text-light/70">This isn't just theory. This bundle changes lives.</p>
                </div>
                <div class="space-y-8 mt-12">
                    <div class="p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-lg border-l-4 border-primary">
                        <div class="flex items-center gap-4 mb-3">
                            <img alt="Sophia Carter" class="w-14 h-14 rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"/>
                            <div>
                                <p class="font-bold text-lg">Sophia C.</p>
                                <p class="text-sm font-medium text-primary flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="text-yellow-500"><path d="M239.2,97.41a16,16,0,0,0-13.81-11L161.49,79,135.2,18.33a16,16,0,0,0-28.4,0L80.51,79,16.61,86.37a16,16,0,0,0-9.11,28.06l45.1,39.36L39.08,212.4a16,16,0,0,0,23.84,17.34l51.11-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.52-58.6,45.1-39.36A16,16,0,0,0,239.2,97.41Z"></path></svg>
                                    <span class="font-bold">Verified Purchase</span>
                                </p>
                            </div>
                        </div>
                        <p class="italic text-text-dark/90 dark:text-text-light/90">"A total game-changer for our marriage. We've been together 10 years and it feels like the honeymoon phase all over again. The 'Connection Edition' alone was worth the price."</p>
                    </div>
                    <div class="p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-lg border-l-4 border-primary">
                        <div class="flex items-center gap-4 mb-3">
                            <img alt="Ethan Bennett" class="w-14 h-14 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop"/>
                            <div>
                                <p class="font-bold text-lg">Ethan B.</p>
                                 <p class="text-sm font-medium text-primary flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="text-yellow-500"><path d="M239.2,97.41a16,16,0,0,0-13.81-11L161.49,79,135.2,18.33a16,16,0,0,0-28.4,0L80.51,79,16.61,86.37a16,16,0,0,0-9.11,28.06l45.1,39.36L39.08,212.4a16,16,0,0,0,23.84,17.34l51.11-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.52-58.6,45.1-39.36A16,16,0,0,0,239.2,97.41Z"></path></svg>
                                    <span class="font-bold">Verified Purchase</span>
                                </p>
                            </div>
                        </div>
                        <p class="italic text-text-dark/90 dark:text-text-light/90">"I was skeptical, but the advice in 'Mastering Her Pleasure' is practical and works. My confidence has skyrocketed. Best $40 I've ever spent on self-improvement."</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- URGENCY SECTION / FINAL CTA -->
        <section id="purchase" class="px-6 py-16 sm:py-24 bg-secondary text-text-light">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl sm:text-4xl font-bold">Your New Love Life Is One Click Away</h2>
                <p class="mt-3 text-lg text-text-light/70 max-w-2xl mx-auto">This offer is ending soon. Don't let hesitation cost you the connection you deserve.</p>
                
                <!-- Countdown Timer -->
                <div class="flex items-center justify-center gap-4 sm:gap-8 my-8">
                    <div>
                        <div id="days" class="text-4xl sm:text-6xl font-extrabold">02</div>
                        <div class="text-sm uppercase tracking-widest text-text-light/60">Days</div>
                    </div>
                    <div class="text-4xl sm:text-6xl font-extrabold">:</div>
                    <div>
                        <div id="hours" class="text-4xl sm:text-6xl font-extrabold">18</div>
                        <div class="text-sm uppercase tracking-widest text-text-light/60">Hours</div>
                    </div>
                    <div class="text-4xl sm:text-6xl font-extrabold">:</div>
                    <div>
                        <div id="minutes" class="text-4xl sm:text-6xl font-extrabold">46</div>
                        <div class="text-sm uppercase tracking-widest text-text-light/60">Minutes</div>
                    </div>
                    <div class="text-4xl sm:text-6xl font-extrabold">:</div>
                    <div>
                        <div id="seconds" class="text-4xl sm:text-6xl font-extrabold">33</div>
                        <div class="text-sm uppercase tracking-widest text-text-light/60">Seconds</div>
                    </div>
                </div>

                <div class="mt-10">
                    <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center bg-primary text-white text-xl font-bold h-16 px-12 rounded-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-transform animate-pulse-slow">
                        Claim My Bundle Now for $39.99
                    </a>
                    <p class="mt-4 text-sm text-text-light/60">
                        Instant Digital Access &bull; 100% Secure Checkout &bull; 30-Day Money-Back Guarantee
                    </p>
                </div>
            </div>
        </section>
    </main>

    <!-- FOOTER -->
    <footer class="bg-background-light dark:bg-background-dark border-t border-black/5 dark:border-white/5">
        <div class="container mx-auto px-6 py-8 text-center text-text-dark/70 dark:text-text-light/70">
            <p class="font-bold text-lg mb-2">The Seduction Library</p>
            <p class="text-sm">For educational purposes only. Results may vary.</p>
            <p class="text-sm mt-4">© 2024 Book Bundle Co. All rights reserved.</p>
        </div>
    </footer>
</div>

<script>
    // Countdown Timer Logic
    function startCountdown() {
        // Set the date we're counting down to (e.g., 3 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 3);

        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in elements with corresponding IDs
            document.getElementById("days").innerHTML = String(days).padStart(2, '0');
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

            // If the countdown is over, write some text
            if (distance < 0) {
                clearInterval(countdownFunction);
                document.getElementById("days").innerHTML = "00";
                document.getElementById("hours").innerHTML = "00";
                document.getElementById("minutes").innerHTML = "00";
                document.getElementById("seconds").innerHTML = "00";
            }
        }, 1000);
    }
    
    // Start the countdown when the page loads
    document.addEventListener('DOMContentLoaded', startCountdown);
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