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

  // Sample halal food spots data - Easy for executives to update!
  const halalSpots: HalalSpot[] = [
    {
        "id": 1,
        "name": "Limestone Kabob House",
        "type": "restaurant",
        "cuisine": "Afghan, Pakistani, Indian, Middle Eastern, Moroccan",
        "rating": 4.4,
        "priceRange": "$$",
        "address": "251 Princess St, Kingston, ON K7L 1B5",
        "phone": "(613) 634-9600",
        "hours": "4:00 P.M - 9:00 P.M",
        "website": "https://www.limestonekabob.com",
        "image": "https://www.fbgcdn.com/pictures/e2676215-182b-4fbf-a5f0-b12b523ca3ba.jpg",
        "coordinates": {
          "lat": 44.2575027,
          "lng": -76.5703786
        },
        "verified": true,
        "description": "Limestone Kabob House - a fusion restaurant in the heart of Kingston, Ontario. Enjoy a nice dinner with your family, friends. Contemporary style seating , beautiful tapestry and authentic homemade food creates a relaxing atmosphere."
      },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-amber-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/70 to-navy-900/50" />
        <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-amber-400/10 to-yellow-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/15 to-slate-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="relative pt-16 sm:pt-24 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl border border-amber-300/30">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-1">
                Halal Food Map
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-amber-200 font-medium">
                Kingston & Queen's University
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-40 bg-slate-900/98 backdrop-blur-xl border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-300 z-10" />
            <input
              type="text"
              placeholder="Search halal restaurants, groceries, cafés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-amber-200/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all duration-300 text-slate-800 placeholder-slate-500 shadow-xl hover:bg-white text-base font-medium hover:shadow-2xl focus:shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-16 sm:pb-24">
        {!isSearching ? (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-400/20 p-5 sm:p-6 mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-amber-300 mb-4 sm:mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-100 text-sm sm:text-base">Total Locations</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                      {halalSpots.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-100 text-sm sm:text-base">Avg Rating</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
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
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-400/20 overflow-hidden">
                  <div
                    className="h-36 sm:h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${selectedSpot.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-amber-300 flex-1 pr-2">
                        {selectedSpot.name}
                      </h3>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-amber-200">
                          {selectedSpot.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs sm:text-sm font-medium rounded-full">
                        {selectedSpot.cuisine}
                      </span>
                      <span className="text-amber-200 text-xs sm:text-sm font-medium">
                        {selectedSpot.priceRange}
                      </span>
                    </div>
                    <p className="text-amber-100 text-sm mb-4 sm:mb-6 leading-relaxed">
                      {selectedSpot.description}
                    </p>
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                          {selectedSpot.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-amber-100">
                          {selectedSpot.hours}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-amber-100">
                          {selectedSpot.phone}
                        </span>
                      </div>
                      {selectedSpot.website && (
                        <div className="flex items-center space-x-3">
                          <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <a
                            href={`https://${selectedSpot.website}`}
                            className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            {selectedSpot.website}
                          </a>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => getDirections(selectedSpot)}
                      className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:from-amber-300 hover:to-yellow-400 text-sm sm:text-base"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* All Spots List */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  All Halal Spots{" "}
                  <span className="text-base sm:text-lg lg:text-xl">({halalSpots.length})</span>
                </h2>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {halalSpots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-amber-400/20 overflow-hidden hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex flex-col sm:flex-row">
                        <div
                          className="w-full sm:w-40 md:w-48 h-32 sm:h-auto bg-cover bg-center relative flex-shrink-0"
                          style={{ backgroundImage: `url(${spot.image})` }}
                        >
                          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-all duration-200" />
                        </div>
                        <div className="flex-1 p-4 sm:p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-amber-300 group-hover:text-amber-200 transition-colors flex-1 pr-2">
                              {spot.name}
                            </h3>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-semibold text-amber-200">
                                {spot.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-medium rounded-full">
                              {spot.cuisine}
                            </span>
                            <span className="text-amber-200 text-xs">
                              {spot.priceRange}
                            </span>
                          </div>
                          <p className="text-amber-100 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                            {spot.description}
                          </p>
                          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start text-amber-200 text-xs sm:text-sm flex-1 min-w-0">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 text-amber-400 mt-0.5" />
                              <span className="truncate leading-relaxed">{spot.address}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                getDirections(spot);
                              }}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center sm:justify-start space-x-1 sm:ml-3 shadow-lg self-start sm:self-center"
                            >
                              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Directions</span>
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
        ) : (
          /* Search Results */
          <div className="space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-2">
                Search Results{" "}
                <span className="text-base sm:text-lg lg:text-xl">({filteredSpots.length})</span>
              </h2>
              <p className="text-amber-200 text-sm sm:text-base">Results for "{searchQuery}"</p>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/60 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-amber-400/20">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-300 mb-2">
                  No results found
                </h3>
                <p className="text-amber-200 text-sm sm:text-lg">
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
                  <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-amber-400/20 overflow-hidden hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex flex-col sm:flex-row">
                      <div
                        className="w-full sm:w-40 md:w-48 h-32 sm:h-auto bg-cover bg-center relative flex-shrink-0"
                        style={{ backgroundImage: `url(${spot.image})` }}
                      >
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-all duration-200" />
                      </div>
                      <div className="flex-1 p-4 sm:p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-amber-300 group-hover:text-amber-200 transition-colors flex-1 pr-2">
                            {spot.name}
                          </h3>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-semibold text-amber-200">
                              {spot.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-medium rounded-full">
                            {spot.cuisine}
                          </span>
                          <span className="text-amber-200 text-xs">
                            {spot.priceRange}
                          </span>
                        </div>
                        <p className="text-amber-100 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                          {spot.description}
                        </p>
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-start text-amber-200 text-xs sm:text-sm">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 text-amber-400 mt-0.5" />
                            <span className="truncate leading-relaxed">{spot.address}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center text-amber-200 text-xs sm:text-sm">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-amber-400" />
                              <span>{spot.hours}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                getDirections(spot);
                              }}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-200 flex items-center space-x-1 shadow-lg self-start"
                            >
                              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Directions</span>
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
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
    </div>
  );
};

export default HalalFoodMap;