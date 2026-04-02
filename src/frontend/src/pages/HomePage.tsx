import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Service } from "../backend";
import ServiceCard from "../components/ServiceCard";
import StatsBar from "../components/StatsBar";
import { seedServices } from "../data/seedServices";
import { useActor } from "../hooks/useActor";
import { useReveal } from "../hooks/useReveal";

const TESTIMONIALS = [
  {
    quote:
      "EmpowerAbility has completely transformed my son's quality of life. The support workers are incredibly dedicated and always go above and beyond.",
    author: "Margaret T.",
    role: "Parent of Personal Care client",
  },
  {
    quote:
      "I've been able to rejoin my local art group and make real friendships thanks to the Community Participation team. I feel like myself again.",
    author: "David K.",
    role: "Community Participation client",
  },
  {
    quote:
      "The allied health team worked with us from day one to create a plan that actually fits our daughter's goals. Professional, warm, and genuinely caring.",
    author: "Priya S.",
    role: "Therapy & Allied Health client",
  },
];

export default function HomePage() {
  const { actor, isFetching } = useActor();
  const heroRef = useRef<HTMLElement>(null);
  const sectionRef = useReveal();
  const aboutRef = useReveal();
  const testimonialRef = useReveal();

  const { data: services = seedServices } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return seedServices;
      const data = await actor.getAllServices();
      return data.length > 0
        ? [...data].sort((a, b) => Number(a.order - b.order))
        : seedServices;
    },
    enabled: !!actor && !isFetching,
    initialData: seedServices,
  });

  useEffect(() => {
    document.title = "EmpowerAbility — Empowering Lives, Building Independence";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "EmpowerAbility provides compassionate, NDIS-registered disability support services across Australia.",
      );
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handler = () => {
      hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-navy"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-main.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
        aria-label="Hero"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.22 0.07 175 / 0.90) 0%, oklch(0.22 0.07 175 / 0.55) 60%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="max-w-2xl">
            <p
              className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              NDIS Registered Provider
            </p>
            <h1
              className="font-display font-black text-white leading-tight mb-6 animate-fade-in-up"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                animationDelay: "0.2s",
              }}
            >
              Empowering Lives,
              <br />
              <span className="gradient-text">Building Independence</span>
            </h1>
            <p
              className="text-white/80 text-lg leading-relaxed mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              We provide compassionate, person-centred disability support
              services that put your goals first. From personal care to
              community participation — we're here for every step of your
              journey.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-navy font-bold text-sm shadow-navy hover:brightness-105 active:scale-95 transition-all duration-200"
                data-ocid="hero.primary_button"
              >
                Explore Our Services{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-sm hover:bg-white/10 active:scale-95 transition-all duration-200"
                data-ocid="hero.secondary_button"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-surface" aria-labelledby="services-heading">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          ref={sectionRef}
        >
          <div className="text-center mb-14 reveal">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              What We Offer
            </p>
            <h2
              id="services-heading"
              className="font-display font-black text-navy gold-line-center"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4 leading-relaxed">
              Four specialist support services, each designed to enhance your
              independence, wellbeing, and quality of life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} />
            ))}
          </div>
          <div className="text-center mt-12 reveal reveal-delay-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-mid transition-all duration-200 shadow-navy"
              data-ocid="services.primary_button"
            >
              View All Services{" "}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* About Teaser */}
      <section className="py-24" aria-labelledby="about-heading" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="reveal overflow-hidden rounded-2xl shadow-lift">
              <img
                src="/assets/generated/about-team.dim_1200x700.jpg"
                alt="The EmpowerAbility support team at work"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                Who We Are
              </p>
              <h2
                id="about-heading"
                className="font-display font-black text-navy gold-line"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                A Trusted Partner in Every Step of Your Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                EmpowerAbility was founded with a single vision: to provide
                disability support that truly makes a difference. We believe
                every person deserves to live life on their own terms, with the
                dignity, respect, and opportunity they deserve.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Our team of qualified support workers, allied health
                professionals, and care coordinators work collaboratively to
                deliver outcomes that matter — not just services that tick
                boxes.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "NDIS Registered Provider",
                  "Person-centred approach",
                  "Qualified, vetted support workers",
                  "Available 24/7",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-foreground"
                  >
                    <CheckCircle
                      className="w-4 h-4 text-gold flex-shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-mid shadow-navy transition-all duration-200"
                data-ocid="about.primary_button"
              >
                Learn More About Us{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-24 bg-surface"
        aria-labelledby="testimonials-heading"
        ref={testimonialRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              What People Say
            </p>
            <h2
              id="testimonials-heading"
              className="font-display font-black text-navy"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Stories That Inspire Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={t.author}
                className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl p-8 shadow-card border border-border relative`}
              >
                <Quote
                  className="w-10 h-10 text-gold/30 absolute top-6 right-6"
                  aria-hidden="true"
                />
                <p className="text-foreground leading-relaxed text-sm italic mb-6">
                  "{t.quote}"
                </p>
                <footer>
                  <p className="font-semibold text-navy text-sm">{t.author}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {t.role}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-24"
        aria-label="Call to action"
        style={{
          backgroundImage: "url('/assets/generated/cta-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.22 0.07 175 / 0.88)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display font-black text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Ready to Get Started?
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 text-lg">
            Whether you're exploring options for yourself or a loved one, we're
            here to help. Reach out and let's build a plan that works for you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-navy font-bold text-sm shadow-navy hover:brightness-105 active:scale-95 transition-all duration-200"
            data-ocid="cta.primary_button"
          >
            Contact Us Today{" "}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
