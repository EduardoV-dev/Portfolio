/**
 * Scroll reveal utility using a single shared IntersectionObserver.
 *
 * Usage:
 *   1. Add `data-animate` to any element you want to animate on scroll.
 *   2. Stagger is computed automatically: within each observer batch, elements
 *      are sorted by vertical position so the topmost element always reveals
 *      first. `data-animate-delay` attributes in templates are no longer read.
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
            // Sort intersecting entries top-to-bottom so stagger delays always
            // flow in the correct visual order, regardless of which section an
            // element belongs to or how its data-animate-delay was set.
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            visible.forEach((entry, index) => {
                const el = entry.target as HTMLElement;

                // Position-based delay: topmost element in the batch fires first.
                el.style.setProperty("--reveal-delay", `${index * STAGGER_STEP_MS}ms`);

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
            });
        },
        // Fire when ~12% of the element is inside the viewport
        { threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => observer.observe(el));
}
