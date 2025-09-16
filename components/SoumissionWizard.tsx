"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  MessageSquare,
  Leaf,
  Bug,
  Scissors,
  Trees,
  Sun,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { SERVICES } from "../lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

/* ----------------------------------------------------------
   Types & initial
---------------------------------------------------------- */
type FormDataT = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  services: string[];
  message: string;
};
const initial: FormDataT = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  services: [],
  message: "",
};

/* ----------------------------------------------------------
   UI helpers
---------------------------------------------------------- */
function Stepper({ step }: { step: number }) {
  const total = 3; // 0: form, 1: review, 2: done
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {Array.from({ length: total }).map((_, i) => {
        const active = i <= step;
        const wide = i === step;
        return (
          <div
            key={i}
            className={`h-1.5 rounded-full ${active ? "bg-emerald-600" : "bg-black/10"}`}
            style={{ width: wide ? 36 : 18 }}
          />
        );
      })}
    </div>
  );
}
function serviceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("tonte")) return <Sun className="h-4 w-4" />;
  if (t.includes("contrôl") || t.includes("mauvaises herbes"))
    return <Bug className="h-4 w-4" />;
  if (t.includes("ouverture")) return <Trees className="h-4 w-4" />;
  if (t.includes("fermeture")) return <Building2 className="h-4 w-4" />;
  if (t.includes("haie")) return <Scissors className="h-4 w-4" />;
  return <Leaf className="h-4 w-4" />;
}

/* ----------------------------------------------------------
   Uploader (prévisualisation locale)
   — L’API enverra les fichiers comme pièces jointes.
---------------------------------------------------------- */
function PhotoUploader({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (f: File[]) => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    const filtered = list.filter((f) => f.size <= 8 * 1024 * 1024); // 8 Mo max
    const next = [...files, ...filtered].slice(0, 10);
    setFiles(next);
  }
  function removeAt(i: number) {
    const next = files.slice();
    next.splice(i, 1);
    setFiles(next);
  }

  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm hover:bg-black/5">
        <input type="file" accept="image/*" multiple hidden onChange={onPick} />
        <span className="rounded-md bg-emerald-600/10 p-1.5 text-emerald-700">
          <ImageIcon className="h-4 w-4" />
        </span>
        <span>Ajouter des photos (max 10, 8&nbsp;Mo)</span>
      </label>

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {previews.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl border border-black/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="aperçu"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-red-600 shadow-sm opacity-0 transition group-hover:opacity-100"
                aria-label="Supprimer la photo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------
   Main
---------------------------------------------------------- */
export default function SoumissionWizard() {
  const { t } = useLanguage();
  const [data, setData] = useState<FormDataT>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);

  const canContinue = data.name.trim() !== "" && data.email.trim() !== "";

  const mailBody = useMemo(() => {
    const fileNames = files.map((f) => f.name);
    return `Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}

Message:
${data.message || "—"}

(Photos: ${fileNames.length ? fileNames.join(", ") : "aucune"})`;
  }, [data, files]);

  async function sendFromSite() {
    try {
      setSending(true);
      const form = new FormData();
      form.append("name", data.name);
      form.append("email", data.email);
      form.append("phone", data.phone);
      form.append("address", data.address);
      form.append("city", data.city);
      form.append("services", JSON.stringify(data.services));
      form.append("message", data.message);
      files.forEach((f) => form.append("photos", f));

      const r = await fetch("/api/soumission", {
        method: "POST",
        body: form,
        cache: "no-store",
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Erreur d’envoi");
      setStep(2);
    } catch (e: any) {
      alert(e?.message || "Erreur d’envoi");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative">
      {/* Background soft gradient (pas d'overflow hidden pour garder le scroll) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <div className="absolute -left-24 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-sky-300/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        {/* Intro Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            {t('quote.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('quote.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>{t('quote.free')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>{t('quote.response')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>{t('quote.detailed')}</span>
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">
            {step === 0 && t('form.personal.info')}
            {step === 1 && t('form.review.submit')}
            {step === 2 && t('form.success')}
          </h2>
          <Stepper step={step} />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Colonne Formulaire */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <AnimatePresence mode="wait">
              {/* Étape 0 : Form */}
              {step === 0 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <p className="text-gray-700">
                    {t('form.description')}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="group relative">
                      <span className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-emerald-600" /> {t('form.email')} *
                      </span>
                      <input
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-emerald-50/30"
                        type="email"
                        placeholder="vous@exemple.com"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </label>

                    <label className="group relative">
                      <span className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-emerald-600 text-white">
                          <span className="text-[10px]">A</span>
                        </span>{" "}
                        {t('form.name')} *
                      </span>
                      <input
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-emerald-50/30"
                        placeholder="Prénom Nom"
                        value={data.name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                    </label>

                    <label className="group relative">
                      <span className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-sky-600" /> {t('form.phone')}
                      </span>
                      <input
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-sky-300 focus:bg-sky-50/30"
                        placeholder="+1 438…"
                        value={data.phone}
                        onChange={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                      />
                    </label>

                    <label className="group relative">
                      <span className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="h-4 w-4 text-purple-600" /> {t('form.city')}
                      </span>
                      <input
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-purple-300 focus:bg-purple-50/30"
                        placeholder="Brossard, Longueuil…"
                        value={data.city}
                        onChange={(e) =>
                          setData({ ...data, city: e.target.value })
                        }
                      />
                    </label>

                    <label className="group relative md:col-span-2">
                      <span className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-rose-600" /> {t('form.address')}
                      </span>
                      <input
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-rose-300 focus:bg-rose-50/30"
                        placeholder="123 Rue …"
                        value={data.address}
                        onChange={(e) =>
                          setData({ ...data, address: e.target.value })
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 text-sm font-medium text-gray-800">
                      {t('form.services.needed')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => {
                        const checked = data.services.includes(s.title);
                        return (
                          <label
                            key={s.slug}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 transition ${
                              checked
                                ? "border-emerald-300 bg-emerald-100 text-emerald-900"
                                : "border-black/10 bg-white hover:bg-black/5"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={checked}
                              onChange={(e) => {
                                const on = e.target.checked;
                                setData((d) => ({
                                  ...d,
                                  services: on
                                    ? [...d.services, s.title]
                                    : d.services.filter((x) => x !== s.title),
                                }));
                              }}
                            />
                            <span className="rounded-md bg-emerald-600/10 p-1.5 text-emerald-700">
                              {serviceIcon(s.title)}
                            </span>
                            <span>{s.title}</span>
                          </label>
                        );
                      })}
                    </div>

                    <label className="mt-4 block">
                      <span className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4 text-gray-600" />{" "}
                        Détaillez votre projet
                      </span>
                      <textarea
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-emerald-50/30"
                        rows={4}
                        placeholder="Dimensions, inspirations, échéancier…"
                        value={data.message}
                        onChange={(e) =>
                          setData({ ...data, message: e.target.value })
                        }
                      />
                    </label>

                    <div className="mt-6">
                      <div className="mb-2 text-sm font-medium text-gray-800">
                        {t('form.upload.photos')}
                      </div>
                      <PhotoUploader files={files} setFiles={setFiles} />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setStep(1)}
                      disabled={!canContinue}
                      className="rounded-full bg-emerald-600 px-5 py-3 font-medium text-white disabled:opacity-50"
                    >
                      {t('form.next')}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Étape 1 : Vérification */}
              {step === 1 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <h3 className="font-semibold">{t('form.review.submit')}</h3>
                  <div className="mt-3 whitespace-pre-line rounded-2xl bg-black/5 p-4 text-sm text-gray-700">
                    {`Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}

Message:
${data.message || "—"}`}
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4">
                      <div className="mb-2 text-sm font-medium text-gray-800">
                        {t('form.upload.photos')}
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {files.map((f, i) => (
                          <div
                            key={i}
                            className="aspect-square overflow-hidden rounded-xl border border-black/10"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={URL.createObjectURL(f)}
                              alt={f.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="rounded-full border border-black/10 px-4 py-2 hover:bg-black/5"
                    >
                      {t('form.previous')}
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(mailBody)}
                      className="rounded-full border border-black/10 px-5 py-3 hover:bg-black/5"
                    >
                      {t('form.copy.message')}
                    </button>
                    <button
                      onClick={sendFromSite}
                      disabled={sending}
                      className="rounded-full bg-emerald-600 px-5 py-3 font-medium text-white disabled:opacity-50"
                    >
                      {t('form.submit')}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Étape 2 : Merci */}
              {step === 2 && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="text-center">
                    <h3 className="mt-2 text-lg font-semibold">
                      {t('form.success')}
                    </h3>
                    <p className="mt-2 text-gray-700">
                      {t('form.success.message')}
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <a
                        href="/soumission"
                        className="rounded-full border border-black/10 px-5 py-3 hover:bg-black/5"
                      >
                        {t('form.new.request')}
                      </a>
                      <a
                        href="/"
                        className="rounded-full bg-emerald-600 px-5 py-3 text-white"
                      >
                        {t('form.back.home')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Colonne droite (galerie de projets) */}
          <div>
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {t('quote.projects.title')}
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {/* Images des 4 projets sélectionnés */}
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/projets/3075 Boul. Mascouche/IMG_0124.jpg"
                    alt="3075 Boul. Mascouche"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    3075 Boul. Mascouche
                  </div>
                </div>
                
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/projets/DKJ Gascon Inc./IMG_0487.jpg"
                    alt="DKJ Gascon Inc."
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    DKJ Gascon Inc.
                  </div>
                </div>
                
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/projets/Plateau de la gare/IMG_0523.jpg"
                    alt="Plateau de la Gare"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    Plateau de la Gare
                  </div>
                </div>
                
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/projets/Station G/IMG_7248.JPG"
                    alt="Station G"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    Station G
                  </div>
                </div>
                
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/projets/3075 Boul. Mascouche/IMG_0125.jpg"
                    alt="3075 Boul. Mascouche"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                </div>
                
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/projets/DKJ Gascon Inc./IMG_0488.jpg"
                    alt="DKJ Gascon Inc."
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <a
                  href="/projets"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  {t('quote.see.all')}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
