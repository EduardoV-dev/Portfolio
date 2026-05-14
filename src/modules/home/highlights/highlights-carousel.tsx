import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import styles from "./highlights-carousel.module.css";

interface HighlightItem {
    iconSrc: string;
    iconWidth: number;
    iconHeight: number;
    title: string;
    description: string;
}

interface HighlightsCarouselProps {
    items: HighlightItem[];
}

export default function HighlightsCarousel({ items }: HighlightsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        containScroll: "trimSnaps",
        dragFree: false,
    });

    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevDisabled(!emblaApi.canScrollPrev());
        setNextDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.carousel} ref={emblaRef}>
                <ul className={styles.track}>
                    {items.map((item) => (
                        <li key={item.title} className={styles.slide}>
                            <div className={styles.iconBox} aria-hidden="true">
                                <img
                                    src={item.iconSrc}
                                    alt=""
                                    width={item.iconWidth}
                                    height={item.iconHeight}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className={styles.text}>
                                <p className={styles.title}>{item.title}</p>
                                <p
                                    className={styles.desc}
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.controls} aria-label="Carousel controls">
                <button
                    type="button"
                    className={styles.controlBtn}
                    onClick={scrollPrev}
                    disabled={prevDisabled}
                    aria-label="Previous slide"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                            d="M10 3L5 8L10 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    className={styles.controlBtn}
                    onClick={scrollNext}
                    disabled={nextDisabled}
                    aria-label="Next slide"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                            d="M6 3L11 8L6 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
