// src/pages/FunnelLandingPage.tsx
import React, { useState, useEffect } from 'react';

const BundleStep: React.FC = () => {
  // Countdown to a specific date (adjust as needed)
  const targetDate = new Date('2025-10-11T11:59:59').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => num.toString().padStart(2, '0');

  // Simple CTA handler (redirects to your main shop/product page)
  const handleCTAClick = () => {
    // Replace with your actual destination URL
    window.location.href = '/product/exclusive-bundle-collection';
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#000'
      }}
    >
      {/* Background Image */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://res.cloudinary.com/dmjtr9kop/image/upload/v1759547416/BundleStep_mz72w0.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          zIndex: 1
        }}
      />
      
      {/* Popup Modal */}
      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '16px',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{
            backgroundColor: '#35353595',
            borderRadius: '20px',
            border: '2px solid #bebebeff',
            padding: '24px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* Timer Section */}
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#ffffff', 
              fontWeight: '800',
              marginBottom: '12px',
              lineHeight: 1.3
            }}>
              ⏳ Limited Time Offer!
            </h2>
            
            {/* Centered Product Image */}
            <div style={{ 
              margin: '16px auto 20px',
              maxWidth: '200px'
            }}>
              <img 
                src="https://res.cloudinary.com/dmjtr9kop/image/upload/v1759509899/Landing_Page_2_OptimizedAsset_18_ktdji3.png" 
                alt="Special Bundle Offer"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
            
            {/* Responsive Timer Container */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '20px',
                margin: '0 auto',
                maxWidth: '320px'
              }}
            >
              {(['days', 'hours', 'minutes', 'seconds'] as const).map(unit => (
                <div 
                  key={unit} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    minWidth: '60px'
                  }}
                >
                  <div 
                    style={{ 
                      fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
                      fontWeight: '800', 
                      color: '#040200',
                      backgroundColor: '#FFD119',
                      width: 'clamp(50px, 18vw, 70px)',
                      height: 'clamp(50px, 18vw, 70px)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {formatNumber(timeLeft[unit])}
                  </div>
                  <div 
                    style={{ 
                      fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)', 
                      color: '#ffffff', 
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      marginTop: '6px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <p style={{ 
            color: '#c4c3c3ff', 
            marginBottom: '24px', 
            lineHeight: 1.5,
            fontSize: 'clamp(1rem, 3.5vw, 1.125rem)',
            fontWeight: '500'
          }}>
            Join thousands of couples who transformed their intimacy. 
            Get instant access before this offer expires!
          </p>

          {/* CTA Button Only */}
          <button
            onClick={handleCTAClick}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '12px',
              backgroundColor: '#FE0000',
              color: 'white',
              fontWeight: '700',
              fontSize: 'clamp(1.1rem, 4vw, 1.25rem)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ce0404';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(217, 119, 6, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FE0000';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(217, 119, 6, 0.3)';
            }}
          >
            Claim Your Discount Now
          </button>

          {/* Small Print */}
          <p style={{ 
            fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)', 
            color: '#c4c3c3ff', 
            marginTop: '16px',
            lineHeight: 1.4,
            fontWeight: '500'
          }}>
            Offer expires in {timeLeft.days} days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BundleStep;
