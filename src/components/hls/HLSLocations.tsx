import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const locations = [
  {
    name: "HLS The Valley",
    location: "Kemptthal, ZH",
    badge: "Now open",
    description:
      "Newest hub for biotech and foodtech startups, scale-ups and corporate teams, located in the thriving The Valley ecosystem.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    name: "HLS Hombrechtikon",
    location: "Hombrechtikon, ZH",
    badge: null,
    description:
      "Flagship location since 2022. An established life sciences cluster with proven infrastructure.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
  },
  {
    name: "Hall of Innovation",
    location: "Hombrechtikon, ZH",
    badge: null,
    description:
      "Event space for conferences, workshops, and community gatherings, up to 90 guests.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
];

export default function HLSLocations() {
  const ref = useScrollReveal();

  return (
    <section id="locations" className="bg-white py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-[32px] lg:text-[44px] text-hls-dark mb-4">
            Where innovation lives
          </h2>
          <p className="font-body text-hls-body text-lg max-w-2xl mx-auto">
            Three purpose-built facilities across the Greater Zurich Area, designed for the next generation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="group bg-white rounded-[20px] border border-hls-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-[220px] object-cover"
                />
                {/* Magenta accent — partial left border on image */}
                <div className="absolute top-4 left-0 w-1 h-16 bg-hls-magenta rounded-r-full" />
                {loc.badge && (
                  <span className="absolute top-4 right-4 bg-hls-magenta text-white text-xs font-body font-semibold px-3 py-1 rounded-full">
                    {loc.badge}
                  </span>
                )}
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-display text-xl text-hls-dark">{loc.name}</h3>
                  <p className="font-body text-sm text-hls-muted">{loc.location}</p>
                </div>
                <p className="font-body text-hls-body text-sm leading-relaxed">
                  {loc.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-hls-magenta font-body font-semibold text-sm hover:gap-2.5 transition-all"
                >
                  Explore location <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-hls-muted text-sm italic mt-10">
          We're growing! Stay in touch to learn about our next location.
        </p>
      </div>
    </section>
  );
}
