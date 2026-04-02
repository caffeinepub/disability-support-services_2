import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "../backend";
import { serviceImages } from "../data/seedServices";

interface Props {
  service: Service;
  index?: number;
}

function getImage(svc: Service): string {
  if (svc.photoUrl) return svc.photoUrl.getDirectURL();
  return (
    serviceImages[svc.id] ??
    "/assets/generated/service-personal-care.dim_800x600.jpg"
  );
}

export default function ServiceCard({ service, index = 0 }: Props) {
  const delayClass = `reveal-delay-${Math.min(index + 1, 4)}`;
  return (
    <article
      className={`reveal ${delayClass} group card-hover bg-white rounded-2xl overflow-hidden shadow-card border border-border flex flex-col`}
    >
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={getImage(service)}
          alt={`${service.title} — EmpowerAbility`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-navy mb-2">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {service.shortDescription}
        </p>
        <Link
          to="/services/$id"
          params={{ id: service.id }}
          className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-gold hover:gap-2.5 transition-all duration-200"
          aria-label={`Learn more about ${service.title}`}
          data-ocid="services.link"
        >
          Learn More <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
