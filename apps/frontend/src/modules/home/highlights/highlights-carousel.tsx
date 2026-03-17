import useEmblaCarousel from "embla-carousel-react";
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
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        loop: false,
        containScroll: "trimSnaps",
        dragFree: false,
    });

    return (
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
    );
}
