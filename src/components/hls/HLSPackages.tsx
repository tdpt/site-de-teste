import { Check } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const packages = [
  {
    name: "Lab Bench",
    subtitle: "Ideal for early-stage startups",
    features: [
      "3 types of dedicated benches in co-lab",
      "BSL-1 compliant spaces",
      "Co-working office, up to 2 flexible seats",
      "Access to large equipment and lab tools",
      "Flexible tenancy terms",
      "HLS community benefits",
    ],
  },
  {
    name: "Private Lab",
    subtitle: "Ideal for scale-ups and corporates",
    features: [
      "3 types of private laboratories",
      "BSL-1 and BSL-2 compliant spaces",
      "Co-working office, up to 3 fixed seats",
      "Access to large equipment and lab tools",
      "Incentives for 2+ years tenancy",
      "HLS community benefits",
    ],
  },
];

export default function HLSPackages() {
  const ref = useScrollReveal();

  return (
    <section id="packages" className="bg-hls-bg-off py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-[32px] lg:text-[44px] text-hls-dark text-center mb-16">
          Choose the space that fits your stage
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white rounded-[20px] border border-hls-border p-8 lg:p-10 flex flex-col"
            >
              <h3 className="font-display text-[24px] text-hls-dark mb-1">{pkg.name}</h3>
              <p className="font-body text-hls-muted text-sm mb-8">{pkg.subtitle}</p>

              <ul className="space-y-4 flex-1">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-hls-magenta flex-shrink-0 mt-0.5" />
                    <span className="font-body text-hls-body text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#connect"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-8 block text-center border-2 border-hls-magenta text-hls-magenta font-body font-semibold py-3 rounded-[12px] hover:bg-hls-magenta hover:text-white transition-colors"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
