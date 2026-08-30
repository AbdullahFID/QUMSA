'use client';

import React, { useState, useEffect } from 'react';
import halalData from '@/content/halal.json';
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Search,
  Navigation,
  Award
} from 'lucide-react';


// Type definitions
interface HalalSpot {
  id: number;
  name: string;
  type: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  address: string;
  phone: string;
  hours: string;
  website: string | null;
  image: string;
  coordinates: { lat: number; lng: number };
  verified: boolean;
  description: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

const HalalFoodMap = () => {
  const [selectedSpot, setSelectedSpot] = useState<HalalSpot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  // Sample halal food spots data - Easy for executives to update!
  // Managed through QUMSA ADMIN (/admin) — stored in src/content/halal.json
  const halalSpots: HalalSpot[] = halalData.spots;

  const filteredSpots = halalSpots.filter((spot) => {
    const q = searchQuery.toLowerCase();
    return (
      spot.name.toLowerCase().includes(q) ||
      spot.cuisine.toLowerCase().includes(q)
    );
  });

  const getDirections = (spot: HalalSpot) => {
    const { lat, lng } = spot.coordinates;
    let url = `https://maps.google.com/maps?daddr=${lat},${lng} (${encodeURIComponent(spot.address)})`;
    if (userLocation) {
      url += `&saddr=${userLocation.lat},${userLocation.lng}`;
    }
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }),
        () => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  const isSearching = searchQuery.trim() !== "";

  // Helper to render cuisine tags
  const renderCuisineTags = (cuisine: string) => {
    const cuisines = cuisine.split(', ').map(c => c.trim());
    const displayCount = 2;
    const remaining = cuisines.length - displayCount;
    
    return (
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {cuisines.slice(0, displayCount).map((c, i) => (
          <span
            key={i}
            className="px-2 py-0.5 bg-linear-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-medium rounded-full whitespace-nowrap"
          >
            {c}
          </span>
        ))}
        {remaining > 0 && (
          <span className="text-amber-300 text-xs whitespace-nowrap">
            +{remaining} more
          </span>
        )}
        <span className="text-amber-200 text-xs ml-1">$$</span>
      </div>
    );
  };

  // Card component for reuse
  const SpotCard = ({ spot }: { spot: HalalSpot }) => (
    <div
      onClick={() => setSelectedSpot(spot)}
      className="group cursor-pointer w-full"
    >
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-amber-400/20 overflow-hidden hover:shadow-xl hover:border-amber-400/40 transition-all duration-300">
        {/* Image - full width on mobile */}
        <div
          className="w-full h-40 sm:h-32 md:h-40 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${spot.image})` }}
        >
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-all duration-200" />
          {/* Rating badge on image */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-amber-200">{spot.rating}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-amber-300 group-hover:text-amber-200 transition-colors mb-2 line-clamp-1">
            {spot.name}
          </h3>
          
          {/* Cuisine tags */}
          {renderCuisineTags(spot.cuisine)}
          
          {/* Description */}
          <p className="text-amber-100/80 text-sm mb-3 line-clamp-2 leading-relaxed">
            {spot.description}
          </p>
          
          {/* Address */}
          <div className="flex items-start gap-2 text-amber-200/70 text-sm mb-3">
            <MapPin className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span className="line-clamp-1">{spot.address}</span>
          </div>
          
          {/* Directions button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              getDirections(spot);
            }}
            className="w-full py-2.5 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 text-sm font-semibold rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen text-amber-50 relative"
      style={{ 
        background: 'linear-gradient(to bottom right, #0f172a, #1e3a5f, #0f172a)',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}
    >
      {/* Animated Background - contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="absolute inset-0 bg-linear-to-br from-slate-900/50 via-blue-900/70 to-slate-900/50" />
        <div 
          className="absolute top-0 w-72 h-72 md:w-96 md:h-96 bg-linear-to-r from-amber-400/10 to-yellow-400/15 rounded-full blur-3xl animate-pulse"
          style={{ left: '10%' }}
        />
        <div 
          className="absolute bottom-0 w-72 h-72 md:w-96 md:h-96 bg-linear-to-r from-blue-600/15 to-slate-600/10 rounded-full blur-3xl animate-pulse"
          style={{ right: '10%', animationDelay: '1s' }}
        />
      </div>

      {/* Header */}
      <div className="relative pt-12 sm:pt-20 pb-4 sm:pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl border border-amber-300/30 shrink-0">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Halal Food Map
              </h1>
              <p className="text-sm sm:text-lg text-amber-200/80 font-medium">
                Kingston & Queen's University
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 z-10" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/80 backdrop-blur-xl rounded-xl border border-amber-400/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all duration-300 text-amber-50 placeholder-amber-200/50 text-base"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 pb-20">
        {!isSearching ? (
          <>
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-slate-800/40 backdrop-blur rounded-xl border border-amber-400/10">
              <div>
                <span className="text-amber-300 text-lg sm:text-xl font-bold">{halalSpots.length}</span>
                <span className="text-amber-200/70 text-sm ml-2">Halal Spots</span>
              </div>
              <div>
                <span className="text-amber-300 text-lg sm:text-xl font-bold">
                  {(halalSpots.reduce((sum, s) => sum + s.rating, 0) / halalSpots.length).toFixed(1)}
                </span>
                <span className="text-amber-200/70 text-sm ml-2">Avg Rating</span>
              </div>
            </div>

            {/* Section Header */}
            <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-4">
              All Halal Spots
            </h2>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {halalSpots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          </>
        ) : (
          /* Search Results */
          <>
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Results for "{searchQuery}"
              </h2>
              <p className="text-amber-200/70 text-sm">{filteredSpots.length} spots found</p>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-800/60 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
                  <Search className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-amber-300 mb-2">No results found</h3>
                <p className="text-amber-200/70 text-sm">Try different search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSpots.map((spot) => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Selected Spot Modal/Drawer - Mobile friendly */}
      {selectedSpot && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setSelectedSpot(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="relative w-full sm:max-w-lg bg-slate-800 sm:rounded-2xl rounded-t-2xl shadow-2xl border border-amber-400/20 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close handle for mobile */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-amber-400/50 rounded-full" />
            </div>
            
            {/* Image */}
            <div
              className="h-48 sm:h-56 bg-cover bg-center relative sm:rounded-t-2xl"
              style={{ backgroundImage: `url(${selectedSpot.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-slate-800 via-slate-800/30 to-transparent" />
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 backdrop-blur rounded-full flex items-center justify-center text-amber-200 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-amber-300 flex-1 pr-3">
                  {selectedSpot.name}
                </h3>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-lg font-semibold text-amber-200">{selectedSpot.rating}</span>
                </div>
              </div>
              
              {renderCuisineTags(selectedSpot.cuisine)}
              
              <p className="text-amber-100/80 text-sm mb-5 leading-relaxed">
                {selectedSpot.description}
              </p>
              
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-amber-100">{selectedSpot.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm text-amber-100">{selectedSpot.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm text-amber-100">{selectedSpot.phone}</span>
                </div>
                {selectedSpot.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href={selectedSpot.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors truncate"
                    >
                      {selectedSpot.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => getDirections(selectedSpot)}
                className="w-full py-3 bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:from-amber-300 hover:to-yellow-400"
              >
                <Navigation className="w-5 h-5" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Accent */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 z-30" />
    </div>
  );
};

export default HalalFoodMap;