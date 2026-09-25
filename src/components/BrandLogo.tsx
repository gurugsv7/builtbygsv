import React from 'react';

interface BrandLogoProps {
  showName?: boolean;
  imageClassName?: string;
  nameClassName?: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showName = true,
  imageClassName = 'h-9 w-9',
  nameClassName = 'text-base',
  className = '',
}) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <img
      src="/builtbygsv-logo.png"
      alt=""
      aria-hidden="true"
      className={`${imageClassName} shrink-0 rounded-[22%] object-cover shadow-sm`}
    />
    {showName ? (
      <span className={`font-extrabold tracking-tight text-[#131921] ${nameClassName}`}>
        Builtby<span className="text-[#0F8B75]">GSV</span>
      </span>
    ) : null}
  </span>
);
