import { useEffect, useState } from "react";
import { type Post, formatPostDate } from "@/data/posts";
import styles from "./insights-posts.module.css";

type Category = "all" | "architecture" | "backend" | "cloud" | "performance";

const FILTERS: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Architecture", value: "architecture" },
    { label: "Backend", value: "backend" },
    { label: "Cloud", value: "cloud" },
    { label: "Performance", value: "performance" },
];

interface Props {
    posts: Post[];
}

export default function InsightsPosts({ posts }: Props) {
    const [active, setActive] = useState<Category>(() => {
        if (typeof window !== "undefined") {
            const param = new URLSearchParams(window.location.search).get("category");
            if (param && FILTERS.some((f) => f.value === param)) return param as Category;
        }
        return "all";
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (active === "all") {
            params.delete("category");
        } else {
            params.set("category", active);
        }
        const newUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname;
        history.replaceState(null, "", newUrl);
    }, [active]);

    const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);

    return (
        <section className={styles.ip} aria-labelledby="ip-heading">
            <div className={styles.ip__inner}>
                <div className={styles.ip__header}>
                    <h2 className={styles.ip__heading} id="ip-heading">
                        All Articles
                    </h2>

                    <div
                        className={styles.ip__filters}
                        role="group"
                        aria-label="Filter by category"
                    >
                        {FILTERS.map(({ label, value }) => (
                            <button
                                key={value}
                                type="button"
                                className={
                                    styles.ip__filter +
                                    (active === value ? " " + styles["ip__filter--active"] : "")
                                }
                                onClick={() => setActive(value)}
                                aria-pressed={active === value}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className={styles.ip__empty} role="status">
                        <p className={styles.ip__empty_text}>
                            Insights coming soon. I&apos;ll be sharing thoughts on system design,
                            performance, and real-world engineering challenges.
                        </p>
                    </div>
                ) : (
                    <ul className={styles.ip__grid}>
                        {filtered.map((post) => (
                            <li key={post.slug}>
                                <a href={`/blog/${post.slug}`} className={styles.ip__card}>
                                    <div className={styles.ip__card_body}>
                                        <div className={styles.ip__card_tags}>
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className={styles.ip__tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className={styles.ip__card_title}>{post.title}</h3>

                                        <p className={styles.ip__card_desc}>{post.description}</p>
                                    </div>

                                    <div className={styles.ip__card_footer}>
                                        <div className={styles.ip__card_meta}>
                                            <span>{formatPostDate(post.date)}</span>
                                            <span
                                                className={styles.ip__meta_sep}
                                                aria-hidden="true"
                                            >
                                                ·
                                            </span>
                                            <span>{post.readingTime} min read</span>
                                        </div>
                                        <span className={styles.ip__card_cta}>
                                            Read <span aria-hidden="true">→</span>
                                        </span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
