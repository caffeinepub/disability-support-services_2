import { useReveal } from "../hooks/useReveal";

const STATS = [
  { number: "500+", label: "Clients Supported" },
  { number: "15+", label: "Years Experience" },
  { number: "4", label: "Core Services" },
  { number: "NDIS", label: "Registered Provider" },
];

export default function StatsBar() {
  const ref = useReveal();
  return (
    <section className="bg-navy py-14" aria-label="Key statistics" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1}`}>
              <p className="font-display font-black text-4xl md:text-5xl text-gold">
                {s.number}
              </p>
              <p className="text-white/70 text-sm mt-2 font-medium tracking-wide uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
