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

// Define the Star interface for TypeScript
interface StarType {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const AnimatedBackground = () => {
  const [stars, setStars] = React.useState<StarType[]>([]);

  React.useEffect(() => {
    const starArray: StarType[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setStars(starArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-900 to-navy-900" />

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-linear-to-r from-blue-600/10 to-slate-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-48 h-48 bg-linear-to-r from-amber-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
};

const DONATION_CONFIG = {
  goal: {
    title: "Annual Operations Fund",
    target: 15000,
    current: 8750,
    description: "Help us reach our goal to fund all QUMSA programs for the year"
  },
  
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
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <section className="pt-24 pb-8 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20">
              <HeartHandshake className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Support
              </span>
              <br />
              <span className="bg-linear-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                QUMSA
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 text-gray-300 leading-relaxed">
              Your contribution builds stronger faith, friendship, and community at Queen's University.
              <span className="text-amber-400 font-medium block sm:inline mt-1 sm:mt-0"> Every dollar makes a difference.</span>
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-32">
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Data Update Notice</h3>
                <p className="text-gray-300 leading-relaxed">
                  The fundraising progress and statistics displayed on this page are updated periodically and may not reflect the most current QUMSA donation totals or activities.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:border-amber-400/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-400/20 p-3 rounded-full">
                  <Target className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">{DONATION_CONFIG.goal.title}</h2>
              </div>
              
              <div className="bg-gray-800/50 rounded-full h-4 mb-6 overflow-hidden">
                <div 
                  className="bg-linear-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                <span className="text-gray-300">
                  <span className="font-bold text-amber-400 text-xl">${DONATION_CONFIG.goal.current.toLocaleString()}</span> raised
                </span>
                <span className="text-gray-400">
                  Goal: <span className="font-bold text-xl text-white">${DONATION_CONFIG.goal.target.toLocaleString()}</span>
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">{DONATION_CONFIG.goal.description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:border-amber-400/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-amber-400/20 p-4 rounded-full inline-flex mb-4">
                  <HandCoins className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Quick Donate</h3>
                <p className="text-gray-400 text-sm mt-2">Send via E-Transfer</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-base font-medium text-gray-300">Send to:</span>
                  </div>
                  <div className="space-y-3">
                    <code className="bg-gray-800 px-4 py-3 rounded-lg text-base text-amber-400 font-mono block text-center break-all">
                      {DONATION_CONFIG.etransfer.email}
                    </code>
                    <button
                      onClick={copyEmail}
                      className="w-full p-3 hover:bg-gray-700 rounded-lg transition-colors bg-gray-800/50 flex items-center justify-center gap-2"
                    >
                      {emailCopied ? (
                        <>
                          <Check className="w-5 h-5 text-amber-400" />
                          <span className="text-amber-400 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-400 font-medium">Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {DONATION_CONFIG.etransfer.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:border-amber-400/40 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="bg-amber-400/20 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                </div>
                Where Your Donation Goes
              </h3>
              
              <div className="space-y-4">
                {DONATION_CONFIG.proceedsAllocation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-amber-400/20 p-2 rounded-lg group-hover:scale-110 transition-transform shrink-0">
                          <Icon className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                            <span className="text-xs font-bold bg-amber-400/20 text-amber-400 px-2 py-1 rounded-full self-start">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-8">
                        <div className="bg-gray-800/50 rounded-full h-2 mb-2">
                          <div 
                            className="bg-linear-to-r from-amber-400 to-yellow-400 h-2 rounded-full transition-all duration-1000 delay-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-amber-400/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-amber-400/20 p-4 rounded-full">
                      <Target className="w-8 h-8 text-amber-400" />
                    </div>
                    <h2 className="text-4xl font-bold text-white">{DONATION_CONFIG.goal.title}</h2>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-full h-6 mb-8 overflow-hidden">
                    <div 
                      className="bg-linear-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-left">
                      <div className="text-4xl font-bold text-amber-400">${DONATION_CONFIG.goal.current.toLocaleString()}</div>
                      <div className="text-gray-300 text-lg">raised</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl text-gray-400">Goal:</div>
                      <div className="text-3xl font-bold text-white">${DONATION_CONFIG.goal.target.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">{DONATION_CONFIG.goal.description}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-amber-400/40 transition-all duration-300">
                  <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                    <div className="bg-amber-400/20 p-3 rounded-full">
                      <TrendingUp className="w-7 h-7 text-amber-400" />
                    </div>
                    Where Your Donation Goes
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {DONATION_CONFIG.proceedsAllocation.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="group bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/10 hover:border-amber-400/30">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-amber-400/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                                <span className="text-sm font-bold bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full">
                                  {item.percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="bg-gray-800/50 rounded-full h-3 mb-3">
                              <div 
                                className="bg-linear-to-r from-amber-400 to-yellow-400 h-3 rounded-full transition-all duration-1000 delay-300"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="sticky top-8 z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:border-amber-400/40 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="bg-amber-400/20 p-4 rounded-full inline-flex mb-4">
                      <HandCoins className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Quick Donate</h3>
                    <p className="text-gray-400 text-sm mt-2">Send via E-Transfer</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3 justify-center">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-base font-medium text-gray-300">Send to:</span>
                      </div>
                      <div className="space-y-3">
                        <code className="bg-gray-800 px-4 py-3 rounded-lg text-base text-amber-400 font-mono block text-center break-all">
                          {DONATION_CONFIG.etransfer.email}
                        </code>
                        <button
                          onClick={copyEmail}
                          className="w-full p-3 hover:bg-gray-700 rounded-lg transition-colors bg-gray-800/50 flex items-center justify-center gap-2"
                        >
                          {emailCopied ? (
                            <>
                              <Check className="w-5 h-5 text-amber-400" />
                              <span className="text-amber-400 font-medium">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-400 font-medium">Copy Email</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-300 leading-relaxed">
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
  );
}