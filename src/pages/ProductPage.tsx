import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import IndividualPixelInjector from '../components/IndividualPixelInjector';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Mastering Her Pleasure: The Ultimate Guide for Men',
    price: 9.99,
    originalPrice: 24.99,
    discountPercentage: 20,
    isOnSale: true,
    saleLabel: 'SALE',
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg'
    ],
    description: `
<p style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin-bottom: 20px; text-align: left;">Unlock the secrets to becoming a master of pleasure with <strong>"Mastering Her Pleasure: The Ultimate Guide for Men."</strong> This comprehensive book is your roadmap to understanding and fulfilling your partner's deepest desires, creating an unbreakable bond and an unforgettable sex life. Filled with practical advice, innovative techniques, and real-life examples, this guide covers everything from communication and foreplay to advanced pleasure techniques.</p>

<p style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin-bottom: 20px; text-align: justify;">Inside, you'll find:</p>

<ul style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin: 20px 0; padding-left: 20px;">
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-family: 'Montserrat', sans-serif; font-weight: 600;">The Psychology of Her Pleasure:</strong> Dive deep into the female psyche and learn what truly drives her desires. Understand her needs and preferences to create a connection that goes beyond the physical.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-family: 'Montserrat', sans-serif; font-weight: 600;">Communication Mastery:</strong> Learn how to talk to her about your desires and hers. Discover the art of asking the right questions and listening to her responses to enhance your intimacy.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-family: 'Montserrat', sans-serif; font-weight: 600;">Foreplay Techniques:</strong> Explore a variety of foreplay techniques that will have her begging for more. From sensual touch to erotic massage, you'll learn how to build anticipation and pleasure.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-family: 'Montserrat', sans-serif; font-weight: 600;">Advanced Pleasure Techniques:</strong> Take your skills to the next level with advanced techniques that will satisfy her in ways she never thought possible. Learn about G-spot stimulation, multiple orgasms, and more.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-family: 'Montserrat', sans-serif; font-weight: 600;">Real-Life Scenarios and Solutions:</strong> See how other couples have successfully incorporated these techniques into their lives, with tips and insights from those who've mastered the art of pleasure.</li>
</ul>

<p style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin-bottom: 20px; text-align: left;">Whether you're a novice or an experienced lover, mastering her pleasure offers the insights and skills you need to satisfy her in ways that will leave her craving more. Transform your intimate life and become the partner she's always dreamed of with this indispensable guide.</p>`,
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/cNi00j0ga7MYeDV1kP7wA05',
  },
  {
    id: '2',
    name: 'Dirty Talks to make her 100x wet during Sex',
    price: 6.99,
    originalPrice: 19.99,
    discountPercentage: 17,
    isOnSale: true,
    saleLabel: 'LIMITED TIME',
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'
    ],
    description: ` <p style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin-bottom: 20px; text-align: left;">Discover the power of words to ignite passion with "Dirty Talks to make her 100x wet during Sex." This book is your ultimate guide to mastering the art of erotic communication, teaching you how to use dirty talk to heighten arousal and make her wetter than ever before. Packed with techniques, phrases, and scenarios, this book will help you build anticipation, express your desires, and create an intimate connection that transcends the bedroom.</p>

<p style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin-bottom: 20px; text-align: justify;">Inside, you'll find:</p>

<ul style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin: 20px 0; padding-left: 20px;">
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-weight: 600;">The Psychology of Erotic Talk:</strong> Learn how to tap into her deepest desires with the right words. Understand the science behind what makes her wet and how to use it to your advantage.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-weight: 600;">Step-by-Step Guide to Dirty Talk:</strong> From subtle hints to explicit whispers, master the art of building anticipation and heightening her arousal. Learn when and how to use different types of dirty talk for maximum effect.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-weight: 600;">Over 200 Dirty Talk Ideas:</strong> Explore a vast collection of over 200 dirty talk ideas, ranging from playful and teasing to intense and explicit. Each idea is designed to ignite her passion and leave her craving more.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-weight: 600;">Scene-Setting Scenarios:</strong> Discover how to create a narrative that keeps her engaged and eager for more. Explore a variety of scripts and adapt them to your own style, making each encounter unique and exciting.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-weight: 600;">Real-Life Examples:</strong> See how other couples have successfully incorporated dirty talk into their sex lives, with tips and advice from those who've mastered the art.</li>
    <li style="margin-bottom: 15px;"><strong style="color: #2c3e50; font-weight: 600;">Confidence-Boosting Exercises:</strong> Build your confidence in using erotic talk with exercises and practices that help you become a master of your own words.</li>
</ul>

<p style="font-family: 'Montserrat', sans-serif; color: #333; line-height: 1.6; margin-bottom: 20px; text-align: left;">With <strong>"Dirty Talks to make her 100x wet during Sex"</strong>, you'll unlock the secret to a more satisfying and exciting sex life. Transform your bedroom dynamic and make every moment together sizzling hot and unforgettable.</p>`,
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/28E6oHd2Webm3Zh3sX7wA03',
  },
  {
    id: '3',
    name: 'Seducing His Senses: A Woman\'s Guide to Pleasuring Her Man',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg',
      'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg'
    ],
    description: `Money isn't just numbers. It's a language you can learn. This book teaches you how to read, write, and think in financial fluency, turning confusion into clarity and fear into strategy. Discover how to "speak" saving, investing, and earning with purpose, so you can finally understand what your money is trying to tell you—and respond with power.`,
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/28E6oHd2Webm3Zh3sX7wA03',
  },
  {
    id: '4',
    name: 'The Delayed Dividend',
    price: 11.99,
    originalPrice: 13.99,
    discountPercentage: 14,
    isOnSale: true,
    saleLabel: 'SALE',
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'
    ],
    description: `Forget instant gratification! Real wealth is earned through the quiet power of patience. The Delayed Dividend reveals how small, consistent choices today create outsized rewards tomorrow. From compounding investments to emotional discipline and long-term systems, this book reframes waiting not as sacrifice, but as strategy. The best returns don't rush; they arrive when you're ready.`,
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/28E28r0gaebm53le7B7wA02',
  },
  {
    id: '5',
    name: 'The 7 Financial Rooms',
    price: 13.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg'
    ],
    description: `Your financial life isn't a spreadsheet, it's a house with seven essential rooms. From the Foundation (emergency savings) to the Engine Room (passive income), each space plays a vital role in stability and growth. This book walks you through building, organizing, and maintaining your personal "Wealth Home," so you're not just making money. Rather you're creating a safe, sustainable, and scalable financial life.
`,
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/7sY6oH9QKd7igM39Rl7wA01',
  },
  {
    id: '6',
    name: 'Professional Camera',
    price: 250,
    originalPrice: 299.99,
    discountPercentage: 17,
    isOnSale: true,
    saleLabel: 'CLEARANCE',
    currency: 'USD',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg'
    ],
    description: `High-quality professional camera perfect for photography enthusiasts and professionals alike. Features advanced autofocus, excellent low-light performance, and durable construction that can withstand various shooting conditions.`,
    category: 'Cards',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_6',
  },
  {
    id: '7',
    name: 'Camera Lens',
    price: 150,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
    images: [
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg'
    ],
    description: `Premium camera lens with excellent optical quality and superior build. Perfect for portrait photography, landscape shots, and professional work. Features fast autofocus and weather sealing.`,
    category: 'Planners & Worksheets',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_7',
  },
  {
    id: '8',
    name: 'Photography Kit',
    price: 300,
    originalPrice: 399.99,
    discountPercentage: 25,
    isOnSale: true,
    saleLabel: 'MEGA SALE',
    currency: 'USD',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
    ],
    description: `Complete photography kit for beginners and professionals. Includes camera, lens, tripod, memory cards, and carrying case. Everything you need to start your photography journey.`,
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_8',
  },
  {
    id: '9',
    name: 'Vintage Camera',
    price: 180,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg'
    ],
    description: `Complete photography kit for beginners and professionals. Includes camera, lens, tripod, memory cards, and carrying case. Everything you need to start your photography journey.
`,
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // INDIVIDUAL PRODUCT PIXEL TRACKING
  // Add your tracking pixels for specific products here
  const getPixelsForProduct = (productId: string | undefined) => {
    const pixelMap: { [key: string]: any } = {
      '1': { // The Richest Habit
        // metaPixel: `<!-- Meta Pixel Code for Product 1 -->
        // <script>
        // !function(f,b,e,v,n,t,s)
        // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        // n.queue=[];t=b.createElement(e);t.async=!0;
        // t.src=v;s=b.getElementsByTagName(e)[0];
        // s.parentNode.insertBefore(t,s)}(window, document,'script',
        // 'https://connect.facebook.net/en_US/fbevents.js');
        // fbq('init', 'YOUR_PIXEL_ID');
        // fbq('track', 'PageView');
        // fbq('track', 'ViewContent', {
        //   content_name: 'The Richest Habit',
        //   content_category: 'Books',
        //   content_ids: ['1'],
        //   content_type: 'product',
        //   value: 19.99,
        //   currency: 'USD'
        // });
        // </script>`,
        
        // googleTag: `<!-- Google Analytics for Product 1 -->
        // <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        // <script>
        //   window.dataLayer = window.dataLayer || [];
        //   function gtag(){dataLayer.push(arguments);}
        //   gtag('js', new Date());
        //   gtag('config', 'GA_MEASUREMENT_ID');
        //   gtag('event', 'page_view', {
        //     page_title: 'The Richest Habit - Product Page',
        //     page_location: window.location.href,
        //     content_group1: 'Product Pages'
        //   });
        // </script>`,
        
        // tiktokPixel: `<!-- TikTok Pixel for Product 1 -->
        // <script>
        // !function (w, d, t) {
        //   w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
        //   ttq.load('YOUR_TIKTOK_PIXEL_ID');
        //   ttq.page();
        //   ttq.track('ViewContent', {
        //     content_name: 'The Richest Habit',
        //     content_category: 'Books',
        //     content_id: '1',
        //     content_type: 'product',
        //     value: 19.99,
        //     currency: 'USD'
        //   });
        // }(window, document, 'ttq');
        // </script>`
      },
      '2': { // The Compound Engine
        // Add pixels for product 2 here
      },
      '3': { // Money is a Language
        // Add pixels for product 3 here
      },
      '4': { // The Delayed Dividend
        // Add pixels for product 4 here
      },
      '5': { // The 7 Financial Rooms
        // Add pixels for product 5 here
      },
      '6': { // Professional Camera
        // Add pixels for product 6 here
      },
      '7': { // Camera Lens
        // Add pixels for product 7 here
      },
      '8': { // Photography Kit
        // Add pixels for product 8 here
      },
      '9': { // Vintage Camera
        // Add pixels for product 9 here
      }
    };
    return productId ? pixelMap[productId] || {} : {};
  };
  
  // Background music for individual products
  // EDIT THESE PATHS: Add music files for each product ID
  const getMusicForProduct = (productId: string | undefined) => {
    const musicMap: { [key: string]: string } = {
      '1': '/product-1-music.mp3',  // The Richest Habit
      '2': '/product-2-music.mp3',  // The Compound Engine
      '3': '/product-3-music.mp3',  // Money is a Language
      '4': '/product-4-music.mp3',  // The Delayed Dividend
      '5': '/product-5-music.mp3',  // The 7 Financial Rooms
      '6': '/product-6-music.mp3',  // Professional Camera
      '7': '/product-7-music.mp3',  // Camera Lens
      '8': '/product-8-music.mp3',  // Photography Kit
      '9': '/product-9-music.mp3',  // Vintage Camera
    };
    return productId ? musicMap[productId] || '/default-product-music.mp3' : '/default-product-music.mp3';
  };
  
  useBackgroundMusic(getMusicForProduct(id), { volume: 0.2 });
  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
    setSelectedImageIndex(0); // Reset to first image when product changes
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Direct Stripe payment instead of cart
      if (product.stripePaymentLink) {
        window.open(product.stripePaymentLink, '_blank');
      } else {
        alert('Payment link not configured for this product.');
      }
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (product?.images) {
      setSelectedImageIndex(prev => 
        prev === 0 ? product.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (product?.images) {
      setSelectedImageIndex(prev => 
        prev === product.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/links" className="text-blue-600 hover:text-blue-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Individual Product Pixel Tracking */}
      <IndividualPixelInjector 
        pixels={getPixelsForProduct(id)} 
        pageId={`product-${id}`} 
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/shop" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shop
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Main Image */}
            <div className="aspect-square relative bg-gray-100">
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows - Only show if multiple images */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnails - Only show if multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Product Title */}
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 flex-1">{product.name}</h1>
              {product.isOnSale && product.saleLabel && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium ml-4">
                  {product.saleLabel} -{product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Pricing */}
            <div className="mb-6">
              {product.originalPrice && product.isOnSale ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-gray-400 line-through">
                    {product.currency === 'USD' && '$'}
                    {product.currency === 'EUR' && '€'}
                    {product.currency === 'GBP' && '£'}
                    {product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    {product.currency === 'USD' && '$'}
                    {product.currency === 'EUR' && '€'}
                    {product.currency === 'GBP' && '£'}
                    {product.price}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-blue-600">
                  {product.currency === 'USD' && '$'}
                  {product.currency === 'EUR' && '€'}
                  {product.currency === 'GBP' && '£'}
                  {product.price}
                </span>
              )}
            </div>

            <div className="mb-6">
              {/* <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>*/}
              <div 
                className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <div className="space-y-4">
              {/* Pay Now Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  product.isOnSale 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>
                  Buy Now
                  {/*
                  {(
                    (product.isOnSale && `Buy Now - Save ${product.discountPercentage}%`) ||
                    'Buy Now'
                  )} - 
                  {product.currency === 'USD' && '$'}
                  {product.currency === 'EUR' && '€'}
                  {product.currency === 'GBP' && '£'}
                  {product.price}*/}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;