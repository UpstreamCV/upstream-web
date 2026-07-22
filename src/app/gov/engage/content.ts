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
