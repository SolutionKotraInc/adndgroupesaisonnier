import { useLanguage } from '@/contexts/LanguageContext';
import { PROJECTS_UPDATED } from './projects-updated';
import { SERVICES, SECTION_LABELS } from './data';

// Fonction pour obtenir un projet traduit
export function useTranslatedProject(project: typeof PROJECTS_UPDATED[0]) {
  const { language } = useLanguage();
  
  return {
    ...project,
    title: language === 'en' ? project.titleEn || project.title : project.title,
    summary: language === 'en' ? project.summaryEn || project.summary : project.summary,
    description: language === 'en' ? project.descriptionEn || project.description : project.description,
    details: {
      ...project.details,
      budget: language === 'en' ? project.details?.budgetEn || project.details?.budget : project.details?.budget,
      duration: language === 'en' ? project.details?.durationEn || project.details?.duration : project.details?.duration,
      materials: language === 'en' ? project.details?.materialsEn || project.details?.materials : project.details?.materials,
      location: language === 'en' ? project.details?.locationEn || project.details?.location : project.details?.location,
    }
  };
}

// Fonction pour obtenir tous les projets traduits
export function useTranslatedProjects() {
  const { language } = useLanguage();
  
  return PROJECTS_UPDATED.map(project => useTranslatedProject(project));
}

// Fonction pour obtenir un service traduit
export function useTranslatedService(service: typeof SERVICES[0]) {
  const { t } = useLanguage();
  
  // Mapping des slugs vers les clés de traduction
  const serviceTranslationMap: Record<string, string> = {
    'tonte-de-pelouse': 'tonte',
    'plates-bandes': 'plates',
    'ouverture-de-terrain': 'ouverture',
    'fermeture-de-terrain': 'fermeture',
    'taille-de-haie': 'haie',
    'fertilisation-essentiel': 'fertilisation.essentiel',
    'fertilisation-plus': 'fertilisation.plus',
    'fertilisation-premium': 'fertilisation.premium',
    'pave-uni': 'pave',
    'pose-de-tourbe': 'tourbe',
    'amenagement-plates-bandes': 'amenagement',
    'excavation': 'excavation',
    'pelletage-trottoirs': 'pelletage.trottoirs',
    'pelletage-escaliers': 'pelletage.escaliers',
  };
  
  const translationKey = serviceTranslationMap[service.slug];
  
  if (!translationKey) {
    return service; // Retourner le service original si pas de traduction
  }
  
  return {
    ...service,
    title: t(`services.${translationKey}.title`),
    excerpt: t(`services.${translationKey}.excerpt`),
    chips: t(`services.${translationKey}.chips`).split(','),
  };
}

// Fonction pour obtenir tous les services traduits
export function useTranslatedServices() {
  return SERVICES.map(service => useTranslatedService(service));
}

// Fonction pour obtenir les labels de catégories traduits
export function useTranslatedSectionLabels() {
  const { t } = useLanguage();
  
  return {
    entretien: t('services.categories.entretien'),
    fertilisation: t('services.categories.fertilisation'),
    amenagement: t('services.categories.amenagement'),
    deneigement: t('services.categories.deneigement'),
  };
}
