import { useState } from 'react';

const useCarousel = (imagesURL: string[]) => {
  const [current, setCurrent] = useState<number>(0);
  const slides = imagesURL.length;
  
  const nextSlide = (): void => 
    setCurrent(current === slides - 1 ? 0 : current + 1);

  const prevSlide = (): void => 
    setCurrent(current === 0 ? slides - 1 : current - 1);

  const goToSlide = (slide: number): void =>
    setCurrent(slide);

  return {
    current, 
    nextSlide,
    prevSlide,
    goToSlide,
  }
}

export default useCarousel;