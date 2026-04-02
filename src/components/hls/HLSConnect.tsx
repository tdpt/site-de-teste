import { useScrollReveal } from "./useScrollReveal";

const ctas = [
  "Book a Visit",
  "Download Brochure",
  "Join Our Community",
  "Subscribe Newsletter",
];

export default function HLSConnect() {
  const ref = useScrollReveal();

  return (
    <section id="connect" className="bg-hls-purple py-20 lg:py-28">
      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-[32px] lg:text-[44px] text-white mb-10 leading-tight">
          Ready to build your lab at{" "}
          <br className="hidden lg:block" />
          House of Lab Science?
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {ctas.map((cta) => (
            <a
              key={cta}
              href="#"
              className="border-2 border-white text-white font-body font-semibold px-6 py-3 rounded-[12px] hover:bg-white hover:text-hls-purple transition-colors text-sm lg:text-base"
            >
              {cta}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
