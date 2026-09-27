import React from 'react';

export interface PravahLogoProps {
  variant?: 'full' | 'horizontal' | 'mark' | 'badge';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const PravahLogo: React.FC<PravahLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  className = '',
  showSubtitle = true
}) => {
  // Determine pixel size for icon mark
  const iconDimensions = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  }[size];

  const titleSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subSizes = {
    xs: 'text-[7px]',
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[10px]',
    xl: 'text-[11px]'
  }[size];

  const isDark = theme === 'dark';

  // Standalone Vector Icon Mark for PRAVAH
  const LogoMark = (
    <svg
      width={iconDimensions}
      height={iconDimensions}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        {/* Deep Slate / Midnight Background Gradient */}
        <linearGradient id="emblemBgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="50%" stopColor="#1C2541" />
          <stop offset="100%" stopColor="#0A1128" />
        </linearGradient>

        {/* Primary Saffron/Amber Regulatory Stream */}
        <linearGradient id="amberStream" x1="15" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="50%" stopColor="#FF9E00" />
          <stop offset="100%" stopColor="#FFAA00" />
        </linearGradient>

        {/* Dynamic Cyan/Azure Intelligence Current */}
        <linearGradient id="blueStream" x1="10" y1="50" x2="90" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F5D4" />
          <stop offset="45%" stopColor="#00BBF9" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>

        {/* Deep Royal Flow Ribbon */}
        <linearGradient id="royalStream" x1="30" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3A86FF" />
          <stop offset="60%" stopColor="#4361EE" />
          <stop offset="100%" stopColor="#7209B7" />
        </linearGradient>

        {/* Emerald Compliance Node Gradient */}
        <radialGradient id="emeraldNode" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#52B788" />
          <stop offset="100%" stopColor="#2D6A4F" />
        </radialGradient>

        {/* Subtle Drop Shadows */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" floodColor="#000000" />
        </filter>
      </defs>

      {/* Rounded Outer Container Badge */}
      <rect width="100" height="100" rx="24" fill="url(#emblemBgGrad)" />
      <rect width="98" height="98" x="1" y="1" rx="23" stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Stylized Interlocking Flows forming the Dynamic "P" & Confluence Waves */}
      <g filter="url(#shadowFilter)">
        {/* Main 'P' Stem - Ascending Regulatory Backbone */}
        <path
          d="M26 80V25C26 22.2386 28.2386 20 31 20H45C58 20 68 28 68 40C68 51.5 58.5 59 46 59H35V80H26Z"
          fill="none"
          stroke="url(#royalStream)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Upper Fluid Crest Wave (Saffron / Amber) */}
        <path
          d="M32 30C42 22 58 20 70 28C79 34 81 46 76 55C70 65 55 65 42 55"
          fill="none"
          stroke="url(#amberStream)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#logoGlow)"
        />

        {/* Central Intelligence Wave (Cyan / Azure) flowing through */}
        <path
          d="M18 58C28 45 42 40 56 46C68 51 77 47 84 38"
          fill="none"
          stroke="url(#blueStream)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Lower Harmonic Wave - Connect & Adapt */}
        <path
          d="M22 72C34 60 48 62 60 70C70 76 78 74 85 66"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Active Confluence Hub Nodes (representing 4 Pillars: Understand, Connect, Predict, Adapt) */}
        {/* Pillar 1: Understand (Cyan) */}
        <circle cx="28" cy="48" r="4.5" fill="#00F5D4" stroke="#0B132B" strokeWidth="1.5" />
        {/* Pillar 2: Connect (Amber) */}
        <circle cx="56" cy="46" r="4" fill="#FF9E00" stroke="#0B132B" strokeWidth="1.5" />
        {/* Pillar 3: Predict (Emerald) */}
        <circle cx="70" cy="28" r="4.5" fill="#10B981" stroke="#0B132B" strokeWidth="1.5" />
        {/* Pillar 4: Adapt (Electric Blue) */}
        <circle cx="68" cy="67" r="3.5" fill="#3A86FF" stroke="#0B132B" strokeWidth="1.5" />
      </g>
    </svg>
  );

  // If mark only requested
  if (variant === 'mark') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LogoMark}</div>;
  }

  // Horizontal or Full layout
  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {LogoMark}

      <div className="flex flex-col justify-center">
        {/* Brand Name & GovTech Badge */}
        <div className="flex items-center gap-2 leading-none">
          <span
            className={`font-black font-heading tracking-tight ${titleSizes} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            PRAVAH
          </span>
          <span
            className={`font-mono uppercase font-bold text-[9px] px-1.5 py-0.5 rounded tracking-wider border ${
              isDark
                ? 'bg-blue-900/60 text-cyan-300 border-cyan-500/30'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}
          >
            GovTech
          </span>
        </div>

        {/* Subtitle / Tagline */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`font-mono uppercase font-semibold tracking-wider ${subSizes} ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Regulatory Orchestration
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
