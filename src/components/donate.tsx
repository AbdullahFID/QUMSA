'use client'
import React, { useState } from 'react';
import {
  HeartHandshake,
  HandCoins,
  Users,
  Coffee,
  Calendar,
  Star,
  Mail,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Utensils,
  Moon,
  Sparkles,
  Heart,
  Gift,
  Crown,
  Gem,
  Award,
  GlassWater,
  Package
} from 'lucide-react';

// Star interface for animated background
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
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900" />

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
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-linear-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl animate-pulse"
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
  ramadan: {
    title: "Ramadan 2026 Iftar Program",
    goal: 20000,
    current: 3238,
    launchGoodUrl: "https://www.launchgood.com/v4/campaign/qumsa_2026_ramadan_iftar_program?src=2539141",
    description: "Help us provide free daily iftars for 200+ Muslim students at Queen's University throughout Ramadan."
  },

  sponsorshipTiers: [
    {
      name: "Bronze",
      amount: 8,
      description: "Sponsor One Meal",
      icon: Heart,
      color: "from-amber-600 to-amber-700"
    },
    {
      name: "Silver",
      amount: 40,
      description: "Sponsor 5 Meals",
      icon: Star,
      color: "from-gray-400 to-gray-500"
    },
    {
      name: "Gold",
      amount: 120,
      description: "Sponsor 15 Meals",
      icon: Award,
      color: "from-yellow-400 to-amber-500"
    },
    {
      name: "Emerald",
      amount: 240,
      description: "Sponsor One Student's Entire Month",
      icon: Gem,
      color: "from-emerald-400 to-emerald-600"
    },
    {
      name: "Sapphire",
      amount: 720,
      description: "Sponsor 3 Students' Meals",
      icon: Sparkles,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Platinum",
      amount: 1600,
      description: "Sponsor an Entire Night",
      icon: Crown,
      color: "from-purple-400 to-purple-600"
    }
  ],

  budgetBreakdown: [
    {
      icon: Utensils,
      title: "Food & Catering",
      description: "200 people × $8/plate × 30 nights from local halal restaurants",
      amount: "$48,000"
    },
    {
      icon: GlassWater,
      title: "Water",
      description: "Generously sponsored by Culligan Water",
      amount: "Sponsored"
    },
    {
      icon: Package,
      title: "Disposable Plates & Cutlery",
      description: "Eco-friendly disposable dining supplies",
      amount: "$1,000"
    }
  ],

  etransfer: {
    email: "treasurer@qumsa.ca",
    message: "Please include your name and 'QUMSA Donation' in the message"
  },

  stats: {
    studentsServed: "200+",
    nights: "30",
    costPerMeal: "$8"
  }
};

export default function ModernDonate() {
  const [emailCopied, setEmailCopied] = useState(false);

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
        {/* Hero Section */}
        <section className="pt-24 pb-8 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20">
              <Moon className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ramadan 2026
              </span>
              <br />
              <span className="bg-linear-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Iftar Program
              </span>
            </h1>

            <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-8 text-gray-300 leading-relaxed">
              Give the gift of unity. Your support lights up our Queen's Muslim student community.
            </p>

            {/* Impact Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-amber-400">{DONATION_CONFIG.stats.studentsServed}</div>
                <div className="text-sm text-gray-400">Students Served Daily</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-amber-400">{DONATION_CONFIG.stats.nights}</div>
                <div className="text-sm text-gray-400">Nights of Iftar</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-amber-400">{DONATION_CONFIG.stats.costPerMeal}</div>
                <div className="text-sm text-gray-400">Per Meal</div>
              </div>
            </div>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Unlike other universities, Queen's is home to many non-local Muslim students. 
              The burden of eating alone or struggling with a student budget during Ramadan can be lifted with your donation.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-32">
          {/* Data Disclaimer */}
          <div className="mb-8 bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-xl">
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

          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* LaunchGood Featured Card */}
              <div className="bg-linear-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-400/20 p-4 rounded-full">
                    <Gift className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Support Our Ramadan Campaign</h2>
                    <p className="text-emerald-400">via LaunchGood</p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Join our supporters in helping us reach our <span className="text-emerald-400 font-semibold">$20,000 CAD</span> goal 
                  to provide free daily iftars for Muslim students throughout Ramadan.
                </p>

                {/* Progress Bar Section */}
                <div className="bg-white/5 rounded-2xl p-6 mb-6">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="text-3xl font-bold text-emerald-400">
                        ${DONATION_CONFIG.ramadan.current.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">raised of ${DONATION_CONFIG.ramadan.goal.toLocaleString()} CAD</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {Math.round((DONATION_CONFIG.ramadan.current / DONATION_CONFIG.ramadan.goal) * 100)}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="bg-gray-800/50 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-linear-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${Math.min((DONATION_CONFIG.ramadan.current / DONATION_CONFIG.ramadan.goal) * 100, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                    <span>Impact: Kingston, ON</span>
                    <span>${(DONATION_CONFIG.ramadan.goal - DONATION_CONFIG.ramadan.current).toLocaleString()} to go</span>
                  </div>
                </div>

                <a
                  href={DONATION_CONFIG.ramadan.launchGoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:scale-[1.02]"
                >
                  <HeartHandshake className="w-6 h-6" />
                  Donate on LaunchGood
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Sponsorship Tiers */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-amber-400/40 transition-all duration-300">
                <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-4">
                  <div className="bg-amber-400/20 p-3 rounded-full">
                    <Crown className="w-7 h-7 text-amber-400" />
                  </div>
                  Sponsorship Packages
                </h3>
                <p className="text-gray-400 mb-8 ml-16">Choose how you'd like to make an impact</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DONATION_CONFIG.sponsorshipTiers.map((tier, index) => {
                    const Icon = tier.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-amber-400/30 hover:scale-[1.02]"
                      >
                        <div className={`bg-linear-to-r ${tier.color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {tier.name}
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">
                          ${tier.amount}
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {tier.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Where Your Donation Goes */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-amber-400/40 transition-all duration-300">
                <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-4">
                  <div className="bg-amber-400/20 p-3 rounded-full">
                    <Utensils className="w-7 h-7 text-amber-400" />
                  </div>
                  Where Your Donation Goes
                </h3>
                <p className="text-gray-400 mb-8 ml-16">Transparency in our Ramadan budget</p>

                <div className="space-y-4">
                  {DONATION_CONFIG.budgetBreakdown.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/10 hover:border-amber-400/30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-amber-400/20 p-3 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                            <Icon className="w-6 h-6 text-amber-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                              <span className={`text-sm font-bold px-3 py-1 rounded-full self-start ${
                                item.amount === "Sponsored" 
                                  ? "bg-emerald-400/20 text-emerald-400" 
                                  : "bg-amber-400/20 text-amber-400"
                              }`}>
                                {item.amount}
                              </span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 bg-linear-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl p-6 border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Total Projected Costs</span>
                    <span className="text-2xl font-bold text-amber-400">$49,000</span>
                  </div>
                </div>
              </div>

              {/* Why Support QUMSA */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-amber-400/40 transition-all duration-300">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                  <div className="bg-amber-400/20 p-3 rounded-full">
                    <Users className="w-7 h-7 text-amber-400" />
                  </div>
                  Why Support QUMSA?
                </h3>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We are the <span className="text-amber-400 font-semibold">Queen's University Muslim Student Association (QUMSA)</span>, 
                    fundraising to provide daily iftars on campus during Ramadan.
                  </p>
                  <p>
                    We served over <span className="text-amber-400 font-semibold">200 students daily</span> last Ramadan, and this year 
                    we're expecting a significant increase. For those looking to donate a meal to a fasting person, 
                    consider QUMSA's program.
                  </p>
                  <p className="text-gray-400">
                    For more information, follow us on Instagram <span className="text-amber-400">@QUMSA</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Donation Cards */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">

                {/* E-Transfer Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:border-amber-400/40 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="bg-amber-400/20 p-4 rounded-full inline-flex mb-4">
                      <HandCoins className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">General Donations</h3>
                    <p className="text-gray-400 text-sm mt-1">Send via E-Transfer</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3 justify-center">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Send to:</span>
                      </div>
                      <div className="space-y-3">
                        <code className="bg-gray-800 px-4 py-3 rounded-lg text-sm text-amber-400 font-mono block text-center break-all">
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

                {/* Potential Sponsors */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Seeking Support From
                  </h4>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>• Human Concern International</p>
                    <p>• Droplets of Mercy</p>
                    <p>• Queen's ASUS</p>
                    <p>• Alma Mater Society</p>
                    <p>• Student Experience Office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile LaunchGood CTA - Fixed Bottom */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 z-50">
            <a
              href={DONATION_CONFIG.ramadan.launchGoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
            >
              <HeartHandshake className="w-5 h-5" />
              Donate on LaunchGood
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Add bottom padding on mobile for fixed CTA */}
          <div className="lg:hidden h-24"></div>
        </div>
      </div>
    </div>
  );
}