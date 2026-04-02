import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

export default function HLSNews() {
  const ref = useScrollReveal();

  return (
    <section id="news" className="bg-white py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-[32px] lg:text-[44px] text-hls-dark text-center mb-16">
          Latest from HLS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* News 1 */}
          <div className="bg-white rounded-[20px] border border-hls-border overflow-hidden hover:shadow-md transition-shadow">
            <img
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80"
              alt="Lab hub"
              className="w-full h-[180px] object-cover"
            />
            <div className="p-6 space-y-3">
              <span className="font-body text-xs text-hls-muted">April 2025</span>
              <h3 className="font-display text-lg text-hls-dark leading-snug">
                HLS Launches Food & Biotech Hub at The Valley in Kemptthal
              </h3>
              <a href="#" className="inline-flex items-center gap-1.5 text-hls-magenta font-body font-semibold text-sm hover:gap-2.5 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* News 2 */}
          <div className="bg-white rounded-[20px] border border-hls-border overflow-hidden hover:shadow-md transition-shadow">
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80"
              alt="Partnership"
              className="w-full h-[180px] object-cover"
            />
            <div className="p-6 space-y-3">
              <span className="font-body text-xs text-hls-muted">March 2025</span>
              <h3 className="font-display text-lg text-hls-dark leading-snug">
                Partnership with Swiss Food & Nutrition Valley Announced
              </h3>
              <a href="#" className="inline-flex items-center gap-1.5 text-hls-magenta font-body font-semibold text-sm hover:gap-2.5 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Event card */}
          <div className="bg-white rounded-[20px] border-2 border-hls-magenta overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-hls-magenta-bg px-6 py-4">
              <span className="font-body font-semibold text-sm text-hls-magenta uppercase tracking-wider">
                Upcoming Event
              </span>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-display text-lg text-hls-dark leading-snug">
                HLS Community Meetup: Lab Innovation Day
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-body text-hls-body">
                  <Calendar className="w-4 h-4 text-hls-magenta" />
                  May 15, 2025 · 14:00–18:00
                </div>
                <div className="flex items-center gap-2 text-sm font-body text-hls-body">
                  <MapPin className="w-4 h-4 text-hls-magenta" />
                  Hall of Innovation, Hombrechtikon
                </div>
              </div>
              <a
                href="#"
                className="mt-2 block text-center bg-hls-magenta text-white font-body font-semibold py-3 rounded-[12px] hover:bg-hls-magenta-dark transition-colors"
              >
                Register
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-hls-magenta font-body font-semibold hover:gap-3 transition-all"
          >
            View All News <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
