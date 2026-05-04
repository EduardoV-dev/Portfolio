export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; level: 2 | 3; text: string }
    | { type: "code"; language: string; snippet: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; text: string; attribution?: string };

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string; // ISO 8601: "YYYY-MM-DD"
    readingTime: number; // minutes
    tags: string[];
    category: "architecture" | "backend" | "cloud" | "performance";
    featured?: boolean;
    body: ContentBlock[];
}

export const posts: Post[] = [
    {
        slug: "scalable-api-design",
        title: "How I Design Scalable APIs",
        description:
            "A practical look at the principles and patterns I rely on when designing APIs that need to grow with a product, from contract-first thinking to versioning strategies.",
        date: "2025-03-15",
        readingTime: 8,
        tags: ["API Design", "Backend", "TypeScript", "REST"],
        category: "backend",
        featured: true,
        body: [
            {
                type: "paragraph",
                text: "Most API problems I've encountered in production weren't caused by bad code; they were caused by missing contracts. Teams shipped fast, endpoints proliferated, and six months later no one was sure which fields were still in use or whether removing a property would break a mobile app in the wild.",
            },
            {
                type: "paragraph",
                text: "Over time I've developed a set of habits that keep APIs predictable, evolvable, and easy to consume. None of them are revolutionary. They're just the things I wish someone had told me earlier.",
            },
            {
                type: "heading",
                level: 2,
                text: "Start with the Contract",
            },
            {
                type: "paragraph",
                text: "Before writing a single route handler, I define the shape of every request and response in TypeScript. This isn't just type safety; it's a forcing function. It forces you to think about what data the consumer actually needs, not what the database happens to store.",
            },
            {
                type: "code",
                language: "typescript",
                snippet: `// Define the contract first, then implement around it
interface CreateOrderRequest {
    customerId: string;
    items: Array<{ productId: string; quantity: number }>;
    shippingAddressId: string;
}

interface CreateOrderResponse {
    orderId: string;
    status: "pending" | "confirmed";
    estimatedDelivery: string; // ISO 8601
    totalAmount: number;
}

// The handler becomes a thin adapter between HTTP and business logic
async function createOrder(
    req: CreateOrderRequest,
): Promise<CreateOrderResponse> {
    // ...
}`,
            },
            {
                type: "paragraph",
                text: "When the contract lives in code and is shared between the client and server, an entire class of integration bugs disappears. The feedback loop moves from production incidents to compile-time errors.",
            },
            {
                type: "heading",
                level: 2,
                text: "Version from Day One",
            },
            {
                type: "paragraph",
                text: "I always include a version prefix in the URL, even on the first release. Not because I expect to need v2 immediately, but because it's trivially cheap to do upfront and extremely expensive to retrofit. `/api/v1/orders` costs nothing. Migrating ten clients away from `/api/orders` costs weeks.",
            },
            {
                type: "heading",
                level: 2,
                text: "Principles I Return to Repeatedly",
            },
            {
                type: "list",
                items: [
                    "Pagination is not optional: any collection endpoint that could return more than 20 items gets cursor-based pagination from day one.",
                    "Errors are data: return structured error bodies with a machine-readable code, a human-readable message, and a request ID for tracing.",
                    "Idempotency keys for mutations: any operation that charges money, sends a notification, or creates a resource should accept an idempotency key.",
                    "Never break the contract: add fields freely, but never remove or rename them in a minor version. Use a deprecation period.",
                    "Document the unhappy paths: the 200 response is obvious. Document every 4xx and 5xx with examples.",
                ],
            },
            {
                type: "quote",
                text: "A public API is a promise. Design it like one.",
                attribution: "Pragmatic API Design",
            },
        ],
    },
    {
        slug: "production-systems-lessons",
        title: "Lessons from Building Production Systems",
        description:
            "After deploying several systems that handle real traffic, a few hard-won lessons have changed how I think about reliability, observability, and what 'done' actually means in production.",
        date: "2025-02-20",
        readingTime: 6,
        tags: ["Architecture", "Production", "Reliability", "Observability"],
        category: "architecture",
        body: [
            {
                type: "paragraph",
                text: "The gap between a system that passes all tests and a system that survives production is wider than most engineers expect the first time they cross it. Staging environments, no matter how carefully maintained, are optimistic simulations. Real users do things no QA checklist anticipated.",
            },
            {
                type: "paragraph",
                text: "Here's what I've learned from the moments where things went wrong, and sometimes from the near-misses that almost did.",
            },
            {
                type: "heading",
                level: 2,
                text: "Observability Is Not Optional",
            },
            {
                type: "paragraph",
                text: "The first time a production incident wakes you up at 2 AM and you have no structured logs, no trace IDs, and no metrics. You will never skip observability again. It's not a nice-to-have. It's the difference between a 15-minute fix and a 3-hour guessing game.",
            },
            {
                type: "list",
                items: [
                    "Structured logs with a consistent schema: every log line includes service name, request ID, and severity.",
                    "Distributed tracing across service boundaries: a single trace ID propagated through every hop.",
                    "Business-level metrics, not just infrastructure: track order completions and checkout errors, not just CPU utilization.",
                    "Alerts on symptoms, not causes: page on 'error rate > 1%' rather than 'CPU > 80%'.",
                ],
            },
            {
                type: "heading",
                level: 2,
                text: "Plan for Failure at Every Layer",
            },
            {
                type: "paragraph",
                text: "Every external call will eventually fail. Every database will occasionally be slow. Every third-party service will have an outage. The question isn't whether these things will happen; it's whether your system degrades gracefully or collapses.",
            },
            {
                type: "code",
                language: "typescript",
                snippet: `// Circuit breaker pattern — stop hammering a failing dependency
class CircuitBreaker {
    private failures = 0;
    private lastFailure = 0;
    private state: "closed" | "open" | "half-open" = "closed";

    async call<T>(fn: () => Promise<T>): Promise<T> {
        if (this.state === "open") {
            const elapsed = Date.now() - this.lastFailure;
            if (elapsed < 30_000) throw new Error("Circuit open");
            this.state = "half-open";
        }

        try {
            const result = await fn();
            this.failures = 0;
            this.state = "closed";
            return result;
        } catch (err) {
            this.failures++;
            this.lastFailure = Date.now();
            if (this.failures >= 5) this.state = "open";
            throw err;
        }
    }
}`,
            },
            {
                type: "quote",
                text: "Hope is not a strategy. Design your system to expect failure and you'll be surprised how rarely it actually fails.",
            },
        ],
    },
    {
        slug: "nodejs-performance",
        title: "Optimizing Performance in Node.js Applications",
        description:
            "Node.js performance pitfalls are often subtle. This covers the patterns I've used to diagnose and fix bottlenecks, from event loop blockage to memory leaks under load.",
        date: "2025-01-10",
        readingTime: 7,
        tags: ["Node.js", "Performance", "Optimization", "Backend"],
        category: "performance",
        body: [
            {
                type: "paragraph",
                text: "Node.js is fast by default for I/O-bound work, but it's surprisingly easy to accidentally make it slow. The event loop is single-threaded, and any synchronous operation that takes more than a few milliseconds will block every other request waiting in the queue.",
            },
            {
                type: "paragraph",
                text: "Most performance problems I've diagnosed in Node.js services fall into a small number of categories. Once you can recognize them, they become much easier to prevent.",
            },
            {
                type: "heading",
                level: 2,
                text: "Never Block the Event Loop",
            },
            {
                type: "paragraph",
                text: "Synchronous operations on large datasets are the most common offender. JSON.parse on a 2MB payload, a deep recursive function, or a synchronous file read; all of these park the event loop while they run, starving every concurrent request of CPU time.",
            },
            {
                type: "code",
                language: "typescript",
                snippet: `// ❌ Blocks the event loop for every request
app.get("/report", (req, res) => {
    const data = fs.readFileSync("./large-dataset.json", "utf-8");
    const parsed = JSON.parse(data); // Could be 50ms+ on large payloads
    res.json(processReport(parsed));
});

// ✅ Yields control back to the event loop between I/O operations
app.get("/report", async (req, res) => {
    const data = await fs.promises.readFile("./large-dataset.json", "utf-8");
    const parsed = JSON.parse(data);
    res.json(processReport(parsed));
});

// ✅✅ For CPU-heavy processing, offload to a worker thread
import { runWorker } from "./worker-pool";

app.get("/report", async (req, res) => {
    const result = await runWorker("processReport", { dataPath: "./large-dataset.json" });
    res.json(result);
});`,
            },
            {
                type: "heading",
                level: 2,
                text: "Diagnose Before You Optimize",
            },
            {
                type: "paragraph",
                text: "Every optimization I've made that actually mattered came after profiling, not before. Gut instinct about where the bottleneck is tends to be wrong. The Node.js inspector, clinic.js, and `--prof` output will show you the real picture.",
            },
            {
                type: "heading",
                level: 2,
                text: "Practical Optimization Checklist",
            },
            {
                type: "list",
                items: [
                    "Use streaming for large payloads: pipe responses instead of buffering entire bodies in memory.",
                    "Cache aggressively at the right layer: in-process LRU caches for hot data, Redis for shared state.",
                    "Batch database queries: N+1 query patterns are as expensive in Node.js as anywhere else.",
                    "Pool your connections: database and HTTP connection pools prevent handshake overhead on every request.",
                    "Set and tune timeouts: every outbound call needs a timeout; unbounded waits cause cascading slowdowns.",
                    "Profile memory under load: the V8 heap profiler will catch memory leaks that only appear at scale.",
                ],
            },
        ],
    },
    {
        slug: "monolith-vs-microservices",
        title: "Monolith vs Microservices: Real Trade-offs",
        description:
            "The microservices debate is often framed as a question of scale, but it's really a question of organizational complexity. Here's how I think about the decision in practice.",
        date: "2024-12-05",
        readingTime: 5,
        tags: ["Architecture", "Microservices", "System Design", "Engineering"],
        category: "architecture",
        body: [
            {
                type: "paragraph",
                text: "I've built systems as monoliths and I've worked on systems that started as microservices. The honest answer to 'which is better' is: it depends on things most architecture articles don't talk about: your team size, your deployment maturity, and how well-understood your domain boundaries actually are.",
            },
            {
                type: "heading",
                level: 2,
                text: "The Case for Starting with a Monolith",
            },
            {
                type: "paragraph",
                text: "In the early stages of a product, your understanding of the domain is incomplete. The boundaries that seem obvious at the start (user service, order service, payment service) often turn out to be wrong once you've shipped real features. Splitting prematurely locks in bad boundaries that become expensive to cross.",
            },
            {
                type: "quote",
                text: "Don't start with microservices. Almost every successful microservices story starts with a monolith that got too big to manage as a single unit.",
                attribution: "Martin Fowler, Microservices Guide",
            },
            {
                type: "paragraph",
                text: "A well-structured monolith with clear internal module boundaries is not a step backward. It's a system that can be extracted into services once you genuinely understand the seams, rather than guessing at them.",
            },
            {
                type: "heading",
                level: 2,
                text: "When the Split Makes Sense",
            },
            {
                type: "paragraph",
                text: "The signals that a monolith is ready to be broken up are usually organizational, not technical. Deployments are becoming coordination nightmares. Different parts of the system need to scale at radically different rates. Teams are stepping on each other's code.",
            },
            {
                type: "list",
                items: [
                    "Teams larger than 8-10 engineers working on the same codebase consistently: Conway's Law will create the split anyway.",
                    "Wildly different scaling requirements: a checkout flow and a reporting service don't need to scale together.",
                    "Independent release cadences: if the marketing team's A/B tests block the payments team's deploys, that's a structural problem.",
                    "Compliance or security isolation: some data genuinely needs to live behind stricter boundaries.",
                ],
            },
            {
                type: "heading",
                level: 2,
                text: "The Cost Nobody Advertises",
            },
            {
                type: "paragraph",
                text: "Microservices trade one kind of complexity for another. You gain independent deployability and team autonomy. You pay with distributed system problems: network partitions, eventual consistency, distributed tracing overhead, and the operational burden of running dozens of services instead of one. Make sure you can afford the trade before you make it.",
            },
        ],
    },
    {
        slug: "scale-from-day-one",
        title: "Designing Systems for Scale from Day One",
        description:
            "Scalability isn't about premature optimization; it's about avoiding architectural decisions that become impossible to undo. Here are the patterns I build into every system from the start.",
        date: "2024-11-18",
        readingTime: 6,
        tags: ["Cloud", "AWS", "Scalability", "Infrastructure"],
        category: "cloud",
        body: [
            {
                type: "paragraph",
                text: "There's a reasonable instinct to avoid 'premature optimization', and most of the time, it's correct. But there's a difference between optimizing prematurely and making architectural decisions that are cheap now but catastrophically expensive to undo later.",
            },
            {
                type: "paragraph",
                text: "The patterns I build into every new system aren't about handling massive scale on day one. They're about keeping the path to scale open, so that growth is an opportunity rather than a crisis.",
            },
            {
                type: "heading",
                level: 2,
                text: "Stateless Services by Default",
            },
            {
                type: "paragraph",
                text: "If a service stores state in memory (user sessions, in-flight request context, local caches that aren't synchronized) you've created a dependency on a specific instance. Horizontal scaling becomes complicated. Deployments become risky. The fix is to externalize all state from day one.",
            },
            {
                type: "code",
                language: "typescript",
                snippet: `// ❌ Stateful handler — won't scale horizontally
const activeSessions = new Map<string, Session>();

export const handler = async (event: APIGatewayEvent) => {
    const session = activeSessions.get(event.headers["x-session-id"] ?? "");
    if (!session) return { statusCode: 401, body: "Unauthorized" };
    // ...
};

// ✅ Stateless — state lives in Redis, any instance can handle any request
import { getSession } from "@/lib/session-store"; // backed by Redis / DynamoDB

export const handler = async (event: APIGatewayEvent) => {
    const session = await getSession(event.headers["x-session-id"] ?? "");
    if (!session) return { statusCode: 401, body: "Unauthorized" };
    // ...
};`,
            },
            {
                type: "heading",
                level: 2,
                text: "Design for Async from the Start",
            },
            {
                type: "paragraph",
                text: "Any operation that doesn't need to complete before the HTTP response is returned should be asynchronous. Sending a confirmation email, updating analytics, triggering downstream workflows: none of these belong in the critical path of a request. An event-driven approach here costs almost nothing to implement early and saves enormous headaches later.",
            },
            {
                type: "heading",
                level: 2,
                text: "Scale Patterns Worth Building In Early",
            },
            {
                type: "list",
                items: [
                    "Externalize all session and cache state — Redis or DynamoDB, not in-process maps.",
                    "Use queues for workload that doesn't need synchronous confirmation — SQS, EventBridge, or a simple job table.",
                    "Read replicas from day one — separate your read and write database connections even when using the same instance; makes the upgrade to read replicas trivial later.",
                    "CDN-first for all static assets — every image and JS bundle behind CloudFront from the first deploy.",
                    "Rate limiting at the edge — API Gateway or CloudFront, not inside application code.",
                    "Idempotent writes — any mutation that goes through a queue needs to be safe to run twice.",
                ],
            },
            {
                type: "quote",
                text: "The best time to design for scale was when you started. The second best time is before your first real traffic spike.",
            },
        ],
    },
];

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return posts.map((p) => p.slug);
}

export function getFeaturedPost(): Post | undefined {
    return posts.find((p) => p.featured);
}

export function getNonFeaturedPosts(): Post[] {
    return posts.filter((p) => !p.featured);
}

export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
    const index = posts.findIndex((p) => p.slug === slug);
    return {
        prev: index > 0 ? posts[index - 1] : null,
        next: index < posts.length - 1 ? posts[index + 1] : null,
    };
}

export function formatPostDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
