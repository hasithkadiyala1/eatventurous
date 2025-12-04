import React, { useState, useEffect } from 'react';
import { MapPin, QrCode, Trophy, Home, Map, Award, Star, Navigation, X, Check } from 'lucide-react';

// Restaurant data with rarity levels
const restaurants = [
  {
    id: 1,
    name: "Khana Peena",
    cuisine: "Burmese",
    neighborhood: "Fruitvale",
    rating: 4.7,
    distance: 0.8,
    points: 50,
    rarity: "Epic",
    lat: 37.7749,
    lng: -122.2194,
    address: "3560 Fruitvale Ave, Oakland, CA",
    description: "Authentic Burmese tea leaf salads and mohinga",
    image: "🍜"
  },
  {
    id: 2,
    name: "Café Romanat",
    cuisine: "Eritrean",
    neighborhood: "Temescal",
    rating: 4.8,
    distance: 1.2,
    points: 75,
    rarity: "Legendary",
    lat: 37.8350,
    lng: -122.2661,
    address: "462 Santa Clara Ave, Oakland, CA",
    description: "Traditional Eritrean coffee ceremony and injera",
    image: "☕"
  },
  {
    id: 3,
    name: "Cholita Linda",
    cuisine: "Mexican",
    neighborhood: "Fruitvale",
    rating: 4.6,
    distance: 0.5,
    points: 25,
    rarity: "Rare",
    lat: 37.7699,
    lng: -122.2256,
    address: "4923 E 12th St, Oakland, CA",
    description: "Fresh ceviche and Baja-style tacos",
    image: "🌮"
  },
  {
    id: 4,
    name: "Daughter Thai",
    cuisine: "Thai",
    neighborhood: "Montclair",
    rating: 4.9,
    distance: 2.1,
    points: 60,
    rarity: "Epic",
    lat: 37.8272,
    lng: -122.2097,
    address: "2068 Mountain Blvd, Oakland, CA",
    description: "Modern Thai with Oakland soul",
    image: "🍛"
  },
  {
    id: 5,
    name: "Belotti Ristorante",
    cuisine: "Italian",
    neighborhood: "Rockridge",
    rating: 4.7,
    distance: 1.5,
    points: 35,
    rarity: "Rare",
    lat: 37.8444,
    lng: -122.2508,
    address: "5403 College Ave, Oakland, CA",
    description: "Northern Italian with house-made pasta",
    image: "🍝"
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userPoints, setUserPoints] = useState(485);
  const [visitedRestaurants, setVisitedRestaurants] = useState([1, 3]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null);
  const [showRedeemQR, setShowRedeemQR] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const handleCheckIn = (restaurant) => {
    if (!visitedRestaurants.includes(restaurant.id)) {
      setUserPoints(prev => prev + restaurant.points);
      setVisitedRestaurants(prev => [...prev, restaurant.id]);
      setShowQRScanner(false);
      alert(`🎉 Checked in at ${restaurant.name}! +${restaurant.points} points earned!`);
    } else {
      alert(`You've already visited ${restaurant.name}! Try a new place for more points.`);
    }
  };

  const handleRedeem = (reward) => {
    setUserPoints(prev => prev - reward.points);
    setShowRedeemQR(false);
    setSelectedReward(null);
    alert(`🎉 Reward redeemed! ${reward.name} is now available to use!`);
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const QRScanner = ({ restaurant }) => {
    const [scanning, setScanning] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
      if (scanning) {
        const countdownInterval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        const timer = setTimeout(() => {
          handleCheckIn(restaurant);
          setScanning(false);
        }, 30000);

        return () => {
          clearTimeout(timer);
          clearInterval(countdownInterval);
        };
      }
    }, [scanning]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Scan QR Code</h2>
            <button onClick={() => setShowQRScanner(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{restaurant.image}</div>
            <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
            <p className="text-gray-600 mb-4">{restaurant.cuisine} • {restaurant.neighborhood}</p>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg mb-6 flex flex-col items-center justify-center" style={{ minHeight: '300px' }}>
            <div className="text-center mb-6">
              {/* Realistic QR Code */}
              <div className="bg-white p-4 rounded-lg shadow-lg border-4 border-gray-200 inline-block">
                <div className="relative">
                  {/* QR Code Grid Pattern */}
                  <svg width="200" height="200" viewBox="0 0 200 200" className="bg-white">
                    {/* Corner markers */}
                    <rect x="10" y="10" width="50" height="50" fill="black"/>
                    <rect x="20" y="20" width="30" height="30" fill="white"/>
                    <rect x="25" y="25" width="20" height="20" fill="black"/>
                    
                    <rect x="140" y="10" width="50" height="50" fill="black"/>
                    <rect x="150" y="20" width="30" height="30" fill="white"/>
                    <rect x="155" y="25" width="20" height="20" fill="black"/>
                    
                    <rect x="10" y="140" width="50" height="50" fill="black"/>
                    <rect x="20" y="150" width="30" height="30" fill="white"/>
                    <rect x="25" y="155" width="20" height="20" fill="black"/>
                    
                    {/* Random pattern blocks to simulate QR code */}
                    <rect x="70" y="15" width="8" height="8" fill="black"/>
                    <rect x="80" y="15" width="8" height="8" fill="black"/>
                    <rect x="100" y="15" width="8" height="8" fill="black"/>
                    <rect x="110" y="15" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="30" width="8" height="8" fill="black"/>
                    <rect x="90" y="30" width="8" height="8" fill="black"/>
                    <rect x="110" y="30" width="8" height="8" fill="black"/>
                    <rect x="130" y="30" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="70" width="8" height="8" fill="black"/>
                    <rect x="30" y="70" width="8" height="8" fill="black"/>
                    <rect x="45" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="70" width="8" height="8" fill="black"/>
                    <rect x="80" y="70" width="8" height="8" fill="black"/>
                    <rect x="90" y="70" width="8" height="8" fill="black"/>
                    <rect x="110" y="70" width="8" height="8" fill="black"/>
                    <rect x="120" y="70" width="8" height="8" fill="black"/>
                    <rect x="140" y="70" width="8" height="8" fill="black"/>
                    <rect x="160" y="70" width="8" height="8" fill="black"/>
                    <rect x="170" y="70" width="8" height="8" fill="black"/>
                    <rect x="180" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="85" width="8" height="8" fill="black"/>
                    <rect x="45" y="85" width="8" height="8" fill="black"/>
                    <rect x="80" y="85" width="8" height="8" fill="black"/>
                    <rect x="100" y="85" width="8" height="8" fill="black"/>
                    <rect x="140" y="85" width="8" height="8" fill="black"/>
                    <rect x="170" y="85" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="100" width="8" height="8" fill="black"/>
                    <rect x="80" y="100" width="8" height="8" fill="black"/>
                    <rect x="100" y="100" width="8" height="8" fill="black"/>
                    <rect x="120" y="100" width="8" height="8" fill="black"/>
                    <rect x="140" y="100" width="8" height="8" fill="black"/>
                    <rect x="160" y="100" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="100" width="8" height="8" fill="black"/>
                    <rect x="30" y="100" width="8" height="8" fill="black"/>
                    <rect x="45" y="100" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="115" width="8" height="8" fill="black"/>
                    <rect x="90" y="115" width="8" height="8" fill="black"/>
                    <rect x="110" y="115" width="8" height="8" fill="black"/>
                    <rect x="130" y="115" width="8" height="8" fill="black"/>
                    <rect x="160" y="115" width="8" height="8" fill="black"/>
                    <rect x="180" y="115" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="115" width="8" height="8" fill="black"/>
                    <rect x="45" y="115" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="130" width="8" height="8" fill="black"/>
                    <rect x="100" y="130" width="8" height="8" fill="black"/>
                    <rect x="120" y="130" width="8" height="8" fill="black"/>
                    <rect x="140" y="130" width="8" height="8" fill="black"/>
                    <rect x="170" y="130" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="150" width="8" height="8" fill="black"/>
                    <rect x="80" y="150" width="8" height="8" fill="black"/>
                    <rect x="100" y="150" width="8" height="8" fill="black"/>
                    <rect x="120" y="150" width="8" height="8" fill="black"/>
                    <rect x="130" y="150" width="8" height="8" fill="black"/>
                    <rect x="150" y="150" width="8" height="8" fill="black"/>
                    <rect x="170" y="150" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="165" width="8" height="8" fill="black"/>
                    <rect x="90" y="165" width="8" height="8" fill="black"/>
                    <rect x="110" y="165" width="8" height="8" fill="black"/>
                    <rect x="140" y="165" width="8" height="8" fill="black"/>
                    <rect x="160" y="165" width="8" height="8" fill="black"/>
                    <rect x="180" y="165" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="180" width="8" height="8" fill="black"/>
                    <rect x="80" y="180" width="8" height="8" fill="black"/>
                    <rect x="100" y="180" width="8" height="8" fill="black"/>
                    <rect x="130" y="180" width="8" height="8" fill="black"/>
                    <rect x="150" y="180" width="8" height="8" fill="black"/>
                    <rect x="170" y="180" width="8" height="8" fill="black"/>
                    
                    {/* Center restaurant emoji */}
                    <text x="100" y="110" textAnchor="middle" fontSize="32" dominantBaseline="middle">
                      {restaurant.image}
                    </text>
                  </svg>
                  
                  {/* Scan line animation */}
                  {scanning && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-1 bg-green-500 shadow-lg animate-scan" style={{
                        animation: 'scan 3s linear infinite'
                      }}></div>
                    </div>
                  )}
                </div>
                
                {/* QR Code Label */}
                <div className="mt-2 text-xs text-gray-500 text-center font-mono">
                  EATVENTUROUS_{restaurant.id}
                </div>
              </div>
            </div>
            
            {/* Timer and Progress Bar Below QR Code */}
            <div className="w-full max-w-xs">
              {/* Circular Progress Ring */}
              <div className="flex items-center justify-center mb-4">
                <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (timeLeft / 30)}`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-600">{timeLeft}</span>
                    <p className="text-xs text-gray-500">seconds</p>
                  </div>
                </div>
              </div>
              
              <p className="text-green-600 font-semibold text-lg text-center">
                {scanning ? 'Scanning QR Code...' : 'Scan Complete!'}
              </p>
              <p className="text-gray-500 text-sm text-center mt-1">
                {scanning ? 'Please wait while we verify' : 'Check-in successful!'}
              </p>
            </div>
            
            <style jsx>{`
              @keyframes scan {
                0% { top: 0; }
                50% { top: 100%; }
                100% { top: 0; }
              }
            `}</style>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              📱 Hold your phone steady while scanning...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                +{restaurant.points} points
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getRarityColor(restaurant.rarity)}`}>
                {restaurant.rarity}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RedeemQRScanner = ({ reward }) => {
    const [scanning, setScanning] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
      if (scanning) {
        const countdownInterval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        const timer = setTimeout(() => {
          handleRedeem(reward);
          setScanning(false);
        }, 30000);

        return () => {
          clearTimeout(timer);
          clearInterval(countdownInterval);
        };
      }
    }, [scanning]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Redeem Reward</h2>
            <button onClick={() => setShowRedeemQR(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{reward.icon}</div>
            <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
            <p className="text-gray-600 mb-4">{reward.description}</p>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg mb-6 flex flex-col items-center justify-center" style={{ minHeight: '300px' }}>
            <div className="text-center mb-6">
              {/* Realistic QR Code */}
              <div className="bg-white p-4 rounded-lg shadow-lg border-4 border-gray-200 inline-block">
                <div className="relative">
                  {/* QR Code Grid Pattern */}
                  <svg width="200" height="200" viewBox="0 0 200 200" className="bg-white">
                    {/* Corner markers */}
                    <rect x="10" y="10" width="50" height="50" fill="black"/>
                    <rect x="20" y="20" width="30" height="30" fill="white"/>
                    <rect x="25" y="25" width="20" height="20" fill="black"/>
                    
                    <rect x="140" y="10" width="50" height="50" fill="black"/>
                    <rect x="150" y="20" width="30" height="30" fill="white"/>
                    <rect x="155" y="25" width="20" height="20" fill="black"/>
                    
                    <rect x="10" y="140" width="50" height="50" fill="black"/>
                    <rect x="20" y="150" width="30" height="30" fill="white"/>
                    <rect x="25" y="155" width="20" height="20" fill="black"/>
                    
                    {/* Random pattern blocks */}
                    <rect x="70" y="15" width="8" height="8" fill="black"/>
                    <rect x="80" y="15" width="8" height="8" fill="black"/>
                    <rect x="100" y="15" width="8" height="8" fill="black"/>
                    <rect x="110" y="15" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="30" width="8" height="8" fill="black"/>
                    <rect x="90" y="30" width="8" height="8" fill="black"/>
                    <rect x="110" y="30" width="8" height="8" fill="black"/>
                    <rect x="130" y="30" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="70" width="8" height="8" fill="black"/>
                    <rect x="30" y="70" width="8" height="8" fill="black"/>
                    <rect x="45" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="70" width="8" height="8" fill="black"/>
                    <rect x="80" y="70" width="8" height="8" fill="black"/>
                    <rect x="90" y="70" width="8" height="8" fill="black"/>
                    <rect x="110" y="70" width="8" height="8" fill="black"/>
                    <rect x="120" y="70" width="8" height="8" fill="black"/>
                    <rect x="140" y="70" width="8" height="8" fill="black"/>
                    <rect x="160" y="70" width="8" height="8" fill="black"/>
                    <rect x="170" y="70" width="8" height="8" fill="black"/>
                    <rect x="180" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="85" width="8" height="8" fill="black"/>
                    <rect x="45" y="85" width="8" height="8" fill="black"/>
                    <rect x="80" y="85" width="8" height="8" fill="black"/>
                    <rect x="100" y="85" width="8" height="8" fill="black"/>
                    <rect x="140" y="85" width="8" height="8" fill="black"/>
                    <rect x="170" y="85" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="100" width="8" height="8" fill="black"/>
                    <rect x="80" y="100" width="8" height="8" fill="black"/>
                    <rect x="100" y="100" width="8" height="8" fill="black"/>
                    <rect x="120" y="100" width="8" height="8" fill="black"/>
                    <rect x="140" y="100" width="8" height="8" fill="black"/>
                    <rect x="160" y="100" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="100" width="8" height="8" fill="black"/>
                    <rect x="30" y="100" width="8" height="8" fill="black"/>
                    <rect x="45" y="100" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="115" width="8" height="8" fill="black"/>
                    <rect x="90" y="115" width="8" height="8" fill="black"/>
                    <rect x="110" y="115" width="8" height="8" fill="black"/>
                    <rect x="130" y="115" width="8" height="8" fill="black"/>
                    <rect x="160" y="115" width="8" height="8" fill="black"/>
                    <rect x="180" y="115" width="8" height="8" fill="black"/>
                    
                    <rect x="15" y="115" width="8" height="8" fill="black"/>
                    <rect x="45" y="115" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="130" width="8" height="8" fill="black"/>
                    <rect x="100" y="130" width="8" height="8" fill="black"/>
                    <rect x="120" y="130" width="8" height="8" fill="black"/>
                    <rect x="140" y="130" width="8" height="8" fill="black"/>
                    <rect x="170" y="130" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="150" width="8" height="8" fill="black"/>
                    <rect x="80" y="150" width="8" height="8" fill="black"/>
                    <rect x="100" y="150" width="8" height="8" fill="black"/>
                    <rect x="120" y="150" width="8" height="8" fill="black"/>
                    <rect x="130" y="150" width="8" height="8" fill="black"/>
                    <rect x="150" y="150" width="8" height="8" fill="black"/>
                    <rect x="170" y="150" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="165" width="8" height="8" fill="black"/>
                    <rect x="90" y="165" width="8" height="8" fill="black"/>
                    <rect x="110" y="165" width="8" height="8" fill="black"/>
                    <rect x="140" y="165" width="8" height="8" fill="black"/>
                    <rect x="160" y="165" width="8" height="8" fill="black"/>
                    <rect x="180" y="165" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="180" width="8" height="8" fill="black"/>
                    <rect x="80" y="180" width="8" height="8" fill="black"/>
                    <rect x="100" y="180" width="8" height="8" fill="black"/>
                    <rect x="130" y="180" width="8" height="8" fill="black"/>
                    <rect x="150" y="180" width="8" height="8" fill="black"/>
                    <rect x="170" y="180" width="8" height="8" fill="black"/>
                    
                    {/* Center reward icon */}
                    <text x="100" y="110" textAnchor="middle" fontSize="32" dominantBaseline="middle">
                      {reward.icon}
                    </text>
                  </svg>
                  
                  {/* Scan line animation */}
                  {scanning && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-1 bg-purple-500 shadow-lg animate-scan" style={{
                        animation: 'scan 3s linear infinite'
                      }}></div>
                    </div>
                  )}
                </div>
                
                {/* QR Code Label */}
                <div className="mt-2 text-xs text-gray-500 text-center font-mono">
                  REWARD_{reward.id}
                </div>
              </div>
            </div>
            
            {/* Timer and Progress Bar Below QR Code */}
            <div className="w-full max-w-xs">
              {/* Circular Progress Ring */}
              <div className="flex items-center justify-center mb-4">
                <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#a855f7"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (timeLeft / 30)}`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-purple-600">{timeLeft}</span>
                    <p className="text-xs text-gray-500">seconds</p>
                  </div>
                </div>
              </div>
              
              <p className="text-purple-600 font-semibold text-lg text-center">
                {scanning ? 'Processing Redemption...' : 'Redemption Complete!'}
              </p>
              <p className="text-gray-500 text-sm text-center mt-1">
                {scanning ? 'Please wait while we verify' : 'Reward is ready to use!'}
              </p>
            </div>
            
            <style jsx>{`
              @keyframes scan {
                0% { top: 0; }
                50% { top: 100%; }
                100% { top: 0; }
              }
            `}</style>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              🎁 Show this code to redeem your reward
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                -{reward.points} points
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-pink-100 pb-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-gray-800">Eatventurous</h1>
          <p className="text-2xl text-gray-700 mb-8">Making Bay Area Dining an Adventure</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-5xl">🛒</div>
            <div className="text-5xl">🍔</div>
            <div className="text-5xl">🥗</div>
            <div className="text-5xl">👨‍🍳</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-3xl font-bold text-green-600 mb-2">{userPoints}</h3>
            <p className="text-gray-600">Your Points</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-2">🍽️</div>
            <h3 className="text-3xl font-bold text-orange-600 mb-2">{visitedRestaurants.length}/5</h3>
            <p className="text-gray-600">Restaurants Visited</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-3xl font-bold text-purple-600 mb-2">Explorer</h3>
            <p className="text-gray-600">Current Badge</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Discover</h3>
              <p className="text-gray-600">Find hidden gem restaurants on our interactive map</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Visit & Scan</h3>
              <p className="text-gray-600">Scan QR codes at restaurants to check in</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Collect points and redeem for free meals</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentPage('discover')}
            className="bg-green-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition shadow-lg"
          >
            Start Exploring →
          </button>
        </div>
      </div>
    </div>
  );

  const DiscoverPage = () => {
    const filteredRestaurants = filter === 'all' 
      ? restaurants 
      : restaurants.filter(r => r.rarity.toLowerCase() === filter.toLowerCase());

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-green-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Discover Near You</h1>
              <div className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-full">
                <Trophy size={20} />
                <span className="font-bold">{userPoints} pts</span>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === 'all' 
                    ? 'bg-white text-green-600' 
                    : 'bg-green-500 text-white hover:bg-green-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('rare')}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === 'rare' 
                    ? 'bg-white text-green-600' 
                    : 'bg-green-500 text-white hover:bg-green-400'
                }`}
              >
                💎 Rare
              </button>
              <button
                onClick={() => setFilter('epic')}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === 'epic' 
                    ? 'bg-white text-green-600' 
                    : 'bg-green-500 text-white hover:bg-green-400'
                }`}
              >
                ⚡ Epic
              </button>
              <button
                onClick={() => setFilter('legendary')}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === 'legendary' 
                    ? 'bg-white text-green-600' 
                    : 'bg-green-500 text-white hover:bg-green-400'
                }`}
              >
                👑 Legendary
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          {/* Custom Oakland Map */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Map className="text-green-600" size={24} />
                <h2 className="text-xl font-bold">Oakland Restaurant Map</h2>
              </div>
              <div className="text-sm text-gray-600">
                📍 {restaurants.length} hidden gems
              </div>
            </div>
            
            {/* Oakland Map SVG */}
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 bg-gradient-to-br from-green-50 to-blue-50">
              <svg viewBox="0 0 800 600" className="w-full h-auto" style={{ minHeight: '500px' }}>
                {/* Water - San Francisco Bay */}
                <path d="M 0 0 L 0 400 L 150 450 L 200 400 L 250 380 L 0 0 Z" fill="#a5d8ff" opacity="0.4"/>
                
                {/* Lake Merritt */}
                <ellipse cx="320" cy="350" rx="60" ry="45" fill="#74c0fc" opacity="0.6"/>
                <text x="320" y="355" textAnchor="middle" fontSize="12" fill="#1971c2" fontWeight="600">Lake Merritt</text>
                
                {/* Parks/Green Spaces */}
                <circle cx="650" cy="200" r="50" fill="#a5d8a5" opacity="0.4"/>
                <text x="650" y="205" textAnchor="middle" fontSize="11" fill="#2f9e44" fontWeight="600">Joaquin Miller</text>
                
                <rect x="150" y="150" width="80" height="60" rx="10" fill="#a5d8a5" opacity="0.4"/>
                <text x="190" y="185" textAnchor="middle" fontSize="11" fill="#2f9e44" fontWeight="600">Mosswood</text>
                
                {/* Major Streets - Highway 580 */}
                <line x1="0" y1="250" x2="800" y2="280" stroke="#94a3b8" strokeWidth="8" opacity="0.5"/>
                <text x="400" y="270" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">I-580</text>
                
                {/* Highway 880 */}
                <line x1="200" y1="0" x2="350" y2="600" stroke="#94a3b8" strokeWidth="8" opacity="0.5"/>
                <text x="250" y="300" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">I-880</text>
                
                {/* Telegraph Ave */}
                <line x1="100" y1="0" x2="180" y2="600" stroke="#cbd5e0" strokeWidth="4" opacity="0.6"/>
                
                {/* Broadway */}
                <line x1="280" y1="0" x2="350" y2="600" stroke="#cbd5e0" strokeWidth="4" opacity="0.6"/>
                
                {/* International Blvd */}
                <line x1="400" y1="0" x2="500" y2="600" stroke="#cbd5e0" strokeWidth="4" opacity="0.6"/>
                
                {/* MacArthur Blvd */}
                <line x1="500" y1="100" x2="700" y2="400" stroke="#cbd5e0" strokeWidth="4" opacity="0.6"/>
                
                {/* Neighborhood Labels */}
                <text x="140" y="140" fontSize="16" fill="#1e293b" fontWeight="700" opacity="0.7">Temescal</text>
                <text x="280" y="200" fontSize="16" fill="#1e293b" fontWeight="700" opacity="0.7">Downtown</text>
                <text x="450" y="450" fontSize="16" fill="#1e293b" fontWeight="700" opacity="0.7">Fruitvale</text>
                <text x="580" y="250" fontSize="16" fill="#1e293b" fontWeight="700" opacity="0.7">Montclair</text>
                <text x="150" y="100" fontSize="16" fill="#1e293b" fontWeight="700" opacity="0.7">Rockridge</text>
                
                {/* Restaurant Markers */}
                {restaurants.map((restaurant, index) => {
                  const positions = [
                    { x: 460, y: 440 }, // Khana Peena - Fruitvale
                    { x: 150, y: 230 }, // Café Romanat - Temescal
                    { x: 420, y: 480 }, // Cholita Linda - Fruitvale
                    { x: 610, y: 280 }, // Daughter Thai - Montclair
                    { x: 170, y: 120 }, // Belotti Ristorante - Rockridge
                  ];
                  
                  const pos = positions[index];
                  const isVisited = visitedRestaurants.includes(restaurant.id);
                  const isSelected = selectedMapRestaurant?.id === restaurant.id;
                  
                  return (
                    <g 
                      key={restaurant.id}
                      onClick={() => setSelectedMapRestaurant(restaurant)}
                      className="cursor-pointer transition-transform hover:scale-110"
                      style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                    >
                      {/* Pin shadow */}
                      <ellipse cx={pos.x} cy={pos.y + 35} rx="12" ry="4" fill="black" opacity="0.2"/>
                      
                      {/* Pin body */}
                      <circle 
                        cx={pos.x} 
                        cy={pos.y} 
                        r={isSelected ? "28" : "24"} 
                        fill={isVisited ? "#10b981" : "#ef4444"}
                        stroke="white"
                        strokeWidth="3"
                        className={!isVisited ? "animate-pulse" : ""}
                      />
                      
                      {/* Pin point */}
                      <path 
                        d={`M ${pos.x} ${pos.y + 24} L ${pos.x - 8} ${pos.y + 32} L ${pos.x + 8} ${pos.y + 32} Z`}
                        fill={isVisited ? "#10b981" : "#ef4444"}
                      />
                      
                      {/* Restaurant emoji */}
                      <text 
                        x={pos.x} 
                        y={pos.y + 8} 
                        textAnchor="middle" 
                        fontSize="20"
                      >
                        {restaurant.image}
                      </text>
                      
                      {/* Selected indicator */}
                      {isSelected && (
                        <circle 
                          cx={pos.x} 
                          cy={pos.y} 
                          r="32" 
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          opacity="0.6"
                        />
                      )}
                      
                      {/* Hover tooltip background */}
                      <g opacity="0" className="group-hover:opacity-100 transition-opacity pointer-events-none">
                        <rect 
                          x={pos.x - 70} 
                          y={pos.y - 70} 
                          width="140" 
                          height="50" 
                          rx="8"
                          fill="white"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                        <text 
                          x={pos.x} 
                          y={pos.y - 48} 
                          textAnchor="middle" 
                          fontSize="12" 
                          fontWeight="700"
                          fill="#1e293b"
                        >
                          {restaurant.name}
                        </text>
                        <text 
                          x={pos.x} 
                          y={pos.y - 33} 
                          textAnchor="middle" 
                          fontSize="10"
                          fill="#64748b"
                        >
                          {restaurant.cuisine}
                        </text>
                      </g>
                    </g>
                  );
                })}
                
                {/* Map Border */}
                <rect x="1" y="1" width="798" height="598" fill="none" stroke="#cbd5e0" strokeWidth="2"/>
              </svg>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Visited</span>
              </div>
              <div className="text-gray-500">Click pins to view details</div>
            </div>
          </div>

          {/* Selected Restaurant Detail Card */}
          {selectedMapRestaurant && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  <div className="text-6xl">{selectedMapRestaurant.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold">{selectedMapRestaurant.name}</h3>
                      {visitedRestaurants.includes(selectedMapRestaurant.id) && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Visited
                        </div>
                      )}
                    </div>
                    <p className="text-lg text-gray-700 mb-2">
                      {selectedMapRestaurant.cuisine} • {selectedMapRestaurant.neighborhood}
                    </p>
                    <p className="text-gray-600 mb-3">{selectedMapRestaurant.description}</p>
                    <p className="text-sm text-gray-700 mb-3">
                      📍 {selectedMapRestaurant.address}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={18} />
                        <span className="font-semibold">{selectedMapRestaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="text-blue-500" size={18} />
                        <span>{selectedMapRestaurant.distance} mi</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor(selectedMapRestaurant.rarity)}`}>
                        {selectedMapRestaurant.rarity}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full text-lg font-bold mb-3">
                    +{selectedMapRestaurant.points} pts
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRestaurant(selectedMapRestaurant);
                      setShowQRScanner(true);
                    }}
                    className={`px-6 py-3 rounded-full font-semibold transition ${
                      visitedRestaurants.includes(selectedMapRestaurant.id)
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    disabled={visitedRestaurants.includes(selectedMapRestaurant.id)}
                  >
                    {visitedRestaurants.includes(selectedMapRestaurant.id) ? 'Visited' : 'Check In'}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedMapRestaurant(null)}
                className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
              >
                ✕ Close
              </button>
            </div>
          )}

          {/* Restaurant List */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">
              {filter === 'all' ? 'All Restaurants' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Restaurants`}
            </h2>
          </div>
          <div className="space-y-4 mb-8">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <div className="text-5xl flex-shrink-0">{restaurant.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        {visitedRestaurants.includes(restaurant.id) && (
                          <Check className="text-green-600 flex-shrink-0" size={20} />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{restaurant.cuisine} • {restaurant.neighborhood}</p>
                      <p className="text-sm text-gray-500 mb-2">{restaurant.description}</p>
                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={16} />
                          <span className="font-semibold">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="text-blue-500" size={16} />
                          <span>{restaurant.distance} mi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-flex items-center gap-1">
                      <Trophy size={14} />
                      +{restaurant.points} pts
                    </div>
                    <div className={`text-xs font-semibold mb-3 px-3 py-1 rounded-full inline-block ${getRarityColor(restaurant.rarity)}`}>
                      {restaurant.rarity}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setShowQRScanner(true);
                      }}
                      className={`px-6 py-2 rounded-full font-semibold transition w-full ${
                        visitedRestaurants.includes(restaurant.id)
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                      disabled={visitedRestaurants.includes(restaurant.id)}
                    >
                      {visitedRestaurants.includes(restaurant.id) ? 'Visited' : 'Check In'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try a different filter to see more options!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const RewardsPage = () => {
    const rewards = [
      {
        id: 1,
        name: "Free Appetizer",
        description: "Redeem at any participating restaurant",
        points: 100,
        icon: "🥗",
        color: "green"
      },
      {
        id: 2,
        name: "15% Off Coupon",
        description: "Valid for one week at select locations",
        points: 200,
        icon: "🎫",
        color: "orange"
      },
      {
        id: 3,
        name: "Free Meal",
        description: "Complete meal at featured restaurant",
        points: 1500,
        icon: "🍽️",
        color: "purple"
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 pb-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Rewards</h1>
            <p className="text-xl text-gray-600">Redeem your points for amazing perks!</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-5xl font-bold text-green-600 mb-2">{userPoints}</h2>
              <p className="text-gray-600">Available Points</p>
            </div>

            {/* Oakland Eats Passport */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Oakland Eats Passport</h3>
              <div className="grid grid-cols-5 gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg ${
                      visitedRestaurants.includes(i)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    } flex items-center justify-center text-2xl`}
                  >
                    {visitedRestaurants.includes(i) ? '✓' : ''}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {visitedRestaurants.length}/5 restaurants visited
              </p>
            </div>

            {/* Available Rewards */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold mb-4">Available Rewards</h3>
              
              {rewards.map((reward) => (
                <div 
                  key={reward.id}
                  className={`border-2 ${
                    reward.color === 'green' ? 'border-green-200 bg-green-50' :
                    reward.color === 'orange' ? 'border-orange-200 bg-orange-50' :
                    'border-purple-200 bg-purple-50'
                  } rounded-xl p-4`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-4xl">{reward.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-lg">{reward.name}</h4>
                        <span className={`${
                          reward.color === 'green' ? 'bg-green-600' :
                          reward.color === 'orange' ? 'bg-orange-600' :
                          'bg-purple-600'
                        } text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                          {reward.points} pts
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedReward(reward);
                      setShowRedeemQR(true);
                    }}
                    disabled={userPoints < reward.points}
                    className={`w-full py-2 rounded-lg font-semibold transition ${
                      userPoints >= reward.points
                        ? `${
                          reward.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                          reward.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                          'bg-purple-600 hover:bg-purple-700'
                        } text-white`
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= reward.points ? 'Redeem Now' : `Need ${reward.points - userPoints} more points`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'discover' && <DiscoverPage />}
      {currentPage === 'rewards' && <RewardsPage />}

      {showQRScanner && selectedRestaurant && (
        <QRScanner restaurant={selectedRestaurant} />
      )}

      {showRedeemQR && selectedReward && (
        <RedeemQRScanner reward={selectedReward} />
      )}

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
                currentPage === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Home size={24} />
              <span className="text-xs font-semibold">Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('discover')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
                currentPage === 'discover' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <MapPin size={24} />
              <span className="text-xs font-semibold">Discover</span>
            </button>
            <button
              onClick={() => setCurrentPage('rewards')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
                currentPage === 'rewards' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Trophy size={24} />
              <span className="text-xs font-semibold">Rewards</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;