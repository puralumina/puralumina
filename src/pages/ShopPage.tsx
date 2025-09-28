import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { handleDeepLink } from '../utils/deepLinks';
import { initializeDeepLinking } from '../utils/deepLinks';
import { Product, Category } from '../types';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Mastering Her Pleasure: The Ultimate Guide for Men',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Learn to satisfy her deeply with expert techniques and insights.',
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_1',
  },
  {
    id: '2',
    name: 'Dirty Talks to make her 100x wet during Sex',
    price: 9.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Explore over 200 dirty talk ideas to ignite her passion.',
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_2',
  },
  {
    id: '3',
    name: 'Seducing His Senses: A Woman\'s Guide to Pleasuring Her Man',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Discover how to engage all his senses for ultimate pleasure.',
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_3',
  },
  {
    id: '4',
    name: 'Make Him Craving You: The Ultimate Guide to Teasing and Pleasing',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Master the art of teasing to keep him wanting more.',
    category: 'books',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_4',
  },
  {
    id: '5',
    name: 'Couples Games - The Spicy Edition',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Design your wealth like a living, breathing home.',
    category: 'Couples Games',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_5',
  },
  {
    id: '6',
    name: 'Couples Games - The Connection Edition',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'High-quality professional camera for photography enthusiasts',
    category: 'Couples Games',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_6',
  },
  {
    id: '7',
    name: 'Couples Games - The Laughs & Giggles Edition',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
    //description: 'Premium camera lens with excellent optical quality',
    category: 'Couples Games',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_7',
  },
  {
    id: '8',
    name: 'Couples Games - The 5-Minute Connector Edition',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Complete photography kit for beginners and professionals',
    category: 'Couples Games',
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_8',
  },
  {
    id: '9',
    name: '"Truth or Dare" for Couples Cards',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: '10',
    name: 'Date Night Idea Cards',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: '11',
    name: 'Couples\' Affirmation Cards',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Cards',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: '12',
    name: 'The 30-Day Relationship Challenge',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Planners & Worksheets',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: '13',
    name: 'The Ultimate Date Night Planner',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Planners & Worksheets',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: '14',
    name: '"State of the Union" Meeting Guide',
    price: 7.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    //description: 'Beautiful vintage camera with classic design',
    category: 'Planners & Worksheets',
    stripePaymentLink: 'https://youtube.com',
  },
  {
    id: '15',
    name: 'All Products Bundle',
    price: 69.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
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
    id: 'books',
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
    id: 'Planners & Worksheets',
    name: 'Planners & Worksheets',
    description: 'Organize and enhance your journey to a more satisfying relationship.',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
  },
  {
    id: 'Bundle',
    name: 'Bundle',
    description: 'Get all our digital products at a bundle discount price',
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
  const { category: urlCategory } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products] = useState<Product[]>(sampleProducts);
  const [categories] = useState<Category[]>(sampleCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || 'all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
  // Background music for shop page
  useBackgroundMusic('/shop-music.mp3', { volume: 0.2 });
  
  // Initialize NUCLEAR deep linking system
  useEffect(() => {
    initializeDeepLinking();
  }, []);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    } else if (!urlCategory && selectedCategory !== 'all') {
      setSelectedCategory('all');
    }
  }, [urlCategory, selectedCategory]);

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

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop/${encodeURIComponent(categoryId)}`);
    }
  };

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
                onClick={() => handleCategoryChange(category.id)}
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
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group block"
            >
              <div 
                className="transition-all duration-300 cursor-pointer"
                onClick={() => handleDeepLink(`/product/${product.id}`, true)}
              >
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
            </div>
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