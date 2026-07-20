export const navigation = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Work Packages", href: "#work-packages" },
  { label: "Contact", href: "#contact" },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Mission Software",
    description:
      "Operational web applications, APIs, data models, reporting, and administration workflows built with React and Next.js.",
    interface: "Applications / APIs",
  },
  {
    number: "02",
    title: "AI/ML Evaluation",
    description:
      "Evaluation pipelines, output QA, monitoring, analytics, automation, and human-in-the-loop review around deployed models.",
    interface: "Models / QA / Review",
  },
  {
    number: "03",
    title: "Data and Cloud Platforms",
    description:
      "Python, SQL, PySpark, Databricks, and AWS systems spanning ETL, events, webhooks, observability, and deployment tooling.",
    interface: "Data / Cloud / Automation",
  },
  {
    number: "04",
    title: "Computer Vision and Video",
    description:
      "Live RTSP ingest, detection, tracking, counting, event logic, and alerting for camera and sensor feeds.",
    interface: "Video / Sensors / Events",
  },
  {
    number: "05",
    title: "Edge, GPU, and Hardware",
    description:
      "GPU inference, cameras and sensors, networking, edge compute, field testing, and device-to-cloud integration.",
    interface: "Devices / Edge / Field",
  },
] as const;

export const workPackages = [
  {
    number: "01",
    title: "Software Feature Sprint",
    usefulWhen:
      "A defined operator or program need is blocked by missing software, manual steps, or a fragmented workflow.",
    deliverables: [
      "Dashboard or internal tool",
      "API or workflow integration",
      "Tested automation",
    ],
    timeline: "2–4 weeks",
    handoff:
      "Source code, tests, deployment notes, and a working-session walkthrough",
  },
  {
    number: "02",
    title: "Data Integration Sprint",
    usefulWhen:
      "Program data is split across APIs, databases, files, or legacy systems and needs a reliable path between them.",
    deliverables: [
      "Source connectors",
      "Transformation and validation",
      "Documented data flow",
    ],
    timeline: "3–6 weeks",
    handoff:
      "Connector map, transformation notes, operating runbook, and ownership transfer",
  },
  {
    number: "03",
    title: "Edge & Vision Prototype",
    usefulWhen:
      "A camera or sensor concept needs to be proven on real hardware before broader system integration.",
    deliverables: [
      "Camera or sensor integration",
      "Local processing or CV pipeline",
      "Event delivery interface",
    ],
    timeline: "4–6 weeks",
    handoff:
      "Prototype code, configuration notes, test results, and a live technical demo",
  },
  {
    number: "04",
    title: "System Reliability Sprint",
    usefulWhen:
      "An existing service or deployment needs clearer operating visibility and more predictable recovery.",
    deliverables: [
      "Monitoring and health checks",
      "Alerts and structured logging",
      "Deployment improvements",
    ],
    timeline: "2–5 weeks",
    handoff:
      "Dashboards, alert guide, deployment notes, and an operator-ready runbook",
  },
] as const;

export const contractingProfile = [
  {
    label: "Business",
    value: "Small business",
    detail: "Boulder, Colorado",
  },
  {
    label: "Role",
    value: "Technical subcontractor",
    detail: "bounded scope within a larger program",
  },
  {
    label: "Team",
    value: "Founder-led pod",
    detail: "flexible 1–3 person engineering team",
  },
  {
    label: "NAICS",
    value: "541511 · 541512 · 541519",
    detail: "518210 · 541330 · 541990",
  },
] as const;

export const engagementPrinciples = [
  "Start with a bounded outcome, named interfaces, and acceptance criteria",
  "Expose the highest-risk assumption through an early prototype or integration",
  "Use short, visible checkpoints so the program team can steer before handoff",
  "Design monitoring and debugging paths alongside the delivered system",
  "Leave maintainable code, architecture notes, deployment steps, and runbooks",
  "Transition ownership cleanly or remain through fielding and ongoing support",
] as const;

export const experienceCases = [
  {
    number: "01",
    title: "Deployed computer vision",
    signal: "25 pilot locations",
    description:
      "Built and launched CrowdCount across 25 pilot locations, including field installation and customer operations.",
  },
  {
    number: "02",
    title: "Operational AI infrastructure",
    signal: "Camera → edge → cloud",
    description:
      "Engineered the reliability layer behind live CV: stream and session health, tracker operations, events, alerts, and API integrations.",
  },
  {
    number: "03",
    title: "Federal data software",
    signal: "CMS-aligned delivery",
    description:
      "Contributed analytics, reporting, data-platform, and production-migration work for federal health programs through RELI Group.",
  },
] as const;

export const contact = {
  name: "Josh D’Annunzio",
  email: "josh@upstreamcv.com",
  phoneDisplay: "410-387-8222",
  phoneHref: "+14103878222",
} as const;
