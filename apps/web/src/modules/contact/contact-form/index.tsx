import { useState, useRef } from "react";
import { trackEvent } from "@/utils/telemetry";
import styles from "./index.module.css";

const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;

interface FormState {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
    onClose?: () => void;
}

function validate(form: FormState): FormErrors {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) errors.message = "Message is required.";
    return errors;
}

export default function ContactForm({ onClose }: ContactFormProps) {
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const formRef = useRef<HTMLFormElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            trackEvent("contact_submit_validation_error", {
                has_name_error: Boolean(validationErrors.name),
                has_email_error: Boolean(validationErrors.email),
                has_message_error: Boolean(validationErrors.message),
            });
            const firstInvalid = formRef.current?.querySelector(
                '[aria-invalid="true"]',
            ) as HTMLElement;
            firstInvalid?.focus();
            return;
        }

        if (!WEB3FORMS_ACCESS_KEY) {
            setStatus("error");
            trackEvent("contact_submit_error", { reason: "missing_access_key" });
            return;
        }

        setStatus("submitting");
        trackEvent("contact_submit_started");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: `Portfolio contact from ${form.name}`,
                }),
            });

            const data = (await res.json()) as { success: boolean };
            setStatus(data.success ? "success" : "error");
            trackEvent(data.success ? "contact_submit_success" : "contact_submit_error", {
                reason: data.success ? "none" : "provider_rejected",
            });
        } catch {
            setStatus("error");
            trackEvent("contact_submit_error", { reason: "network_failure" });
        }
    }

    if (status === "success") {
        return (
            <div className={styles.success} role="status" aria-live="polite">
                <div className={styles["success__icon"]} aria-hidden="true">
                    ✓
                </div>
                <h3 className={styles["success__title"]}>Message sent.</h3>
                <p className={styles["success__text"]}>
                    I&apos;ll get back to you within 24–48 hours.
                </p>
                {onClose && (
                    <button type="button" className={styles["success__close"]} onClick={onClose}>
                        Close
                    </button>
                )}
            </div>
        );
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            ref={formRef}
        >
            <div
                className={styles["form__field"]}
                style={{ "--field-index": 0 } as React.CSSProperties}
            >
                <label htmlFor="cf-name" className={styles["form__label"]}>
                    Name
                </label>
                <input
                    id="cf-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className={`${styles["form__input"]}${errors.name ? ` ${styles["form__input--error"]}` : ""}`}
                    value={form.name}
                    onChange={handleChange}
                    aria-describedby={errors.name ? "cf-name-error" : undefined}
                    aria-invalid={errors.name ? "true" : undefined}
                />
                {errors.name && (
                    <p id="cf-name-error" className={styles["form__error"]} role="alert">
                        {errors.name}
                    </p>
                )}
            </div>

            <div
                className={styles["form__field"]}
                style={{ "--field-index": 1 } as React.CSSProperties}
            >
                <label htmlFor="cf-email" className={styles["form__label"]}>
                    Email
                </label>
                <input
                    id="cf-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="you@example.com"
                    className={`${styles["form__input"]}${errors.email ? ` ${styles["form__input--error"]}` : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    aria-describedby={errors.email ? "cf-email-error" : undefined}
                    aria-invalid={errors.email ? "true" : undefined}
                />
                {errors.email && (
                    <p id="cf-email-error" className={styles["form__error"]} role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <div
                className={styles["form__field"]}
                style={{ "--field-index": 2 } as React.CSSProperties}
            >
                <label htmlFor="cf-message" className={styles["form__label"]}>
                    Message
                </label>
                <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    autoComplete="off"
                    placeholder="Tell me about your project or opportunity…"
                    className={`${styles["form__textarea"]}${errors.message ? ` ${styles["form__input--error"]}` : ""}`}
                    value={form.message}
                    onChange={handleChange}
                    aria-describedby={errors.message ? "cf-message-error" : undefined}
                    aria-invalid={errors.message ? "true" : undefined}
                />
                {errors.message && (
                    <p id="cf-message-error" className={styles["form__error"]} role="alert">
                        {errors.message}
                    </p>
                )}
            </div>

            {status === "error" && (
                <p className={styles["form__submit-error"]} role="alert">
                    Something went wrong. Please try again or reach out via LinkedIn.
                </p>
            )}

            <div className={styles["form__footer"]}>
                <button
                    type="submit"
                    className={styles["form__submit"]}
                    disabled={status === "submitting"}
                    aria-disabled={status === "submitting"}
                >
                    {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
            </div>
        </form>
    );
}
