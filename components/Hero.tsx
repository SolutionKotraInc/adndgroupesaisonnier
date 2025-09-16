"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  // subtle parallax on the heading
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const k = 0.03; // parallax intensity
    const onMove = (e: MouseEvent) => {
      x.set((e.clientX - window.innerWidth / 2) * -k);
      y.set((e.clientY - window.innerHeight / 2) * -k);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <section className="relative  z-50 overflow-hidden">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/GARE_1.JPG"
          alt="Aménagement paysager professionnel ADND Groupe Saisonnier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {/* soft white scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:py-36">
        <motion.h1
          style={{ x: springX, y: springY }}
          className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl text-gray-900"
        >
          {t('hero.title')} <span className="text-brand-700">{t('hero.title.highlight')}</span>{" "}
          {t('hero.title.end')}
        </motion.h1>

        <p className="mt-6 max-w-2xl text-gray-700">
          {t('hero.subtitle')}
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/services"
            className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium"
          >
            {t('hero.services.btn')}
          </a>
          <a
            href="/soumission"
            className="px-5 py-3 rounded-full border border-gray-300 bg-white/80 backdrop-blur"
          >
            {t('hero.contact.btn')}
          </a>
        </div>
      </div>
    </section>
  );
}
