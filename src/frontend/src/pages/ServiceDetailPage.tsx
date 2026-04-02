import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { useEffect } from "react";
import type { Service } from "../backend";
import ServiceCard from "../components/ServiceCard";
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

export default function ServiceDetailPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();
  const ref = useReveal();

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

  const service = services.find((s) => s.id === id);
  const related = services.filter((s) => s.id !== id).slice(0, 3);
  const videoUrl = service ? getVideo(service) : null;

  useEffect(() => {
    if (!service) {
      navigate({ to: "/services" });
      return;
    }
    document.title = `${service.title} | EmpowerAbility`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", service.shortDescription);
  }, [service, navigate]);

  if (!service) return null;

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-28 bg-navy"
        aria-label={`${service.title} hero`}
        style={{
          backgroundImage: `url('${getImage(service)}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.12 0.07 250 / 0.93) 0%, oklch(0.12 0.07 250 / 0.65) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-white/50 text-xs mb-6"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-white/80">{service.title}</span>
          </nav>
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Our Service
          </p>
          <h1
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            {service.title}
          </h1>
          <p className="text-white/75 max-w-lg mt-4 text-lg">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" aria-labelledby="detail-heading" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 reveal">
              <h2
                id="detail-heading"
                className="font-display font-black text-navy gold-line"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                About This Service
              </h2>
              <p className="text-foreground leading-relaxed mt-4 text-lg">
                {service.description}
              </p>

              {videoUrl && (
                <div className="mt-12">
                  <h3 className="font-display font-bold text-navy text-xl mb-5 flex items-center gap-2">
                    <span
                      className="w-1 h-5 bg-gold rounded-full inline-block"
                      aria-hidden="true"
                    />
                    Watch &amp; Learn
                  </h3>
                  <VideoPlayer
                    url={videoUrl}
                    title={`${service.title} — EmpowerAbility video overview`}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="reveal reveal-delay-2">
              <div className="bg-navy rounded-2xl p-8 text-white shadow-navy sticky top-28">
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Ready to Get <span className="text-gold">Started?</span>
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  Book a free, no-obligation consultation and find out how{" "}
                  {service.title} can support your goals.
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold text-navy font-bold text-sm hover:brightness-105 w-full transition-all duration-200 mb-4"
                  data-ocid="services.primary_button"
                >
                  Book a Consultation{" "}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:1800123456"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 w-full transition-all duration-200"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call 1800 123
                  456
                </a>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs">
                    NDIS Registered · All funding types accepted · Free initial
                    consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-surface" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
                Explore More
              </p>
              <h2
                id="related-heading"
                className="font-display font-black text-navy"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                Related Services
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((svc, i) => (
                <ServiceCard key={svc.id} service={svc} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
