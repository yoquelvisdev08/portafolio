export const SITE_URL = 'https://yoquelvis.dev';
export const SITE_ORIGIN = SITE_URL.replace(/\/$/, '');

export const SEO_PROFILE = {
  name: 'Yoquelvis Jorge Abreu',
  shortName: 'Yoquelvis',
  email: 'yoquelvis18@gmail.com',
  phone: '+18294223313',
  image: `${SITE_ORIGIN}/og-image.png`,
  profileImage: `${SITE_ORIGIN}/me.JPG`,
  twitter: '@yoquelvis_08',
  country: 'DO',
  region: 'DO-01',
  placename: 'Santo Domingo, Dominican Republic',
  sameAs: [
    'https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/',
    'https://github.com/yoquelvisdev08',
    'https://www.instagram.com/yoquelvis_08',
  ],
};

export const SEO_BY_LANGUAGE = {
  es: {
    title: 'Yoquelvis Jorge Abreu | Software Engineer · React & Next.js',
    description:
      'Desarrollador web full stack en RD. React, Next.js, TypeScript y Node.js. Landing pages, apps y código listo para producción. Contáctame en yoquelvis.dev.',
    keywords:
      'desarrollador web republica dominicana, desarrollador react santo domingo, next.js developer RD, typescript developer, full stack developer dominicana, freelance desarrollador web, portafolio desarrollador software, crear pagina web RD, desarrollo web profesional, programador react nextjs, landing page dominicana, desarrollador frontend backend, yoquelvis jorge abreu',
    ogLocale: 'es_DO',
    siteName: 'Yoquelvis Jorge Abreu · Software Engineer',
    brandTagline: 'Código que llega a producción',
    jobTitle: 'Software Engineer',
  },
  en: {
    title: 'Yoquelvis Jorge Abreu | Software Engineer · React & Next.js',
    description:
      'Full stack web developer in the Dominican Republic. React, Next.js, TypeScript and Node.js. Landing pages, apps and production-ready code. Contact me at yoquelvis.dev.',
    keywords:
      'web developer dominican republic, react developer santo domingo, next.js developer DR, typescript developer, full stack developer, freelance web developer, software developer portfolio, hire react developer, professional web development, frontend backend developer, landing page developer, yoquelvis jorge abreu',
    ogLocale: 'en_US',
    siteName: 'Yoquelvis Jorge Abreu · Software Engineer',
    brandTagline: 'Code built for production',
    jobTitle: 'Software Engineer',
  },
};

export function getSeoContent(language) {
  return SEO_BY_LANGUAGE[language] || SEO_BY_LANGUAGE.en;
}

export function buildCanonicalUrl(language) {
  if (language === 'es' || language === 'en') {
    return `${SITE_ORIGIN}/?lang=${language}`;
  }
  return `${SITE_ORIGIN}/`;
}

export function buildStructuredData(language) {
  const seo = getSeoContent(language);
  const isSpanish = language === 'es';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_ORIGIN}/#person`,
        name: SEO_PROFILE.name,
        alternateName: SEO_PROFILE.shortName,
        jobTitle: seo.jobTitle,
        url: SITE_ORIGIN,
        image: SEO_PROFILE.profileImage,
        description: seo.description,
        email: SEO_PROFILE.email,
        telephone: SEO_PROFILE.phone,
        sameAs: SEO_PROFILE.sameAs,
        address: {
          '@type': 'PostalAddress',
          addressCountry: SEO_PROFILE.country,
          addressRegion: isSpanish ? 'Distrito Nacional' : 'National District',
          addressLocality: 'Santo Domingo',
        },
        nationality: {
          '@type': 'Country',
          name: isSpanish ? 'República Dominicana' : 'Dominican Republic',
        },
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Tailwind CSS',
          'Python',
          'SQL',
          'Web Development',
          'Full Stack Development',
          'UI/UX',
        ],
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Universidad APEC',
          },
          {
            '@type': 'EducationalOrganization',
            name: 'Instituto Tecnológico de las Américas (ITLA)',
          },
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'S22',
          parentOrganization: {
            '@type': 'Organization',
            name: 'All Media',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: seo.siteName,
        url: SITE_ORIGIN,
        description: seo.description,
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${SITE_ORIGIN}/#person` },
        author: { '@id': `${SITE_ORIGIN}/#person` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_ORIGIN}/#service`,
        name: isSpanish
          ? 'Desarrollo Web y Software · Yoquelvis Jorge Abreu'
          : 'Web & Software Development · Yoquelvis Jorge Abreu',
        description: seo.description,
        url: SITE_ORIGIN,
        image: SEO_PROFILE.image,
        provider: { '@id': `${SITE_ORIGIN}/#person` },
        areaServed: [
          {
            '@type': 'Country',
            name: isSpanish ? 'República Dominicana' : 'Dominican Republic',
          },
          {
            '@type': 'Place',
            name: 'Remote',
          },
        ],
        serviceType: [
          'Web Development',
          'Frontend Development',
          'Backend Development',
          'Full Stack Development',
          'React Development',
          'Next.js Development',
          'Landing Page Development',
        ],
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: `${SITE_ORIGIN}/#contact`,
        },
      },
    ],
  };
}
