import type { ContactInfo } from "@/lib/types";

export const contactData: ContactInfo = {
  hero: {
    eyebrow: "Get In Touch",
    heading: "Let's Start the Conversation",
    subheading: "No sales pitch — just an honest discussion about your business. Our team responds within 24 hours.",
  },
  form: {
    heading: "Send us a message",
    subheading: "Fill out the form below and a consultant will be in touch within 24 hours.",
  },
  address: {
    street: "1221 Avenue of the Americas, Suite 4200",
    city: "New York",
    state: "NY",
    postalCode: "10020",
    country: "United States",
  },
  phones: [
    { label: "Main Office", number: "+1 (212) 555-0140" },
    { label: "Client Services", number: "+1 (212) 555-0187" },
    { label: "Toronto Office", number: "+1 (416) 555-0232" },
  ],
  email: "hello@apexconsulting.com",
  businessHours: {
    monday: "8:30 AM – 6:00 PM EST",
    tuesday: "8:30 AM – 6:00 PM EST",
    wednesday: "8:30 AM – 6:00 PM EST",
    thursday: "8:30 AM – 6:00 PM EST",
    friday: "8:30 AM – 5:30 PM EST",
    saturday: "Closed",
    sunday: "Closed",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.9800661!3d40.7588499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fecb7f3e47%3A0x2a48f1bbb64d72ba!2s1221%20Avenue%20of%20the%20Americas%2C%20New%20York%2C%20NY%2010020!5e0!3m2!1sen!2sus!4v1720000000000",
  socialLinks: {
    linkedin: "https://linkedin.com/company/apex-consulting-group",
    twitter: "https://twitter.com/ApexConsulting",
    facebook: "https://facebook.com/ApexConsultingGroup",
    instagram: "https://instagram.com/apexconsultinggroup",
  },
};
