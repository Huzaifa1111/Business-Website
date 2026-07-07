import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/types";

interface Props {
  data: TestimonialsSectionType;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          className={i < rating ? "text-accent-500" : "text-neutral-300"}
          aria-hidden="true"
        >
          <path d="M8 1l1.854 3.757L14 5.583l-3 2.922.708 4.128L8 10.629l-3.708 2.004L5 8.505 2 5.583l4.146-.826z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({ data }: Props) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-padding bg-neutral-50"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Client Stories"
            heading={data.heading}
            subheading={data.subheading}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.items.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={i * 80} direction="up">
              <Card
                variant="default"
                className="h-full flex flex-col shadow-card hover:shadow-hover transition-shadow duration-300"
              >
                {/* Quote mark */}
                <div
                  className="text-5xl font-serif leading-none text-primary-200 mb-4"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <StarRating rating={testimonial.rating} />

                <blockquote className="mt-4 flex-1">
                  <p className="text-neutral-700 leading-relaxed text-sm italic">
                    {testimonial.quote}
                  </p>
                </blockquote>

                {/* Author */}
                <footer className="mt-6 flex items-center gap-3 pt-5 border-t border-neutral-100">
                  {/* Avatar placeholder */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary-${[600, 500, 700][i % 3]}), var(--color-primary-${[800, 700, 900][i % 3]}))`,
                    }}
                    aria-hidden="true"
                  >
                    {testimonial.authorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-neutral-900 text-sm block">
                      {testimonial.authorName}
                    </cite>
                    <span className="text-xs text-neutral-500">
                      {testimonial.authorTitle}, {testimonial.authorCompany}
                    </span>
                  </div>
                </footer>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
