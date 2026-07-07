import type { Service } from "@/lib/types";

export const servicesData: Service[] = [
  {
    id: "strategy-advisory",
    title: "Strategic Advisory",
    description:
      "We work directly with your C-suite and board to articulate a winning strategy, stress-test your assumptions against market realities, and construct a clear, prioritised roadmap to execution. Engagements typically span 12–24 weeks and result in a living strategy document your team actually uses.",
    icon: "🗺️",
    features: [
      "Competitive landscape & market sizing analysis",
      "Business model evaluation and stress-testing",
      "Growth strategy development (organic & inorganic)",
      "Board and investor presentation preparation",
      "Quarterly strategy reviews and KPI tracking",
    ],
    ctaText: "Explore Strategic Advisory",
    ctaLink: "/services/strategy-advisory",
    order: 1,
    isFeatured: true,
  },
  {
    id: "operational-excellence",
    title: "Operational Excellence",
    description:
      "Hidden inefficiencies cost businesses far more than they realise. Our operational excellence team identifies and eliminates friction across your value chain — reducing costs, increasing throughput, and dramatically improving the quality of output. Average client sees 15–25% efficiency gains within the first year.",
    icon: "⚙️",
    features: [
      "End-to-end process mapping and waste analysis",
      "Lean Six Sigma implementation",
      "Supply chain optimisation and vendor management",
      "Quality management system design",
      "Performance dashboards and reporting infrastructure",
    ],
    ctaText: "Explore Operational Excellence",
    ctaLink: "/services/operational-excellence",
    order: 2,
    isFeatured: true,
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Technology investments fail when they're not anchored to business strategy. We bridge the gap between your IT capabilities and your commercial objectives — from ERP selection and implementation through to AI-enabled process automation. We ensure your teams adopt new tools, not just install them.",
    icon: "🚀",
    features: [
      "Technology stack assessment and roadmap",
      "ERP and CRM selection and implementation oversight",
      "Robotic Process Automation (RPA) and AI integration",
      "Data strategy and analytics platform build-out",
      "Change management and user adoption programmes",
    ],
    ctaText: "Explore Digital Transformation",
    ctaLink: "/services/digital-transformation",
    order: 3,
    isFeatured: true,
  },
  {
    id: "financial-advisory",
    title: "Financial Advisory",
    description:
      "From financial modelling and cash flow optimisation to M&A due diligence and post-merger integration, our financial advisory practice gives you the analytical firepower to make high-stakes decisions with confidence. We work closely with your CFO and finance team to build sustainable financial frameworks.",
    icon: "📊",
    features: [
      "Financial modelling and scenario planning",
      "Cash flow and working capital optimisation",
      "M&A target screening and due diligence",
      "Post-merger integration planning",
      "Fundraising preparation and investor relations support",
    ],
    ctaText: "Explore Financial Advisory",
    ctaLink: "/services/financial-advisory",
    order: 4,
  },
  {
    id: "talent-organisation",
    title: "Talent & Organisation",
    description:
      "Strategy only executes as well as the people and structures behind it. We help you design organisations that are fit-for-purpose, identify and develop high-potential leaders, and build the culture and incentive structures that attract and retain exceptional talent in competitive markets.",
    icon: "👥",
    features: [
      "Organisational design and restructuring",
      "Leadership assessment and development programmes",
      "Succession planning and talent pipeline development",
      "Compensation benchmarking and incentive design",
      "Culture assessment and transformation programmes",
    ],
    ctaText: "Explore Talent & Organisation",
    ctaLink: "/services/talent-organisation",
    order: 5,
  },
  {
    id: "market-expansion",
    title: "Market Expansion",
    description:
      "Entering a new geography, vertical, or customer segment involves risks that can be dramatically reduced with the right intelligence and a disciplined approach. We manage the full market entry lifecycle — from feasibility assessment through to commercial launch and performance stabilisation.",
    icon: "🌐",
    features: [
      "Market feasibility and entry mode analysis",
      "Regulatory and compliance landscape mapping",
      "Local partnership and distribution channel development",
      "Go-to-market playbook development",
      "Launch execution support and post-entry monitoring",
    ],
    ctaText: "Explore Market Expansion",
    ctaLink: "/services/market-expansion",
    order: 6,
  },
];
