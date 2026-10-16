// Single source of truth for site copy. Everything here is drawn from Cole's resume.

export type Role = {
  title: string;
  team: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type SkillGroup = { label: string; items: string[] };

export const profile = {
  name: "Cole Watson",
  title: "Lead Software Engineer",
  location: "Portland, OR",
  linkedin: "https://www.linkedin.com/in/cole-j-watson",
  intro:
    "I design and build enterprise applications end to end, from frontend platforms to backend services and cloud infrastructure. I work closely with the people who use them to get the problem right, and I lead a team of engineers who ship the solutions with me.",
  about: [
    "I've spent the last ten years at Nike building the tools that product creation teams use every day, from CAD and color workflows to the shared platforms that tie them together.",
    "The part I enjoy most is working directly with the people who use what I build. I like sitting down with them to understand how they actually work, defining the real problem together, and then shaping the solution with them through prototypes, feedback, and iteration until it fits.",
    "My background is in React, TypeScript, Node.js, and AWS. I like architecting full-stack solutions end to end, but I'm happiest when I'm still hands-on in the code while leading a team.",
    "I care about mentoring engineers, making clear technical decisions, and working across disciplines to ship things that scale.",
  ],
  education: {
    degree: "B.S., Computer Science · Minors in Math & Business",
    school: "University of Oregon",
    year: "2016",
    note: "Dean's List",
  },
};

export const employer = "Nike Inc.";

export const roles: Role[] = [
  {
    title: "Lead Software Engineer",
    team: "Product Creation",
    start: "Jun 2026",
    end: "Present",
    summary:
      "Lead a team of 7 engineers developing Nike Flow, a unified product creation workspace integrating 11 digital libraries, while spending about 80% of my time on hands-on feature development.",
    highlights: [
      "Own and develop the Nike Flow application shell, and define the frontend integration patterns that let distributed teams ship independently developed React packages inside one unified experience.",
      "Drive the technical roadmap across product creation disciplines, translating business requirements into engineering priorities across multiple agile teams.",
      "Authored and maintain the PRE component library, a shared React/TypeScript component system with integrated design tokens, adopted across Nike Consumer Product & Innovation.",
      "Introduced AI-assisted development practices, establishing shared workflows for code generation, refactoring, and review.",
    ],
    stack: ["React", "TypeScript", "Design tokens", "Package integration"],
  },
  {
    title: "Lead Software Engineer",
    team: "Design",
    start: "Feb 2025",
    end: "Jun 2026",
    summary:
      "Led development and technical strategy for ColorHUB, Nike's central color data platform serving 1,000+ employees across global footwear and apparel product creation.",
    highlights: [
      "Built a serverless REST API with Node.js, AWS Lambda, and DynamoDB for CSI physical standards records, leading full-stack delivery from API design through frontend integration.",
      "Architected an event-driven indexing pipeline with SNS, SQS, and OpenSearch Ingestion for near-real-time inventory search across thousands of records.",
      "Shipped ColorHUB Workspace, a multi-color comparison tool for lab dip and seasonal color decisions.",
      "Maintained 100% delivery commitments through 3 partner-org layoffs and 4 reorgs.",
    ],
    stack: ["Node.js", "AWS Lambda", "DynamoDB", "SNS / SQS", "OpenSearch"],
  },
  {
    title: "Senior Software Engineer",
    team: "Design",
    start: "Jun 2019",
    end: "Feb 2025",
    summary:
      "Built full-stack web applications and creative-tool integrations for CAD design, upload, and sharing workflows.",
    highlights: [
      "Built Vue and Angular applications that reduced manual designer tasks by 30% and application load times by 25%.",
      "Developed Adobe Illustrator, Photoshop, and InDesign plugins that bring Nike color and material data into designers' creative tools via REST API.",
      "Served as the primary US technical interface to an India-based backend team on Material Library architecture, API contracts, and data modeling.",
      "Authored Just Tour It, an internal JavaScript library for in-app guided tours adopted org-wide, and mentored 5+ engineers.",
      "Built Lambda services for color-chip image generation (Node.js + Jimp) and CAD technical-drawing PDFs with layered pricing data (PDFKit).",
    ],
    stack: ["Vue", "Angular", "Adobe plugins", "Node.js", "AWS Lambda"],
  },
  {
    title: "Application Engineer / Business Systems Analyst",
    team: "Color, Material & Graphics",
    start: "Aug 2016",
    end: "Jun 2019",
    summary:
      "Built web applications and internal tooling for the Color, Material, and Graphics team.",
    highlights: [
      "Built TypeScript and Angular web applications for the Color, Material, and Graphics team.",
      "Developed an Excel VBA and MySQL data visualization tool that streamlined analysis for Product Line Managers.",
      "Built internal desktop tooling with Python and PyQt to support 3D rendering needs.",
    ],
    stack: ["TypeScript", "Angular", "MySQL", "Python", "PyQt"],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS", "Tailwind", "SCSS"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Remix", "Vue", "Angular", "Node.js", "Express", "TanStack Query/Table"],
  },
  {
    label: "Cloud & tooling",
    items: ["AWS Lambda", "SNS", "SQS", "S3", "Docker", "Jenkins", "CI/CD", "Vite", "Nx", "Turborepo", "Okta", "Git"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "SQLite", "DynamoDB", "OpenSearch"],
  },
  {
    label: "Testing",
    items: ["Jest", "Vitest", "React Testing Library", "Cypress", "Playwright"],
  },
  {
    label: "Observability",
    items: ["Dynatrace", "Splunk", "Google Analytics"],
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
