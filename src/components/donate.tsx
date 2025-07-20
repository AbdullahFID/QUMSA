'use client'
import React, { useState } from 'react';
import {
  HeartHandshake,
  HandCoins,
  Target,
  Users,
  Book,
  Coffee,
  Building,
  Calendar,
  Star,
  TrendingUp,
  Mail,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

// Configurable arrays for easy management by exec members
const DONATION_CONFIG = {
  // Fundraising goal configuration
  goal: {
    title: "Annual Operations Fund",
    target: 15000,
    current: 8750,
    description: "Help us reach our goal to fund all QUMSA programs for the year"
  },
  
  // Where proceeds go - easily configurable
  proceedsAllocation: [
    {
      icon: Calendar,
      title: "Events & Programs",
      percentage: 40,
      description: "Eid celebrations, Islamic awareness week, social events"
    },
    {
      icon: Book,
      title: "Educational Resources",
      percentage: 25,
      description: "Islamic books, prayer materials, educational workshops"
    },
    {
      icon: Coffee,
      title: "Student Services",
      percentage: 20,
      description: "Free meals during exams, student support programs"
    },
    {
      icon: Building,
      title: "Prayer Space Maintenance",
      percentage: 15,
      description: "Keeping our prayer spaces clean and well-equipped"
    }
  ],
  
  // E-transfer details
  etransfer: {
    email: "treasurer@qumsa.ca",
    message: "Please include your name and 'QUMSA Donation' in the message"
  },
  
};

export default function ModernDonate() {
  const [emailCopied, setEmailCopied] = useState(false);
  
  const progressPercentage = (DONATION_CONFIG.goal.current / DONATION_CONFIG.goal.target) * 100;
  
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_CONFIG.etransfer.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.log('Copy failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-48 h-48 md:w-96 md:h-96 bg-yellow-500/5 md:bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-green-500/5 md:bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-blue-500/3 md:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-8 text-center">
          <div className="max-w-4xl mx-auto px-4">
 
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
              Support <span className="bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">QUMSA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
              Your contribution builds stronger faith, friendship, and community at Queen's University. 
              <span className="text-yellow-400 font-medium block sm:inline mt-1 sm:mt-0"> Every dollar makes a difference.</span>
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-32">
          {/* Data Disclaimer */}
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-400 mb-1">Data Update Notice</h3>
                <p className="text-sm text-yellow-200/80 leading-relaxed">
                  The fundraising progress and statistics displayed on this page are updated periodically and may not reflect the most current QUMSA donation totals or activities.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Stack everything vertically */}
          <div className="lg:hidden space-y-6">
            {/* Goal Progress Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-bold text-white">{DONATION_CONFIG.goal.title}</h2>
              </div>
              
              <div className="bg-slate-700/50 rounded-full h-3 mb-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-green-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm mb-3">
                <span className="text-slate-300">
                  <span className="font-bold text-green-400 text-lg">${DONATION_CONFIG.goal.current.toLocaleString()}</span> raised
                </span>
                <span className="text-slate-400">
                  Goal: <span className="font-bold text-lg">${DONATION_CONFIG.goal.target.toLocaleString()}</span>
                </span>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed">{DONATION_CONFIG.goal.description}</p>
            </div>

            {/* E-Transfer Section */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl flex-shrink-0 self-start sm:self-auto">
                    <HandCoins className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white mb-4 text-center sm:text-left">E-Transfer Instructions</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
                          <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <span className="text-base font-medium text-slate-300">Send to:</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <code className="bg-slate-700 px-4 py-3 rounded-lg text-base text-yellow-400 font-mono w-full sm:flex-1 text-center sm:text-left break-all">
                            {DONATION_CONFIG.etransfer.email}
                          </code>
                          <button
                            onClick={copyEmail}
                            className="p-3 hover:bg-slate-600 rounded-lg transition-colors flex-shrink-0 bg-slate-700/50 w-full sm:w-auto justify-center flex items-center gap-2"
                            aria-label="Copy email"
                          >
                            {emailCopied ? (
                              <>
                                <Check className="w-5 h-5 text-green-400" />
                                <span className="sm:hidden text-green-400 font-medium">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-5 h-5 text-slate-400" />
                                <span className="sm:hidden text-slate-400 font-medium">Copy Email</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700/20 rounded-lg p-4 text-center sm:text-left">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {DONATION_CONFIG.etransfer.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Where Your Donation Goes */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Where Your Donation Goes
              </h3>
              
              <div className="space-y-4">
                {DONATION_CONFIG.proceedsAllocation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-yellow-400/20 to-green-500/20 p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                          <Icon className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                            <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded-full self-start">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-8">
                        <div className="bg-slate-700/30 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-green-500 h-2 rounded-full transition-all duration-1000 delay-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Layout: Two-column grid */}
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Goal Progress Card - Full width on desktop */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Target className="w-8 h-8 text-green-400" />
                    <h2 className="text-3xl font-bold text-white">{DONATION_CONFIG.goal.title}</h2>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-full h-6 mb-6 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-green-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-left">
                      <div className="text-3xl font-bold text-green-400">${DONATION_CONFIG.goal.current.toLocaleString()}</div>
                      <div className="text-slate-300">raised</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl text-slate-400">Goal:</div>
                      <div className="text-2xl font-bold text-white">${DONATION_CONFIG.goal.target.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-lg leading-relaxed">{DONATION_CONFIG.goal.description}</p>
                </div>

                {/* Where Your Donation Goes - Desktop optimized */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <TrendingUp className="w-7 h-7 text-green-400" />
                    Where Your Donation Goes
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {DONATION_CONFIG.proceedsAllocation.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="group bg-slate-800/30 rounded-2xl p-6 hover:bg-slate-800/50 transition-all">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-yellow-400/20 to-green-500/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                                <span className="text-sm font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                                  {item.percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="bg-slate-700/30 rounded-full h-3 mb-3">
                              <div 
                                className="bg-gradient-to-r from-yellow-400 to-green-500 h-3 rounded-full transition-all duration-1000 delay-300"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar (1/3 width) */}
              <div className="space-y-8">
                {/* E-Transfer Section - Sticky sidebar */}
                <div className="sticky top-8 z-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
                  <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <div className="bg-blue-500/20 p-4 rounded-2xl inline-flex mb-4">
                        <HandCoins className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">Quick Donate</h3>
                      <p className="text-slate-400 text-sm mt-2">Send via E-Transfer</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3 justify-center">
                          <Mail className="w-5 h-5 text-slate-400" />
                          <span className="text-base font-medium text-slate-300">Send to:</span>
                        </div>
                        <div className="space-y-3">
                          <code className="bg-slate-700 px-4 py-3 rounded-lg text-base text-yellow-400 font-mono block text-center break-all">
                            {DONATION_CONFIG.etransfer.email}
                          </code>
                          <button
                            onClick={copyEmail}
                            className="w-full p-3 hover:bg-slate-600 rounded-lg transition-colors bg-slate-700/50 flex items-center justify-center gap-2"
                            aria-label="Copy email"
                          >
                            {emailCopied ? (
                              <>
                                <Check className="w-5 h-5 text-green-400" />
                                <span className="text-green-400 font-medium">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-400 font-medium">Copy Email</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700/20 rounded-lg p-4 text-center">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {DONATION_CONFIG.etransfer.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}