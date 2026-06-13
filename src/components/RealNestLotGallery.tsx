'use client';

import { useCallback, useEffect, useState } from 'react';
import SafeImage from '@/components/SafeImage';

type RealNestLotImage = {
  src: string;
  alt?: string;
};

type RealNestLotGalleryProps = {
  images: RealNestLotImage[];
};

export default function RealNestLotGallery({ images }: RealNestLotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? images.length - 1 : current - 1;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === images.length - 1 ? 0 : current + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  if (!images.length) return null;

  return (
    <>
      <div className="real-booking-gallery">
        {images.map((image, index) => (
          <button
            type="button"
            className="real-booking-gallery-item"
            key={image.src}
            aria-label={`Xem lớn lô ảnh ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          >
            <SafeImage src={image.src} alt={image.alt || `Lô tổ yến thực tế ${index + 1}`} />
            <span>Lô ảnh {index + 1}</span>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="real-proof-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Xem lô ảnh thực tế ${activeIndex + 1}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="real-proof-lightbox-close"
            aria-label="Đóng ảnh"
            onClick={closeLightbox}
          >
            ×
          </button>
          <button
            type="button"
            className="real-proof-lightbox-nav real-proof-lightbox-prev"
            aria-label="Xem ảnh trước"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            ‹
          </button>
          <div className="real-proof-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <SafeImage
              src={activeImage.src}
              alt={activeImage.alt || `Lô ảnh thực tế ${activeIndex + 1}`}
              className="real-proof-lightbox-image"
            />
            <div className="real-proof-lightbox-count">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
          <button
            type="button"
            className="real-proof-lightbox-nav real-proof-lightbox-next"
            aria-label="Xem ảnh tiếp theo"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
