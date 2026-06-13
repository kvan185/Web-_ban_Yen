'use client';

import { useCallback, useEffect, useState } from 'react';
import SafeImage from '@/components/SafeImage';

type RealProofImage = {
  src: string;
  alt?: string;
};

type RealProofGalleryProps = {
  images: RealProofImage[];
};

export default function RealProofGallery({ images }: RealProofGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

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
      <div className="real-proof-layout">
        <button
          type="button"
          className="real-proof-main real-proof-image-button"
          aria-label="Mở ảnh tổ yến thực tế 1"
          onClick={() => setActiveIndex(0)}
        >
          <SafeImage src={images[0].src} alt={images[0].alt || 'Tổ yến thực tế bên trong nhà yến'} />
          <div>
            <strong>Ảnh chụp thực tế</strong>
            <span>Ghi nhận từ nguồn tổ trước khi tuyển chọn và sơ chế.</span>
          </div>
        </button>
        <div className="real-proof-grid">
          {images.slice(1, 7).map((image, index) => (
            <button
              type="button"
              className="real-proof-thumb real-proof-image-button"
              key={image.src}
              aria-label={`Mở ảnh tổ yến thực tế ${index + 2}`}
              onClick={() => setActiveIndex(index + 1)}
            >
              <SafeImage src={image.src} alt={image.alt || `Ảnh thực tế tổ yến ${index + 2}`} />
            </button>
          ))}
        </div>
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="real-proof-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Xem ảnh tổ yến thực tế ${activeIndex + 1}`}
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
              alt={activeImage.alt || `Ảnh tổ yến thực tế ${activeIndex + 1}`}
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
