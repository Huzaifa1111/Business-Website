import type { ServicesPageContent } from "@/lib/types";

export const servicesPageData: ServicesPageContent = {
  hero: {
    eyebrow: "What We Do",
    heading: "Six Practice Areas. One Trusted Partner.",
    subheading:
      "We cover every dimension of business performance — so you never have to stitch together advice from multiple firms with competing agendas.",
  },
  process: {
    eyebrow: "How We Work",
    heading: "Our Engagement Model",
    subheading:
      "A structured, transparent process from first call to final delivery — so you always know what to expect.",
    steps: [
      {
        step: "01",
        title: "Discovery Call",
        description:
          "A 30-minute conversation to understand your priorities and assess fit — no cost, no obligation.",
      },
      {
        step: "02",
        title: "Scoping & Proposal",
        description:
          "We define a clear scope of work with milestones, deliverables, timelines, and transparent pricing.",
      },
      {
        step: "03",
        title: "Execution",
        description:
          "Our team embeds with yours, working in focused sprints with regular check-ins and progress updates.",
      },
      {
        step: "04",
        title: "Handover & Review",
        description:
          "We transfer ownership completely — documentation, training, and a 90-day follow-up included.",
      },
    ],
  },
  cta: {
    heading: "Not sure which service fits your needs?",
    subheading:
      "Tell us about your challenge and we'll recommend the right engagement model for your situation.",
    primaryButtonText: "Talk to a Consultant",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Learn About Us",
    secondaryButtonLink: "/about",
  },
};
