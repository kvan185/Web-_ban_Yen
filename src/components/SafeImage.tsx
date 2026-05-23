'use client';

import { useEffect, useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  className, 
  style, 
  fallbackSrc = '/images/about-hero.png' 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(() => src || fallbackSrc);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={{ display: 'block', ...style }}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        const target = event.currentTarget;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
    />
  );
}
