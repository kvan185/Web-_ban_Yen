'use client';

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
  const imageSrc = src && src !== 'undefined' ? src : fallbackSrc;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={{ display: 'block', ...style }}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        const target = event.currentTarget;
        if (!target.src.endsWith(fallbackSrc)) {
          target.src = fallbackSrc;
        }
      }}
    />
  );
}
