// app/components/DesignPerformance.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DesignPerformance() {
  const { t } = useLanguage();
  
  return (
    <section className="relative bg-[#0b2a0f] text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-[12px] md:text-sm tracking-widest text-emerald-300 font-semibold">
          {t('ecodesign.subtitle')}
        </p>

        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
          {t('ecodesign.title')}
        </h2>

        <p className="mt-4 text-base md:text-lg text-white/80 max-w-3xl">
          {t('ecodesign.description')}
        </p>

        {/* Cards */}
        <div className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              title: t('ecodesign.card1.title'),
              desc: t('ecodesign.card1.desc'),
            },
            {
              title: t('ecodesign.card2.title'),
              desc: t('ecodesign.card2.desc'),
            },
            {
              title: t('ecodesign.card3.title'),
              desc: t('ecodesign.card3.desc'),
            },
            {
              title: t('ecodesign.card4.title'),
              desc: t('ecodesign.card4.desc'),
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-white text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/10"
            >
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm md:text-base text-slate-600">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
