# 🎨 Custom HTML Pages Guide

This guide shows you how to create and customize your own HTML pages with full inline styling for funnel pages, landing pages, or any custom content.

## 📁 How It Works

The custom page system allows you to create unlimited custom pages by adding them to the `customPages` object in `/src/pages/CustomPage.tsx`.

## 🚀 Available Sample Pages

### 1. Sales Funnel Page
**URL**: `/custom/funnel-1`
- Professional sales funnel design
- Countdown timer
- Call-to-action buttons
- Pricing sections
- Testimonial areas

### 2. Landing Page Template
**URL**: `/custom/landing-page`
- Hero section with gradient background
- Feature showcase grid
- Hover animations
- Responsive design
- Call-to-action sections

### 3. Blank Template
**URL**: `/custom/blank-template`
- Clean starting template
- Basic structure
- Example sections
- Easy to customize

## 🛠️ How to Add Your Own Custom Pages

### Step 1: Edit the CustomPage.tsx File
Open `/src/pages/CustomPage.tsx` and find the `customPages` object around line 7.

### Step 2: Add Your New Page
Add a new entry to the `customPages` object:

```javascript
const customPages = {
  // Existing pages...
  
  'your-page-name': {
    title: 'Your Page Title',
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
```

### Step 3: Access Your Page
Your page will be available at: `/custom/your-page-name`

## 🎵 Adding Background Music (Optional)

1. Add your music file to the `/public` folder
2. Reference it in your page configuration:
```javascript
music: '/your-music-file.mp3'
```

## 💡 HTML Features You Can Use

### ✅ Fully Supported:
- **All HTML Elements**: div, h1-h6, p, img, video, audio, etc.
- **Inline CSS Styling**: Complete control over appearance
- **JavaScript**: Add interactive functionality
- **Responsive Design**: Media queries and flexible layouts
- **Animations**: CSS transitions and keyframes
- **Forms**: Input fields, buttons, etc.
- **External Resources**: Fonts, icons, etc.

### 🎨 Styling Examples:

#### Gradient Backgrounds:
```html
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
```

#### Hover Effects:
```html
<button onmouseover="this.style.transform='scale(1.05)'" 
        onmouseout="this.style.transform='scale(1)'">
```

#### Grid Layouts:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
```

#### Box Shadows:
```html
<div style="box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
```

## 🔧 Advanced Features

### JavaScript Functionality:
```html
<script>
  function myFunction() {
    // Your JavaScript code
  }
  
  // Event listeners
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize your page
  });
</script>
```

### Custom CSS:
```html
<style>
  .my-custom-class {
    /* Your CSS rules */
  }
  
  @media (max-width: 768px) {
    /* Mobile styles */
  }
</style>
```

### External Resources:
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">

<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

## 📱 Mobile Responsiveness

The system includes automatic mobile responsiveness, but you can add custom mobile styles:

```html
<style>
  @media (max-width: 768px) {
    .desktop-only { display: none; }
    .mobile-text { font-size: 1.2rem; }
  }
</style>
```

## 🎯 Use Cases

### Sales Funnels:
- Lead capture pages
- Product sales pages
- Upsell/downsell pages
- Thank you pages

### Landing Pages:
- Product launches
- Event registration
- Newsletter signups
- Service offerings

### Custom Content:
- About pages
- Portfolio showcases
- Contact forms
- Special announcements

## 🔗 Linking to Custom Pages

### From Your Bio Page:
Add a link in your admin dashboard:
- **Title**: "Visit My Landing Page"
- **URL**: `/custom/your-page-name`

### Direct Access:
- **Full URL**: `https://yourdomain.com/custom/your-page-name`

## 🚨 Important Notes

1. **No Server-Side Processing**: These are client-side only pages
2. **Security**: Be careful with user input if you add forms
3. **Performance**: Large pages may load slower
4. **SEO**: Add meta tags in the HTML head for better SEO
5. **Testing**: Always test on mobile devices

## 🎨 Design Tips

1. **Keep It Simple**: Don't overcomplicate the design
2. **Mobile First**: Design for mobile, then desktop
3. **Fast Loading**: Optimize images and minimize code
4. **Clear CTAs**: Make your call-to-action buttons obvious
5. **Consistent Branding**: Match your brand colors and fonts

## 🔄 Updating Pages

To update a page:
1. Edit the content in the `customPages` object
2. Save the file
3. The page will update automatically

## 📊 Analytics

You can add tracking codes directly in your HTML:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

This system gives you complete creative freedom to build any type of custom page you need!