import { useState, useRef, useEffect, useCallback } from "react";
import { trackEvent } from "@/utils/telemetry";
import ContactForm from "../contact-form";
import ContactOptionCards from "./contact-option-cards";
import styles from "./index.module.css";

const CALENDLY_URL = "https://calendly.com/eduardovarela139/30min";
const LINKEDIN_URL = "https://www.linkedin.com/in/eduardov-dev";

let calendlyScriptLoaded = false;

function loadCalendlyScript() {
    if (calendlyScriptLoaded) return;
    calendlyScriptLoaded = true;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
}

export default function ContactOptions() {
    const [formOpen, setFormOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [calendlyOpen, setCalendlyOpen] = useState(false);
    const [isCalendlyClosing, setIsCalendlyClosing] = useState(false);
    const formPanelRef = useRef<HTMLDivElement>(null);
    const calendlyPanelRef = useRef<HTMLDivElement>(null);
    const calendlyWidgetRef = useRef<HTMLDivElement>(null);
    const openedViaHash = useRef(false);

    const openForm = useCallback(() => {
        setIsClosing(false);
        setFormOpen(true);
        trackEvent("contact_form_open");
    }, []);

    const closeForm = useCallback(() => {
        setIsClosing(true);
        trackEvent("contact_form_close");
    }, []);

    function toggleForm() {
        if (formOpen && !isClosing) {
            closeForm();
        } else if (!formOpen) {
            // Close Calendly if open before opening form
            if (calendlyOpen && !isCalendlyClosing) closeCalendly();
            openForm();
        }
    }

    const openCalendly = useCallback(() => {
        loadCalendlyScript();
        setIsCalendlyClosing(false);
        setCalendlyOpen(true);
        trackEvent("contact_calendly_open");
    }, []);

    const closeCalendly = useCallback(() => {
        setIsCalendlyClosing(true);
        trackEvent("contact_calendly_close");
    }, []);

    function toggleCalendly() {
        if (calendlyOpen && !isCalendlyClosing) {
            closeCalendly();
        } else if (!calendlyOpen) {
            // Close email form if open before opening Calendly
            if (formOpen && !isClosing) closeForm();
            openCalendly();
        }
    }

    function handleLinkedInClick() {
        trackEvent("contact_linkedin_click");
    }

    function handlePanelAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
        if (e.animationName.includes("panel-conceal")) {
            setFormOpen(false);
            setIsClosing(false);
        }
    }

    function handleCalendlyPanelAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
        if (e.animationName.includes("panel-conceal")) {
            setCalendlyOpen(false);
            setIsCalendlyClosing(false);
        }
    }

    // Auto-open Calendly when navigated via /contact#book-a-call
    useEffect(() => {
        if (window.location.hash === "#book-a-call") {
            openedViaHash.current = true;
            openCalendly();
        }
    }, [openCalendly]);

    // Auto-open form when navigated via /contact#send-email
    useEffect(() => {
        if (window.location.hash === "#send-email") {
            openedViaHash.current = true;
            openForm();
        }
    }, [openForm]);

    // After form renders: focus first field; if opened via hash, scroll panel into view
    useEffect(() => {
        if (!formOpen || isClosing || !formPanelRef.current) return;

        if (openedViaHash.current) {
            formPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            openedViaHash.current = false;
        }

        const firstFocusable = formPanelRef.current.querySelector<HTMLElement>(
            "button, input, textarea, [tabindex]",
        );
        firstFocusable?.focus();
    }, [formOpen, isClosing]);

    // Scroll Calendly panel into view when it opens
    useEffect(() => {
        if (!calendlyOpen || isCalendlyClosing || !calendlyPanelRef.current) return;

        if (openedViaHash.current) {
            calendlyPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            openedViaHash.current = false;
        } else {
            calendlyPanelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [calendlyOpen, isCalendlyClosing]);

    // Re-initialize Calendly widget on every open (widget.js only auto-inits on first DOM scan)
    useEffect(() => {
        if (!calendlyOpen || isCalendlyClosing || !calendlyWidgetRef.current) return;
        const w = window as {
            Calendly?: {
                initInlineWidget: (opts: { url: string; parentElement: Element }) => void;
            };
        };
        if (w.Calendly) {
            w.Calendly.initInlineWidget({
                url: CALENDLY_URL,
                parentElement: calendlyWidgetRef.current,
            });
        }
        // If Calendly hasn't loaded yet (first open), widget.js auto-inits on script load
    }, [calendlyOpen, isCalendlyClosing]);

    const isFormVisible = formOpen || isClosing;
    const isCalendlyVisible = calendlyOpen || isCalendlyClosing;

    return (
        <section className={styles.co} id="contact-options" aria-labelledby="co-heading">
            <div className={styles.co__inner}>
                <header className={styles.co__header}>
                    <p className={styles.co__label}>GET IN TOUCH</p>
                    <h2 className={styles.co__heading} id="co-heading">
                        Choose how to connect
                    </h2>
                </header>

                <div className={styles.co__grid}>
                    <ContactOptionCards
                        isCalendlyVisible={isCalendlyVisible}
                        isFormVisible={isFormVisible}
                        toggleCalendly={toggleCalendly}
                        toggleForm={toggleForm}
                        calendlyUrl={CALENDLY_URL}
                        linkedinUrl={LINKEDIN_URL}
                        onLinkedInClick={handleLinkedInClick}
                        styles={styles}
                    />
                </div>

                {/* ── Calendly panel ── */}
                {isCalendlyVisible && (
                    <div
                        id="calendly-panel"
                        className={
                            styles["co__calendly-panel"] +
                            (isCalendlyClosing ? " " + styles["co__calendly-panel--closing"] : "")
                        }
                        ref={calendlyPanelRef}
                        role="region"
                        aria-label="Book a call scheduler"
                        onAnimationEnd={handleCalendlyPanelAnimationEnd}
                    >
                        <div className={styles["co__form-panel-header"]}>
                            <p className={styles["co__form-panel-title"]}>Book a 30-Minute Call</p>
                            <button
                                type="button"
                                className={styles["co__form-panel-close"]}
                                onClick={closeCalendly}
                                aria-label="Close booking scheduler"
                            >
                                ✕
                            </button>
                        </div>
                        <div className={styles["co__calendly-widget-wrap"]}>
                            <div
                                className="calendly-inline-widget"
                                data-url={CALENDLY_URL}
                                ref={calendlyWidgetRef}
                                style={{ minWidth: "320px", height: "100%" }}
                            />
                        </div>
                    </div>
                )}

                {/* ── Inline form panel ── */}
                {isFormVisible && (
                    <div
                        id="email-form-panel"
                        className={
                            styles["co__form-panel"] +
                            (isClosing ? " " + styles["co__form-panel--closing"] : "")
                        }
                        ref={formPanelRef}
                        role="region"
                        aria-label="Send a message form"
                        onAnimationEnd={handlePanelAnimationEnd}
                    >
                        <div className={styles["co__form-panel-header"]}>
                            <p className={styles["co__form-panel-title"]}>Send a message</p>
                            <button
                                type="button"
                                className={styles["co__form-panel-close"]}
                                onClick={closeForm}
                                aria-label="Close message form"
                            >
                                ✕
                            </button>
                        </div>
                        <ContactForm onClose={closeForm} />
                    </div>
                )}
            </div>
        </section>
    );
}
