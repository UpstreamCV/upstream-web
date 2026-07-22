export const engagementNavigation = [
  { label: "Engagement Models", href: "#engagement-models" },
  { label: "Work Packages", href: "#work-packages" },
  { label: "Custom Scope", href: "#custom-scope" },
  { label: "Contact", href: "#contact" },
] as const;

export const engagementModels = [
  {
    number: "01",
    title: "Defined Subcontract Work Package",
    summary:
      "Upstream owns a specific, measurable portion of an existing contract or technical effort, including its interfaces, checkpoints, and handoff.",
    examples: [
      "Build a new application feature",
      "Automate a reporting workflow",
      "Develop an API or integration",
      "Deliver an operational dashboard",
      "Prototype an edge, data, or AI capability",
    ],
  },
  {
    number: "02",
    title: "Specialized Technical Support",
    summary:
      "Upstream joins an existing prime or delivery team where focused technical depth is needed without adding another management layer.",
    examples: [
      "Custom software",
      "Computer vision",
      "AI and machine learning",
      "Data engineering",
      "Edge computing",
      "Hardware and sensor integration",
      "Cloud deployment",
      "Technical prototyping",
    ],
  },
  {
    number: "03",
    title: "Backlog and Delivery Support",
    summary:
      "Upstream takes responsibility for clearly defined delivery work that the main team does not have the time, capacity, or specialist coverage to complete.",
    examples: [
      "Bounded backlog items",
      "Feature and integration work",
      "Testing and documentation",
      "Deployment-ready handoff",
    ],
  },
  {
    number: "04",
    title: "Rapid Prototype or Pilot",
    summary:
      "Upstream builds and evaluates a limited working version of a technical concept before a broader implementation is funded or fielded.",
    examples: [
      "Expose the highest-risk assumption",
      "Test with representative data or hardware",
      "Document results and constraints",
      "Define the next implementation step",
    ],
  },
  {
    number: "05",
    title: "Technical Discovery and Solutioning",
    summary:
      "Upstream assesses the current system, clarifies requirements, identifies technical risk, recommends an architecture, and turns ambiguity into an actionable plan.",
    examples: [
      "System and interface assessment",
      "Architecture options",
      "Risk and dependency mapping",
      "Implementation roadmap",
    ],
  },
  {
    number: "06",
    title: "Proposal and Pre-Award Support",
    summary:
      "Upstream helps prime contractors shape credible technical approaches and define scoped engineering work that Upstream can support during delivery.",
    examples: [
      "Technical approach development",
      "Concept prototype",
      "Engineering scope and estimate",
      "Defined delivery role for Upstream",
    ],
  },
] as const;

export const readyWorkPackages = [
  {
    number: "01",
    title: "Workflow Automation and Reporting",
    focus: [
      "Manual spreadsheet and reporting processes",
      "Data ingestion and validation",
      "Scheduled jobs and notifications",
      "Operational dashboards",
      "Exception handling",
      "Automated report generation",
    ],
    engagement:
      "Automate one defined workflow from input through final output.",
  },
  {
    number: "02",
    title: "Application Features and Internal Tools",
    focus: [
      "New application features",
      "Internal web and administrative tools",
      "Approval and submission workflows",
      "Database and backend changes",
      "Authentication and access controls",
      "Testing and documentation",
    ],
    engagement:
      "Take ownership of a defined feature, workflow, or small internal application.",
  },
  {
    number: "03",
    title: "APIs and Systems Integration",
    focus: [
      "New API endpoints",
      "Existing and legacy-system interfaces",
      "File and data exchange",
      "Third-party integrations",
      "Data synchronization",
      "Monitoring and error handling",
    ],
    engagement:
      "Connect two or more systems and deliver a documented, testable integration.",
  },
  {
    number: "04",
    title: "Data, Analytics, and AI Pilot",
    focus: [
      "Data preparation and analysis",
      "Predictive or classification prototypes",
      "Document and text processing",
      "Anomaly detection and operational analytics",
      "Model evaluation",
      "Dashboard or API delivery",
    ],
    engagement:
      "Test whether available data can support a useful analytical or AI capability.",
  },
  {
    number: "05",
    title: "Edge Systems and Video Analytics",
    focus: [
      "Camera and sensor integration",
      "Edge-device deployment",
      "Video ingest and processing",
      "Detection, tracking, counting, and event logic",
      "Operational alerts and stream monitoring",
      "Pilot results and production planning",
    ],
    engagement:
      "Build and evaluate one defined edge, sensor, or computer-vision use case.",
  },
  {
    number: "06",
    title: "Cloud Deployment and System Reliability",
    focus: [
      "Application deployment and containerization",
      "CI/CD and environment configuration",
      "Cloud infrastructure support",
      "Logging, monitoring, and health checks",
      "Alerting and reliability improvements",
      "Deployment documentation",
    ],
    engagement:
      "Prepare or improve a defined application or technical system for repeatable deployment and operation.",
  },
] as const;

export const customCapabilities = [
  "Custom software development",
  "Web applications",
  "Data engineering",
  "Analytics",
  "AI and machine learning",
  "Computer vision",
  "Cloud infrastructure",
  "APIs and systems integration",
  "Hardware integration",
  "Sensors and edge systems",
  "Technical research",
  "Prototyping",
  "Deployed operational systems",
] as const;

