import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HeroSection as HeroSectionType } from "@/lib/types";

interface Props {
  data: HeroSectionType;
}

export function HeroSection({ data }: Props) {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-white"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Primary gradient blob */}
        <div
          className="absolute -top-32 -right-40 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)",
          }}
        />
        {/* Accent blob */}
        <div
          className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, white)",
          }}
        />
      </div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-20 lg:py-28">
        {/* Left — text content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {data.badgeText && (
            <Badge variant="primary" className="mb-6 animate-[fadeSlideDown_0.5s_ease_forwards]">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"
                aria-hidden="true"
              />
              {data.badgeText}
            </Badge>
          )}

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {/* Split headline for gradient accent on last word */}
            {data.headline.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{data.headline.split(" ").slice(-1)[0]}</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-xl mb-8">
            {data.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button href={data.primaryCtaLink} size="lg">
              {data.primaryCtaText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            {data.secondaryCtaText && data.secondaryCtaLink && (
              <Button href={data.secondaryCtaLink} variant="outline" size="lg">
                {data.secondaryCtaText}
              </Button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex items-center gap-6 flex-wrap justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {["#4338CA", "#6366F1", "#818CF8", "#A5B4FC"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                >
                  {["JH", "AO", "MV", "+"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-500">
              <span className="font-semibold text-neutral-700">200+ companies</span> trust Apex
            </p>
          </div>
        </div>

        {/* Right — abstract hero illustration */}
        <div className="flex-1 flex items-center justify-center w-full max-w-lg lg:max-w-none">
          <HeroIllustration />
        </div>
      </Container>

      {/* Animated CSS keyframes */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 16px rgba(99,102,241,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
      `}</style>
    </section>
  );
}

/** Pure SVG/CSS abstract illustration — no external image dependency */
function HeroIllustration() {
  return (
    <div
      className="relative w-full aspect-square max-w-sm"
      aria-hidden="true"
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-primary-400) 0%, transparent 65%)",
        }}
      />

      {/* Main card — centre */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-52 rounded-3xl shadow-hover"
        style={{
          background: "linear-gradient(145deg, var(--color-primary-600), var(--color-primary-800))",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        {/* Chart bars inside card */}
        <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between gap-2">
          {[40, 65, 50, 80, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h * 0.6}px`,
                background:
                  i === 4
                    ? "var(--color-accent-400)"
                    : "rgba(255,255,255,0.3)",
                opacity: 0.8 + i * 0.04,
              }}
            />
          ))}
        </div>
        {/* Card label */}
        <div className="absolute top-6 left-6 right-6">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L6 8l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-white/80 text-xs font-medium">Revenue Growth</p>
          <p className="text-white text-lg font-bold">+23%</p>
        </div>
      </div>

      {/* Floating metric chip — top right */}
      <div
        className="absolute top-10 right-4 bg-white rounded-2xl shadow-hover px-4 py-3"
        style={{ animation: "floatSlow 5s ease-in-out infinite 1s" }}
      >
        <p className="text-xs text-neutral-500 mb-0.5">Client Retention</p>
        <p className="text-base font-bold text-primary-700">97%</p>
      </div>

      {/* Floating metric chip — bottom left */}
      <div
        className="absolute bottom-12 left-2 bg-white rounded-2xl shadow-hover px-4 py-3"
        style={{ animation: "floatSlow 7s ease-in-out infinite 0.5s" }}
      >
        <p className="text-xs text-neutral-500 mb-0.5">Years of Experience</p>
        <p className="text-base font-bold text-accent-600">15+</p>
      </div>

      {/* Accent dot decorations */}
      {[
        { top: "8%", left: "12%", size: 12, color: "var(--color-accent-400)" },
        { top: "20%", right: "6%", size: 8, color: "var(--color-primary-300)" },
        { bottom: "6%", right: "18%", size: 10, color: "var(--color-primary-400)" },
        { bottom: "22%", left: "8%", size: 6, color: "var(--color-accent-300)" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            background: dot.color,
            top: dot.top,
            left: (dot as { left?: string }).left,
            right: (dot as { right?: string }).right,
            bottom: dot.bottom,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
