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
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>The Ultimate Book Bundle</title>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ea2a33",
                        "background-light": "#f8f6f6",
                        "background-dark": "#211111",
                    },
                    fontFamily: {
                        "display": ["Newsreader"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        .font-display {
            font-family: 'Newsreader', serif;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-background-dark dark:text-background-light">
<div class="relative flex h-auto min-h-screen w-full flex-col justify-between group/design-root overflow-x-hidden">
<div>
<header class="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
<div class="flex items-center p-4 justify-between">
<h2 class="text-lg font-bold flex-1 text-center pl-12">The Ultimate Book Bundle</h2>
<div class="flex w-12 items-center justify-end">
<button class="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
<path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
</svg>
</button>
</div>
</div>
</header>
<main>
<div class="w-full h-80 bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHYJRreCmZEjHELYapCpc_hUPfL0VzlscmgrlJkpoNAh1_MMpMDudvjlMrgdwPkVwic4dFjO7W8OV0s9fwLC7hV_vJMfEJtissqa4oe3S73Gd3OMYVGkOIwjRhpm2hLhrFgA9OiEb-0IhBYnRTwT_LkX0_dHghBw5oh_Y-q0jHAFTO442te4SjUzUdaymF4bjLa9QAmGM7fwsmyRbItYtNHTwOgFsZO2pWSmhIc8jp5Su2yY8_jvc0k63YUzT7wUp8-AVToChJ6Cw");'></div>
<div class="p-6 text-center">
<h1 class="text-3xl font-bold leading-tight tracking-tight">Unlock Your Potential with 14 Best-Selling Books</h1>
<p class="mt-2 text-lg">For a limited time, get all 14 books for just <span class="text-primary font-bold">$39.99</span>! <span class="line-through text-background-dark/60 dark:text-background-light/60">Regular price: $199.99</span></p>
</div>
<div class="px-6 py-4">
<div class="flex justify-between items-center mb-1">
<p class="text-sm font-medium">Bundles Sold</p>
<p class="text-sm font-medium text-background-dark/80 dark:text-background-light/80">750/1000</p>
</div>
<div class="w-full bg-primary/20 rounded-full h-2.5">
<div class="bg-primary h-2.5 rounded-full" style="width: 75%"></div>
</div>
</div>
<div class="px-6 py-4">
<button class="w-full bg-primary text-white text-lg font-bold h-14 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors">
                        Get Your Bundle Now
                    </button>
</div>
<section class="py-8">
    <h2 class="text-2xl font-bold px-6 mb-4">What's Included</h2>
    <!-- 
        This is the scroll container. Key classes:
        - "flex": Lays out children horizontally.
        - "overflow-x-auto": Allows horizontal scrolling if content overflows.
        - The classes starting with [...] are for hiding the scrollbar for a cleaner look.
    -->
    <div class="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden pl-6 pr-3">
        <!-- This inner flex container holds all the book items -->
        <div class="flex items-stretch gap-4">
            
            <!-- Existing Book 1 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbvOgppAybNgu7OlSRasJvZYCRHXPdSj8TCL0tmN3ZgKJAIQyrrHd-HQvNlsDgFsKJSJWFz6R0socpYX2X8A77FXV4P2KXFFHuvWwTtIfMSpvZiLcuCMRWur9M5l3gl0IBT-q4QTC-PCQ7sLyJQ-KDkLvO_Dd4bRgQUzSyFASC0HNSLbdIZMcJ6WWutniHHGTaZWacXARa21PdkorEQH8wioA9T2WBi7aG8zK3gGzsBPYqndtaS7DHgCuGXI6Myo81YaNFAbXXrlc");'></div>
                <p class="text-sm font-medium text-center">The Power of Habit</p>
            </div>
            
            <!-- Existing Book 2 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBI2055HvoRsO7NYPtENXGRxbAiHVn2wokWWJRTxDqhX6_5BFQbuzgCn9exq24OV11ILBiXYXQL_1EdbTXBrIriJw4cM7EPquMpAUjMpPRhkR-wCLYa1V-0svwP3_iuiipUyRi8fTObb7tuS2jOkjZIbxSqNd1bifMSsyamJpzJC8Es9OqZm5XA3-iFGJuN8_tprS6cCOS-lmc5Gdz_JFE5vWYXoer50kJU4Ck0NMvhDX7mLOVbMZTnnn75En_UPZ2t83VHi9YfAmc");'></div>
                <p class="text-sm font-medium text-center">Atomic Habits</p>
            </div>
            
            <!-- Existing Book 3 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaoVNUXXgXpOdNeAfGEntxBB7Fh-29xFVwornBklyet7zA6JJdPimL04qEg467kYpaaRKHLdvj3vpZeaoSHJh3AYPBHHIV9b7-sDRFRJ7jmSMfh5r-aC6IGyT0MakCFw_Q8HxY0S0cH9ZFMBnZ6Af2XwnPjgouCv2w_TNHwvXchM97g92KAQmMyOleAw0rTen5BSGU8alATMWL2tUiQ5hqEVN23DbbiLSC90fJuPuu_Rr3l9_xcTT1pN-kzQ7ibKPItdBTm1GG5yI");'></div>
                <p class="text-sm font-medium text-center">Mindset</p>
            </div>

            <!-- NEW BOOK 4 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://picsum.photos/300/400?random=1");'></div>
                <p class="text-sm font-medium text-center">Deep Work</p>
            </div>

            <!-- NEW BOOK 5 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://picsum.photos/300/400?random=2");'></div>
                <p class="text-sm font-medium text-center">Grit</p>
            </div>

            <!-- NEW BOOK 6 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://picsum.photos/300/400?random=3");'></div>
                <p class="text-sm font-medium text-center">Thinking, Fast and Slow</p>
            </div>
            
            <!-- NEW BOOK 7 -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-cover bg-center rounded-lg shadow-md" style='background-image: url("https://picsum.photos/300/400?random=4");'></div>
                <p class="text-sm font-medium text-center">The 7 Habits</p>
            </div>
            
            <!-- Existing "+ more" card -->
            <div class="flex flex-col gap-2 w-40 flex-shrink-0">
                <div class="w-full aspect-[3/4] bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center text-center p-2 text-primary">
                    <p class="font-bold">+7 more books</p> <!-- Updated the count from 11 to 7 -->
                </div>
                <p class="text-sm font-medium text-center">And many more...</p>
            </div>
        </div>
    </div>
</section>
<section class="px-6 py-8 bg-primary/5 dark:bg-primary/10">
<h2 class="text-2xl font-bold text-center mb-2">Why You Need This</h2>
<p class="text-center text-background-dark/80 dark:text-background-light/80 max-w-2xl mx-auto mb-8">These books offer practical advice and actionable strategies to help you achieve your goals.</p>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
<div class="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm">
<div class="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M224,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h64a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"></path></svg>
</div>
<h3 class="text-lg font-bold">Learn from Experts</h3>
<p class="text-background-dark/80 dark:text-background-light/80 mt-1">Access the wisdom of renowned authors and thought leaders.</p>
</div>
<div class="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm">
<div class="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path></svg>
</div>
<h3 class="text-lg font-bold">Gain New Insights</h3>
<p class="text-background-dark/80 dark:text-background-light/80 mt-1">Discover innovative approaches to personal and professional growth.</p>
</div>
<div class="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm">
<div class="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path></svg>
</div>
<h3 class="text-lg font-bold">Join a Community</h3>
<p class="text-background-dark/80 dark:text-background-light/80 mt-1">Connect with like-minded individuals on a similar journey.</p>
</div>
</div>
</section>
<section class="px-6 py-8">
<h2 class="text-2xl font-bold text-center mb-8">Real Results from Real Readers</h2>
<div class="space-y-8 max-w-3xl mx-auto">
<div class="p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border-l-4 border-primary">
<div class="flex items-center gap-3 mb-3">
<img alt="Sophia Carter" class="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3die4Y0NtCl7jPaIgpN3OINva5E1uqwZGZzq2LhZyaNkwuqqHV5ArU4GfY8LkAlw3VF-55SvzveHrXuOt_iJ-R-1JU7yeahMXYwd01vFAdeS32saHrzSr3ioILM_stXEz35Jo7tUmYt38bkm7uKdfhFPtTw1tkNaBzirrlgwwGf2dB7_1IN3j3W-wc-GE3X0X42ZgXH5inbvTENYRcpXjTkM2tBw_TWjcuFstCIDuqOfQZVhAnvCtlK4ulAm1imHm93YkCIQf5gs"/>
<div>
<p class="font-bold">Sophia Carter</p>
<div class="flex items-center text-primary">
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
</div>
</div>
</div>
<p class="italic text-background-dark/90 dark:text-background-light/90">"This bundle has been a game-changer for me! The variety of topics covered is incredible, and I've already implemented several strategies from the books."</p>
</div>
<div class="p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border-l-4 border-primary">
<div class="flex items-center gap-3 mb-3">
<img alt="Ethan Bennett" class="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRcgZdT6RiylSdjt4nHzvBDd4KtdOdAVKF4zA0gOab5bx0Xz06pxr_o3wEU6-7j_BFlSQ0WImnLIiNqFS0FS3NrN_mfBaf7aT2rBqT3uI4-ACXU6AlqiXPt4xu9IiB4xa1jUN0DRWnCV8v_ycHnoAzQ-BTU1FqWmksjJ7RT8CuuFM3AfhjvIxhG1CfVM-Qs_C1UWv-qKLjh80ikydx5Nat6T6EzKh6LwnNRuwhcfI64qOjti-A4xKo3GKvbxkFA06e9xm436hq2rw"/>
<div>
<p class="font-bold">Ethan Bennett</p>
<div class="flex items-center text-primary">
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
<svg fill="currentColor" height="16px" viewBox="0 0 256 256" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
</div>
</div>
</div>
<p class="italic text-background-dark/90 dark:text-background-light/90">"I was skeptical at first, but the quality of these books exceeded my expectations. The value for the price is unbeatable."</p>
</div>
</div>
</section>
<section class="px-6 py-8 bg-primary/5 dark:bg-primary/10">
<div class="max-w-4xl mx-auto space-y-6">
<div class="text-center">
<h2 class="text-2xl font-bold">Limited-Time Offer</h2>
<p class="mt-1 text-background-dark/80 dark:text-background-light/80">Don't miss out on this incredible deal.</p>
</div>
<div class="flex flex-col md:flex-row gap-6">
<div class="flex-1 p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border border-primary/20 text-center">
<h3 class="font-bold text-lg text-primary">Price Increasing Soon!</h3>
<p class="mt-2 text-background-dark/80 dark:text-background-light/80">The price will increase to $59.99 after the first 1000 bundles are sold.</p>
<button class="mt-4 w-full bg-primary text-white text-md font-bold h-10 rounded-lg shadow-md hover:bg-opacity-90 transition-colors">Secure Your Bundle</button>
</div>
<div class="flex-1 p-6 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border border-primary/20 text-center">
<h3 class="font-bold text-lg text-primary">Special Bonus</h3>
<p class="mt-2 text-background-dark/80 dark:text-background-light/80">The first 50 buyers will receive a complimentary audiobook version of one of the books.</p>
<button class="mt-4 w-full bg-primary text-white text-md font-bold h-10 rounded-lg shadow-md hover:bg-opacity-90 transition-colors">Claim Your Bonus</button>
</div>
</div>
</div>
</section>
<div class="px-6 py-8 text-center">
<h2 class="text-3xl font-bold">Ready to Transform Your Life?</h2>
<p class="mt-2 text-lg text-background-dark/80 dark:text-background-light/80">Get instant access to 14 best-selling books for an unbeatable price.</p>
<button class="mt-6 w-full max-w-sm mx-auto bg-primary text-white text-xl font-bold h-16 rounded-lg shadow-xl hover:bg-opacity-90 transition-colors">
                        Get Your Bundle Now for $39.99
                    </button>
</div>
</main>
</div>
<footer class="bg-background-light dark:bg-background-dark border-t border-primary/10 dark:border-primary/20 mt-8">
<div class="container mx-auto px-6 py-8 text-center text-background-dark/70 dark:text-background-light/70">
<div class="flex justify-center gap-6 mb-4">
<a class="hover:text-primary transition-colors" href="#">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg>
</a>
<a class="hover:text-primary transition-colors" href="#">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg>
</a>
<a class="hover:text-primary transition-colors" href="#">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>
</a>
</div>
<p class="text-sm">© 2023 Book Bundle. All rights reserved.</p>
</div>
</footer>
</div>

</body></html>
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