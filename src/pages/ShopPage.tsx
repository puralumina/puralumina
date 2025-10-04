import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Product, Category } from '../types';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: 'art-of-making-love',
    name: 'The Art of Making love',
    price: 11.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366634/Book1_The_Art_of_Making_Love_gnfjyz.jpg',
    //description: 'Explore over 200 dirty talk ideas to ignite her passion.',
    category: 'Books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_2',
  },
  {
    id: 'mastering-her-pleasure',
    name: 'Mastering Her Pleasure: The Ultimate Guide for Men',
    price: 14.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366634/Book3_Master_her_pleasure3_trdsgk.jpg',
    //description: 'Learn to satisfy her deeply with expert techniques and insights.',
    category: 'Books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_1',
  },
  {
    id: 'make-him-crave-you',
    name: 'Make Him Crave You: The Ultimate Guide to Teasing and Pleasing',
    price: 11.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366632/Book6_Make_Him_Crave_You_ctkf5j.jpg',
    //description: 'Master the art of teasing to keep him wanting more.',
    category: 'Books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_4',
  },
  {
    id: 'couples-games-4-in-1-edition',
    name: 'Couples Games 4-in-1 Edition',
    price: 17.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759535562/4-in-1_Couples_Games_lqqb00.jpg',
    //description: 'Design your wealth like a living, breathing home.',
    category: 'Couples Games',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_5',
  },
  {
    id: 'dirty-truth-or-dare-for-couples',
    name: 'Dirty Truth or Dare for Couples',
    price: 9.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366627/Booklet_5_Cards_-_Truth_or_Dare_do6zkw.jpg',
    //description: 'Design your wealth like a living, breathing home.',
    category: 'Cards',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_5',
  },
  {
    id: 'daily-couples-affirmations',
    name: 'Daily Couples Affirmations',
    price: 11.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366638/Booklet_7_Cards_-_Couples_Affirmation_zgh0s4.jpg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: 'must-do-couples-checklist',
    name: 'The MUST-DO Couples Checklist',
    price: 14.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366625/Booklet_8_Cards_-_The_Must-Do_Couples_Checklist_nuq8c0.jpg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: 'date-night-ideas',
    name: 'Date Night Ideas',
    price: 9.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759366631/Booklet_6_Cards_-_Date_Night_Ideas_j8hn3o.jpg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: 'exclusive-bundle-collection',
    name: 'All Products Bundle (with limited-time Exclusive Bonus)',
    price: 39.99,
    currency: 'USD',
    image: 'https://res.cloudinary.com/dmjtr9kop/image/upload/v1759509899/Landing_Page_2_OptimizedAsset_18_ktdji3.png',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Bundle',
    stripePaymentLink: 'https://youtube.com',
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
    id: 'Books',
    name: 'Books',
    description: 'Dive into expert guides on intimacy and pleasure for couples.',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
  },
  {
    id: 'Couples Games',
    name: 'Couples Games',
    description: 'Play fun and sensual games to spice up your relationship.',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
  },
  {
    id: 'Cards',
    name: 'Cards',
    description: 'Use playful cards to explore desires and deepen connection.',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
  },
  {
    id: 'Bundle',
    name: 'Bundle Collection',
    description: 'Get all our Exclusive Digital Products at a Bundle discount price',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
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
                    ? 'bg-[#C27006] text-white'
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <div 
                    className="text-gray-600 text-xs mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
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
        </div><br/><br/><br/>

        {/* Recently Viewed Products
        {recentlyViewed.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-medium text-center text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Recently Viewed
            </h2>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-8">
              {recentlyViewed.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => handleProductClick(product.id)}
                  className="group block"
                >
                  <div className="transition-all duration-300">
                    {/* Product Image 
                    <div className="aspect-square bg-gray-100 overflow-hidden rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                    
                    {/* Product Info 
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {product.name}
                      </h3>
                      <div 
                        className="text-gray-600 text-xs mb-2 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
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
        )} */}


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