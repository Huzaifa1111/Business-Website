import type { SEOFields } from "@/lib/types";

export const seoData: Record<string, SEOFields> = {
  home: {
    metaTitle: "Apex Consulting Group | Strategic Business Consulting",
    metaDescription:
      "Apex Consulting Group partners with ambitious mid-market companies to drive sustainable growth, streamline operations, and unlock untapped potential. 15+ years, 200+ clients served.",
    metaKeywords: [
      "business consulting",
      "management consulting",
      "strategy consulting",
      "operational excellence",
      "digital transformation",
      "growth consulting",
    ],
    canonicalUrl: "https://www.apexconsulting.com",
    ogTitle: "Apex Consulting Group | Strategic Business Consulting",
    ogDescription:
      "Partner with Apex to accelerate growth, optimise operations, and build a business that lasts. Trusted by 200+ companies across North America.",
    ogImage: "https://www.apexconsulting.com/og-image-home.jpg",
    twitterTitle: "Apex Consulting Group",
    twitterDescription:
      "Strategic consulting for ambitious mid-market businesses. 15+ years. 200+ clients. Real results.",
    twitterImage: "https://www.apexconsulting.com/twitter-card-home.jpg",
    noIndex: false,
    noFollow: false,
  },
  about: {
    metaTitle: "About Apex Consulting Group | Our Story, Mission & Team",
    metaDescription:
      "Learn about the Apex Consulting Group story — our founding in 2009, the values that guide us, and the experienced team of senior consultants who deliver results for our clients.",
    metaKeywords: [
      "about apex consulting",
      "consulting firm team",
      "consulting company history",
      "consulting leadership team",
    ],
    canonicalUrl: "https://www.apexconsulting.com/about",
    ogTitle: "About Apex Consulting Group",
    ogDescription:
      "From a three-person startup in 2009 to a team of 85 specialists — discover the story and values behind Apex Consulting Group.",
    ogImage: "https://www.apexconsulting.com/og-image-about.jpg",
    noIndex: false,
    noFollow: false,
  },
  services: {
    metaTitle: "Our Services | Apex Consulting Group",
    metaDescription:
      "From strategic advisory and operational excellence to digital transformation and market expansion — explore the full range of consulting services offered by Apex Consulting Group.",
    metaKeywords: [
      "consulting services",
      "strategy advisory",
      "operational excellence consulting",
      "digital transformation consulting",
      "financial advisory",
      "market expansion",
    ],
    canonicalUrl: "https://www.apexconsulting.com/services",
    ogTitle: "Consulting Services | Apex Consulting Group",
    ogDescription:
      "Six practice areas. One integrated approach. Explore how Apex Consulting Group can help your business grow.",
    ogImage: "https://www.apexconsulting.com/og-image-services.jpg",
    noIndex: false,
    noFollow: false,
  },
  contact: {
    metaTitle: "Contact Us | Apex Consulting Group",
    metaDescription:
      "Get in touch with Apex Consulting Group. Schedule a free 30-minute strategy call with a senior consultant, or reach us directly at our New York, Toronto, or London offices.",
    metaKeywords: [
      "contact apex consulting",
      "consulting firm contact",
      "book a consultation",
      "strategy call",
    ],
    canonicalUrl: "https://www.apexconsulting.com/contact",
    ogTitle: "Contact Apex Consulting Group",
    ogDescription:
      "Ready to start the conversation? Book a free strategy call or reach our team directly. No sales pressure — just an honest discussion about your business.",
    ogImage: "https://www.apexconsulting.com/og-image-contact.jpg",
    noIndex: false,
    noFollow: false,
  },
};
