"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

type Section = { title: string; points: string[] };

function Step({
  n,
  hRef,
  pRef,
  defaultTitle,
  defaultDesc,
  delayBase = 0.08,
}: {
  n: 1 | 2 | 3;
  hRef: React.RefObject<HTMLHeadingElement> | null;
  pRef: React.RefObject<HTMLParagraphElement> | null;
  defaultTitle: string;
  defaultDesc: string;
  delayBase?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, {
    amount: 0.5,
    margin: "0px 0px -20% 0px",
    once: false,
  });

  return (
    <div className="md:pl-24">
      <div ref={wrapRef} className="relative pl-6 md:pl-8">
        <motion.div
          aria-hidden
          className="absolute left-[14px] top-0 bottom-0 w-px md:left-[18px]
                     bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent"
          style={{ originY: 0 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: inView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="flex items-start gap-4">
          <motion.span
            aria-hidden
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                       ring-1 text-emerald-400 font-semibold"
            initial={{
              backgroundColor: "rgba(16,185,129,0.10)",
              borderColor: "rgba(16,185,129,0.30)",
              scale: 0.96,
            }}
            animate={
              inView
                ? {
                    backgroundColor: "rgb(16,185,129)",
                    color: "rgb(255,255,255)",
                    scale: 1,
                    boxShadow: "0 6px 20px rgba(16,185,129,0.35)",
                  }
                : {
                    backgroundColor: "rgba(16,185,129,0.10)",
                    color: "rgb(52,211,153)",
                    scale: 0.96,
                    boxShadow: "0 0 0 rgba(0,0,0,0)",
                  }
            }
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ borderColor: "rgba(16,185,129,0.30)" }}
          >
            {n}
          </motion.span>

          <div>
            <Reveal delay={delayBase}>
              <h3
                ref={hRef || undefined}
                className={`text-3xl md:text-5xl font-semibold ${n === 1 ? "text-gray-900" : n === 2 ? "text-gray-700" : "text-gray-600"}`}
              >
                {defaultTitle}
              </h3>
            </Reveal>

            <motion.span
              className="mt-2 block h-[3px] w-12 rounded-full bg-gradient-to-r from-emerald-400/80 to-emerald-400/20"
              style={{ originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            />

            <Reveal delay={delayBase + 0.08}>
              <p ref={pRef || undefined} className="mt-3 text-gray-700 max-w-2xl">
                {defaultDesc}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GrowthStory() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bg = useTransform(scrollYProgress, [0, 1], ["#F0FDF4", "#010000"]);
  const { t } = useLanguage();

  return (
    <section ref={ref} className="relative">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: bg }}
      />

      <div className="space-y-[30vh] md:space-y-[60vh] py-24">
        <Step
          n={1}
          hRef={null}
          pRef={null}
          defaultTitle={t('growth.step1.title')}
          defaultDesc={t('growth.step1.desc')}
        />
        <Step
          n={2}
          hRef={null}
          pRef={null}
          defaultTitle={t('growth.step2.title')}
          defaultDesc={t('growth.step2.desc')}
        />
        <Step
          n={3}
          hRef={null}
          pRef={null}
          defaultTitle={t('growth.step3.title')}
          defaultDesc={t('growth.step3.desc')}
        />
      </div>
    </section>
  );
}
