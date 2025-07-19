'use client';

import React, { useState, useEffect } from 'react';
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

  // Sample halal food spots data
  const halalSpots: HalalSpot[] = [
    {
      id: 1,
      name: "Shawarma Palace",
      type: "restaurant",
      cuisine: "Middle Eastern",
      rating: 4.8,
      priceRange: "$$",
      address: "123 Princess St, Kingston, ON",
      phone: "(613) 555-0123",
      hours: "11:00 AM - 10:00 PM",
      website: "shawarmapalace.ca",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      coordinates: { lat: 44.2312, lng: -76.486 },
      verified: true,
      description:
        "Authentic Middle Eastern cuisine with fresh ingredients and traditional recipes."
    },
    {
      id: 2,
      name: "Halal Guys Kingston",
      type: "restaurant",
      cuisine: "American-Middle Eastern",
      rating: 4.6,
      priceRange: "$",
      address: "456 Bath Rd, Kingston, ON",
      phone: "(613) 555-0456",
      hours: "11:00 AM - 11:00 PM",
      website: "thehalalguys.com",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      coordinates: { lat: 44.2501, lng: -76.5235 },
      verified: true,
      description:
        "Famous for their chicken and rice platters with signature white and hot sauce."
    },
    {
      id: 3,
      name: "Bismillah Grocery",
      type: "grocery",
      cuisine: "Halal Market",
      rating: 4.7,
      priceRange: "$",
      address: "789 Division St, Kingston, ON",
      phone: "(613) 555-0789",
      hours: "9:00 AM - 9:00 PM",
      website: null,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      coordinates: { lat: 44.2411, lng: -76.5011 },
      verified: true,
      description:
        "Fresh halal meat, groceries, and specialty items from around the world."
    },
    {
      id: 4,
      name: "Makkah Restaurant",
      type: "restaurant",
      cuisine: "Pakistani",
      rating: 4.9,
      priceRange: "$$",
      address: "321 Ontario St, Kingston, ON",
      phone: "(613) 555-0321",
      hours: "12:00 PM - 10:00 PM",
      website: "makkahrestaurant.ca",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      coordinates: { lat: 44.228, lng: -76.4951 },
      verified: true,
      description:
        "Authentic Pakistani and Indian cuisine with aromatic spices and traditional cooking methods."
    },
    {
      id: 5,
      name: "Sultan's Kitchen",
      type: "cafe",
      cuisine: "Turkish",
      rating: 4.5,
      priceRange: "$",
      address: "654 King St E, Kingston, ON",
      phone: "(613) 555-0654",
      hours: "8:00 AM - 8:00 PM",
      website: null,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      coordinates: { lat: 44.2344, lng: -76.4812 },
      verified: false,
      description:
        "Turkish café serving traditional breakfast, coffee, and light meals."
    }
  ];

  const filteredSpots = halalSpots.filter((spot) => {
    const q = searchQuery.toLowerCase();
    return (
      spot.name.toLowerCase().includes(q) ||
      spot.cuisine.toLowerCase().includes(q)
    );
  });

  const getDirections = (spot: HalalSpot) => {
    window.open(
      `https://maps.google.com/maps?daddr=${encodeURIComponent(spot.address)}`,
      "_blank"
    );
  };

  const featuredSpots = halalSpots.filter(
    (s) => s.verified && s.rating >= 4.7
  );

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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-yellow-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="relative pt-20 sm:pt-32 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl flex items-center justify-center shadow-2xl border border-blue-700/50">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Halal Food Map
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 font-medium">
                Kingston & Queen's University
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
            <input
              type="text"
              placeholder="Search halal restaurants, groceries, cafés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 outline-none transition-all duration-300 text-white placeholder-gray-400 shadow-lg hover:bg-white/10"
            />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
        {!isSearching ? (
          <>
            {/* Featured Spots */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    Featured Halal Spots
                  </h2>
                  <p className="text-lg text-gray-400">
                    Top-rated halal locations
                  </p>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Premium Selection</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSpots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-3xl hover:border-white/20 transition-all duration-500 hover:scale-105">
                      <div
                        className="h-48 sm:h-56 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${spot.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-400" />
                            {spot.rating}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {spot.name}
                          </h3>
                          <span className="text-gray-300 text-sm font-medium">
                            {spot.priceRange}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full">
                            {spot.cuisine}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {spot.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-400 text-sm flex-1 min-w-0">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-400" />
                            <span className="truncate">
                              {spot.address.split(",")[0]}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              getDirections(spot);
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-200 flex items-center space-x-1 ml-3 shadow-lg hover:shadow-xl"
                          >
                            <Navigation className="w-4 h-4" />
                            <span className="hidden sm:inline">Directions</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Stats */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Quick Stats
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Locations</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        {halalSpots.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Avg Rating</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        {(
                          halalSpots.reduce((sum, s) => sum + s.rating, 0) /
                          halalSpots.length
                        ).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected Spot Details */}
                {selectedSpot && (
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    <div
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${selectedSpot.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">
                          {selectedSpot.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-gray-300">
                            {selectedSpot.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full">
                          {selectedSpot.cuisine}
                        </span>
                        <span className="text-gray-300 text-sm font-medium">
                          {selectedSpot.priceRange}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-6">
                        {selectedSpot.description}
                      </p>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">
                            {selectedSpot.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">
                            {selectedSpot.hours}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">
                            {selectedSpot.phone}
                          </span>
                        </div>
                        {selectedSpot.website && (
                          <div className="flex items-center space-x-3">
                            <Globe className="w-4 h-4 text-yellow-400" />
                            <a
                              href={`https://${selectedSpot.website}`}
                              className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                              {selectedSpot.website}
                            </a>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => getDirections(selectedSpot)}
                        className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:from-yellow-300 hover:to-amber-400"
                      >
                        <Navigation className="w-5 h-5" />
                        <span>Get Directions</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* All Spots List */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    All Halal Spots{" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">({halalSpots.length})</span>
                  </h2>
                </div>
                <div className="space-y-6">
                  {halalSpots.map((spot) => (
                    <div
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 overflow-hidden hover:shadow-xl hover:border-white/20 transition-all duration-300 hover:scale-102">
                        <div className="flex flex-col sm:flex-row">
                          <div
                            className="sm:w-48 h-32 sm:h-auto bg-cover bg-center relative flex-shrink-0"
                            style={{ backgroundImage: `url(${spot.image})` }}
                          >
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-200" />
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                                {spot.name}
                              </h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-semibold text-gray-300">
                                  {spot.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full">
                                {spot.cuisine}
                              </span>
                              <span className="text-gray-300 text-sm">
                                {spot.priceRange}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {spot.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-gray-400 text-sm flex-1 min-w-0">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-400" />
                                <span className="truncate">{spot.address}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  getDirections(spot);
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-200 flex items-center space-x-1 ml-3 shadow-lg"
                              >
                                <Navigation className="w-4 h-4" />
                                <span className="hidden sm:inline">Directions</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Search Results */
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Search Results{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">({filteredSpots.length})</span>
              </h2>
              <p className="text-gray-400">Results for "{searchQuery}"</p>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <Search className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-400 text-lg">
                  Try adjusting your search terms or browse all locations
                </p>
              </div>
            ) : (
              filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 overflow-hidden hover:shadow-xl hover:border-white/20 transition-all duration-300 hover:scale-102">
                    <div className="flex flex-col sm:flex-row">
                      <div
                        className="sm:w-48 h-32 sm:h-auto bg-cover bg-center relative flex-shrink-0"
                        style={{ backgroundImage: `url(${spot.image})` }}
                      >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-200" />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {spot.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold text-gray-300">
                              {spot.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full">
                            {spot.cuisine}
                          </span>
                          <span className="text-gray-300 text-sm">
                            {spot.priceRange}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {spot.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-400" />
                            <span className="truncate">{spot.address}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock className="w-4 h-4 mr-1 text-yellow-400" />
                              <span>{spot.hours}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                getDirections(spot);
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-200 flex items-center space-x-1 shadow-lg"
                            >
                              <Navigation className="w-4 h-4" />
                              <span className="hidden sm:inline">
                                Directions
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-yellow-400 to-amber-500" />
    </div>
  );
};

export default HalalFoodMap;
