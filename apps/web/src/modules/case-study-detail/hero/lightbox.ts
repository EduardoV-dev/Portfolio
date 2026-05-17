const media = document.querySelector<HTMLElement>("[data-detail-lightbox-images]");
const lightbox = document.querySelector<HTMLElement>("[data-detail-lightbox]");
const lightboxImage = document.querySelector<HTMLImageElement>("[data-detail-lightbox-image]");
const closeButton = document.querySelector<HTMLButtonElement>("[data-detail-lightbox-close]");

if (media && lightbox && lightboxImage) {
    const mediaElement = media;
    const lightboxElement = lightbox;
    const lightboxImageElement = lightboxImage;
    const imagesData = media.dataset.detailLightboxImages;
    const dragThreshold = 8;
    let images: Array<{ src: string; alt: string }> = [];
    let activePointerId: number | null = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerMoved = false;
    let suppressNextClick = false;

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

    mediaElement.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) {
            return;
        }

        activePointerId = event.pointerId;
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        pointerMoved = false;
    });

    mediaElement.addEventListener("pointermove", (event) => {
        if (activePointerId === null || event.pointerId !== activePointerId || pointerMoved) {
            return;
        }

        const deltaX = event.clientX - pointerStartX;
        const deltaY = event.clientY - pointerStartY;
        if (Math.hypot(deltaX, deltaY) >= dragThreshold) {
            pointerMoved = true;
        }
    });

    mediaElement.addEventListener("pointerup", (event) => {
        if (activePointerId === null || event.pointerId !== activePointerId) {
            return;
        }

        suppressNextClick = pointerMoved;
        activePointerId = null;
        pointerMoved = false;
    });

    mediaElement.addEventListener("pointercancel", (event) => {
        if (activePointerId === null || event.pointerId !== activePointerId) {
            return;
        }

        suppressNextClick = pointerMoved;
        activePointerId = null;
        pointerMoved = false;
    });

    mediaElement.addEventListener("click", (event) => {
        if (suppressNextClick) {
            suppressNextClick = false;
            return;
        }

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
