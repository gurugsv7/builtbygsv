import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = "w-full max-w-[320px] h-auto mx-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="30 35 260 245" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto max-h-full w-full overflow-visible drop-shadow-sm">
        {/* Sun / Gold Background Circle */}
        <circle cx="110" cy="190" r="65" fill="#F59E0B" fillOpacity="0.85" />
        <path d="M60 170 C80 140, 140 140, 160 180 C170 210, 110 250, 70 220 Z" fill="#FBBF24" fillOpacity="0.4" />

        {/* Tilted Dark Teal Code Tablet / Box */}
        <g transform="rotate(-12 160 150)">
          {/* Box Shadow */}
          <rect x="95" y="65" width="130" height="175" rx="18" fill="#0D131A" />
          {/* Main Teal Screen Face */}
          <rect x="85" y="55" width="130" height="175" rx="16" fill="#0F8B75" />
          
          {/* Screen Inner Header Dots */}
          <circle cx="102" cy="72" r="3.5" fill="#2DD4BF" />
          <circle cx="114" cy="72" r="3.5" fill="#38BDF8" />
          <circle cx="126" cy="72" r="3.5" fill="#F43F5E" />

          {/* Large </> Code Bracket in White */}
          <text x="105" y="125" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="32" fill="#FFFFFF" letterSpacing="-1">
            &lt;/&gt;
          </text>

          {/* Simulated Code Lines */}
          <rect x="105" y="142" width="70" height="5" rx="2.5" fill="#A7F3D0" />
          <rect x="105" y="154" width="90" height="5" rx="2.5" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="105" y="166" width="55" height="5" rx="2.5" fill="#2DD4BF" />
          <rect x="105" y="178" width="75" height="5" rx="2.5" fill="#FFFFFF" fillOpacity="0.7" />

          {/* Small Code Block Windows */}
          <rect x="105" y="195" width="28" height="22" rx="4" fill="#034E43" stroke="#2DD4BF" strokeWidth="1.5" />
          <rect x="140" y="195" width="28" height="22" rx="4" fill="#034E43" stroke="#2DD4BF" strokeWidth="1.5" />
        </g>

        {/* Floating Bubble with {} Code Brackets */}
        <g transform="translate(195, 205)">
          <path d="M0 12 C0 5.37 5.37 0 12 0 L52 0 C58.63 0 64 5.37 64 12 L64 36 C64 42.63 58.63 48 52 48 L20 48 L8 58 L12 48 C5.37 48 0 42.63 0 36 Z" fill="#F3EFE6" stroke="#131921" strokeWidth="2" />
          <text x="21" y="32" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22" fill="#131921">
            &#123;&#125;
          </text>
        </g>

        {/* Sketchy Hand-drawn Arrow Doodles */}
        <path d="M190 140 Q 220 160 210 190" fill="none" stroke="#131921" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 1" />
        <path d="M205 185 L210 190 L216 182" fill="none" stroke="#131921" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Floating Sparkle Stars */}
        <path d="M230 80 L233 88 L241 91 L233 94 L230 102 L227 94 L219 91 L227 88 Z" fill="#131921" />
        <circle cx="245" cy="115" r="2.5" fill="#131921" />
        <circle cx="255" cy="125" r="1.5" fill="#131921" />
      </svg>
    </div>
  );
};
