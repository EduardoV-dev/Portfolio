export interface ArchitectureLayer {
    name: string;
    components: string[];
    description: string;
}

export interface Highlight {
    title: string;
    description: string;
    code?: {
        language: string;
        snippet: string;
    };
}

export interface ProjectDetail {
    metrics: { label: string; value: string }[];
    overview: string;
    challenge: string;
    solution: string;
    architecture: {
        description: string;
        layers: ArchitectureLayer[];
    };
    highlights: Highlight[];
    impactDetails: string[];
    techStack: {
        frontend?: string[];
        backend?: string[];
        infrastructure?: string[];
        tools?: string[];
    };
    learnings: string[];
}

export interface Project {
    slug: string;
    title: string;
    impact: string;
    description: string;
    tags: string[];
    category: string;
    bullets: string[];
    tech: string[];
    sourceHref: string;
    liveHref: string;
    detail: ProjectDetail;
}

export const projects: Project[] = [
    {
        slug: "neural-grid-orchestrator",
        title: "Neural Grid Orchestrator",
        impact: "Processed 40M+ events/day with 40% latency reduction across regional clusters.",
        description:
            "A high-throughput distributed system designed for real-time processing of sensory data across edge computing nodes.",
        tags: ["REACT", "AWS LAMBDA", "TERRAFORM"],
        category: "architecture",
        bullets: [
            "Improved latency by 40% across regional clusters.",
            "Automated CI/CD deployment pipeline for 200+ services.",
        ],
        tech: ["React", "AWS Lambda", "Terraform"],
        sourceHref: "#",
        liveHref: "#",
        detail: {
            metrics: [
                { label: "Latency reduction", value: "−40%" },
                { label: "Events processed / day", value: "40M+" },
                { label: "Services automated", value: "200+" },
                { label: "System uptime", value: "99.97%" },
            ],
            overview:
                "Neural Grid Orchestrator is a distributed event-processing platform built for real-time ingestion and routing of sensory telemetry from edge devices across geographically distributed clusters. It serves IoT platform operators and data engineering teams who need sub-100ms processing guarantees at scale without managing per-node infrastructure complexity. The system abstracts away node topology and exposes a unified event API, letting consumers subscribe to processed streams without concern for underlying cluster state.",
            challenge:
                "The core challenge was processing 40M+ heterogeneous events per day across nodes with wildly different hardware profiles and network conditions — from high-bandwidth data-center nodes to constrained edge devices with intermittent connectivity. Existing message queue solutions introduced unacceptable fan-out latency once the node count exceeded 80. Additionally, partial node failures had to degrade gracefully without data loss, ruling out simple round-robin dispatch. The system also needed to be provisioned and torn down dynamically as cluster topology changed, with zero manual intervention.",
            solution:
                "The solution uses a two-tier routing model: a lightweight edge agent on each node handles local buffering and heartbeats, while a central orchestration layer makes routing decisions based on real-time node health scores. Events are written to Redis Streams partitioned by region, consumed by Lambda workers that apply routing logic, and flushed to TimescaleDB for time-series querying. Dead-letter queues absorb failed deliveries and replay them automatically with exponential backoff. Terraform modules encode the entire cluster topology as code, so spinning up a new region is a single `apply` command.",
            architecture: {
                description:
                    "The system is split into four layers. The API layer handles inbound telemetry and outbound subscriptions. The services layer contains the orchestration logic — routing decisions, health scoring, and dead-letter replay. The data layer separates hot (Redis), warm (TimescaleDB), and cold (S3) storage tiers. Infrastructure is fully managed by Terraform with Lambda auto-scaling per region.",
                layers: [
                    {
                        name: "API Layer",
                        components: [
                            "REST Ingest Gateway",
                            "WebSocket Subscription Server",
                            "Auth Middleware",
                        ],
                        description:
                            "Handles inbound telemetry ingestion via REST and outbound real-time event streams via WebSocket. Rate limiting and JWT auth enforced at the edge.",
                    },
                    {
                        name: "Services",
                        components: [
                            "Orchestration Engine",
                            "Event Router",
                            "Node Health Monitor",
                            "DLQ Replay Service",
                        ],
                        description:
                            "Core business logic. The orchestration engine scores node health every 500ms and feeds routing tables to the event router. The replay service processes dead-letter queues with exponential backoff.",
                    },
                    {
                        name: "Data Layer",
                        components: [
                            "Redis Streams (hot)",
                            "TimescaleDB (warm)",
                            "S3 Cold Archive",
                        ],
                        description:
                            "Three-tier storage strategy. Redis provides sub-millisecond event ingestion. TimescaleDB handles time-series queries with automatic chunk compression. S3 stores archived partitions for compliance.",
                    },
                    {
                        name: "Infrastructure",
                        components: [
                            "AWS Lambda (per-region)",
                            "Terraform Modules",
                            "CloudWatch Alarms",
                            "VPC + Private Subnets",
                        ],
                        description:
                            "Lambda functions auto-scale per region based on queue depth. Terraform manages the full topology as code. CloudWatch alarms trigger auto-remediation runbooks on threshold breach.",
                    },
                ],
            },
            highlights: [
                {
                    title: "Two-tier event routing with health scoring",
                    description:
                        "Node health scores are computed every 500ms from latency samples, error rates, and queue depth. The router uses a weighted consistent-hash ring to distribute events, biasing away from degraded nodes without hard failures triggering full reroutes.",
                    code: {
                        language: "typescript",
                        snippet: `// Health scorer — runs every 500ms per node
function scoreNode(metrics: NodeMetrics): number {
  const latencyScore = Math.max(0, 1 - metrics.p99Latency / 200);
  const errorScore   = Math.max(0, 1 - metrics.errorRate * 10);
  const queueScore   = Math.max(0, 1 - metrics.queueDepth / 5000);
  return (latencyScore * 0.5) + (errorScore * 0.3) + (queueScore * 0.2);
}`,
                    },
                },
                {
                    title: "Dead-letter queue with exponential backoff replay",
                    description:
                        "Failed events are written to a DLQ partition in Redis Streams. A separate replay worker polls the DLQ on a jittered exponential schedule, re-routing events through the healthy node pool. After 5 failed replays the event is archived to S3 with full metadata for manual inspection.",
                    code: {
                        language: "typescript",
                        snippet: `// Backoff schedule: 1s → 2s → 4s → 8s → 16s → archive
async function replayWithBackoff(event: DeadEvent): Promise<void> {
  const delay = Math.min(1000 * 2 ** event.attempts, 16_000);
  await sleep(delay + jitter(200));
  if (event.attempts >= 5) return archiveEvent(event);
  await router.dispatch(event.payload);
}`,
                    },
                },
                {
                    title: "Terraform-codified cluster topology",
                    description:
                        "Each regional cluster is a reusable Terraform module accepting region, node capacity, and alert thresholds as inputs. A new region reaches production in under 8 minutes from a single `terraform apply`.",
                    code: {
                        language: "hcl",
                        snippet: `module "cluster_eu_west" {
  source         = "./modules/grid-cluster"
  region         = "eu-west-1"
  node_capacity  = 40
  alert_p99_ms   = 120
  dlq_retention  = "7d"
}`,
                    },
                },
            ],
            impactDetails: [
                "Reduced P99 event processing latency from 210ms to 126ms — a 40% improvement — without hardware changes.",
                "Eliminated manual deployment steps across 200+ Lambda functions via Terraform-managed CI/CD pipelines.",
                "Achieved 99.97% uptime over 6 months in production, with zero data-loss incidents.",
                "DLQ replay mechanism recovered 100% of events from 3 partial cluster outages.",
                "New regional cluster provisioning time reduced from 3 days (manual) to under 8 minutes.",
            ],
            techStack: {
                frontend: ["React", "TypeScript", "Recharts"],
                backend: ["Node.js", "AWS Lambda", "Redis Streams", "TimescaleDB"],
                infrastructure: ["Terraform", "AWS VPC", "CloudWatch", "S3", "API Gateway"],
                tools: ["GitHub Actions", "Docker", "Datadog", "Jest"],
            },
            learnings: [
                "Consistent-hash routing solves the hot-node problem elegantly, but the health-weight layer on top required careful tuning — an overly aggressive penalty caused oscillation between nodes under bursty load.",
                "Terraform modules are powerful but the blast radius of a bad `apply` is large. Per-environment state isolation and mandatory plan reviews in CI prevented two near-misses.",
                "Redis Streams as an event bus works well at this scale, but XREADGROUP consumer group rebalancing during Lambda cold starts introduced duplicate deliveries. Idempotency keys at the processor level were non-negotiable.",
                "Observability should be designed before the first line of service code, not retrofitted. The CloudWatch alarms that caught the partial outages were built in week one — the ones added later were less precise.",
            ],
        },
    },
    {
        slug: "vortex-data-integrity",
        title: "Vortex Data Integrity",
        impact: "Migrated 50TB of legacy data with zero downtime and SOC2-compliant audit trails.",
        description:
            "Secure vault infrastructure providing cryptographic verification for financial transaction ledgers and audit trails.",
        tags: ["NEXT.JS", "POSTGRESQL", "REDIS"],
        category: "backend",
        bullets: [
            "Zero downtime during migration of 50TB legacy data.",
            "Implemented SOC2 compliant monitoring systems.",
        ],
        tech: ["Next.js", "PostgreSQL", "Redis"],
        sourceHref: "#",
        liveHref: "#",
        detail: {
            metrics: [
                { label: "Data migrated", value: "50TB" },
                { label: "Downtime during migration", value: "0 min" },
                { label: "Audit trail integrity", value: "99.999%" },
                { label: "Compliance standard", value: "SOC2" },
            ],
            overview:
                "Vortex Data Integrity is a cryptographic verification platform for financial transaction ledgers. It provides tamper-evident audit trails by chaining SHA-256 hashes across transaction records, making retroactive data manipulation detectable at any point in the chain. The platform serves fintech operators and compliance teams who need provable data lineage for regulatory audits without the complexity of a full blockchain solution.",
            challenge:
                "The existing system stored 50TB of transaction records in a legacy relational schema with no integrity verification layer. Any actor with database access could silently modify historical records — a SOC2 and PCI-DSS audit risk. The migration had to preserve every record with cryptographic fidelity while the system remained live, handling 800+ transactions per second during business hours. A single missed or mismatched record would invalidate the entire audit chain.",
            solution:
                "The migration used a dual-write strategy: for 72 hours, every new transaction was written to both the legacy system and the new vault, producing matching hash chains in parallel. A continuous reconciliation job compared checksums in batches of 10,000 records. Once reconciliation reached 100%, a blue-green cutover switched traffic to the vault in under 200ms. The hash chain algorithm computes each record's hash as `SHA-256(prevHash + recordPayload + timestamp)`, stored as an indexed column alongside the record.",
            architecture: {
                description:
                    "The vault exposes a write API that guarantees hash-chain continuity before acknowledging writes. A background verification service continuously scans the chain for gaps. Redis caches the chain head per ledger for O(1) append performance. PostgreSQL stores the canonical ledger with row-level encryption for PII fields.",
                layers: [
                    {
                        name: "API Layer",
                        components: ["REST Write API", "Webhook Ingestion", "Audit Query API"],
                        description:
                            "The write API validates payload schema, computes the hash chain append, and acknowledges only after a durable write. The audit query API exposes chain-verification endpoints for compliance tooling.",
                    },
                    {
                        name: "Services",
                        components: [
                            "Hash Chain Engine",
                            "Verification Scanner",
                            "Migration Reconciler",
                            "Alert Service",
                        ],
                        description:
                            "The chain engine serializes concurrent appends per ledger using Redis-distributed locks. The verification scanner runs a continuous background sweep, flagging any chain breaks to the alert service.",
                    },
                    {
                        name: "Data Layer",
                        components: [
                            "PostgreSQL (row-level encryption)",
                            "Redis (chain head cache)",
                            "S3 (audit exports)",
                        ],
                        description:
                            "PostgreSQL stores ledger records with encrypted PII columns via pgcrypto. Redis caches the latest hash per ledger, eliminating sequential reads on append. S3 exports are WORM-locked for immutable audit archives.",
                    },
                    {
                        name: "Infrastructure",
                        components: [
                            "AWS RDS Multi-AZ",
                            "ElastiCache Redis",
                            "Docker + Kubernetes",
                            "CloudTrail Logging",
                        ],
                        description:
                            "RDS Multi-AZ provides automatic failover with zero data loss. All infrastructure events are logged to CloudTrail for SOC2 evidence collection.",
                    },
                ],
            },
            highlights: [
                {
                    title: "SHA-256 hash chain for tamper-evident ledgers",
                    description:
                        "Each transaction record extends the chain by incorporating the previous hash, the record payload, and a server-side timestamp. Any retroactive modification breaks the chain at the altered record and every subsequent entry, making tampering immediately detectable.",
                    code: {
                        language: "typescript",
                        snippet: `async function appendToChain(
  ledgerId: string,
  payload: TransactionPayload
): Promise<ChainEntry> {
  const prevHash = await redis.get(\`chain:head:\${ledgerId}\`) ?? GENESIS_HASH;
  const hash = sha256(\`\${prevHash}:\${JSON.stringify(payload)}:\${Date.now()}\`);
  await db.transaction(async (trx) => {
    await trx('ledger_entries').insert({ ...payload, hash, prev_hash: prevHash });
    await redis.set(\`chain:head:\${ledgerId}\`, hash);
  });
  return { hash, prevHash };
}`,
                    },
                },
                {
                    title: "Zero-downtime migration with dual-write reconciliation",
                    description:
                        "A dual-write bridge intercepted all writes for 72 hours, fanning out to both systems. A reconciliation job compared SHA-256 checksums of every record in rolling batches of 10,000, surfacing mismatches before cutover was approved.",
                    code: {
                        language: "typescript",
                        snippet: `// Reconciler — runs every 60s during dual-write window
async function reconcileBatch(offset: number, limit = 10_000) {
  const [legacy, vault] = await Promise.all([
    legacyDb.query('SELECT id, checksum FROM records LIMIT $1 OFFSET $2', [limit, offset]),
    vaultDb.query('SELECT id, checksum FROM records LIMIT $1 OFFSET $2', [limit, offset]),
  ]);
  const mismatches = legacy.rows.filter((r, i) => r.checksum !== vault.rows[i]?.checksum);
  if (mismatches.length) await alertService.flag('RECONCILIATION_MISMATCH', mismatches);
  return mismatches.length === 0;
}`,
                    },
                },
                {
                    title: "Redis-distributed lock for chain serialization",
                    description:
                        "Concurrent writes to the same ledger must be serialized to maintain chain continuity. A Redis SET NX lock with a 500ms TTL ensures only one writer holds the chain head at a time, with automatic expiry preventing deadlocks.",
                },
            ],
            impactDetails: [
                "Completed 50TB historical data migration with zero minutes of downtime and no records lost or mismatched.",
                "Cryptographic audit trail detected a simulated tampering test in under 2 seconds during compliance review.",
                "SOC2 Type II audit passed on first attempt — chain integrity logs provided automatic evidence collection.",
                "Write throughput sustained at 800+ transactions/second under peak load with P99 latency under 45ms.",
                "Redis chain-head caching eliminated 99% of sequential read queries on ledger append operations.",
            ],
            techStack: {
                frontend: ["Next.js", "TypeScript", "TanStack Query"],
                backend: ["Node.js", "PostgreSQL", "Redis", "pgcrypto"],
                infrastructure: ["AWS RDS Multi-AZ", "ElastiCache", "Kubernetes", "S3 WORM"],
                tools: ["GitHub Actions", "Docker", "Datadog", "Jest", "Playwright"],
            },
            learnings: [
                "Dual-write migrations are reliable but operationally intensive — the reconciliation job consumed more engineering time than the vault itself. A shadow-read validation layer would have surfaced edge cases earlier.",
                "Row-level encryption in PostgreSQL via pgcrypto works well but adds ~8ms per encrypted read. Caching decrypted read-models in Redis recovered the latency for hot records.",
                "SOC2 evidence collection is vastly easier when infrastructure emits structured, queryable logs from day one. Retrofitting CloudTrail log formats to match auditor expectations cost two weeks.",
                "Redis distributed locks work, but contention under high write concurrency created a queue. A per-ledger lock key (rather than a global one) reduced contention by 94% and was the right granularity from the start.",
            ],
        },
    },
    {
        slug: "prism-api-gateway",
        title: "Prism API Gateway",
        impact: "Handles 1M+ requests/minute with 65% overhead reduction via GraphQL schema stitching.",
        description:
            "Unified entry point for microservices ecosystem handling over 1M requests per minute with intelligent caching.",
        tags: ["NODE.JS", "GRAPHQL", "DOCKER"],
        category: "backend",
        bullets: [
            "Reduced API overhead by 65% using GraphQL schema stitching.",
            "Auto-scaling infrastructure for peak demand handling.",
        ],
        tech: ["Node.js", "GraphQL", "Docker"],
        sourceHref: "#",
        liveHref: "#",
        detail: {
            metrics: [
                { label: "Requests / minute", value: "1M+" },
                { label: "API overhead reduction", value: "−65%" },
                { label: "P99 response time", value: "<50ms" },
                { label: "Downstream services unified", value: "18" },
            ],
            overview:
                "Prism API Gateway is a unified GraphQL-over-REST gateway that consolidates 18 independent microservices behind a single endpoint. It exposes a stitched schema that joins types across service boundaries, enabling clients to fetch composed data in a single round-trip instead of orchestrating multiple REST calls. It serves product teams building client applications who need a stable, versioned API contract decoupled from backend service churn.",
            challenge:
                "18 microservices had evolved independently, each with its own REST contract, auth scheme, and versioning strategy. Client applications were orchestrating up to 12 sequential API calls per user action, producing 300–600ms round-trip times and creating tight coupling between frontend release cycles and backend service contracts. Any schema change in a downstream service broke clients. There was no centralized rate limiting, caching, or observability across the API surface.",
            solution:
                "Schema stitching unifies the 18 REST services into a single GraphQL schema by wrapping each service's OpenAPI spec as a subgraph. The gateway compiles resolver chains at startup, so a query fetching user + order + inventory data executes the three upstream calls in parallel rather than sequentially. An LRU cache with TTL-per-type sits in front of upstream calls for idempotent queries. A centralized rate-limiting layer uses a Redis token bucket per API key, and all requests emit structured traces to the observability pipeline.",
            architecture: {
                description:
                    "The gateway runs as a Node.js process behind NGINX. It compiles a stitched schema from 18 upstream OpenAPI specs at startup. A two-layer cache (in-process LRU + Redis) serves repeated queries. Rate limiting, auth, and tracing are implemented as pluggable middleware in the request pipeline.",
                layers: [
                    {
                        name: "API Layer",
                        components: [
                            "GraphQL Endpoint",
                            "REST Compatibility Adapter",
                            "Auth / JWT Middleware",
                            "Rate Limiter",
                        ],
                        description:
                            "Single `/graphql` endpoint for all clients. A REST adapter translates legacy clients' HTTP calls to GraphQL operations during the migration window. JWT validation and rate limiting run as fast-path middleware before resolver execution.",
                    },
                    {
                        name: "Services",
                        components: [
                            "Schema Stitching Engine",
                            "Resolver Compiler",
                            "Cache Manager",
                            "Circuit Breaker",
                        ],
                        description:
                            "The schema engine merges 18 subgraph schemas at startup and hot-reloads on schema change signals. The circuit breaker wraps each upstream service, shedding load when error rates exceed 5% to prevent cascade failures.",
                    },
                    {
                        name: "Data Layer",
                        components: [
                            "In-process LRU Cache",
                            "Redis Distributed Cache",
                            "CDN Edge Cache",
                        ],
                        description:
                            "Three-tier caching: in-process LRU for sub-millisecond hits on hot keys, Redis for distributed consistency across gateway instances, and CDN edge caching for public, authenticated-optional queries.",
                    },
                    {
                        name: "Infrastructure",
                        components: ["NGINX", "Docker", "Kubernetes HPA", "OpenTelemetry"],
                        description:
                            "NGINX handles TLS termination and HTTP/2. Kubernetes HPA scales gateway pods based on request-per-second metrics exposed via a Prometheus endpoint. OpenTelemetry exports distributed traces to Datadog.",
                    },
                ],
            },
            highlights: [
                {
                    title: "Parallel resolver execution across microservices",
                    description:
                        "Queries that join data across multiple services compile into a DAG of resolver calls. Independent resolvers execute in parallel via `Promise.all`, collapsing a 320ms sequential chain into an 80ms parallel fetch.",
                    code: {
                        language: "typescript",
                        snippet: `// Compiled resolver for a User + Orders + Inventory query
async function resolveUserDashboard(userId: string) {
  // Sequential before: 120ms + 110ms + 90ms = 320ms
  // Parallel after: max(120ms, 110ms, 90ms) = 120ms
  const [user, orders, inventory] = await Promise.all([
    userService.getById(userId),
    orderService.getByUser(userId),
    inventoryService.getReservedByUser(userId),
  ]);
  return { user, orders, inventory };
}`,
                    },
                },
                {
                    title: "Redis token-bucket rate limiter",
                    description:
                        "Each API key gets a token bucket stored in Redis. Tokens replenish at a configured rate per second. The check-and-decrement is a Lua script executed atomically, preventing race conditions under concurrent requests from the same key.",
                    code: {
                        language: "lua",
                        snippet: `-- Atomic token bucket check (Redis Lua script)
local key      = KEYS[1]
local capacity = tonumber(ARGV[1])
local rate     = tonumber(ARGV[2])
local now      = tonumber(ARGV[3])
local tokens   = tonumber(redis.call('GET', key) or capacity)
local refill   = math.min(capacity, tokens + rate * (now - (tonumber(redis.call('HGET', key..':ts', 'last')) or now)))
if refill < 1 then return 0 end
redis.call('SET', key, refill - 1)
redis.call('HSET', key..':ts', 'last', now)
return 1`,
                    },
                },
                {
                    title: "Circuit breaker per upstream service",
                    description:
                        "Each of the 18 upstream services is wrapped in a circuit breaker with configurable error-rate and latency thresholds. When a service trips, the gateway returns a cached stale response or a typed partial-failure response rather than propagating 503s to clients.",
                },
            ],
            impactDetails: [
                "Client round-trip time for composed queries dropped from 320ms to under 80ms through parallel resolver execution.",
                "API payload size reduced 65% — clients request exactly the fields they need, eliminating over-fetching.",
                "Centralized rate limiting blocked 99.8% of abuse traffic that previously reached individual microservices.",
                "Cache hit rate of 72% on read-heavy query types reduced upstream load by more than half during peak traffic.",
                "18 independent API contracts unified behind one versioned schema, decoupling frontend and backend release cycles.",
            ],
            techStack: {
                backend: ["Node.js", "TypeScript", "GraphQL Yoga", "DataLoader"],
                infrastructure: ["NGINX", "Docker", "Kubernetes", "Redis", "OpenTelemetry"],
                tools: ["Datadog", "GitHub Actions", "Jest", "k6 (load testing)"],
            },
            learnings: [
                "Schema stitching is powerful but fragile at startup — a single upstream service returning a malformed OpenAPI spec would crash the gateway. A validation-and-fallback layer at schema compilation time became essential.",
                "DataLoader is the correct pattern for N+1 query prevention inside GraphQL resolvers. Implementing it as an afterthought required refactoring 40% of resolvers. It should be the default from day one.",
                "Circuit breakers need carefully tuned thresholds per service. A globally applied 5% error-rate threshold was too aggressive for a payment service that legitimately returns errors for invalid card inputs — leading to false trips.",
                "Load testing with k6 before launch surfaced a Redis connection pool exhaustion bug under 10k concurrent connections that never appeared in unit or integration tests. Production-like load tests are not optional.",
            ],
        },
    },
    {
        slug: "obsidian-core-engine",
        title: "Obsidian Core Engine",
        impact: "Achieved native C++ performance parity in-browser via WebAssembly with zero-config clustering.",
        description:
            "Low-level computational kernel developed for ultra-fast physics simulations within browser environments.",
        tags: ["RUST", "WEBASSEMBLY", "KUBERNETES"],
        category: "performance",
        bullets: [
            "Performance parity with native C++ applications.",
            "Containerized deployment with zero-config clustering.",
        ],
        tech: ["Rust", "WebAssembly", "Kubernetes"],
        sourceHref: "#",
        liveHref: "#",
        detail: {
            metrics: [
                { label: "vs native C++ baseline", value: "≤3% delta" },
                { label: "Simulation throughput", value: "10×  vs JS" },
                { label: "WASM binary size", value: "180KB" },
                { label: "Worker thread startup", value: "<40ms" },
            ],
            overview:
                "Obsidian Core Engine is a physics simulation kernel written in Rust and compiled to WebAssembly, enabling near-native performance for rigid-body and particle simulations directly in the browser. It targets engineering visualization tools, browser-based game engines, and CAD web applications where JavaScript physics libraries hit hard performance ceilings. The engine exposes a TypeScript API and runs simulations on Web Workers, keeping the main thread free.",
            challenge:
                "JavaScript physics engines (Cannon.js, Rapier.js WASM wrappers) were losing 30–60% performance to GC pauses, JIT deoptimizations, and Float64 boxing overhead when simulating 10,000+ rigid bodies simultaneously. The target was to match native C++ benchmarks (used as the ground truth in the engineering tool's desktop app) within 5%, in a 180KB WASM binary that initializes in under 40ms. Memory layout had to be cache-friendly without access to browser allocator internals.",
            solution:
                "The engine is written in Rust using a Structure-of-Arrays (SoA) memory layout for rigid body state, maximizing SIMD auto-vectorization in the Rust compiler targeting WASM. The integration loop uses a semi-implicit Euler solver with fixed timestep and substep interpolation, matching the desktop app's numerical behavior. Collision detection uses a BVH tree with incremental rebuild. The WASM module is streamed and compiled in a Web Worker using `WebAssembly.instantiateStreaming`, keeping the main thread completely unblocked. `SharedArrayBuffer` is used for zero-copy data exchange between the simulation worker and the render thread.",
            architecture: {
                description:
                    "The engine separates simulation from rendering via a worker thread boundary. The Rust/WASM core owns simulation state and runs the physics loop. A TypeScript bridge manages WASM memory lifecycle and exposes a high-level simulation API. SharedArrayBuffer enables zero-copy frame data transfer to the rendering layer.",
                layers: [
                    {
                        name: "API Layer",
                        components: [
                            "TypeScript Simulation API",
                            "WASM Bindings (wasm-bindgen)",
                            "Worker Message Protocol",
                        ],
                        description:
                            "The TypeScript API wraps WASM exports behind an async interface. Internally, commands are posted to the simulation worker via a typed message protocol, keeping the main thread free of blocking calls.",
                    },
                    {
                        name: "Services",
                        components: [
                            "Physics Integration Loop",
                            "BVH Collision Detector",
                            "Constraint Solver",
                            "Scene Manager",
                        ],
                        description:
                            "All physics computation runs inside the WASM module. The BVH tree is rebuilt incrementally each frame, updating only moved bodies. The constraint solver handles joints and contact manifolds via iterative impulse resolution.",
                    },
                    {
                        name: "Data Layer",
                        components: [
                            "SharedArrayBuffer (frame data)",
                            "WASM Linear Memory (SoA layout)",
                            "IndexedDB (scene persistence)",
                        ],
                        description:
                            "Rigid body state (position, velocity, mass, AABB) is stored in SoA arrays in WASM linear memory for cache locality. Per-frame transform data is written to a SharedArrayBuffer ring buffer, readable by the render thread without copying.",
                    },
                    {
                        name: "Infrastructure",
                        components: [
                            "Rust WASM Build Pipeline",
                            "Docker Multi-stage Build",
                            "Kubernetes StatefulSet",
                            "CDN WASM Distribution",
                        ],
                        description:
                            "The Rust → WASM build uses `wasm-pack` with `wasm-opt` level 3 optimization, producing a 180KB binary. Multi-stage Docker builds keep the server image under 12MB. WASM binaries are distributed via CDN with long-lived cache headers.",
                    },
                ],
            },
            highlights: [
                {
                    title: "Structure-of-Arrays memory layout for SIMD throughput",
                    description:
                        "Storing rigid body state as separate arrays (all positions together, all velocities together) rather than an array of structs lets the Rust compiler emit SIMD instructions that process 4–8 bodies per CPU cycle, matching the access pattern of the integration loop.",
                    code: {
                        language: "rust",
                        snippet: `// Structure-of-Arrays layout — cache-friendly for integration loop
pub struct RigidBodyPool {
    pub pos_x:   Vec<f32>,  // all X positions contiguous
    pub pos_y:   Vec<f32>,
    pub vel_x:   Vec<f32>,
    pub vel_y:   Vec<f32>,
    pub mass_inv: Vec<f32>,
    pub active:  Vec<bool>,
}

// Integration loop auto-vectorizes to SIMD — 4 bodies per cycle
pub fn integrate(&mut self, dt: f32) {
    for i in 0..self.pos_x.len() {
        self.vel_x[i] += GRAVITY_X * self.mass_inv[i] * dt;
        self.vel_y[i] += GRAVITY_Y * self.mass_inv[i] * dt;
        self.pos_x[i] += self.vel_x[i] * dt;
        self.pos_y[i] += self.vel_y[i] * dt;
    }
}`,
                    },
                },
                {
                    title: "Zero-copy SharedArrayBuffer frame transfer",
                    description:
                        "Each simulation frame writes transform data directly into a SharedArrayBuffer ring buffer from the WASM memory. The render thread reads the latest committed frame without any copying or serialization, eliminating the main thread bottleneck present in postMessage-based architectures.",
                    code: {
                        language: "typescript",
                        snippet: `// Render thread reads transforms without copying
const sharedBuffer = new SharedArrayBuffer(MAX_BODIES * 16); // x,y,rot,scale per body
const transforms   = new Float32Array(sharedBuffer);

// Simulation worker writes directly to shared memory
// Render thread reads — no postMessage, no copy
function renderFrame() {
  for (let i = 0; i < bodyCount; i++) {
    const base = i * 4;
    drawBody(transforms[base], transforms[base+1], transforms[base+2]);
  }
  requestAnimationFrame(renderFrame);
}`,
                    },
                },
                {
                    title: "Incremental BVH rebuild for moving bodies",
                    description:
                        "Rebuilding the full BVH tree every frame is O(n log n). By tracking a dirty flag per body and only re-inserting moved nodes, the effective rebuild cost is proportional to moving body count — typically 5–15% of the scene — reducing broad-phase collision time by 74%.",
                },
            ],
            impactDetails: [
                "Simulation throughput of 10,000 rigid bodies at 60fps achieved — 10× improvement over the JavaScript baseline.",
                "Performance delta vs native C++ desktop build measured at ≤3% across all benchmark scenes.",
                "WASM binary size held to 180KB gzipped — fits in a single HTTP/2 frame, initializing in under 40ms on a mid-range device.",
                "Main thread frame time reduced to <1ms — rendering is the bottleneck, not physics.",
                "SharedArrayBuffer zero-copy eliminated 4.2ms of per-frame serialization overhead present in the postMessage prototype.",
            ],
            techStack: {
                frontend: ["TypeScript", "WebAssembly", "Web Workers", "SharedArrayBuffer"],
                backend: ["Rust", "wasm-bindgen", "wasm-pack", "wasm-opt"],
                infrastructure: ["Docker", "Kubernetes", "CDN (CloudFront)", "GitHub Actions"],
                tools: ["wasm-pack", "cargo-flamegraph", "Twiggy (WASM size analysis)", "Vitest"],
            },
            learnings: [
                "SoA layout is essential for SIMD, but it complicates single-body access patterns (deleting a body requires updating 6 arrays). An index-based tombstone scheme avoided the O(n) compaction cost.",
                "SharedArrayBuffer requires `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers. Missing these in staging caused a confusing silent failure — both headers should be validated in CI.",
                "WASM memory growth (calling `memory.grow`) causes a GC pause in V8 of ~2ms. Pre-allocating a fixed arena at initialization with a bump allocator eliminated all mid-simulation growth pauses.",
                "`wasm-opt` level 3 reduced binary size by 42% and improved throughput by ~8% — it should always be part of the release build pipeline, not optional.",
            ],
        },
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
