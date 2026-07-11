import type { HomeContent } from "@/lib/types";

export const homeData: HomeContent = {
  hero: {
    isVisible: true,
    headline: "Building Businesses That Last",
    subheadline:
      "Apex Consulting Group partners with ambitious companies to drive sustainable growth, streamline operations, and unlock untapped potential. From strategy to execution — we deliver results.",
    primaryCtaText: "Schedule a Free Consultation",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Our Services",
    secondaryCtaLink: "/services",
    backgroundImageUrl: "",
    textColor: "#252118",
    accentColor: "#4f46e5",
    badgeText: "Trusted by 200+ Companies",
  },

  intro: {
    isVisible: true,
    heading: "A Partner You Can Rely On",
    body: "Since 2009, Apex Consulting Group has helped mid-market businesses across North America navigate complex challenges and capitalise on emerging opportunities. Our multidisciplinary team combines deep industry knowledge with a pragmatic, data-driven approach — so every recommendation we make is grounded in your specific context, not generic frameworks.",
    textColor: "#252118",
    accentColor: "#4f46e5",
    statsItems: [
      { value: "15+", label: "Years in business" },
      { value: "200+", label: "Clients served" },
      { value: "$1.2B", label: "Revenue generated for clients" },
      { value: "97%", label: "Client retention rate" },
    ],
  },

  whyChooseUs: {
    isVisible: true,
    heading: "Why Companies Choose Apex",
    subheading:
      "We don't believe in off-the-shelf solutions. Every engagement is built around your unique challenges, goals, and culture.",
    textColor: "#ffffff",
    accentColor: "#4f46e5",
    items: [
      {
        icon: "🎯",
        title: "Outcome-Focused Engagements",
        description:
          "Our fee structures are tied to measurable milestones, not billable hours. If you don't hit your targets, neither do we.",
      },
      {
        icon: "🔬",
        title: "Deep Industry Expertise",
        description:
          "With specialists across manufacturing, technology, healthcare, and financial services, we speak your language from day one.",
      },
      {
        icon: "⚡",
        title: "Rapid Time to Value",
        description:
          "Our proven 90-day sprint methodology delivers tangible wins early, building momentum and executive confidence before the heavy lift begins.",
      },
      {
        icon: "🛡️",
        title: "Rigorous Data Security",
        description:
          "ISO 27001-certified processes and NDA-first engagements mean your competitive intelligence never leaves our secure environment.",
      },
      {
        icon: "🤝",
        title: "Long-Term Partnership",
        description:
          "78% of our clients extend beyond their initial engagement. We invest in understanding your business the way an insider would.",
      },
      {
        icon: "🌐",
        title: "Global Reach, Local Insight",
        description:
          "Offices in New York, Toronto, and London give us the network to open doors — while regional specialists ensure cultural and regulatory fit.",
      },
    ],
  },

  cta: {
    isVisible: true,
    heading: "Ready to accelerate your growth?",
    subheading:
      "Book a no-obligation 30-minute strategy call with one of our senior consultants. No sales pitch — just an honest assessment of where we can add value.",
    buttonText: "Book Your Strategy Call",
    buttonLink: "/contact",
    backgroundVariant: "primary",
    textColor: "#ffffff",
    accentColor: "#4f46e5",
  },

  testimonials: {
    isVisible: true,
    heading: "What Our Clients Say",
    subheading:
      "Don't take our word for it — here's what the leaders we've partnered with have to say.",
    textColor: "#252118",
    accentColor: "#4f46e5",
    items: [
      {
        id: "t1",
        authorName: "Sarah Mitchell",
        authorTitle: "CEO",
        authorCompany: "Northfield Manufacturing",
        quote:
          "Apex didn't just deliver a report and walk away. They embedded with our team for six months, helped us restructure our supply chain, and we came out of it with a 23% reduction in per-unit costs. Genuinely transformational.",
        rating: 5,
      },
      {
        id: "t2",
        authorName: "David Reyes",
        authorTitle: "COO",
        authorCompany: "Vantage HealthTech",
        quote:
          "We'd tried two other consultancies before Apex. The difference is that their team actually listens. They challenged our assumptions in the best possible way and helped us pivot our go-to-market strategy before we burned through runway.",
        rating: 5,
      },
      {
        id: "t3",
        authorName: "Priya Nair",
        authorTitle: "VP of Operations",
        authorCompany: "Clearstream Financial",
        quote:
          "Within 90 days of starting our engagement, we had already hit three of our five KPIs. The Apex team brings an incredible mix of analytical rigour and practical execution know-how that's rare to find.",
        rating: 5,
      },
    ],
  },
};
