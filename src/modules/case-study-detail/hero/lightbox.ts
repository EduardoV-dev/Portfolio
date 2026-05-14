const media = document.querySelector<HTMLElement>("[data-detail-lightbox-images]");
const lightbox = document.querySelector<HTMLElement>("[data-detail-lightbox]");
const lightboxImage = document.querySelector<HTMLImageElement>("[data-detail-lightbox-image]");
const closeButton = document.querySelector<HTMLButtonElement>("[data-detail-lightbox-close]");

if (media && lightbox && lightboxImage) {
    const mediaElement = media;
    const lightboxElement = lightbox;
    const lightboxImageElement = lightboxImage;
    const imagesData = media.dataset.detailLightboxImages;
    let images: Array<{ src: string; alt: string }> = [];

    if (imagesData) {
        try {
            images = JSON.parse(imagesData) as Array<{ src: string; alt: string }>;
        } catch {
            images = [];
        }
    }

    function openLightbox() {
        if (images.length === 0) {
            return;
        }

        const currentIndicator = mediaElement.querySelector<HTMLElement>("[data-slider-current]");
        const indicatorIndex = Number(currentIndicator?.textContent || "1") - 1;
        const safeIndex = Number.isNaN(indicatorIndex)
            ? 0
            : Math.min(Math.max(indicatorIndex, 0), images.length - 1);
        const image = images[safeIndex];

        if (!image) {
            return;
        }

        lightboxImageElement.src = image.src;
        lightboxImageElement.alt = image.alt;
        lightboxElement.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightboxElement.hidden = true;

        document.body.style.overflow = "";
    }

    mediaElement.addEventListener("click", (event) => {
        const target = event.target;
        if (
            target instanceof Element &&
            target.closest("[data-slider-prev], [data-slider-next], [data-slider-dot]")
        ) {
            return;
        }

        openLightbox();
    });

    closeButton?.addEventListener("click", closeLightbox);

    lightboxElement.addEventListener("click", (event) => {
        if (event.target === lightboxElement) {
            closeLightbox();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (lightboxElement.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}
