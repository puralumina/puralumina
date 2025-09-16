import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Product, Category } from '../types';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'The Richest Habit',
    price: 19.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'The single daily action that separates the wealthy.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_1',
  },
  {
    id: '2',
    name: 'The Compound Engine',
    price: 14.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Fuel your wealth with the power of discipline.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_2',
  },
  {
    id: '3',
    name: 'Money is a Language',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Become Fluent and Start Speaking Wealth.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_3',
  },
  {
    id: '4',
    name: 'The Delayed Dividend',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Why the Best Returns Come from Patience, Not Pressure.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_4',
  },
  {
    id: '5',
    name: 'The 7 Financial Rooms',
    price: 13.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Design your wealth like a living, breathing home.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_5',
  },
  {
    id: '6',
    name: 'Professional Camera',
    price: 250,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    description: 'High-quality professional camera for photography enthusiasts',
    category: 'cameras',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_6',
  },
  {
    id: '7',
    name: 'Camera Lens',
    price: 150,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
    description: 'Premium camera lens with excellent optical quality',
    category: 'lenses',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_7',
  },
  {
    id: '8',
    name: 'Photography Kit',
    price: 300,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    description: 'Complete photography kit for beginners and professionals',
    category: 'accessories',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_8',
  },
  {
    id: '9',
    name: 'Vintage Camera',
    price: 180,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Beautiful vintage camera with classic design',
    category: 'cameras',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_9',
  },
];

const sampleCategories: Category[] = [
  {
    id: 'all',
    name: 'All Products',
    description: 'Browse all available products',
    image: '',
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Professional and vintage cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
  },
  {
    id: 'cameras',
    name: 'Cameras',
    description: 'Professional and vintage cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    description: 'Camera lenses and optical equipment',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Photography accessories and kits',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
  },
];

// Recently viewed products functionality
const getRecentlyViewed = (): Product[] => {
  const stored = localStorage.getItem('recentlyViewed');
  if (!stored) return [];
  
  const productIds = JSON.parse(stored);
  return productIds
    .map((id: string) => sampleProducts.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4); // Show max 4 recently viewed
};

const addToRecentlyViewed = (productId: string) => {
  const stored = localStorage.getItem('recentlyViewed');
  let productIds = stored ? JSON.parse(stored) : [];
  
  // Remove if already exists
  productIds = productIds.filter((id: string) => id !== productId);
  
  // Add to beginning
  productIds.unshift(productId);
  
  // Keep only last 8
  productIds = productIds.slice(0, 8);
  
  localStorage.setItem('recentlyViewed', JSON.stringify(productIds));
};

const ShopPage: React.FC = () => {
  const [products] = useState<Product[]>(sampleProducts);
  const [categories] = useState<Category[]>(sampleCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
  // Background music for shop page
  useBackgroundMusic('/shop-music.mp3', { volume: 0.2 });

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  const handleProductClick = (productId: string) => {
    addToRecentlyViewed(productId);
    setRecentlyViewed(getRecentlyViewed());
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/links" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Categories */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Filter className="w-5 h-5 mr-3 text-gray-600" />
            <h2 className="text-xl font-medium text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Categories</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        
        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => handleProductClick(product.id)}
              className="group block"
            >
              <div className="transition-all duration-300">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {product.name}
                  </h3>
                  <p className="font-normal text-gray-700 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {product.currency === 'USD' && '$'}
                    {product.currency === 'EUR' && '€'}
                    {product.currency === 'GBP' && '£'}
                    {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-medium text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {recentlyViewed.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => handleProductClick(product.id)}
                  className="group block"
                >
                  <div className="transition-all duration-300">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 overflow-hidden rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {product.name}
                      </h3>
                      <p className="font-normal text-gray-700 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {product.currency === 'USD' && '$'}
                        {product.currency === 'EUR' && '€'}
                        {product.currency === 'GBP' && '£'}
                        {product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}


        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        .scale-103 {
          transform: scale(1.03);
        }
        
        .group:hover .group-hover\\:scale-103 {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
};

export default ShopPage;