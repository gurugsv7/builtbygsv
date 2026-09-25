import React from 'react';

interface BrandLogoProps {
  showName?: boolean;
  nameClassName?: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showName = true,
  nameClassName = 'text-base',
  className = '',
}) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <img
      src="/assets/builtbygsv-mark.png"
      alt=""
      aria-hidden="true"
      className="h-7 w-[74px] shrink-0 rounded-md border border-[#0F8B75]/30 bg-[#050909] object-contain shadow-sm"
    />
    {showName ? (
      <span className={`font-extrabold tracking-tight text-[#131921] ${nameClassName}`}>
        Builtby<span className="text-[#0F8B75]">GSV</span>
      </span>
    ) : null}
  </span>
);
