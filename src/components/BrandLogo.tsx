import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'auto' | 'light' | 'dark';
}

export default function BrandLogo({
  className = '',
  variant = 'full',
  size = 'md',
  theme = 'auto',
}: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const domainSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  // Reusable 3D Pallet Emblem SVG
  const IconMark = (
    <div className={`relative shrink-0 ${iconSizes[size]} transition-transform duration-200 group-hover:scale-105`}>
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brandBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="brandOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="brandBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* Base Tile */}
        <rect width="64" height="64" rx="16" fill="url(#brandBg)" />
        <rect x="1" y="1" width="62" height="62" rx="15" stroke="#334155" strokeWidth="1.5" />

        {/* 3D Wooden Skid Base */}
        <path d="M12 47 L32 55 L52 47 L32 40 Z" fill="#334155" opacity="0.9" />
        <path d="M12 47 L32 55 L32 58 L12 50 Z" fill="#1E293B" />
        <path d="M32 55 L52 47 L52 50 L32 58 Z" fill="#0F172A" />
        <rect x="19" y="49" width="4" height="2.5" rx="0.5" fill="#0B0F17" />
        <rect x="41" y="49" width="4" height="2.5" rx="0.5" fill="#0B0F17" />

        {/* Left Blue Box */}
        <path d="M16 35 L28 40 L28 47 L16 42 Z" fill="#1D4ED8" />
        <path d="M28 40 L33 37 L33 44 L28 47 Z" fill="#1E40AF" />
        <path d="M16 35 L21 32 L33 37 L28 40 Z" fill="url(#brandBlue)" />

        {/* Right High-Yield Gold/Orange Box */}
        <path d="M26 23 L46 31 L46 43 L26 35 Z" fill="#D97706" />
        <path d="M46 31 L54 27 L54 39 L46 43 Z" fill="#B45309" />
        <path d="M26 23 L34 19 L54 27 L46 31 Z" fill="url(#brandOrange)" />

        {/* Packing Tape */}
        <path d="M39 20.5 L41 21.5 L33 38 L31 37 Z" fill="#FEF3C7" opacity="0.6" />

        {/* Dynamic Wholesale Arrow / Swoosh */}
        <path
          d="M18 43 Q 32 51 47 38"
          stroke="url(#brandOrange)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M43 38 L48 37.5 L46 42"
          stroke="url(#brandOrange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* AMAZON Inset */}
        <text
          x="36"
          y="32"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="5"
          fontWeight="900"
          letterSpacing="0.2"
          fill="#FFFFFF"
          textAnchor="middle"
          transform="skewY(22)"
        >
          AMAZON
        </text>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {IconMark}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${textSizes[size]}`}>
          <span className="text-amber-500 font-extrabold tracking-normal">AMAZON</span>{' '}
          <span
            className={
              theme === 'light'
                ? 'text-neutral-900'
                : theme === 'dark'
                ? 'text-white'
                : 'text-neutral-900 dark:text-white'
            }
          >
            PALLETS
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`font-mono font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 ${domainSizes[size]}`}
          >
            amzpalletsliquidation.com
          </span>
          <span className="inline-flex items-center px-1 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
            Direct
          </span>
        </div>
      </div>
    </div>
  );
}
