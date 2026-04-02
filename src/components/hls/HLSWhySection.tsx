import { useState } from "react";
import { Clock, Expand, Cpu, FlaskConical, Users } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const items = [
  {
    icon: Clock,
    title: "Move on Monday, start on Tuesday",
    description:
      "Ready-to-use, compliant laboratories. No build-out, no CapEx, no waiting. Your team can begin work immediately in a fully equipped space.",
  },
  {
    icon: Expand,
    title: "Grow from bench to lab",
    description:
      "Co-working benches and private labs that scale with you. We offer flexible spaces that expand as your research grows, at your pace.",
  },
  {
    icon: Cpu,
    title: "A core infrastructure for all",
    description:
      "Access to high-quality equipment without heavy upfront investment.",
  },
  {
    icon: FlaskConical,
    title: "We run the lab, you handle the science",
    description:
      "Our lab-as-a-service concept ranges from routine lab operations, trainings, facility management to specialized support.",
  },
  {
    icon: Users,
    title: "Power of community",
    description:
      "Join a growing ecosystem of innovators, both on-site and online, through our digital membership platform to network, collaborate and access services and resources.",
  },
];

export default function HLSWhySection() {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal();
  const ActiveIcon = items[active].icon;

  return (
    <section id="why" className="bg-hls-bg-off py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-[32px] lg:text-[44px] text-hls-dark text-center mb-16">
          Everything you need in one place.
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Selector */}
          <div className="space-y-2">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-4 p-5 rounded-[16px] transition-all duration-300 group ${
                    isActive
                      ? "bg-white shadow-md border-l-4 border-hls-magenta"
                      : "bg-transparent hover:bg-white/60 border-l-4 border-transparent"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center transition-colors ${
                      isActive ? "bg-hls-magenta-bg text-hls-magenta" : "bg-hls-bg-subtle text-hls-muted group-hover:text-hls-body"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-body font-semibold text-base transition-colors ${
                      isActive ? "text-hls-dark" : "text-hls-body group-hover:text-hls-dark"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Content */}
          <div className="bg-white rounded-[20px] p-8 lg:p-12 shadow-sm border border-hls-border flex flex-col justify-center min-h-[360px]">
            <div className="w-16 h-16 rounded-[12px] bg-hls-magenta-bg text-hls-magenta flex items-center justify-center mb-6">
              <ActiveIcon className="w-8 h-8" />
            </div>
            <h3 className="font-display text-[24px] lg:text-[28px] text-hls-dark mb-4">
              {items[active].title}
            </h3>
            <p className="font-body text-hls-body text-base lg:text-lg leading-relaxed">
              {items[active].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
