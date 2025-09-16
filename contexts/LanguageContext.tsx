"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.team': 'Équipe',
    'nav.testimonials': 'Témoignages',
    'nav.quote': 'Soumission',
    
    // Hero
    'hero.title': 'Aménagement paysager',
    'hero.title.highlight': 'familial',
    'hero.title.end': 'et durable.',
    'hero.subtitle': 'Conception, réalisation et entretien d\'espaces verts où il fait bon se réunir.',
    'hero.services.btn': 'Découvrir nos services',
    'hero.contact.btn': 'Contact',
    
    // Services Hero
    'services.title': 'Nos services',
    'services.subtitle': 'ADND Groupe Saisonnier vous offre des services professionnels d\'entretien et d\'aménagement. Nous nous occupons de vos espaces verts toute l\'année avec expertise et fiabilité.',
           'services.regular': 'Entretien régulier',
           'services.regular.desc': 'Tonte de pelouse, désherbage, taille de haies et entretien complet de vos espaces verts',
           'services.custom': 'Projets personnalisés',
           'services.custom.desc': 'Conception et réalisation de projets d\'aménagement selon vos besoins spécifiques',
           'services.reliable': 'Service fiable',
           'services.reliable.desc': 'Équipe qualifiée, matériel professionnel et satisfaction garantie',
           'services.learn.more': 'En savoir plus',
    
    // Projects
    'projects.3075.title': '3075 Boul. Mascouche',
    'projects.3075.summary': 'Aménagement paysager commercial de grande envergure avec multiples phases de développement.',
    'projects.3075.description': 'Projet commercial majeur incluant l\'aménagement de vastes espaces verts, la création de zones de détente et l\'intégration de végétation native.',
    'projects.dkj.title': 'DKJ Gascon Inc.',
    'projects.dkj.summary': 'Aménagement paysager commercial pour entreprise avec espaces verts professionnels.',
    'projects.dkj.description': 'Projet d\'aménagement paysager commercial incluant la création d\'espaces verts professionnels et l\'intégration de végétation adaptée au milieu d\'affaires.',
    'projects.plateau.title': 'Plateau de la Gare',
    'projects.plateau.summary': 'Aménagement paysager moderne pour un espace d\'habitation chaleureux avec design contemporain.',
    'projects.plateau.description': 'Projet d\'aménagement paysager complet incluant la conception d\'espaces verts, l\'installation de végétation adaptée au climat québécois, et la création d\'un environnement harmonieux entre architecture et nature.',
    'projects.station.title': 'Station G',
    'projects.station.summary': 'Aménagement paysager commercial avec design moderne et fonctionnel.',
    'projects.station.description': 'Projet commercial avec aménagement paysager moderne incluant la création d\'espaces verts fonctionnels et l\'intégration de végétation contemporaine.',
    
    // Project Details
    'projects.details.budget': 'Sur mesure',
    'projects.details.duration': 'Durée',
    'projects.details.materials': 'Matériaux',
    'projects.details.location': 'Lieu',
    'projects.details.year': 'Année',
    'projects.details.weeks': 'semaines',
    
    // Services Categories
    'services.categories.entretien': 'Entretien paysager',
    'services.categories.fertilisation': 'Fertilisation',
    'services.categories.amenagement': 'Aménagement paysager',
    'services.categories.deneigement': 'Déneigement',
    
    // Services
    'services.tonte.title': 'Tonte de pelouse',
    'services.tonte.chips': 'Hebdomadaire,Bordures,Ramassage,Professionnel',
    'services.tonte.excerpt': 'Service de tonte de pelouse professionnel avec finitions impeccables. Nous tondons proprement, faisons les bordures et laissons tout nickel.',
    'services.plates.title': 'Entretien des plates-bandes',
    'services.plates.chips': 'Mauvaises herbes,Paillis',
    'services.plates.excerpt': 'On désherbe, on égalise le paillis et on redonne des contours propres.',
    'services.ouverture.title': 'Ouverture de terrain',
    'services.ouverture.chips': 'Printemps,Ratissage',
    'services.ouverture.excerpt': 'Grand ménage de printemps : ratissage, collecte des débris, préparation.',
    'services.fermeture.title': 'Fermeture de terrain',
    'services.fermeture.chips': 'Hivernisation',
    'services.fermeture.excerpt': 'On prépare le terrain pour l\'hiver et on protège ce qui doit l\'être.',
    'services.haie.title': 'Taille de haie',
    'services.haie.chips': 'Cèdres,Finition propre',
    'services.haie.excerpt': 'Coupe droite, régulière et sans dégâts sur vos plantations.',
    'services.fertilisation.essentiel.title': 'Fertilisation — Essentiel',
    'services.fertilisation.essentiel.chips': '2 visites,Mauvaises herbes légères',
    'services.fertilisation.essentiel.excerpt': 'Programme simple pour verdir rapidement et maintenir une pelouse saine.',
    'services.fertilisation.plus.title': 'Fertilisation — Plus',
    'services.fertilisation.plus.chips': '3 visites,Renforcement',
    'services.fertilisation.plus.excerpt': 'Un suivi plus serré pour une pelouse dense, verte et mieux résistante.',
    'services.fertilisation.premium.title': 'Fertilisation — Premium',
    'services.fertilisation.premium.chips': '4 visites,Densité & couleur',
    'services.fertilisation.premium.excerpt': 'Le plan le plus complet pour une pelouse haut de gamme toute la saison.',
    'services.pave.title': 'Pavé uni',
    'services.pave.chips': 'Entrées,Terrasses,Allées',
    'services.pave.excerpt': 'Conception & pose de pavé uni durable : esthétique, drainage et stabilité.',
    'services.tourbe.title': 'Pose de tourbe',
    'services.tourbe.chips': 'Nivelage,Sol vivant',
    'services.tourbe.excerpt': 'Préparation, nivelage, terre et tourbe fraîche posée serrée.',
    'services.amenagement.title': 'Aménagement de plates-bandes',
    'services.amenagement.chips': 'Design végétal,Paillis,Bordures',
    'services.amenagement.excerpt': 'Création ou refonte de massifs : palette végétale, paillis et bordures.',
    'services.excavation.title': 'Excavation',
    'services.excavation.chips': 'Préparation de site,Drainage',
    'services.excavation.excerpt': 'Excavation de précision pour fondations paysagères, tranchées et nivelage.',
    'services.pelletage.trottoirs.title': 'Pelletage des trottoirs',
    'services.pelletage.trottoirs.chips': 'À la tempête,Saisonnier',
    'services.pelletage.trottoirs.excerpt': 'Pelletage manuel des trottoirs, accès et petits passages en toute sécurité.',
    'services.pelletage.escaliers.title': 'Pelletage des escaliers',
    'services.pelletage.escaliers.chips': 'Sécurité,Sel',
    'services.pelletage.escaliers.excerpt': 'On garde vos escaliers sécuritaires et praticables tout l\'hiver.',
    
    // FAQ
    'faq.title': 'Questions fréquentes',
    'faq.territories': 'Quels sont vos territoires de service?',
    'faq.territories.answer': 'Nous desservons Terrebonne, Mascouche, Lachenaie, Repentigny, Blainville, Laval et les environs.',
    'faq.lawn.cost': 'Combien coûte une tonte de pelouse?',
    'faq.lawn.cost.answer': 'Nos tarifs varient selon la superficie et la fréquence. Contactez-nous pour une estimation gratuite.',
    'faq.seasonal': 'Offrez-vous des contrats d\'entretien saisonnier?',
    'faq.seasonal.answer': 'Oui, nous proposons des forfaits d\'entretien hebdomadaire ou bi-hebdomadaire selon vos besoins.',
    'faq.spring': 'Pouvez-vous faire l\'ouverture de terrain au printemps?',
    'faq.spring.answer': 'Absolument! Nous offrons le service d\'ouverture de terrain avec ratissage et nettoyage complet.',
    'faq.winter': 'Travaillez-vous l\'hiver pour le déneigement?',
    'faq.winter.answer': 'Oui, nous offrons des services de déneigement pour les trottoirs et escaliers.',
    'faq.quote': 'Comment puis-je obtenir une soumission?',
    'faq.quote.answer': 'Remplissez notre formulaire en ligne ou contactez-nous directement par téléphone pour une estimation gratuite.',
    
    // Soumission
    'quote.title': 'Demander une soumission',
    'quote.subtitle': 'Obtenez une estimation personnalisée pour votre projet d\'aménagement paysager. Notre équipe d\'experts vous accompagne de la conception à la réalisation.',
    'quote.free': 'Estimation gratuite',
    'quote.response': 'Réponse sous 24h',
    'quote.detailed': 'Devis détaillé',
    'quote.projects.title': 'Nos réalisations récentes',
    'quote.see.all': 'Voir tous nos projets',
    
           // Testimonials
           'testimonials.title': 'Ce que disent nos clients',
           'testimonials.subtitle': 'Découvrez les témoignages de nos clients satisfaits',
           'testimonials.1.quote': 'Travail impeccable et d\'une propreté rare. L\'équipe a respecté les délais malgré la météo – on recommande à 100%.',
           'testimonials.1.role': 'Longueuil',
           'testimonials.2.quote': 'Communication claire, conseils avisés et rendu final au-dessus des attentes. Super expérience du début à la fin.',
           'testimonials.2.role': 'Brossard',
           'testimonials.3.quote': 'Service client A1. Ils ont transformé notre cour en un espace chaleureux et facile à entretenir.',
           'testimonials.3.role': 'Saint-Lambert',
           'testimonials.4.quote': 'Exécution très professionnelle. Le suivi après-projet fait toute la différence. Merci!',
           'testimonials.4.role': 'La Prairie',
           'testimonials.5.quote': 'De la conception à l\'entretien, tout est fluide. On sent la rigueur et la passion.',
           'testimonials.5.role': 'Candiac',
           'testimonials.6.quote': 'Prix justes, équipe ponctuelle, résultat durable. On les rappellera pour la phase 2.',
           'testimonials.6.role': 'Boucherville',
    
    // Form
    'form.step': 'Étape',
    'form.of': 'sur',
    'form.personal.info': 'Informations personnelles',
    'form.contact.info': 'Informations de contact',
    'form.address.info': 'Adresse du projet',
    'form.services.needed': 'Services souhaités',
    'form.additional.info': 'Informations supplémentaires',
    'form.review.submit': 'Révision et soumission',
    'form.success': 'Soumission envoyée!',
    'form.name': 'Nom complet',
    'form.email': 'Adresse courriel',
    'form.phone': 'Numéro de téléphone',
    'form.address': 'Adresse',
    'form.city': 'Ville',
    'form.message': 'Message (optionnel)',
    'form.next': 'Suivant',
    'form.previous': 'Précédent',
    'form.submit': 'Envoyer la soumission',
           'form.upload.photos': 'Télécharger des photos',
           'form.upload.desc': 'Ajoutez des photos de votre projet (optionnel)',
           'form.required': 'Champ obligatoire',
           'form.invalid.email': 'Adresse courriel invalide',
           'form.invalid.phone': 'Numéro de téléphone invalide',
           'form.description': 'Laissez-nous quelques infos — on revient rapidement avec une proposition claire.',
           'form.copy.message': 'Copier le message',
           'form.success.message': 'Nous vous répondrons rapidement.',
           'form.new.request': 'Refaire une demande',
           'form.back.home': 'Retour à l\'accueil',
           
           // Bloom Section
           'bloom.title': 'Faites fleurir',
           'bloom.your': 'votre',
           'bloom.outdoor': 'extérieur',
           'bloom.description': 'On conçoit des cours conviviales et durables. Des matériaux choisis, un entretien simple et un design pensé pour la famille. Faites pousser un lieu de vie qui vous ressemble.',
           'bloom.discover.services': 'Découvrir nos services',
           'bloom.request.quote': 'Demander une soumission',
           
           // EcoDesign Section
           'ecodesign.subtitle': 'DESIGN & PERFORMANCE ÉCOLOGIQUE',
           'ecodesign.title': 'Beau, pratique, durable',
           'ecodesign.description': 'Nous créons des aménagements extérieurs fonctionnels et esthétiques. Chez ADND, nous combinons durabilité, efficacité et confort pour offrir des espaces agréables à vivre, simples à entretenir et adaptés à vos besoins.',
           'ecodesign.card1.title': 'Entretien optimisé',
           'ecodesign.card1.desc': 'Services de tonte, taille et nettoyage réguliers.',
           'ecodesign.card2.title': 'Contrôles & entretien',
           'ecodesign.card2.desc': 'Plus de désherbage, plates-bandes nettes.',
           'ecodesign.card3.title': 'Ouverture & fermeture',
           'ecodesign.card3.desc': 'On prépare et protège votre terrain chaque saison.',
           'ecodesign.card4.title': 'Taillage de haies',
           'ecodesign.card4.desc': 'Haies propres, esthétiques et bien entretenues.',
           
           // Parallax Section
           'parallax.alt': 'Jardin contemporain',
           
           // Socials Bar
           'socials.title': 'Suivez nos projets en direct',
           
           // QuickDock
           'quickdock.home': 'Accueil',
           
           // Team Section
           'team.subtitle': 'Notre équipe',
           'team.title': 'Humains avant tout',
           'team.description': 'Une équipe conviviale, experte et fière de créer des lieux de vie familiaux.',
           'team.nathan.role': 'Fondateur & PDG',
           'team.nathan.bio': '20 ans d\'expérience en aménagement résidentiel et commercial.',
           'team.alexis.role': 'Architecte paysagiste',
           'team.alexis.bio': 'Design 3D, sélections de plantes, écoresponsabilité.',
           'team.team.role': 'Notre équipe complète',
           'team.team.bio': 'Une équipe passionnée et experte qui transforme vos espaces extérieurs.',
           
           // Footer
           'footer.description': 'Aménagement paysager durable pour résidences et entreprises — qualité, propreté et respect des délais, saison après saison.',
           'footer.request.quote': 'Demander une soumission',
           'footer.write.email': 'Écrire un courriel',
           'footer.sections.title': 'Sections',
           'footer.sections.projects': 'Réalisations',
           'footer.contact.title': 'Nous joindre',
           'footer.contact.location': 'Rive-Nord de Montréal, QC',
           'footer.availability.title': 'Disponibilités',
           'footer.availability.description': 'Réponse sous 24–48 h (jours ouvrables)',
           'footer.copyright': 'Tous droits réservés',
           'footer.built.by': 'Construit et imaginé par',
           
           // Growth Story (1.2.3 section)
           'growth.step1.title': 'le plan',
           'growth.step1.desc': 'On écoute vos besoins, on mesure l\'espace et on récolte vos inspirations.',
           'growth.step2.title': 'la pousse',
           'growth.step2.desc': 'On conçoit en 3D, on choisit les matériaux et on organise le chantier.',
           'growth.step3.title': 'le jardin',
           'growth.step3.desc': 'On réalise, plante et éclaire. Puis on vous remet un plan d\'entretien simple.',
  },
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.team': 'Team',
    'nav.testimonials': 'Testimonials',
    'nav.quote': 'Quote',
    
    // Hero
    'hero.title': 'Landscaping',
    'hero.title.highlight': 'family-friendly',
    'hero.title.end': 'and sustainable.',
    'hero.subtitle': 'Design, implementation and maintenance of green spaces where it\'s good to gather.',
    'hero.services.btn': 'Discover our services',
    'hero.contact.btn': 'Contact',
    
    // Services Hero
    'services.title': 'Our Services',
    'services.subtitle': 'ADND Groupe Saisonnier offers professional maintenance and landscaping services. We take care of your green spaces year-round with expertise and reliability.',
           'services.regular': 'Regular Maintenance',
           'services.regular.desc': 'Lawn mowing, weeding, hedge trimming and complete maintenance of your green spaces',
           'services.custom': 'Custom Projects',
           'services.custom.desc': 'Design and implementation of landscaping projects according to your specific needs',
           'services.reliable': 'Reliable Service',
           'services.reliable.desc': 'Qualified team, professional equipment and guaranteed satisfaction',
           'services.learn.more': 'Learn more',
    
    // Projects
    'projects.3075.title': '3075 Boul. Mascouche',
    'projects.3075.summary': 'Large-scale commercial landscaping with multiple development phases.',
    'projects.3075.description': 'Major commercial project including the development of vast green spaces, creation of relaxation areas and integration of native vegetation.',
    'projects.dkj.title': 'DKJ Gascon Inc.',
    'projects.dkj.summary': 'Commercial landscaping for business with professional green spaces.',
    'projects.dkj.description': 'Commercial landscaping project including the creation of professional green spaces and integration of vegetation adapted to the business environment.',
    'projects.plateau.title': 'Plateau de la Gare',
    'projects.plateau.summary': 'Modern landscaping for a warm residential space with contemporary design.',
    'projects.plateau.description': 'Complete landscaping project including the design of green spaces, installation of vegetation adapted to the Quebec climate, and creation of a harmonious environment between architecture and nature.',
    'projects.station.title': 'Station G',
    'projects.station.summary': 'Commercial landscaping with modern and functional design.',
    'projects.station.description': 'Commercial project with modern landscaping including the creation of functional green spaces and integration of contemporary vegetation.',
    
    // Project Details
    'projects.details.budget': 'Custom',
    'projects.details.duration': 'Duration',
    'projects.details.materials': 'Materials',
    'projects.details.location': 'Location',
    'projects.details.year': 'Year',
    'projects.details.weeks': 'weeks',
    
    // Services Categories
    'services.categories.entretien': 'Landscape Maintenance',
    'services.categories.fertilisation': 'Fertilization',
    'services.categories.amenagement': 'Landscaping',
    'services.categories.deneigement': 'Snow Removal',
    
    // Services
    'services.tonte.title': 'Lawn Mowing',
    'services.tonte.chips': 'Weekly,Edging,Cleanup,Professional',
    'services.tonte.excerpt': 'Professional lawn mowing service with impeccable finishes. We mow cleanly, do the edging and leave everything spotless.',
    'services.plates.title': 'Flower Bed Maintenance',
    'services.plates.chips': 'Weeds,Mulch',
    'services.plates.excerpt': 'We weed, level the mulch and restore clean contours.',
    'services.ouverture.title': 'Spring Cleanup',
    'services.ouverture.chips': 'Spring,Raking',
    'services.ouverture.excerpt': 'Spring cleaning: raking, debris collection, preparation.',
    'services.fermeture.title': 'Fall Cleanup',
    'services.fermeture.chips': 'Winterization',
    'services.fermeture.excerpt': 'We prepare the land for winter and protect what needs to be protected.',
    'services.haie.title': 'Hedge Trimming',
    'services.haie.chips': 'Cedars,Clean finish',
    'services.haie.excerpt': 'Straight, regular cut without damage to your plantings.',
    'services.fertilisation.essentiel.title': 'Fertilization — Essential',
    'services.fertilisation.essentiel.chips': '2 visits,Light weeds',
    'services.fertilisation.essentiel.excerpt': 'Simple program to green quickly and maintain a healthy lawn.',
    'services.fertilisation.plus.title': 'Fertilization — Plus',
    'services.fertilisation.plus.chips': '3 visits,Strengthening',
    'services.fertilisation.plus.excerpt': 'Tighter follow-up for a dense, green and more resistant lawn.',
    'services.fertilisation.premium.title': 'Fertilization — Premium',
    'services.fertilisation.premium.chips': '4 visits,Density & color',
    'services.fertilisation.premium.excerpt': 'The most complete plan for a high-end lawn all season.',
    'services.pave.title': 'Interlocking Pavers',
    'services.pave.chips': 'Driveways,Patios,Walkways',
    'services.pave.excerpt': 'Design & installation of durable interlocking pavers: aesthetic, drainage and stability.',
    'services.tourbe.title': 'Sod Installation',
    'services.tourbe.chips': 'Leveling,Living soil',
    'services.tourbe.excerpt': 'Preparation, leveling, soil and fresh sod installed tight.',
    'services.amenagement.title': 'Flower Bed Design',
    'services.amenagement.chips': 'Plant design,Mulch,Borders',
    'services.amenagement.excerpt': 'Creation or redesign of flower beds: plant palette, mulch and borders.',
    'services.excavation.title': 'Excavation',
    'services.excavation.chips': 'Site preparation,Drainage',
    'services.excavation.excerpt': 'Precision excavation for landscape foundations, trenches and leveling.',
    'services.pelletage.trottoirs.title': 'Sidewalk Shoveling',
    'services.pelletage.trottoirs.chips': 'Per storm,Seasonal',
    'services.pelletage.trottoirs.excerpt': 'Manual shoveling of sidewalks, access and small passages safely.',
    'services.pelletage.escaliers.title': 'Stair Shoveling',
    'services.pelletage.escaliers.chips': 'Safety,Salt',
    'services.pelletage.escaliers.excerpt': 'We keep your stairs safe and passable all winter.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.territories': 'What are your service territories?',
    'faq.territories.answer': 'We serve Terrebonne, Mascouche, Lachenaie, Repentigny, Blainville, Laval and surrounding areas.',
    'faq.lawn.cost': 'How much does lawn mowing cost?',
    'faq.lawn.cost.answer': 'Our rates vary according to area and frequency. Contact us for a free estimate.',
    'faq.seasonal': 'Do you offer seasonal maintenance contracts?',
    'faq.seasonal.answer': 'Yes, we offer weekly or bi-weekly maintenance packages according to your needs.',
    'faq.spring': 'Can you do spring yard cleanup?',
    'faq.spring.answer': 'Absolutely! We offer spring yard cleanup service with raking and complete cleaning.',
    'faq.winter': 'Do you work in winter for snow removal?',
    'faq.winter.answer': 'Yes, we offer snow removal services for sidewalks and stairs.',
    'faq.quote': 'How can I get a quote?',
    'faq.quote.answer': 'Fill out our online form or contact us directly by phone for a free estimate.',
    
    // Soumission
    'quote.title': 'Request a Quote',
    'quote.subtitle': 'Get a personalized estimate for your landscaping project. Our team of experts accompanies you from design to completion.',
    'quote.free': 'Free estimate',
    'quote.response': 'Response within 24h',
    'quote.detailed': 'Detailed quote',
    'quote.projects.title': 'Our Recent Work',
    'quote.see.all': 'See all our projects',
    
           // Testimonials
           'testimonials.title': 'What our clients say',
           'testimonials.subtitle': 'Discover testimonials from our satisfied clients',
           'testimonials.1.quote': 'Impeccable work and rare cleanliness. The team respected deadlines despite the weather – we recommend 100%.',
           'testimonials.1.role': 'Longueuil',
           'testimonials.2.quote': 'Clear communication, wise advice and final result above expectations. Great experience from start to finish.',
           'testimonials.2.role': 'Brossard',
           'testimonials.3.quote': 'A1 customer service. They transformed our yard into a warm and easy-to-maintain space.',
           'testimonials.3.role': 'Saint-Lambert',
           'testimonials.4.quote': 'Very professional execution. Post-project follow-up makes all the difference. Thank you!',
           'testimonials.4.role': 'La Prairie',
           'testimonials.5.quote': 'From design to maintenance, everything is smooth. You can feel the rigor and passion.',
           'testimonials.5.role': 'Candiac',
           'testimonials.6.quote': 'Fair prices, punctual team, lasting result. We will call them back for phase 2.',
           'testimonials.6.role': 'Boucherville',
    
    // Form
    'form.step': 'Step',
    'form.of': 'of',
    'form.personal.info': 'Personal information',
    'form.contact.info': 'Contact information',
    'form.address.info': 'Project address',
    'form.services.needed': 'Services needed',
    'form.additional.info': 'Additional information',
    'form.review.submit': 'Review and submit',
    'form.success': 'Submission sent!',
    'form.name': 'Full name',
    'form.email': 'Email address',
    'form.phone': 'Phone number',
    'form.address': 'Address',
    'form.city': 'City',
    'form.message': 'Message (optional)',
    'form.next': 'Next',
    'form.previous': 'Previous',
    'form.submit': 'Send submission',
           'form.upload.photos': 'Upload photos',
           'form.upload.desc': 'Add photos of your project (optional)',
           'form.required': 'Required field',
           'form.invalid.email': 'Invalid email address',
           'form.invalid.phone': 'Invalid phone number',
           'form.description': 'Leave us some info — we\'ll get back to you quickly with a clear proposal.',
           'form.copy.message': 'Copy message',
           'form.success.message': 'We will respond quickly.',
           'form.new.request': 'Make a new request',
           'form.back.home': 'Back to home',
           
           // Bloom Section
           'bloom.title': 'Make your',
           'bloom.your': 'outdoor',
           'bloom.outdoor': 'space bloom',
           'bloom.description': 'We design welcoming and sustainable outdoor spaces. Carefully chosen materials, simple maintenance and family-friendly design. Grow a living space that reflects you.',
           'bloom.discover.services': 'Discover our services',
           'bloom.request.quote': 'Request a quote',
           
           // EcoDesign Section
           'ecodesign.subtitle': 'ECOLOGICAL DESIGN & PERFORMANCE',
           'ecodesign.title': 'Beautiful, practical, sustainable',
           'ecodesign.description': 'We create functional and aesthetic outdoor layouts. At ADND, we combine sustainability, efficiency and comfort to offer pleasant living spaces, easy to maintain and adapted to your needs.',
           'ecodesign.card1.title': 'Optimized maintenance',
           'ecodesign.card1.desc': 'Regular mowing, pruning and cleaning services.',
           'ecodesign.card2.title': 'Controls & maintenance',
           'ecodesign.card2.desc': 'No more weeding, clean flower beds.',
           'ecodesign.card3.title': 'Opening & closing',
           'ecodesign.card3.desc': 'We prepare and protect your land each season.',
           'ecodesign.card4.title': 'Hedge trimming',
           'ecodesign.card4.desc': 'Clean, aesthetic and well-maintained hedges.',
           
           // Parallax Section
           'parallax.alt': 'Contemporary garden',
           
           // Socials Bar
           'socials.title': 'Follow our projects live',
           
           // QuickDock
           'quickdock.home': 'Home',
           
           // Team Section
           'team.subtitle': 'Our team',
           'team.title': 'Humans first',
           'team.description': 'A friendly, expert team proud to create family living spaces.',
           'team.nathan.role': 'Founder & CEO',
           'team.nathan.bio': '20 years of experience in residential and commercial landscaping.',
           'team.alexis.role': 'Landscape architect',
           'team.alexis.bio': '3D design, plant selection, eco-responsibility.',
           'team.team.role': 'Our complete team',
           'team.team.bio': 'A passionate and expert team that transforms your outdoor spaces.',
           
           // Footer
           'footer.description': 'Sustainable landscaping for residences and businesses — quality, cleanliness and respect for deadlines, season after season.',
           'footer.request.quote': 'Request a quote',
           'footer.write.email': 'Write an email',
           'footer.sections.title': 'Sections',
           'footer.sections.projects': 'Projects',
           'footer.contact.title': 'Contact us',
           'footer.contact.location': 'North Shore of Montreal, QC',
           'footer.availability.title': 'Availability',
           'footer.availability.description': 'Response within 24–48 h (business days)',
           'footer.copyright': 'All rights reserved',
           'footer.built.by': 'Built and designed by',
           
           // Growth Story (1.2.3 section)
           'growth.step1.title': 'the plan',
           'growth.step1.desc': 'We listen to your needs, measure the space and collect your inspirations.',
           'growth.step2.title': 'the growth',
           'growth.step2.desc': 'We design in 3D, choose materials and organize the construction site.',
           'growth.step3.title': 'the garden',
           'growth.step3.desc': 'We build, plant and light. Then we give you a simple maintenance plan.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr'); // Default to French
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load language from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const langTranslations = translations[language];
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default useLanguage;
