import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Service } from "../backend";
import { seedServices } from "../data/seedServices";
import { useActor } from "../hooks/useActor";
import { useReveal } from "../hooks/useReveal";

const FAQS = [
  {
    q: "What is the NDIS?",
    a: "The National Disability Insurance Scheme (NDIS) is an Australian government program that provides funding for disability support to eligible participants. It's designed to give you choice and control over the supports you access.",
  },
  {
    q: "How do I get started with EmpowerAbility?",
    a: "Simply reach out through our contact form or phone. Our team will arrange a free, no-obligation consultation to discuss your needs, your NDIS plan, and how we can help you achieve your goals.",
  },
  {
    q: "Can I use my NDIS funding with EmpowerAbility?",
    a: "Yes. EmpowerAbility is a fully registered NDIS provider. We work with plan-managed, agency-managed, and self-managed NDIS plans.",
  },
  {
    q: "What areas do you service?",
    a: "We currently operate across New South Wales, Victoria, and Queensland, with new regions opening soon. Contact us to check availability in your area.",
  },
  {
    q: "How quickly can support begin?",
    a: "We aim to commence support within 5–10 business days of completing your service agreement. In urgent situations we often start sooner — contact us to discuss your timeline.",
  },
];

export default function ContactPage() {
  const { actor, isFetching } = useActor();
  const formRef = useReveal();
  const faqRef = useReveal();

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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Contact Us | EmpowerAbility";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Get in touch with EmpowerAbility. Contact our team to discuss your NDIS support needs or book a free consultation.",
      );
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please include a message.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitContact({
          id: crypto.randomUUID(),
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message:
            form.message +
            (form.service ? `\n\nService interest: ${form.service}` : ""),
          timestamp: BigInt(Date.now()),
        });
      }
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch shortly.");
    } catch {
      toast.error(
        "Something went wrong. Please try again or call us directly.",
      );
    }
    setSubmitting(false);
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 text-white"
        aria-label="Contact page hero"
        style={{
          backgroundImage:
            "url('/assets/generated/contact-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.22 0.07 175 / 0.92) 0%, oklch(0.22 0.07 175 / 0.70) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            We'd Love to Hear From You
          </p>
          <h1
            className="font-display font-black"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Get In Touch
          </h1>
          <p className="text-white/75 max-w-lg mt-4 text-lg leading-relaxed">
            Whether you're ready to start, or just exploring your options —
            reach out and we'll guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section
        className="py-20"
        aria-labelledby="contact-form-heading"
        ref={formRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 reveal">
              <h2
                id="contact-form-heading"
                className="font-display font-black text-navy gold-line"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                Send Us a Message
              </h2>

              {submitted ? (
                <div
                  className="mt-8 p-8 bg-gold/10 rounded-2xl border border-gold/30 text-center"
                  aria-live="polite"
                  data-ocid="contact.success_state"
                >
                  <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-navy"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-navy text-xl mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your message has been received. A member of our team will be
                    in touch within 1 business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 space-y-5"
                  data-ocid="contact.modal"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="cf-name"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Full Name{" "}
                        <span aria-hidden="true" className="text-destructive">
                          *
                        </span>
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        aria-required="true"
                        aria-describedby={
                          errors.name ? "cf-name-err" : undefined
                        }
                        data-ocid="contact.input"
                      />
                      {errors.name && (
                        <p
                          id="cf-name-err"
                          role="alert"
                          className="text-destructive text-xs mt-1"
                          data-ocid="contact.error_state"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cf-email"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Email Address{" "}
                        <span aria-hidden="true" className="text-destructive">
                          *
                        </span>
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        aria-required="true"
                        aria-describedby={
                          errors.email ? "cf-email-err" : undefined
                        }
                        data-ocid="contact.input"
                      />
                      {errors.email && (
                        <p
                          id="cf-email-err"
                          role="alert"
                          className="text-destructive text-xs mt-1"
                          data-ocid="contact.error_state"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="cf-phone"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Phone{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="cf-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cf-service"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Service Interest
                      </label>
                      <select
                        id="cf-service"
                        value={form.service}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, service: e.target.value }))
                        }
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-white"
                        data-ocid="contact.select"
                      >
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="General enquiry">General enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cf-message"
                      className="block text-sm font-semibold text-navy mb-1.5"
                    >
                      Your Message{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </label>
                    <textarea
                      id="cf-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Tell us about your situation and how we can help…"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-y"
                      aria-required="true"
                      aria-describedby={
                        errors.message ? "cf-message-err" : undefined
                      }
                      data-ocid="contact.textarea"
                    />
                    {errors.message && (
                      <p
                        id="cf-message-err"
                        role="alert"
                        className="text-destructive text-xs mt-1"
                        data-ocid="contact.error_state"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-navy text-white font-bold text-sm hover:bg-navy-mid shadow-navy transition-all duration-200 active:scale-95 disabled:opacity-60"
                    data-ocid="contact.submit_button"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Info card */}
            <div className="lg:col-span-2 reveal reveal-delay-2">
              <div className="bg-navy rounded-2xl p-8 text-white shadow-navy sticky top-28">
                <h3 className="font-display font-bold text-xl mb-6 text-white">
                  <span className="text-gold">Contact</span> Information
                </h3>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                      <MapPin
                        className="w-4 h-4 text-gold"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="text-white/60 mt-0.5">
                        Level 5, 123 Pitt Street
                        <br />
                        Sydney NSW 2000
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <a
                        href="tel:1800123456"
                        className="text-white/60 hover:text-gold transition-colors mt-0.5 block"
                      >
                        1800 123 456
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <a
                        href="mailto:hello@empowerability.com.au"
                        className="text-white/60 hover:text-gold transition-colors mt-0.5 block"
                      >
                        hello@empowerability.com.au
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Business Hours</p>
                      <p className="text-white/60 mt-0.5">
                        Mon – Fri: 8:30am – 5:30pm
                      </p>
                      <p className="text-white/60">Sat: 9:00am – 1:00pm</p>
                      <p className="text-white/60">
                        24/7 support line available
                      </p>
                    </div>
                  </li>
                </ul>
                <div
                  className="mt-6 rounded-xl overflow-hidden border border-white/10"
                  style={{ height: "160px" }}
                  aria-label="Map showing EmpowerAbility office at Level 5, 123 Pitt Street Sydney NSW"
                >
                  <iframe
                    title="EmpowerAbility office location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8982!2d151.2093!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae665e892fdd%3A0x3133f8d75a1ac251!2sPitt%20St%2C%20Sydney%20NSW%202000!5e0!3m2!1sen!2sau!4v1700000000000"
                    width="100%"
                    height="100%"
                    className="border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20 bg-surface"
        aria-labelledby="faq-heading"
        ref={faqRef}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Common Questions
            </p>
            <h2
              id="faq-heading"
              className="font-display font-black text-navy"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} bg-white rounded-2xl border border-border shadow-card overflow-hidden`}
                data-ocid="contact.panel"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  aria-expanded={openFaq === i}
                  data-ocid="contact.toggle"
                >
                  <span className="font-semibold text-navy text-sm">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
