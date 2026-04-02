import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Heart,
  Quote,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import StatsBar from "../components/StatsBar";
import { useReveal } from "../hooks/useReveal";

const VALUES = [
  {
    icon: Heart,
    title: "Dignity & Respect",
    description:
      "Every person we support is treated with absolute dignity, privacy, and respect. We celebrate your uniqueness and honour your choices at every step.",
  },
  {
    icon: Users,
    title: "Person-Centred Care",
    description:
      "Your goals, preferences, and aspirations drive everything we do. We design support around you — not around a one-size-fits-all model.",
  },
  {
    icon: Globe,
    title: "Community Connection",
    description:
      "We believe in the transformative power of community. We work to connect you with the people, places, and opportunities that enrich your life.",
  },
];

const TEAM = [
  {
    name: "Sarah Johnson",
    role: "Director & Founder",
    img: "/assets/generated/about-team.dim_1200x700.jpg",
  },
  {
    name: "Michael Chen",
    role: "Care Manager",
    img: "/assets/generated/about-team.dim_1200x700.jpg",
  },
  {
    name: "Amara Okafor",
    role: "Allied Health Coordinator",
    img: "/assets/generated/about-team.dim_1200x700.jpg",
  },
  {
    name: "Jessica Nguyen",
    role: "Community Support Lead",
    img: "/assets/generated/about-team.dim_1200x700.jpg",
  },
];

const WHY_US = [
  "NDIS Registered Provider with full compliance",
  "24/7 support available for all service tiers",
  "Experienced, police-checked support workers",
  "Fully tailored, goal-focused support plans",
  "Inclusive and culturally safe approach",
  "Local, community-focused across Australia",
];

const TESTIMONIALS = [
  {
    quote:
      "From the first meeting, the team listened to what truly mattered to us. That made all the difference.",
    author: "Helen & James R.",
    role: "SIL clients",
  },
  {
    quote:
      "I’ve worked with many providers. EmpowerAbility stands out for their genuine commitment to the people they serve.",
    author: "Dr. Rachel Summers",
    role: "NDIS Support Coordinator",
  },
];

export default function AboutPage() {
  const missionRef = useReveal();
  const valuesRef = useReveal();
  const teamRef = useReveal();
  const whyRef = useReveal();

  useEffect(() => {
    document.title = "About Us | EmpowerAbility";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Learn about EmpowerAbility — our mission, values, team and commitment to person-centred disability support services.",
      );
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-32 bg-navy"
        aria-label="About page hero"
        style={{
          backgroundImage:
            "url('/assets/generated/about-team.dim_1200x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.22 0.08 170 / 0.92) 0%, oklch(0.22 0.08 170 / 0.65) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h1
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            About EmpowerAbility
          </h1>
          <p className="text-white/75 max-w-xl mt-4 text-lg leading-relaxed">
            A decade of dedicated disability support, built on genuine
            relationships, strong values, and a relentless belief in human
            potential.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-24"
        aria-labelledby="mission-heading"
        ref={missionRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
                Our Mission
              </p>
              <blockquote
                className="font-display font-bold text-navy leading-snug italic border-l-4 border-gold pl-6"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                “To empower every person we support to live a full, meaningful,
                and self-directed life — with dignity, choice, and opportunity
                at its heart.”
              </blockquote>
            </div>
            <div className="reveal reveal-delay-2">
              <h2
                id="mission-heading"
                className="font-display font-black text-navy gold-line"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                Our Founding Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                EmpowerAbility was founded in 2009 by Sarah Johnson, a
                registered nurse who witnessed first-hand the gap between the
                support people with disability needed and what was available.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Starting with a small team of three in Western Sydney,
                EmpowerAbility quickly grew through word of mouth. Today, our
                team of over 80 professionals delivers support across New South
                Wales, Victoria, and Queensland.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We became a registered NDIS provider in 2013 and have held that
                registration continuously since, consistently meeting the
                highest standards of quality and safeguarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 bg-surface"
        aria-labelledby="values-heading"
        ref={valuesRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              What Drives Us
            </p>
            <h2
              id="values-heading"
              className="font-display font-black text-navy gold-line-center"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl p-8 shadow-card border border-border`}
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-gold" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-3">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" aria-labelledby="team-heading" ref={teamRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              The People Behind the Care
            </p>
            <h2
              id="team-heading"
              className="font-display font-black text-navy"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Meet Our Leadership Team
            </h2>
          </div>
          <div className="reveal overflow-hidden rounded-2xl shadow-lift mb-10">
            <img
              src="/assets/generated/about-team.dim_1200x700.jpg"
              alt="The EmpowerAbility leadership and support team"
              className="w-full object-cover max-h-[460px]"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className={`reveal reveal-delay-${i + 1} text-center`}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gold shadow-card">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <p className="font-semibold text-navy text-sm">{member.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Why Choose Us */}
      <section className="py-24" aria-labelledby="why-heading" ref={whyRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                Our Difference
              </p>
              <h2
                id="why-heading"
                className="font-display font-black text-navy gold-line"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
              >
                Why Choose EmpowerAbility?
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-4 mb-8">
                We’re more than a service provider — we’re partners in your
                life’s journey. Here’s why families and participants choose and
                stay with us.
              </p>
              <ul className="space-y-4">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-mid shadow-navy transition-all duration-200"
                data-ocid="about.primary_button"
              >
                Start the Conversation{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="reveal reveal-delay-2 space-y-6">
              {TESTIMONIALS.map((t, i) => (
                <blockquote
                  key={t.author}
                  className={`reveal reveal-delay-${i + 1} bg-surface rounded-2xl p-8 border border-border shadow-card relative`}
                >
                  <Quote
                    className="w-8 h-8 text-gold/30 absolute top-5 right-5"
                    aria-hidden="true"
                  />
                  <p className="text-foreground leading-relaxed text-sm italic mb-5">
                    “{t.quote}”
                  </p>
                  <footer>
                    <p className="font-semibold text-navy text-sm">
                      {t.author}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {t.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
