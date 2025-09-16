import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'The Richest Habit',
    price: 19.99,
    originalPrice: 24.99,
    discountPercentage: 20,
    isOnSale: true,
    saleLabel: 'SALE',
    rating: 4.8,
    reviewCount: 127,
    stockCount: 15,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg'
    ],
    description: 'Forget the noise of complex financial advice. After analyzing the patterns of the world’s most successful people, one simple truth emerges: wealth isn\'t determined by a secret investment strategy, but by a single, non-negotiable daily habit. "The Richest Habit" cuts through the clutter to reveal this one core action that separates the financially independent from everyone else. This book is a short, powerful guide to understanding, adopting, and perfecting the single most profitable behavior you can implement in the next 48 hours.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/cNi00j0ga7MYeDV1kP7wA05',
  },
  {
    id: '2',
    name: 'The Compound Engine',
    price: 14.99,
    originalPrice: 17.99,
    discountPercentage: 17,
    isOnSale: true,
    saleLabel: 'LIMITED TIME',
    rating: 4.6,
    reviewCount: 89,
    stockCount: 23,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'
    ],
    description: 'We all understand the power of compound interest for our money, but what about for our habits? This book reveals how to build your own "Compound Engine". This is a personal system where small acts of daily discipline don\'t just add up, they multiply exponentially. Learn to transform discipline from a struggle into an unstoppable force that generates momentum in your finances, career, and life. Stop trying to muscle your way to success and start building the engine that will drive you there automatically.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/28E6oHd2Webm3Zh3sX7wA03',
  },
  {
    id: '3',
    name: 'Money is a Language',
    price: 11.99,
    rating: 4.9,
    reviewCount: 203,
    stockCount: 8,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg',
      'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg'
    ],
    description: 'Money isn’t just numbers. It’s a language you can learn. This book teaches you how to read, write, and think in financial fluency, turning confusion into clarity and fear into strategy. Discover how to "speak" saving, investing, and earning with purpose, so you can finally understand what your money is trying to tell you—and respond with power.',
    category: 'books',
    inStock: true,
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
    rating: 4.4,
    reviewCount: 156,
    stockCount: 31,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'
    ],
    description: 'Forget instant gratification! Real wealth is earned through the quiet power of patience. The Delayed Dividend reveals how small, consistent choices today create outsized rewards tomorrow. From compounding investments to emotional discipline and long-term systems, this book reframes waiting not as sacrifice, but as strategy. The best returns don’t rush; they arrive when you’re ready.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/28E28r0gaebm53le7B7wA02',
  },
  {
    id: '5',
    name: 'The 7 Financial Rooms',
    price: 13.99,
    rating: 4.7,
    reviewCount: 94,
    stockCount: 12,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg'
    ],
    description: 'Your financial life isn’t a spreadsheet, it’s a house with seven essential rooms. From the Foundation (emergency savings) to the Engine Room (passive income), each space plays a vital role in stability and growth. This book walks you through building, organizing, and maintaining your personal "Wealth Home," so you’re not just making money. Rather you’re creating a safe, sustainable, and scalable financial life.',
    category: 'books',
    inStock: true,
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
    rating: 4.5,
    reviewCount: 78,
    stockCount: 5,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg'
    ],
    description: 'High-quality professional camera perfect for photography enthusiasts and professionals alike. Features advanced autofocus, excellent low-light performance, and durable construction that can withstand various shooting conditions.',
    category: 'Cards',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_6',
  },
  {
    id: '7',
    name: 'Camera Lens',
    price: 150,
    rating: 4.3,
    reviewCount: 45,
    stockCount: 18,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
    images: [
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg'
    ],
    description: 'Premium camera lens with excellent optical quality and superior build. Perfect for portrait photography, landscape shots, and professional work. Features fast autofocus and weather sealing.',
    category: 'lenses',
    inStock: true,
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
    rating: 4.8,
    reviewCount: 112,
    stockCount: 7,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
    ],
    description: 'Complete photography kit for beginners and professionals. Includes camera, lens, tripod, memory cards, and carrying case. Everything you need to start your photography journey.',
    category: 'accessories',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_8',
  },
  {
    id: '9',
    name: 'Vintage Camera',
    price: 180,
    rating: 4,
    reviewCount: 67,
    stockCount: 3,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    images: [
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg'
    ],
    description: 'Beautiful vintage camera with classic design and timeless appeal. Fully functional with manual controls that provide an authentic photography experience. Perfect for collectors and film photography enthusiasts.',
    category: 'Cards',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_9',
  },
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
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

  // Helper function to render star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400 text-xl">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400 text-xl relative">
            <span className="absolute inset-0">☆</span>
            <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 text-xl">☆</span>
        );
      }
    }
    return stars;
  };
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

            {/* Rating and Reviews */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {renderStarRating(product.rating)}
                </div>
                <span className="text-gray-600 text-sm">
                  ({product.reviewCount || 0} reviews)
                </span>
               {/*  {product.stockCount !== undefined && (
                  <span className="text-gray-600 text-sm">
                    Stock: {product.stockCount} disponibles
                  </span>
                )}*/}
              </div>
            )}
            
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.stockCount !== undefined && product.stockCount <= 10 && product.inStock && (
                  <span className="text-orange-600 text-sm font-medium">
                    Only {product.stockCount} left!
                  </span>
                )}
              </div>
            </div>

            {product.inStock && (
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
                    {(
                      (product.isOnSale && `Buy Now - Save ${product.discountPercentage}%`) ||
                      'Buy Now'
                    )} - 
                    {product.currency === 'USD' && '$'}
                    {product.currency === 'EUR' && '€'}
                    {product.currency === 'GBP' && '£'}
                    {product.price}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;