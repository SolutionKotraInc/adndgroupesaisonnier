"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ITEMS = [
  { qKey: "faq.territories", aKey: "faq.territories.answer" },
  { qKey: "faq.lawn.cost", aKey: "faq.lawn.cost.answer" },
  { qKey: "faq.seasonal", aKey: "faq.seasonal.answer" },
  { qKey: "faq.spring", aKey: "faq.spring.answer" },
  { qKey: "faq.winter", aKey: "faq.winter.answer" },
  { qKey: "faq.quote", aKey: "faq.quote.answer" },
];

export default function FAQ(){
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-[#F7FBF7]">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">{t('faq.title')}</h2>
        <div className="mt-6 space-y-3">
          {ITEMS.map((it, i) => {
            const o = open === i;
            return (
              <div key={i} className="rounded-2xl border border-black/10 bg-white">
                <button onClick={()=> setOpen(o ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                  <span className="font-medium">{t(it.qKey)}</span>
                  <span className="text-2xl leading-none">{o ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {o && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4 text-gray-700"
                    >
                      {t(it.aKey)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
