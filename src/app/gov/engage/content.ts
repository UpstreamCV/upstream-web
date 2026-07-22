export const engagementNavigation = [
  { label: "Work Areas", href: "#work-areas" },
  { label: "How It Fits", href: "#program-fit" },
  { label: "Process", href: "#delivery-process" },
  { label: "Contact", href: "#contact" },
] as const;

export type WorkArea = {
  number: string;
  slug: string;
  title: string;
  bestFor: string;
  deliverables: readonly string[];
  example: string;
  outcome: string;
  transition: {
    from: string;
    to: string;
  };
  ctaLabel: string;
  emailSubject: string;
};

export const workAreas: readonly WorkArea[] = [
  {
    number: "01",
    slug: "software",
    title: "Build or Improve Software",
    bestFor:
      "A feature, internal tool, dashboard, portal, or workflow that needs a clear technical owner.",
    deliverables: [
      "Web applications and internal tools",
      "New application features",
      "Backend services and APIs",
      "Administrative interfaces",
      "Authentication and access workflows",
      "Testing and deployment documentation",
    ],
    example:
      "Our program team needs an internal application for reviewing submissions and tracking approvals.",
    outcome:
      "Working code, tests, deployment instructions, and a technical handoff.",
    transition: {
      from: "Missing internal application",
      to: "Working software and handoff",
    },
    ctaLabel: "Discuss a Software Scope",
    emailSubject: "Government software scope",
  },
  {
    number: "02",
    slug: "automation",
    title: "Connect Data and Automate Workflows",
    bestFor:
      "Manual reporting, repeated spreadsheet work, disconnected systems, or unreliable data movement.",
    deliverables: [
      "Data ingestion and validation",
      "APIs and systems integrations",
      "Automated reporting",
      "Scheduled processing",
      "Dashboards and notifications",
      "Monitoring and error handling",
    ],
    example:
      "We combine files from several sources every week and need the process automated.",
    outcome:
      "A documented workflow that moves from input through validated output.",
    transition: {
      from: "Manual weekly reporting",
      to: "Automated validated workflow",
    },
    ctaLabel: "Discuss an Automation Scope",
    emailSubject: "Government automation scope",
  },
  {
    number: "03",
    slug: "prototype",
    title: "Prototype AI, Vision, or Edge Systems",
    bestFor:
      "A technical concept that needs to be tested before a larger investment or deployment.",
    deliverables: [
      "Data and AI prototypes",
      "Computer-vision pipelines",
      "Camera and sensor integration",
      "Edge-device processing",
      "Detection, tracking, counting, or event logic",
      "Performance evaluation",
      "Production recommendations",
    ],
    example:
      "We need to determine whether existing cameras can reliably measure activity at a facility.",
    outcome:
      "A working prototype, measured results, documented limitations, and a recommended next phase.",
    transition: {
      from: "Unproven camera use case",
      to: "Prototype and measured results",
    },
    ctaLabel: "Discuss a Prototype",
    emailSubject: "Government prototype scope",
  },
  {
    number: "04",
    slug: "deployment",
    title: "Deploy and Strengthen Technical Systems",
    bestFor:
      "An application or service that needs repeatable deployment, better visibility, or more reliable operation.",
    deliverables: [
      "Cloud deployment",
      "Containerization",
      "Environment configuration",
      "CI/CD improvements",
      "Logging, monitoring, and alerts",
      "Health checks",
      "Reliability and recovery improvements",
      "Operating documentation",
    ],
    example:
      "Our application works in development but needs a repeatable path into a production environment.",
    outcome:
      "A deployable system with monitoring, documentation, and a clear operating process.",
    transition: {
      from: "Unreliable deployment",
      to: "Repeatable operation and monitoring",
    },
    ctaLabel: "Discuss a Deployment Scope",
    emailSubject: "Government deployment scope",
  },
];

export const programFits = [
  {
    number: "01",
    title: "Own a Defined Scope",
    description:
      "Upstream takes responsibility for agreed deliverables, interfaces, checkpoints, and handoff.",
  },
  {
    number: "02",
    title: "Add Technical Capacity",
    description:
      "Upstream joins an existing team across software, data, AI, vision, edge, cloud, or systems engineering.",
  },
  {
    number: "03",
    title: "Prove the Approach",
    description:
      "Upstream builds a limited prototype or technical assessment before a larger commitment.",
  },
] as const;

export const deliverySteps = [
  {
    number: "1",
    title: "Share the Problem",
    description:
      "Send the requirement, backlog item, current process, statement of work, or technical constraint.",
  },
  {
    number: "2",
    title: "Define the Boundary",
    description:
      "Agree on deliverables, dependencies, interfaces, schedule, and acceptance criteria.",
  },
  {
    number: "3",
    title: "Build and Hand Off",
    description:
      "Receive the work, testing, documentation, and transition support.",
  },
] as const;

export const customCapabilityLine =
  "Custom software · Data engineering · AI/ML · Computer vision · APIs · Cloud · Edge systems · Hardware integration";
