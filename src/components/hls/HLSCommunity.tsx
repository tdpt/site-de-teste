import { useScrollReveal } from "./useScrollReveal";

const logos = [
  { name: "BioNova Labs", shape: "circle" },
  { name: "Helvetia Therapeutics", shape: "hex" },
  { name: "AlpineCell", shape: "triangle" },
  { name: "SwissGen Diagnostics", shape: "square" },
  { name: "NeuraTech AG", shape: "diamond" },
  { name: "VerdeBio", shape: "circle" },
  { name: "CryoLogic", shape: "hex" },
  { name: "Planted", shape: "square" },
  { name: "ProteaLab", shape: "triangle" },
  { name: "ZurichBiome", shape: "diamond" },
];

function LogoShape({ shape }: { shape: string }) {
  const color = "#888";
  switch (shape) {
    case "circle":
      return <circle cx="14" cy="14" r="10" fill="none" stroke={color} strokeWidth="1.5" />;
    case "hex":
      return <polygon points="14,3 24,9 24,19 14,25 4,19 4,9" fill="none" stroke={color} strokeWidth="1.5" />;
    case "triangle":
      return <polygon points="14,4 25,24 3,24" fill="none" stroke={color} strokeWidth="1.5" />;
    case "square":
      return <rect x="4" y="4" width="20" height="20" rx="3" fill="none" stroke={color} strokeWidth="1.5" />;
    case "diamond":
      return <polygon points="14,3 25,14 14,25 3,14" fill="none" stroke={color} strokeWidth="1.5" />;
    default:
      return <circle cx="14" cy="14" r="10" fill="none" stroke={color} strokeWidth="1.5" />;
  }
}

function FakeLogo({ name, shape }: { name: string; shape: string }) {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0 px-6">
      <svg width="28" height="28" viewBox="0 0 28 28">
        <LogoShape shape={shape} />
      </svg>
      <span className="font-body font-medium text-sm text-[#888] whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function HLSCommunity() {
  const ref = useScrollReveal();

  return (
    <section id="community" className="bg-hls-bg-off py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-[32px] lg:text-[44px] text-hls-dark mb-4">
            Join a growing community
          </h2>
          <p className="font-body text-hls-body text-lg max-w-xl mx-auto">
            Connect, collaborate and build through My House of Labs.
          </p>
        </div>

        {/* Logo carousel */}
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-scroll-logos">
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((logo, i) => (
              <FakeLogo key={`${logo.name}-${i}`} name={logo.name} shape={logo.shape} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-hls-purple text-white font-body font-semibold px-7 py-3.5 rounded-[12px] hover:bg-hls-purple-dark transition-colors"
          >
            Discover My House of Labs
          </a>
        </div>
      </div>
    </section>
  );
}
