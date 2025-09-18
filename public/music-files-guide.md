# Background Music Files Guide

This guide shows you where to place your music files and how to modify the paths in the code.

## 📁 File Structure
Place all your music files in the `/public` folder:

```
public/
├── homepage-music.mp3
├── biopage-music.mp3
├── shop-music.mp3
├── apparel-shop-music.mp3
├── admin-login-music.mp3
├── admin-dashboard-music.mp3
├── default-product-music.mp3
├── product-1-music.mp3  (The Richest Habit)
├── product-2-music.mp3  (The Compound Engine)
├── product-3-music.mp3  (Money is a Language)
├── product-4-music.mp3  (The Delayed Dividend)
├── product-5-music.mp3  (The 7 Financial Rooms)
├── product-6-music.mp3  (Professional Camera)
├── product-7-music.mp3  (Camera Lens)
├── product-8-music.mp3  (Photography Kit)
└── product-9-music.mp3  (Vintage Camera)
```

## 🎵 Where to Edit Your Music Paths

### 1. Homepage Music
**File:** `src/pages/HomePage.tsx`
**Line:** Look for `useBackgroundMusic('/homepage-music.mp3', { volume: 0.2 });`
**Change:** Replace `/homepage-music.mp3` with your file path

### 2. Bio/Links Page Music
**File:** `src/pages/BioPage.tsx`
**Line:** Look for `useBackgroundMusic('/biopage-music.mp3', { volume: 0.2 });`
**Change:** Replace `/biopage-music.mp3` with your file path

### 3. Shop Page Music
**File:** `src/pages/ShopPage.tsx`
**Line:** Look for `useBackgroundMusic('/shop-music.mp3', { volume: 0.2 });`
**Change:** Replace `/shop-music.mp3` with your file path

### 4. Individual Product Music
**File:** `src/pages/ProductPage.tsx`
**Lines:** Look for the `musicMap` object:
```javascript
const musicMap: { [key: string]: string } = {
  '1': '/product-1-music.mp3',  // The Richest Habit
  '2': '/product-2-music.mp3',  // The Compound Engine
  // ... etc
};
```
**Change:** Replace each path with your desired music file

### 5. Admin Login Music
**File:** `src/pages/AdminLogin.tsx`
**Line:** Look for `useBackgroundMusic('/admin-login-music.mp3', { volume: 0.15 });`
**Change:** Replace `/admin-login-music.mp3` with your file path

### 6. Admin Dashboard Music
**File:** `src/pages/AdminDashboard.tsx`
**Line:** Look for `useBackgroundMusic('/admin-dashboard-music.mp3', { volume: 0.15 });`
**Change:** Replace `/admin-dashboard-music.mp3` with your file path

### 7. Apparel Shop Music
**File:** `src/pages/ApparelShop.tsx`
**Line:** Look for `useBackgroundMusic('/apparel-shop-music.mp3', { volume: 0.2 });`
**Change:** Replace `/apparel-shop-music.mp3` with your file path

## 🎛️ Volume Control
You can adjust the volume for each page by changing the `volume` parameter:
- `{ volume: 0.1 }` = 10% volume (very quiet)
- `{ volume: 0.2 }` = 20% volume (quiet)
- `{ volume: 0.3 }` = 30% volume (moderate)
- `{ volume: 0.5 }` = 50% volume (medium)

## 📝 Supported Audio Formats
- MP3 (recommended)
- WAV
- OGG
- M4A

## 🔧 How It Works
- Music starts automatically when entering a page
- Music fades in smoothly over 1 second
- Music loops continuously
- Music fades out and stops when leaving the page
- If autoplay is blocked, music starts on first user interaction
- Each page has independent music that doesn't interfere with others