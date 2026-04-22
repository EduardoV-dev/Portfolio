import { useState, useEffect } from "react";
import styles from "./contact-form.module.css";

const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

// Extend window with grecaptcha global
declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

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

function loadRecaptcha() {
    if (document.querySelector(`script[data-recaptcha]`)) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.dataset.recaptcha = "true";
    document.head.appendChild(script);
}

function getRecaptchaToken(): Promise<string> {
    return new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(RECAPTCHA_SITE_KEY, { action: "contact" })
                .then(resolve)
                .catch(reject);
        });
    });
}

export default function ContactForm({ onClose }: ContactFormProps) {
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<SubmitStatus>("idle");

    // Load reCAPTCHA v3 script on mount
    useEffect(() => {
        loadRecaptcha();
    }, []);

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
            return;
        }

        setStatus("submitting");
        try {
            const recaptchaToken = await getRecaptchaToken();

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: `Portfolio contact from ${form.name}`,
                    "g-recaptcha-response": recaptchaToken,
                }),
            });

            const data = (await res.json()) as { success: boolean };
            setStatus(data.success ? "success" : "error");
        } catch {
            setStatus("error");
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
        <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Contact form">
            <div className={styles["form__field"]}>
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

            <div className={styles["form__field"]}>
                <label htmlFor="cf-email" className={styles["form__label"]}>
                    Email
                </label>
                <input
                    id="cf-email"
                    type="email"
                    name="email"
                    autoComplete="email"
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

            <div className={styles["form__field"]}>
                <label htmlFor="cf-message" className={styles["form__label"]}>
                    Message
                </label>
                <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
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
                    Something went wrong. Try emailing directly at{" "}
                    <a href="mailto:hello@eduardovarela.dev">hello@eduardovarela.dev</a>.
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
                <p className={styles["form__recaptcha-notice"]}>
                    Protected by{" "}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        reCAPTCHA
                    </a>
                    .
                </p>
            </div>
        </form>
    );
}
