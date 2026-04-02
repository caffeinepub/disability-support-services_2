import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import type { Service } from "../backend";
import VideoPlayer from "../components/VideoPlayer";
import {
  seedServices,
  serviceImages,
  serviceVideos,
} from "../data/seedServices";
import { useActor } from "../hooks/useActor";
import { useReveal } from "../hooks/useReveal";

function getImage(svc: Service): string {
  if (svc.photoUrl) return svc.photoUrl.getDirectURL();
  return (
    serviceImages[svc.id] ??
    "/assets/generated/service-personal-care.dim_800x600.jpg"
  );
}
function getVideo(svc: Service): string | null {
  if (svc.videoUrl) return svc.videoUrl.getDirectURL();
  return serviceVideos[svc.id] ?? null;
}

interface ServiceSectionProps {
  service: Service;
  index: number;
}

function ServiceSection({ service, index }: ServiceSectionProps) {
  const ref = useReveal();
  const imageLeft = index % 2 === 0;
  const videoUrl = getVideo(service);

  return (
    <section
      className={`py-20 ${index % 2 === 0 ? "bg-surface" : "bg-white"}`}
      aria-labelledby={`service-heading-${service.id}`}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${
            imageLeft ? "" : "lg:[&>*:first-child]:order-2"
          }`}
        >
          {/* Media column */}
          <div className="reveal space-y-6">
            <div className="overflow-hidden rounded-2xl shadow-lift aspect-[4/3]">
              <img
                src={getImage(service)}
                alt={`${service.title} support service`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {videoUrl && (
              <div>
                <h3 className="font-display font-semibold text-navy text-lg mb-4 flex items-center gap-2">
                  <span
                    className="w-1 h-5 bg-gold rounded-full inline-block"
                    aria-hidden="true"
                  />
                  Watch &amp; Learn
                </h3>
                <VideoPlayer
                  url={videoUrl}
                  title={`${service.title} — EmpowerAbility video`}
                />
              </div>
            )}
          </div>

          {/* Text column */}
          <div className="reveal reveal-delay-2 flex flex-col justify-start">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Our Service
            </p>
            <h2
              id={`service-heading-${service.id}`}
              className="font-display font-black text-navy gold-line"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
            >
              {service.title}
            </h2>
            <p className="text-muted-foreground font-medium text-lg mt-2 mb-4">
              {service.shortDescription}
            </p>
            <p className="text-foreground leading-relaxed">
              {service.description}
            </p>
            <Link
              to="/services/$id"
              params={{ id: service.id }}
              className="inline-flex items-center gap-2 mt-8 self-start px-7 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-mid shadow-navy transition-all duration-200"
              data-ocid="services.primary_button"
            >
              Full Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { actor, isFetching } = useActor();

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
    document.title = "Our Services | EmpowerAbility";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Explore EmpowerAbility's NDIS support services: Personal Care, Community Participation, Supported Independent Living, and Therapy & Allied Health.",
      );
  }, []);

  return (
    <>
      {/* Page hero */}
      <section
        className="relative pt-40 pb-24 text-white"
        aria-label="Services page hero"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-main.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.22 0.07 175 / 0.93) 0%, oklch(0.22 0.07 175 / 0.70) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h1
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Our Services
          </h1>
          <p className="text-white/75 max-w-xl mt-4 text-lg leading-relaxed">
            Four specialist support programs designed around you — your goals,
            your life, your independence.
          </p>
        </div>
      </section>

      {services.map((svc, i) => (
        <ServiceSection key={svc.id} service={svc} index={i} />
      ))}

      {/* CTA */}
      <section
        className="relative py-24 text-center"
        aria-label="Services call to action"
        style={{
          backgroundImage:
            "url('/assets/generated/services-cta-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.22 0.07 175 / 0.88)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-black text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
          >
            Not Sure Where to Start?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Our team is here to help you navigate your NDIS plan and find the
            right services for your needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-navy font-bold text-sm hover:brightness-105 active:scale-95 shadow-navy transition-all duration-200"
            data-ocid="services.primary_button"
          >
            Get In Touch <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
