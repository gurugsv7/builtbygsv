import React from 'react';

export const SoftwareDevIllustration: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        {/* Terracotta / Orange Backdrop Disk */}
        <circle cx="125" cy="70" r="50" fill="#E85D22" fillOpacity="0.85" />
        
        {/* Isometric Grid Blueprint Lines */}
        <g stroke="#131921" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2">
          <line x1="20" y1="130" x2="160" y2="60" />
          <line x1="40" y1="150" x2="180" y2="80" />
          <line x1="20" y1="70" x2="160" y2="140" />
          <line x1="40" y1="50" x2="180" y2="120" />
        </g>

        {/* Isometric 3D Cube Cluster */}
        <g transform="translate(60, 40)">
          {/* Top Cube (Orange Accent) */}
          <g>
            {/* Top face */}
            <polygon points="50,10 75,22 50,34 25,22" fill="#E85D22" stroke="#131921" strokeWidth="1.8" />
            {/* Left face */}
            <polygon points="25,22 50,34 50,55 25,43" fill="#D44F17" stroke="#131921" strokeWidth="1.8" />
            {/* Right face */}
            <polygon points="50,34 75,22 75,43 50,55" fill="#F97316" stroke="#131921" strokeWidth="1.8" />
          </g>

          {/* Bottom Left Cube */}
          <g transform="translate(-25, 30)">
            <polygon points="50,10 75,22 50,34 25,22" fill="#FFFFFF" stroke="#131921" strokeWidth="1.8" />
            <polygon points="25,22 50,34 50,55 25,43" fill="#E5E7EB" stroke="#131921" strokeWidth="1.8" />
            <polygon points="50,34 75,22 75,43 50,55" fill="#F3F4F6" stroke="#131921" strokeWidth="1.8" />
          </g>

          {/* Bottom Right Cube (Dark Solid Accent) */}
          <g transform="translate(25, 30)">
            <polygon points="50,10 75,22 50,34 25,22" fill="#131921" stroke="#131921" strokeWidth="1.8" />
            <polygon points="25,22 50,34 50,55 25,43" fill="#1F2937" stroke="#131921" strokeWidth="1.8" />
            <polygon points="50,34 75,22 75,43 50,55" fill="#374151" stroke="#131921" strokeWidth="1.8" />
          </g>

          {/* Center Front Cube (Orange Highlight) */}
          <g transform="translate(0, 48)">
            <polygon points="50,10 75,22 50,34 25,22" fill="#E85D22" stroke="#131921" strokeWidth="2" />
            <polygon points="25,22 50,34 50,55 25,43" fill="#C2410C" stroke="#131921" strokeWidth="2" />
            <polygon points="50,34 75,22 75,43 50,55" fill="#EA580C" stroke="#131921" strokeWidth="2" />
          </g>
        </g>

        {/* Floating Measurement cursor / pin */}
        <path d="M120 25 L125 15 L130 25" stroke="#131921" strokeWidth="1.5" fill="none" />
        <circle cx="125" cy="15" r="2" fill="#E85D22" />
      </svg>
    </div>
  );
};
