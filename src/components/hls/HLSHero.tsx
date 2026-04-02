import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

export default function HLSHero() {
  const ref = useScrollReveal();

  return (
    <section id="hero" className="pt-[72px] bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-hls-magenta-bg text-hls-magenta text-sm font-body font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-hls-magenta rounded-full animate-pulse" />
              Now open: HLS The Valley, Kemptthal
            </div>

            <h1 className="font-display text-[40px] lg:text-[56px] leading-[1.1] text-hls-dark">
              Innovation moves fast.{" "}
              <br />
              Your lab should too.
            </h1>

            <p className="text-lg lg:text-xl font-body text-hls-body leading-relaxed max-w-lg">
              Plug-and-play laboratory spaces with shared equipment, office, services and community included.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#locations"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-hls-magenta text-white font-body font-semibold px-7 py-3.5 rounded-[12px] hover:bg-hls-magenta-dark transition-colors text-base"
              >
                Explore Our Locations
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#connect"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 border-2 border-hls-purple text-hls-purple font-body font-semibold px-7 py-3.5 rounded-[12px] hover:bg-hls-purple-bg transition-colors text-base"
              >
                Get a Quote
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80"
              alt="Modern laboratory workspace"
              className="w-full h-[400px] lg:h-[520px] object-cover rounded-[16px]"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-hls-border border border-hls-border rounded-[16px] p-6 lg:p-0 bg-white">
          {[
            { value: "2", label: "Locations" },
            { value: "Benches", label: "and Labs" },
            { value: "BSL-1", label: "and BSL-2 ready" },
            { value: "50+", label: "HLS community members" },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:py-6 lg:px-8">
              <div className="text-2xl lg:text-3xl font-display text-hls-dark">{stat.value}</div>
              <div className="text-sm font-body text-hls-body-light mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
