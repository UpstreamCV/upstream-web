export const engagementNavigation = [
  { label: "How We Engage", href: "#engagement-models" },
  { label: "Work Packages", href: "#work-packages" },
  { label: "Custom Scope", href: "#custom-scope" },
  { label: "Contact", href: "#contact" },
] as const;

export const engagementPaths = [
  {
    number: "01",
    signal: "Own the outcome",
    title: "Give Upstream a defined piece of the work.",
    summary:
      "We take responsibility for the scope, interfaces, delivery checkpoints, and handoff.",
    models: [
      {
        title: "Defined subcontract work package",
        detail: "A measurable feature, integration, workflow, or system component.",
      },
      {
        title: "Backlog and delivery support",
        detail: "Bounded work the main team does not have capacity to complete.",
      },
    ],
  },
  {
    number: "02",
    signal: "Add technical depth",
    title: "Bring us inside the existing team.",
    summary:
      "We contribute specialist engineering without adding another management layer.",
    models: [
      {
        title: "Specialized technical support",
        detail: "Software, data, AI, vision, edge, hardware, cloud, or prototyping.",
      },
      {
        title: "Proposal and pre-award support",
        detail: "Technical solutioning tied to a credible role in delivery.",
      },
    ],
  },
  {
    number: "03",
    signal: "Reduce uncertainty",
    title: "Prove the next move before scaling it.",
    summary:
      "We turn technical unknowns into evidence, architecture, and an actionable path forward.",
    models: [
      {
        title: "Rapid prototype or pilot",
        detail: "Test one concept with representative data, hardware, or users.",
      },
      {
        title: "Technical discovery and solutioning",
        detail: "Clarify requirements, risks, interfaces, and implementation options.",
      },
    ],
  },
] as const;

export const readyWorkPackages = [
  {
    number: "01",
    title: "Workflow Automation and Reporting",
    scope: ["Ingest + validate", "Automate + notify", "Dashboard + report"],
    outcome: "One manual workflow, automated from input to final output.",
  },
  {
    number: "02",
    title: "Application Features and Internal Tools",
    scope: ["Feature or workflow", "Backend + access", "Tests + documentation"],
    outcome: "One defined feature, workflow, or small internal application.",
  },
  {
    number: "03",
    title: "APIs and Systems Integration",
    scope: ["API + interfaces", "Data exchange", "Monitoring + recovery"],
    outcome: "Two or more systems connected through a documented, testable integration.",
  },
  {
    number: "04",
    title: "Data, Analytics, and AI Pilot",
    scope: ["Prepare + analyze", "Prototype + evaluate", "Deliver + recommend"],
    outcome: "Evidence that available data can, or cannot, support a useful capability.",
  },
  {
    number: "05",
    title: "Edge Systems and Video Analytics",
    scope: ["Camera + sensor", "Edge processing", "Events + operations"],
    outcome: "One edge, sensor, or computer-vision use case built and evaluated.",
  },
  {
    number: "06",
    title: "Cloud Deployment and System Reliability",
    scope: ["Deploy + configure", "Observe + alert", "Document + operate"],
    outcome: "A defined system prepared for repeatable deployment and operation.",
  },
] as const;

export const customCapabilityGroups = [
  {
    number: "01",
    title: "Software systems",
    capabilities: "Custom software, web applications, APIs, and systems integration",
  },
  {
    number: "02",
    title: "Data and intelligence",
    capabilities: "Data engineering, analytics, AI, machine learning, and computer vision",
  },
  {
    number: "03",
    title: "Cloud and operations",
    capabilities: "Cloud infrastructure, deployment, reliability, and operational systems",
  },
  {
    number: "04",
    title: "Edge and field",
    capabilities: "Hardware integration, sensors, edge systems, research, and prototyping",
  },
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
