import { ArrowRight, Shield, Wrench, Globe } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const cards = [
  {
    icon: Shield,
    title: "Core Facility & Equipment",
    items: [
      { label: "Safety and compliance", text: "BSL-1 and BSL-2 compliant environments with safety protocols and documentation in place from day 1." },
      { label: "Equipment", text: "Modern, calibrated, ready-to-use laboratory instruments, regularly serviced." },
      { label: "Facility management", text: "HVAC, cleaning, security, IT infrastructure, operational logistics." },
    ],
    cta: "Learn more",
  },
  {
    icon: Wrench,
    title: "Lab Services & Support",
    items: [
      { label: "Specialized services", text: "Expert laboratory services for advanced research needs — waste management, chemical supply, compliance support, trainings, equipment maintenance, lab-manager-as-a-service." },
    ],
    cta: "Learn more",
  },
  {
    icon: Globe,
    title: "My House of Labs Platform",
    items: [
      { label: "", text: "Digital community connecting all HLS members and partners. Member-exclusive discounts, networking events, cross-location access, and collaboration opportunities." },
    ],
    cta: "Become a member",
  },
];

export default function HLSLabService() {
  const ref = useScrollReveal();

  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-[32px] lg:text-[44px] text-hls-dark mb-4">
            More than lab space. A complete lab solution.
          </h2>
          <p className="font-body text-hls-body text-lg max-w-2xl mx-auto">
            Everything you need to run a lab, without the operational overhead.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Stacked cards */}
          <div className="relative space-y-[-16px]">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="relative bg-white rounded-[20px] border border-hls-border p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
                  style={{ zIndex: 30 - i * 10, marginLeft: `${i * 12}px` }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-hls-magenta rounded-l-[20px]" />
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[10px] bg-hls-purple-bg text-hls-purple flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-hls-dark mb-3">{card.title}</h3>
                      <div className="space-y-2">
                        {card.items.map((item, j) => (
                          <p key={j} className="font-body text-sm text-hls-body leading-relaxed">
                            {item.label && (
                              <span className="font-semibold text-hls-dark">{item.label}: </span>
                            )}
                            {item.text}
                          </p>
                        ))}
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-hls-magenta font-body font-semibold text-sm mt-4 hover:gap-2.5 transition-all"
                      >
                        {card.cta} <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Illustration placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-[20px] border-2 border-dashed border-hls-border bg-hls-bg-subtle flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-[16px] bg-hls-purple-bg text-hls-purple flex items-center justify-center mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                </svg>
              </div>
              <p className="font-body text-hls-muted text-sm">
                [Isometric lab illustration — to be produced]
              </p>
              <p className="font-body text-hls-muted/60 text-xs mt-2">
                Lab workflow: equipment, scientists, safety gear, sample processing in brand colors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
