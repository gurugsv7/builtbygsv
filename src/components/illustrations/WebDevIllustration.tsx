import React from 'react';

export const WebDevIllustration: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        {/* Soft Teal Backdrop Disk */}
        <circle cx="120" cy="75" r="55" fill="#2DD4BF" fillOpacity="0.85" />
        
        {/* Dotted Matrix Background Grid */}
        <g fill="#131921" fillOpacity="0.25">
          <circle cx="145" cy="20" r="1.5" />
          <circle cx="155" cy="20" r="1.5" />
          <circle cx="165" cy="20" r="1.5" />
          <circle cx="145" cy="30" r="1.5" />
          <circle cx="155" cy="30" r="1.5" />
          <circle cx="165" cy="30" r="1.5" />
          <circle cx="145" cy="40" r="1.5" />
          <circle cx="155" cy="40" r="1.5" />
          <circle cx="165" cy="40" r="1.5" />
        </g>

        {/* Browser Wireframe Frame */}
        <g transform="translate(30, 45)">
          {/* Card Frame Shadow & Card */}
          <rect x="5" y="5" width="125" height="95" rx="8" fill="#FFFFFF" stroke="#131921" strokeWidth="2" />
          
          {/* Top Browser Bar */}
          <line x1="5" y1="22" x2="130" y2="22" stroke="#131921" strokeWidth="1.5" />
          <circle cx="14" cy="13" r="2.5" fill="#131921" />
          <circle cx="22" cy="13" r="2.5" fill="#131921" />
          <circle cx="30" cy="13" r="2.5" fill="#131921" />

          {/* Wireframe Layout Elements */}
          {/* Main Hero Box */}
          <rect x="12" y="28" width="55" height="42" rx="4" fill="#F3F4F6" stroke="#131921" strokeWidth="1.5" />
          <circle cx="39.5" cy="49" r="8" fill="none" stroke="#131921" strokeWidth="1.5" />
          <circle cx="39.5" cy="49" r="3" fill="#131921" />

          {/* Right Wireframe Columns */}
          <rect x="74" y="28" width="48" height="18" rx="3" stroke="#131921" strokeWidth="1.5" fill="none" />
          <rect x="74" y="52" width="48" height="18" rx="3" stroke="#131921" strokeWidth="1.5" fill="none" />

          {/* Bottom Footer Line / Dots */}
          <line x1="12" y1="80" x2="80" y2="80" stroke="#131921" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="118" cy="80" r="2.5" fill="#131921" />
        </g>

        {/* Curved Underline Arrow */}
        <path d="M50 155 Q 90 170 125 145" fill="none" stroke="#131921" strokeWidth="2" strokeLinecap="round" />
        <path d="M115 145 L125 145 L122 155" fill="none" stroke="#131921" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
