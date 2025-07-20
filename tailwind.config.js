module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Primary Colors from Design Team
        brand: {
          'navy-dark': '#131C65',      // Dark Navy Blue (Primary)
          'navy-light': '#3B4883',     // Lighter Navy Blue
          'grey-accent': '#D4CED1',    // Grey-ish accent
          'gold': '#CFA740',           // Main Gold Accent
          'red': '#E91235',            // Red Accent
          'blue-accent': '#00466E',    // Other Color Accent
          'blue-dark': '#014362',      // Another color they like
          'blue-light': '#BBD0E5',     // Last good color
          'midnight': '#0E1B2C',       // Good Color
          'emerald': '#00D698',        // Emerald Green
        },
        
        // Primary color scheme based on main navy
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#131C65', // Your brand navy dark
        },

        // Islamic traditional colors enhanced with your palette
        islamic: {
          gold: '#CFA740',        // Your main gold accent
          emerald: '#00D698',     // Your emerald green
          navy: '#131C65',        // Your dark navy
          teal: '#014362',        // Your blue-dark as teal
          cream: '#D4CED1',       // Your grey accent as cream
          midnight: '#0E1B2C',    // Your midnight color
        },

        // Additional Islamic colors (traditional)
        muslim: {
          // Greens (Paradise, Nature, Peace)
          'forest': '#228B22',
          'jade': '#00A86B',
          'olive': '#808000',
          'sage': '#9CAF88',
          
          // Blues (Sky, Water, Infinity)
          'sapphire': '#0F52BA',
          'cobalt': '#0047AB',
          'azure': '#007FFF',
          'persian': '#1C39BB',
          
          // Earth tones
          'sand': '#F4A460',
          'terracotta': '#E2725B',
          'amber': '#FFBF00',
          'bronze': '#CD7F32',
          
          // Rich colors
          'burgundy': '#800020',
          'maroon': '#800000',
          'crimson': '#DC143C',
          'royal': '#4169E1',
        },

        // Accent colors with your palette
        accent: {
          50: '#fef7ed',
          100: '#fdecd1',
          200: '#fad4a3',
          300: '#f7b76a',
          400: '#f4932f',
          500: '#CFA740',  // Your main gold
          600: '#b8941f',
          700: '#9a7c1a',
          800: '#7c6418',
          900: '#645215',
        },

        // Navy variations for depth
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          // Custom navy shades from your palette
          'brand': '#131C65',
          'light': '#3B4883',
          'accent': '#00466E',
          'deep': '#014362',
        },

        // Status colors incorporating your red
        status: {
          success: '#00D698',     // Your emerald
          warning: '#CFA740',     // Your gold
          error: '#E91235',       // Your red
          info: '#BBD0E5',        // Your light blue
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'glow-gold': 'glowGold 2s ease-in-out infinite alternate',
        'glow-emerald': 'glowEmerald 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0ea5e9' },
          '100%': { boxShadow: '0 0 20px #0ea5e9, 0 0 30px #0ea5e9' },
        },
        glowGold: {
          '0%': { boxShadow: '0 0 5px #CFA740' },
          '100%': { boxShadow: '0 0 20px #CFA740, 0 0 30px #CFA740' },
        },
        glowEmerald: {
          '0%': { boxShadow: '0 0 5px #00D698' },
          '100%': { boxShadow: '0 0 20px #00D698, 0 0 30px #00D698' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #131C65, #CFA740)',
        'gradient-islamic': 'linear-gradient(135deg, #CFA740, #00D698)',
        'gradient-navy': 'linear-gradient(135deg, #131C65, #3B4883)',
      },
    },
  },
  plugins: [],
}