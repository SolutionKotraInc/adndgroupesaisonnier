"use client";

// components/Testimonials.tsx
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Testimonial = {
  quoteKey: string;
  name: string;
  roleKey: string;
  rating?: number; // 1..5
};

const TESTIMONIALS: Testimonial[] = [
  {
    quoteKey: "testimonials.1.quote",
    name: "Ariane Dubois",
    roleKey: "testimonials.1.role",
    rating: 5,
  },
  {
    quoteKey: "testimonials.2.quote",
    name: "Jules Caron",
    roleKey: "testimonials.2.role",
    rating: 5,
  },
  {
    quoteKey: "testimonials.3.quote",
    name: "Maya Tremblay",
    roleKey: "testimonials.3.role",
    rating: 5,
  },
  {
    quoteKey: "testimonials.4.quote",
    name: "Olivier Gagnon",
    roleKey: "testimonials.4.role",
    rating: 5,
  },
  {
    quoteKey: "testimonials.5.quote",
    name: "Sophie Roy",
    roleKey: "testimonials.5.role",
    rating: 5,
  },
  {
    quoteKey: "testimonials.6.quote",
    name: "Karim B.",
    roleKey: "testimonials.6.role",
    rating: 5,
  },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${filled ? "text-amber-500" : "text-slate-300"}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M10 15.27l-5.18 3.05 1.4-5.98L1 7.97l6.09-.52L10 1.5l2.91 5.95 6.09.52-5.22 4.37 1.4 5.98z"
      />
    </svg>
  );
}

export default function Testimonials() {
  const { t: translate } = useLanguage();
  
  // on duplique la liste pour un défilement sans couture (200% de largeur)
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="temoignages" className="relative mx-auto max-w-7xl px-6 py-24">
      {/* fond doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      </div>

      <header className="mb-10 text-center">
        <p className="text-sm font-medium tracking-widest text-emerald-700">
          {translate('testimonials.title').toUpperCase()}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          {translate('testimonials.subtitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Quality, cleanliness, respect for deadlines and careful follow-up — our
          promise, validated in the field.
        </p>
      </header>

      {/* ruban texte (CSS marquee) */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 py-3">
        <div className="marquee text-sm text-slate-600">
          <span>Qualité · Propreté · Fiabilité · Respect des délais ·</span>
          <span>Tonte · Contrôles · Ouverture · Fermeture · Haies ·</span>
          <span>Service client A1 · Communication claire ·</span>

          {/* duplication pour boucle */}
          <span aria-hidden>
            Qualité · Propreté · Fiabilité · Respect des délais ·
          </span>
          <span aria-hidden>
            Tonte · Contrôles · Ouverture · Fermeture · Haies ·
          </span>
          <span aria-hidden>Service client A1 · Communication claire ·</span>
        </div>
      </div>

      {/* slider de cartes (CSS marquee-cards) */}
      <div className="marquee-cards">
        <ul className="marquee-track">
        {track.map((testimonial, i) => (
          <li
            key={i}
            className="card-glass soft-shadow w-[320px] shrink-0 rounded-2xl border border-white/60 p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white ${
                  [
                    "bg-emerald-600",
                    "bg-sky-600",
                    "bg-rose-600",
                    "bg-amber-600",
                    "bg-violet-600",
                    "bg-teal-600",
                  ][i % 6]
                }`}
              >
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="font-medium text-slate-900">{testimonial.name}</div>
                <div className="text-xs text-slate-500">{translate(testimonial.roleKey)}</div>
              </div>
            </div>

            <p className="mt-4 text-slate-700">"{translate(testimonial.quoteKey)}"</p>

              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} filled={k < (testimonial.rating ?? 5)} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA secondaire */}
      <div className="mt-12 text-center">
        <a
          href="/soumission"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Mail className="h-4 w-4" />
          Demander une soumission
        </a>
      </div>
    </section>
  );
}
