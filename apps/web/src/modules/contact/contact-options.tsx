import { useState, useRef, useEffect } from "react";
import ContactForm from "./contact-form";
import styles from "./contact-options.module.css";

const CALENDLY_URL = "https://calendly.com/eduardov-dev/30min";
const LINKEDIN_URL = "https://www.linkedin.com/in/eduardov-dev";
const EMAIL = "eduardovarela139@gmail.com";

type CopyStatus = "idle" | "copied";

export default function ContactOptions() {
    const [formOpen, setFormOpen] = useState(false);
    const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
    const formPanelRef = useRef<HTMLDivElement>(null);
    const openedViaHash = useRef(false);

    function openForm() {
        setFormOpen(true);
    }

    function closeForm() {
        setFormOpen(false);
    }

    function handleCopy() {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopyStatus("copied");
            setTimeout(() => setCopyStatus("idle"), 2000);
        });
    }

    // Auto-open form when navigated via /contact#send-email
    useEffect(() => {
        if (window.location.hash === "#send-email") {
            openedViaHash.current = true;
            openForm();
        }
    }, []);

    // After form renders: focus first field; if opened via hash, scroll panel into view
    useEffect(() => {
        if (!formOpen || !formPanelRef.current) return;

        if (openedViaHash.current) {
            formPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            openedViaHash.current = false;
        }

        const firstFocusable = formPanelRef.current.querySelector<HTMLElement>(
            "button, input, textarea, [tabindex]",
        );
        firstFocusable?.focus();
    }, [formOpen]);

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
                    {/* ── Primary: Schedule Call ── */}
                    <div className={styles["co__card"] + " " + styles["co__card--primary"]}>
                        <div className={styles["co__card-icon"]} aria-hidden="true">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <div className={styles["co__card-body"]}>
                            <p className={styles["co__card-badge"]}>Recommended</p>
                            <h3 className={styles["co__card-title"]}>Book a Strategy Call</h3>
                            <p className={styles["co__card-desc"]}>
                                Schedule a quick call to discuss your project, ideas, or
                                opportunities.
                            </p>
                            <a
                                href={CALENDLY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={
                                    styles["co__card-btn"] + " " + styles["co__card-btn--primary"]
                                }
                            >
                                Book a Call <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Email ── */}
                    <div
                        id="send-email"
                        className={
                            styles["co__card"] +
                            (formOpen ? " " + styles["co__card--email-active"] : "")
                        }
                    >
                        <div className={styles["co__card-icon"]} aria-hidden="true">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className={styles["co__card-body"]}>
                            <h3 className={styles["co__card-title"]}>Send an Email</h3>
                            <p className={styles["co__card-email"]}>{EMAIL}</p>
                            <div className={styles["co__card-actions"]}>
                                <button
                                    type="button"
                                    className={
                                        styles["co__card-btn"] + " " + styles["co__card-btn--email"]
                                    }
                                    onClick={openForm}
                                    aria-expanded={formOpen}
                                    aria-controls="email-form-panel"
                                >
                                    Write a Message <span aria-hidden="true">↓</span>
                                </button>
                                <button
                                    type="button"
                                    className={styles["co__card-copy"]}
                                    onClick={handleCopy}
                                    aria-label="Copy email address to clipboard"
                                >
                                    {copyStatus === "copied" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── LinkedIn ── */}
                    <div className={styles["co__card"]}>
                        <div className={styles["co__card-icon"]} aria-hidden="true">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </div>
                        <div className={styles["co__card-body"]}>
                            <h3 className={styles["co__card-title"]}>Connect on LinkedIn</h3>
                            <p className={styles["co__card-desc"]}>
                                Connect professionally or send a direct message.
                            </p>
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles["co__card-btn"]}
                            >
                                View Profile <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Inline form panel ── */}
                {formOpen && (
                    <div
                        id="email-form-panel"
                        className={styles["co__form-panel"]}
                        ref={formPanelRef}
                        role="region"
                        aria-label="Send a message form"
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
