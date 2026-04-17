/**
 * Scroll reveal utility using a single shared IntersectionObserver.
 *
 * Usage:
 *   1. Add `data-animate` to any element you want to animate on scroll.
 *   2. Optionally add `data-animate-delay="N"` (N = 1, 2, 3 …) for staggered
 *      entrance — each step adds 120ms of delay.
 *   3. Call `initScrollReveal()` once in a `<script>` tag on the page or
 *      inside any component — it is safe to call multiple times per page,
 *      subsequent calls are no-ops.
 *
 * The CSS states (hidden / visible) live in src/styles/animations.css.
 */

const STAGGER_STEP_MS = 120;

let initialized = false;

export function initScrollReveal(): void {
    if (initialized) return;
    initialized = true;

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const el = entry.target as HTMLElement;

                // Compute stagger delay from data-animate-delay="N"
                const step = Number(el.dataset.animateDelay ?? 0);
                if (step > 0) {
                    el.style.setProperty("--reveal-delay", `${step * STAGGER_STEP_MS}ms`);
                }

                el.classList.add("is-visible");
                observer.unobserve(el);

                // Release compositor layer once the reveal transition completes.
                // Keeping will-change on all ~42 revealed elements indefinitely
                // exhausts GPU memory and causes stutter during scroll.
                el.addEventListener(
                    "transitionend",
                    () => {
                        el.style.willChange = "auto";
                    },
                    { once: true },
                );
            }
        },
        // Fire when ~12% of the element is inside the viewport
        { threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => observer.observe(el));
}
