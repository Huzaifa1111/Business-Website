import type { AboutContent } from "@/lib/types";

export const aboutData: AboutContent = {
  hero: {
    eyebrow: "Our Story",
    heading: "Building Businesses That Last, Since 2009",
    subheading: "We started as three people with a better idea about what great consulting should look like. Fifteen years later, we're still guided by the same principles.",
  },
  overview: {
    heading: "Our Story",
    foundedYear: 2009,
    body: "Apex Consulting Group was founded in 2009 by a group of former Fortune 500 executives who grew frustrated watching brilliant leadership teams struggle not from lack of vision, but from lack of the right operational frameworks to execute on it. We started as a three-person shop in midtown Manhattan, and over 15 years we've grown to a team of 85 specialists with offices in New York, Toronto, and London.\n\nOur philosophy has remained unchanged: great consulting isn't about handing clients a binder and boarding a flight home. It's about rolling up your sleeves, building genuine relationships, and delivering the kind of change that sticks long after we've left the room.",
  },

  mission: {
    heading: "Our Mission",
    statement:
      "To partner with ambitious organisations and equip them with the strategic clarity, operational discipline, and human capital to achieve lasting, measurable growth — on their terms.",
  },

  vision: {
    heading: "Our Vision",
    statement:
      "A business world where every company, regardless of size or resources, has access to the calibre of strategic thinking that was once reserved only for the largest enterprises.",
  },

  values: {
    heading: "What We Stand For",
    subheading:
      "Our values aren't posters on a wall — they're the filters we use for every decision we make, from which clients we take on to how we structure our fees.",
    items: [
      {
        icon: "💡",
        title: "Intellectual Honesty",
        description:
          "We tell clients what they need to hear, not what they want to hear. Comfortable half-truths are a disservice to the businesses that trust us.",
      },
      {
        icon: "🎯",
        title: "Client Obsession",
        description:
          "Your success is the only metric that matters. We succeed when our clients succeed, and that alignment drives everything from project scoping to final delivery.",
      },
      {
        icon: "🏗️",
        title: "Craft & Excellence",
        description:
          "We hold our work to a standard of excellence that borders on obsessive. Every analysis, recommendation, and deliverable is reviewed until it is genuinely excellent.",
      },
      {
        icon: "🌱",
        title: "Sustainable Impact",
        description:
          "Quick wins matter, but we build for the long game. Every recommendation is designed to compound in value — not create dependency on external consultants.",
      },
    ],
  },

  teamMembers: [
    {
      id: "tm1",
      name: "Jonathan Hargrove",
      role: "Founder & Managing Partner",
      bio: "Jonathan brings 25 years of operational leadership across manufacturing and logistics. Prior to founding Apex, he served as COO of a $3B industrial conglomerate where he led a five-year transformation programme that doubled EBITDA. He holds an MBA from Wharton and a BSc in Industrial Engineering from Georgia Tech.",
      linkedinUrl: "https://linkedin.com",
      email: "j.hargrove@apexconsulting.com",
    },
    {
      id: "tm2",
      name: "Amara Osei-Bonsu",
      role: "Partner, Strategy & Growth",
      bio: "Amara specialises in market entry, competitive positioning, and revenue architecture. She spent a decade at McKinsey before joining Apex, advising technology and consumer goods companies on their most complex strategic challenges. She is a TEDx speaker and sits on the advisory board of two Series B startups.",
      linkedinUrl: "https://linkedin.com",
      email: "a.osei-bonsu@apexconsulting.com",
    },
    {
      id: "tm3",
      name: "Marcus Velden",
      role: "Partner, Operations & Technology",
      bio: "Marcus leads our digital transformation and operational excellence practice. With a background in software engineering and supply chain management, he has guided over 40 companies through ERP implementations, process re-engineering, and automation roadmaps. He is a certified Lean Six Sigma Master Black Belt.",
      linkedinUrl: "https://linkedin.com",
      email: "m.velden@apexconsulting.com",
    },
    {
      id: "tm4",
      name: "Claire Fontaine",
      role: "Director, Client Success",
      bio: "Claire oversees all client relationships and engagement quality. She has 15 years of project management and client services experience, having previously led the enterprise accounts division at a global management consultancy. Her clients consistently rank among our highest satisfaction scores year after year.",
      linkedinUrl: "https://linkedin.com",
      email: "c.fontaine@apexconsulting.com",
    },
  ],
};
