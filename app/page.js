"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Bot, BrainCircuit, CheckCircle2, ChevronDown, ChevronRight,
  Cloud, Coins, Cpu, GitBranch, Globe, Layers3, Mail, MapPin,
  MessageSquare, Search, ShieldCheck, Sparkles, Telescope, Workflow, Zap
} from "lucide-react";

function LogoMark({ className = "logo-mark" }) {
  return <img src="/logo.svg" alt="Digiscience Techsol logo" className={className} />;
}

function MeshBackground() {
  return (
    <div className="mesh-wrap" aria-hidden="true">
      <div className="mesh mesh-red" />
      <div className="mesh mesh-dark" />
      <svg className="mesh-lines" viewBox="0 0 1200 700" fill="none">
        <path d="M112 514C244 392 383 328 560 338C719 347 821 427 1086 288" />
        <path d="M96 220C227 145 347 126 510 162C642 191 792 298 1117 165" className="line-red" />
        <path d="M181 600C316 491 448 446 614 462C772 478 876 544 1043 640" />
        {[ [112,514],[560,338],[1086,288],[96,220],[510,162],[1117,165],[181,600],[614,462],[1043,640] ].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="5" className={i % 2 === 0 ? "dot-red" : "dot-dark"} />
        ))}
      </svg>
    </div>
  );
}

const services = [
  {
    title: "AI Systems Architecture on Cloud",
    icon: BrainCircuit,
    strap: "Architect AI platforms that are secure, scalable, observable, and ready for serious production use.",
    summary: "We help organizations shape the cloud and platform foundations required for modern AI initiatives, from reference architecture and inference patterns to governance, observability, and operational readiness.",
    bullets: [
      "AI platform blueprint for model serving, APIs, data flows, orchestration, and governance",
      "Cloud-native patterns for resilience, security, cost control, and lifecycle management",
      "Practical architecture choices aligned to business outcomes and future scalability"
    ],
    details: {
      deliverables: [
        "Target AI platform architecture and operating model",
        "Inference and model serving design patterns",
        "Governance, telemetry, and security guardrails",
        "Pilot-to-production roadmap with rollout priorities"
      ],
      idealFor: [
        "Organizations moving from AI experimentation to structured adoption",
        "Technology leaders who need a production-ready AI foundation",
        "Teams seeking cloud-aligned AI architecture without unnecessary lock-in"
      ],
      tools: ["Kubernetes", "KServe", "vLLM", "MLflow", "OpenTelemetry", "Langfuse", "Ray", "OpenSearch"],
      outcomes: ["Stronger AI readiness", "Lower architecture risk", "Better governance", "Faster production alignment"]
    }
  },
  {
    title: "Cloud Journey / Migration / Modernization",
    icon: Cloud,
    strap: "Move to the cloud with structure, clarity, and a modernization lens from the start.",
    summary: "We help clients assess current estates, design target-state architectures, define migration or modernization pathways, and execute with stronger governance and operational confidence.",
    bullets: [
      "Discovery, dependency mapping, landing zones, control frameworks, and wave planning",
      "Rehost, replatform, refactor, and platform modernization strategies matched to business priorities",
      "Execution-ready roadmaps that reduce disruption and improve long-term cloud maturity"
    ],
    details: {
      deliverables: [
        "Current-state assessment and prioritization model",
        "Landing zone, platform controls, and target architecture",
        "Wave-based migration roadmap and execution structure",
        "Modernization backlog and delivery guidance"
      ],
      idealFor: [
        "Organizations migrating from legacy or mixed estates",
        "Leaders who want a lower-risk transformation approach",
        "Programs that need architecture-led delivery guardrails"
      ],
      tools: ["OpenTofu", "Argo CD", "Kubernetes", "Helm", "Cloud Custodian", "OpenTelemetry"],
      outcomes: ["Smoother migration", "Clearer modernization path", "Better controls", "More scalable foundations"]
    }
  },
  {
    title: "DevOps",
    icon: GitBranch,
    strap: "Create faster, more reliable software delivery with engineering discipline and platform consistency.",
    summary: "We help teams strengthen the way they build, release, and operate software by combining CI/CD, infrastructure automation, GitOps, platform conventions, and developer enablement patterns.",
    bullets: [
      "Pipeline standardization, release automation, and environment consistency across teams",
      "Infrastructure as code, policy guardrails, artifact management, and deployment quality controls",
      "Developer experience improvements through platform thinking and service ownership patterns"
    ],
    details: {
      deliverables: [
        "DevOps maturity assessment and target-state blueprint",
        "CI/CD and GitOps reference implementation patterns",
        "Infrastructure automation and release standards",
        "Developer enablement model and internal platform guidance"
      ],
      idealFor: [
        "Teams with slow, brittle, or inconsistent release processes",
        "Organizations scaling engineering without strong platform standards",
        "Leaders aiming to improve delivery flow and developer productivity"
      ],
      tools: ["Jenkins", "Argo CD", "OpenTofu", "Helm", "Backstage", "Kubernetes"],
      outcomes: ["Faster release cycles", "Less manual toil", "Improved consistency", "Better engineering flow"]
    }
  },
  {
    title: "Cost Optimization / FinOps",
    icon: Coins,
    strap: "Bring stronger cost discipline to cloud environments without slowing innovation.",
    summary: "We help engineering, finance, and leadership teams create a practical FinOps model around visibility, allocation, optimization, and decision-making so cloud spend becomes more intentional and measurable.",
    bullets: [
      "Spend visibility, ownership models, anomaly detection, and optimization governance",
      "Rightsizing, commitments strategy, storage review, and waste reduction opportunities",
      "FinOps operating rhythms that connect engineering decisions to business value"
    ],
    details: {
      deliverables: [
        "FinOps maturity view and opportunity map",
        "Savings backlog and governance recommendations",
        "Cost allocation and accountability framework",
        "Executive dashboards and review cadence structure"
      ],
      idealFor: [
        "Organizations with rising or unclear cloud spend",
        "Technology leaders needing better cost-to-value visibility",
        "Teams trying to optimize cost without hurting performance or agility"
      ],
      tools: ["OpenCost", "Prometheus", "Grafana OSS", "Cloud Custodian", "OpenTofu"],
      outcomes: ["Reduced waste", "Better forecasting", "More ownership", "Healthier cloud economics"]
    }
  },
  {
    title: "Observability",
    icon: Telescope,
    strap: "Build visibility that improves detection, diagnosis, reliability, and operational decision-making.",
    summary: "We design observability systems around meaningful telemetry, cleaner alerting, service ownership, and better operational workflows across modern cloud and distributed environments.",
    bullets: [
      "Metrics, logs, traces, dashboards, alert rationalization, and telemetry standards",
      "Observability design that improves signal quality and reduces operational noise",
      "Approaches suited for distributed services, platforms, and hybrid environments"
    ],
    details: {
      deliverables: [
        "Telemetry architecture and instrumentation strategy",
        "Dashboards, alerts, and service health views",
        "Logging and tracing patterns for better diagnosis",
        "Observability maturity roadmap and operating model"
      ],
      idealFor: [
        "Teams facing alert fatigue or fragmented operational visibility",
        "Organizations scaling distributed systems or platform complexity",
        "Leaders seeking faster troubleshooting and cleaner service insight"
      ],
      tools: ["OpenTelemetry", "Prometheus", "Grafana OSS", "Loki", "Tempo", "Jaeger", "OpenSearch"],
      outcomes: ["Faster diagnosis", "Better signal-to-noise", "Improved reliability insight", "More confident operations"]
    }
  },
  {
    title: "Cloud AIOps",
    icon: Bot,
    strap: "Use intelligent automation and data-driven operations to reduce noise and improve response quality.",
    summary: "We help operations teams evolve toward automation-assisted workflows by improving event quality, operational context, runbook execution, and data-driven incident handling.",
    bullets: [
      "Event correlation, incident enrichment, operational intelligence, and runbook automation",
      "Noise reduction and prioritization across cloud telemetry and alerts",
      "Workflow design focused on more resilient and scalable operations"
    ],
    details: {
      deliverables: [
        "AIOps opportunity assessment and operating model",
        "Event normalization and workflow design",
        "Automation patterns for runbooks and operational response",
        "Continuous improvement framework for operations quality"
      ],
      idealFor: [
        "Operations teams overloaded with alerts and repetitive incident work",
        "Cloud environments needing stronger response consistency",
        "Organizations looking for practical AIOps adoption, not buzzwords"
      ],
      tools: ["OpenTelemetry", "Prometheus", "Loki", "Tempo", "OpenSearch", "Langfuse", "Automation workflows"],
      outcomes: ["Lower operational noise", "Better response quality", "Higher automation potential", "More resilient operations"]
    }
  }
];

const approach = [
  {
    step: "01",
    title: "Discover & Frame",
    icon: Search,
    desc: "We start by understanding the business context, current estate, operational pain points, delivery constraints, and desired future outcomes so the transformation has a clear decision framework from the beginning.",
    points: [
      "Stakeholder alignment and business objective mapping",
      "Current-state architecture, delivery, and operations assessment",
      "Risk, dependency, and maturity analysis across technology domains",
      "Baseline view of readiness, cost posture, reliability posture, and delivery friction"
    ]
  },
  {
    step: "02",
    title: "Architect the Future State",
    icon: Layers3,
    desc: "We define a target-state architecture and operating model that is scalable, governed, observable, cost-aware, and realistic for your teams to adopt over time.",
    points: [
      "Reference architecture and target platform standards",
      "Decision paths for AI, migration, DevOps, observability, FinOps, and AIOps priorities",
      "Governance, security, telemetry, and cost guardrails built into the design",
      "Open-source-first tool selection with flexibility for enterprise environments"
    ]
  },
  {
    step: "03",
    title: "Deliver in Structured Waves",
    icon: Workflow,
    desc: "We convert strategy into an execution-ready plan through phases, waves, reference patterns, runbooks, and governance checkpoints so delivery is measurable and controllable.",
    points: [
      "Phased roadmap and prioritized implementation backlog",
      "Reference patterns, architecture decisions, and operating runbooks",
      "Implementation checkpoints and governance reviews",
      "Engineering handoff guidance with platform and service ownership standards"
    ]
  },
  {
    step: "04",
    title: "Optimize & Evolve",
    icon: Zap,
    desc: "Once the foundation is in place, we focus on continuous improvement across cost, performance, reliability, observability maturity, developer flow, and operational quality.",
    points: [
      "Continuous optimization cycles for cloud economics and platform efficiency",
      "Observability, alert quality, and service health refinement",
      "Operational workflow enhancement and automation opportunities",
      "Leadership dashboards that connect technical execution to business outcomes"
    ]
  }
];

const servicePages = [
  "Dedicated service narrative pages",
  "Consulting-style problem / solution sections",
  "Tools and delivery model positioning",
  "Crisp call-to-action blocks for lead capture"
];

const caseStudies = [
  {
    title: "Cloud Estate Modernization",
    desc: "A transformation narrative showing how a complex environment can move toward a more agile, governed, and cloud-aligned operating model.",
    impact: ["Projected efficiency uplift", "Better delivery predictability", "Improved operational control"]
  },
  {
    title: "Observability Operating Model Refresh",
    desc: "A case-study style block focused on rationalized dashboards, cleaner telemetry, and more actionable monitoring across teams.",
    impact: ["Projected reduction in alert noise", "Faster diagnosis potential", "Sharper service visibility"]
  },
  {
    title: "AI Platform Foundation",
    desc: "A premium narrative describing how organizations can move from AI curiosity to a scalable and governed platform foundation.",
    impact: ["Improved AI readiness", "Safer production adoption", "Stronger architecture confidence"]
  }
];

const stack = [
  { category: "AI & Model Platforms", items: ["KServe", "vLLM", "MLflow", "Langfuse", "Ray", "OpenSearch"] },
  { category: "DevOps & Platform Engineering", items: ["Jenkins", "Argo CD", "Backstage", "Helm", "Kubernetes", "OpenTofu"] },
  { category: "Observability & Reliability", items: ["OpenTelemetry", "Prometheus", "Grafana OSS", "Loki", "Tempo", "Jaeger"] },
  { category: "Governance & FinOps", items: ["OpenCost", "Cloud Custodian", "Policy-as-Code", "Tagging & allocation frameworks"] }
];

const seoKeywords = [
  "AI cloud consulting",
  "cloud migration services",
  "DevOps consulting",
  "FinOps consulting",
  "observability consulting",
  "cloud AIOps services"
];

function SectionTitle({ eyebrow, title, text, dark = false }) {
  return (
    <div className="section-title">
      <div className={dark ? "eyebrow eyebrow-dark" : "eyebrow"}>
        <Sparkles size={14} />
        {eyebrow}
      </div>
      <h2 className={dark ? "title dark" : "title"}>{title}</h2>
      <p className={dark ? "desc dark" : "desc"}>{text}</p>
    </div>
  );
}

function Chip({ children, dark = false }) {
  return <span className={dark ? "chip chip-dark" : "chip"}>{children}</span>;
}

function ServiceCard({ service, isOpen, onOpen }) {
  const Icon = service.icon;
  return (
    <div onDoubleClick={onOpen} className={isOpen ? "service-card open" : "service-card"}>
      <div className="service-head">
        <div className="service-head-left">
          <div className={isOpen ? "icon-box red" : "icon-box"}>
            <Icon size={24} />
          </div>
          <div>
            <h3>{service.title}</h3>
            <p>{service.strap}</p>
          </div>
        </div>
        <ChevronDown className={isOpen ? "chev open" : "chev"} />
      </div>
      <div className="service-list">
        {service.bullets.map((point) => (
          <div key={point} className="check-row">
            <CheckCircle2 size={16} />
            <span>{point}</span>
          </div>
        ))}
      </div>
      <div className="service-actions">
        <button className="btn btn-dark" onClick={onOpen}>View Details</button>
        <span className="mini-tag">Double-click enabled</span>
      </div>
    </div>
  );
}

export default function Page() {
  const [expandedService, setExpandedService] = useState(services[0].title);
  const activeService = useMemo(() => services.find((s) => s.title === expandedService) || services[0], [expandedService]);

  return (
    <main className="page">
      <header className="header">
        <div className="container nav">
          <a href="#home" className="brand">
            <LogoMark />
            <div>
              <div className="brand-name">Digiscience Techsol</div>
              <div className="brand-sub">Private Limited</div>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#insights">Insights</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="btn btn-red">Book a Strategy Call</a>
        </div>
      </header>

      <section id="home" className="hero">
        <MeshBackground />
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
              <Sparkles size={14} />
              Enterprise consulting depth with modern AI-era design
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              Transform cloud complexity into
              <span> AI-ready business advantage.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              Digiscience Techsol Private Limited helps organizations design, modernize, automate, optimize, and operate cloud environments with a consulting model built for both enterprise confidence and AI-era speed.
            </motion.p>
            <div className="hero-actions">
              <a href="#services" className="btn btn-dark">Explore Services <ArrowRight size={16} /></a>
              <a href="#contact" className="btn btn-outline">Talk to an Expert</a>
            </div>
            <div className="hero-mini-grid">
              {[
                ["Enterprise-ready positioning", "Designed to feel credible for enterprise buyers while still modern and AI-forward."],
                ["Open-source-first delivery", "Preferred tool choices support flexibility, visibility, and lower long-term lock-in."],
                ["Premium lead-conversion design", "Stronger structure, messaging, and calls-to-action to encourage serious contact."]
              ].map(([title, text]) => (
                <div key={title} className="mini-card">
                  <div className="mini-card-title">{title}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="hero-panel">
            <div className="hero-panel-top">
              <div className="hero-panel-brand">
                <LogoMark className="logo-mark small" />
                <div>
                  <div className="brand-name top">Digiscience Techsol</div>
                  <div className="panel-sub">Advisory + Delivery Model</div>
                </div>
              </div>
              <div className="window-dots"><span /><span /><span /></div>
            </div>
            <div className="hero-panel-grid">
              <div className="flow-box">
                <div className="flow-title"><Workflow size={16} /> Engagement Flow</div>
                {["Discover", "Architect", "Deliver", "Optimize", "Scale"].map((item, idx) => (
                  <div key={item} className="flow-item"><span>{idx + 1}</span>{item}</div>
                ))}
                <div className="flow-mini-grid">
                  <div className="mini-surface">
                    <div className="tiny-title">Positioning</div>
                    <strong>McKinsey clarity, AI-native energy</strong>
                    <p>A hybrid style built for both trust and modern differentiation.</p>
                  </div>
                  <div className="mini-surface red">
                    <div className="tiny-title red-text">Impact Language</div>
                    <strong>Projected percentage-based improvement</strong>
                    <p>No client names and no hard customer numbers used.</p>
                  </div>
                </div>
              </div>
              <div className="outcome-column">
                <div className="outcome-box">
                  <div className="flow-title"><ShieldCheck size={16} /> Priority Outcomes</div>
                  {[
                    ["AI readiness uplift", "High"],
                    ["Operational clarity", "Improved"],
                    ["Optimization opportunity", "Meaningful"]
                  ].map(([label, value]) => (
                    <div key={label} className="outcome-item">
                      <div>{label}</div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
                <div className="coverage-box">
                  <div className="flow-title red-text"><Cpu size={16} /> Coverage</div>
                  <div className="chips">
                    {["AI Architecture", "Migration", "DevOps", "FinOps", "Observability", "Cloud AIOps"].map((item) => (
                      <Chip key={item} dark>{item}</Chip>
                    ))}
                  </div>
                  <p>Structured for serious technology buyers across startups, mid-size firms, and enterprise environments.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="ticker">
        <div className="container ticker-inner">
          <span>AI Architecture</span><span>Cloud Migration</span><span>DevOps</span><span>FinOps</span><span>Observability</span><span>Cloud AIOps</span>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Services"
            title="Service narratives designed to attract decision-makers at first look."
            text="Each service card reads more like premium consulting positioning. Double-click any card, or use the details button, to open deeper delivery, ideal-fit, tools, and projected outcome content."
          />
          <div className="tip-box">Tip: Double-click any service card to open its expanded view.</div>
          <div className="services-layout">
            <div className="services-list">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} isOpen={expandedService === service.title} onOpen={() => setExpandedService(service.title)} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeService.title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="detail-panel">
                <div className="detail-head">
                  <div className="icon-box red">{activeService.icon && <activeService.icon size={24} />}</div>
                  <div>
                    <div className="detail-tag">Expanded View</div>
                    <h3>{activeService.title}</h3>
                  </div>
                </div>
                <p className="detail-summary">{activeService.summary}</p>
                <div className="detail-grid">
                  <div>
                    <div className="detail-sub">What We Deliver</div>
                    {activeService.details.deliverables.map((item) => (
                      <div key={item} className="check-row"><CheckCircle2 size={16} /><span>{item}</span></div>
                    ))}
                  </div>
                  <div>
                    <div className="detail-sub">Ideal For</div>
                    {activeService.details.idealFor.map((item) => (
                      <div key={item} className="check-row"><CheckCircle2 size={16} /><span>{item}</span></div>
                    ))}
                  </div>
                </div>
                <div className="detail-sub">Preferred Delivery Stack</div>
                <div className="chips">
                  {activeService.details.tools.map((tool) => <Chip key={tool}>{tool}</Chip>)}
                </div>
                <div className="outcome-light">
                  <div className="detail-sub">Projected Outcomes</div>
                  <div className="chips">
                    {activeService.details.outcomes.map((item) => <Chip key={item}>{item}</Chip>)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="approach" className="section light">
        <div className="container">
          <SectionTitle
            eyebrow="Approach"
            title="A clearer consulting approach with stronger enterprise-style structure."
            text="This section reads more like a premium consulting delivery model: discovery-led, architecture-first, wave-based, and built for ongoing optimization."
          />
          <div className="grid-2">
            {approach.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="approach-card">
                  <div className="approach-head">
                    <div className="icon-box"><Icon size={24} /></div>
                    <div>
                      <div className="detail-tag">Step {item.step}</div>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <p>{item.desc}</p>
                  {item.points.map((point) => (
                    <div key={point} className="check-row"><CheckCircle2 size={16} /><span>{point}</span></div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="insights" className="section">
        <div className="container insights-grid">
          <div>
            <SectionTitle
              eyebrow="Premium Additions"
              title="The site is positioned like a serious consulting brand, not a basic brochure."
              text="It includes case-study style sections, service-page positioning, SEO-oriented topic coverage, and a chatbot / lead-capture concept so the site can evolve into a stronger demand-generation asset."
            />
            <div className="white-card">
              <div className="detail-sub">Planned service-page pattern</div>
              {servicePages.map((item) => (
                <div key={item} className="arrow-row"><ChevronRight size={16} /><span>{item}</span></div>
              ))}
            </div>
            <div className="dark-card">
              <div className="flow-title red-text"><MessageSquare size={16} /> AI Sales Chatbot Concept</div>
              <p>The site can support a conversational assistant that explains services, qualifies interest, captures enquiry details, and routes serious prospects into your preferred lead workflow.</p>
            </div>
          </div>
          <div className="stack-list">
            {caseStudies.map((item) => (
              <div key={item.title} className="white-card">
                <div className="detail-tag">Case Study Style</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="chips">{item.impact.map((impact) => <Chip key={impact}>{impact}</Chip>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="section dark-section">
        <div className="container">
          <SectionTitle
            dark
            eyebrow="Technology Stack"
            title="Best-in-class open-source-first tools woven into the consulting narrative."
            text="The website clearly communicates that Digiscience Techsol uses a modern tool ecosystem and prefers open-source where it creates flexibility, control, and long-term value."
          />
          <div className="grid-2">
            {stack.map((group) => (
              <div key={group.category} className="dark-surface">
                <div className="detail-sub dark-red">{group.category}</div>
                <div className="chips">{group.items.map((item) => <Chip key={item} dark>{item}</Chip>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="white-card large">
            <div className="flow-title red-text"><Globe size={16} /> SEO Direction</div>
            <h3>The messaging is also shaped for discoverability.</h3>
            <p>The page language aligns better with how buyers search for AI, cloud, DevOps, FinOps, observability, and AIOps advisory services. This gives the site a stronger base for future SEO refinement.</p>
            <div className="chips">{seoKeywords.map((item) => <Chip key={item}>{item}</Chip>)}</div>
          </div>
          <div className="soft-card large">
            <div className="detail-sub red-text">Brand Positioning</div>
            <h3>Hybrid tone: enterprise consulting confidence with modern AI-era energy.</h3>
            <p>As requested, the site avoids hard customer counts and named client references. Instead, it uses premium positioning language and projected percentage-style impact messaging.</p>
            <div className="chips">
              {["No hard numbers", "No client names", "Projected impact language", "Enterprise-friendly tone"].map((item) => <Chip key={item}>{item}</Chip>)}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow"><Sparkles size={14} /> Start a serious transformation conversation</div>
            <h2 className="contact-title">Connect with Digiscience Techsol to discuss your next cloud, AI, DevOps, or optimization initiative.</h2>
            <p className="contact-desc">The contact area is framed like a premium consulting CTA: focused, direct, and designed to turn interest into a conversation with the right decision-makers.</p>
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <div className="detail-sub">Email</div>
                  <div>atul.mishra@digisciencetechsol.com</div>
                  <div>rajiv.gupta@digisciencetechsol.com</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <div className="detail-sub">Address</div>
                  <div className="address-lines">
                    Digiscience Techsol Private Limited<br />
                    NSIC Metro, 94, Old Ishwar Nagar,<br />
                    Shambhu Dayal Bagh, Bahapur,<br />
                    Okhla New Delhi, Delhi -110065
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-card">
            <div className="detail-sub">Lead Capture</div>
            <h3>Tell us what you’re trying to solve</h3>
            <p>This section is ready to be connected later to CRM, email routing, Google Sheets, HubSpot, Zoho, or another enquiry workflow.</p>
            <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
              <div className="row-2">
                <input placeholder="Your name" />
                <input placeholder="Work email" />
              </div>
              <div className="row-2">
                <input placeholder="Company name" />
                <input placeholder="Phone number" />
              </div>
              <input placeholder="Service interested in" />
              <textarea placeholder="Tell us about your goals, current environment, or challenge" rows={7} />
              <button className="btn btn-red">Request Consultation <ArrowRight size={16} /></button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand">
            <LogoMark className="logo-mark small" />
            <div>
              <div className="footer-title">Digiscience Techsol Private Limited</div>
              <div className="footer-sub">AI architecture · cloud migration · DevOps · FinOps · observability · cloud AIOps</div>
            </div>
          </div>
          <div className="footer-note">Hybrid consulting identity: enterprise-ready, AI-forward, and conversion-focused.</div>
        </div>
      </footer>
    </main>
  );
}
