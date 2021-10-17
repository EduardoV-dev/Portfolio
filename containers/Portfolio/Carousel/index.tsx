import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '../../../icons';
import styles from './carousel.module.scss';
import cn from 'classnames';
import useCarousel from './useCarousel';

interface ICarousel {
  imagesURL: string[];
  className?: string;
}

const Carousel: React.FC<ICarousel> = ({
  imagesURL,
  className,
}): JSX.Element => {
  const {
    current,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useCarousel(imagesURL);
  const carouselClassNames = cn(styles.carousel, className);

  return (
    <div className={carouselClassNames}>
      <button
        className={styles.carousel__controller}
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>
      <button
        className={styles.carousel__controller}
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>
      {imagesURL.map((url, idx) => (
        <div
          key={idx}
          className={
            `${styles.carousel__slide} ${idx === current && styles.carousel__slide_active}`
          }
        >
          {idx === current && (
            <Image
              width={150}
              height={80}
              src={url}
              alt={`Image ${idx + 1}`}
              layout="responsive"
              objectFit="cover"
              className={styles.carousel__image}
            />
          )}
        </div>
      ))}
      <div className={styles.carousel__indicators_container}>
        {imagesURL.map((url, idx) => (
          <div
            key={url}
            className={`
              ${styles.carousel__indicator} ${idx === current && styles.carousel__indicator_active}
            `}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;