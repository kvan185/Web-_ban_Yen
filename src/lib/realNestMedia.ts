export const realNestImages = Array.from({ length: 27 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    src: `/images/real-nest-house/real-nest-house-${number}.jpg`,
    alt: `Anh thuc te to yen trong nha yen ${index + 1}`,
  };
});

export const realNestVideo = '/images/real-nest-house/real-nest-house-video.mp4';
