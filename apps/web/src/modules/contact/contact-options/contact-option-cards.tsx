export interface ContactOptionCardsProps {
    isCalendlyVisible: boolean;
    isFormVisible: boolean;
    toggleCalendly: () => void;
    toggleForm: () => void;
    calendlyUrl: string;
    linkedinUrl: string;
    onLinkedInClick: () => void;
    styles: { readonly [key: string]: string };
}

export default function ContactOptionCards({
    isCalendlyVisible,
    isFormVisible,
    toggleCalendly,
    toggleForm,
    linkedinUrl,
    onLinkedInClick,
    styles,
}: ContactOptionCardsProps) {
    return (
        <>
            {/* ── Primary: Schedule Call ── */}
            <div
                className={
                    styles["co__card"] +
                    " " +
                    styles["co__card--primary"] +
                    (isCalendlyVisible ? " " + styles["co__card--calendly-active"] : "")
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
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>
                <div className={styles["co__card-body"]}>
                    <p className={styles["co__card-badge"]}>Recommended</p>
                    <h3 className={styles["co__card-title"]}>Book a Call</h3>
                    <p className={styles["co__card-desc"]}>
                        Talk through scope, constraints, and timeline.
                    </p>
                    <button
                        type="button"
                        className={
                            styles["co__card-btn"] +
                            " " +
                            styles["co__card-btn--primary"] +
                            (isCalendlyVisible ? " " + styles["co__card-btn--primary-open"] : "")
                        }
                        onClick={toggleCalendly}
                        aria-expanded={isCalendlyVisible}
                        aria-controls="calendly-panel"
                    >
                        <span>{isCalendlyVisible ? "Close Scheduler" : "Book a Call"}</span>
                        <span
                            className={
                                styles["co__card-btn-arrow"] +
                                (isCalendlyVisible ? " " + styles["co__card-btn-arrow--up"] : "")
                            }
                            aria-hidden="true"
                        >
                            ↓
                        </span>
                    </button>
                </div>
            </div>

            {/* ── Email ── */}
            <div
                id="send-email"
                className={
                    styles["co__card"] +
                    (isFormVisible ? " " + styles["co__card--email-active"] : "")
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
                    <p className={styles["co__card-badge"]} aria-hidden="true">
                        &nbsp;
                    </p>
                    <h3 className={styles["co__card-title"]}>Send an Email</h3>
                    <p className={styles["co__card-desc"]}>
                        Send details in writing. I reply within 24 hours.
                    </p>
                    <div className={styles["co__card-actions"]}>
                        <button
                            type="button"
                            className={
                                styles["co__card-btn"] +
                                " " +
                                styles["co__card-btn--email"] +
                                (isFormVisible ? " " + styles["co__card-btn--email-open"] : "")
                            }
                            onClick={toggleForm}
                            aria-expanded={isFormVisible}
                            aria-controls="email-form-panel"
                        >
                            <span>{isFormVisible ? "Close Message" : "Write a Message"}</span>
                            <span
                                className={
                                    styles["co__card-btn-arrow"] +
                                    (isFormVisible ? " " + styles["co__card-btn-arrow--up"] : "")
                                }
                                aria-hidden="true"
                            >
                                ↓
                            </span>
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
                    <p className={styles["co__card-badge"]} aria-hidden="true">
                        &nbsp;
                    </p>
                    <h3 className={styles["co__card-title"]}>LinkedIn</h3>
                    <p className={styles["co__card-desc"]}>Send direct message on LinkedIn.</p>
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onLinkedInClick}
                        aria-label="LinkedIn profile (opens in new tab)"
                        className={styles["co__card-btn"]}
                    >
                        View Profile <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </>
    );
}
