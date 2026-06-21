export const SITE_URL = 'https://yoquelvis.dev';
export const SITE_ORIGIN = SITE_URL.replace(/\/$/, '');

export const SEO_PROFILE = {
  name: 'Yoquelvis Jorge Abreu',
  email: 'yoquelvis18@gmail.com',
  phone: '+18294223313',
  image: `${SITE_ORIGIN}/me.JPG`,
  twitter: '@yoquelvis_08',
  country: 'DO',
  region: 'DO-01',
  placename: 'Santo Domingo, Dominican Republic',
};

export const SEO_BY_LANGUAGE = {
  es: {
    title:
      'Yoquelvis Jorge Abreu | Desarrollador Web Full Stack en República Dominicana · React & Next.js',
    description:
      'Portafolio de Yoquelvis Jorge Abreu: desarrollador web y de software en RD. Creo landing pages, sitios corporativos y apps con React, Next.js, TypeScript y Node.js. Código listo para producción, UX clara y entregas serias. Escríbeme para tu próximo proyecto.',
    keywords:
      'desarrollador web republica dominicana, desarrollador react santo domingo, next.js developer RD, typescript developer, full stack developer dominicana, freelance desarrollador web, portafolio desarrollador software, crear pagina web RD, desarrollo web profesional, programador react nextjs, landing page dominicana, desarrollador frontend backend, yoquelvis jorge abreu',
    ogLocale: 'es_DO',
    siteName: 'Yoquelvis Jorge Abreu · Desarrollador Web',
    brandTagline: 'Código que llega a producción',
  },
  en: {
    title:
      'Yoquelvis Jorge Abreu | Full Stack Web Developer in Dominican Republic · React & Next.js',
    description:
      'Portfolio of Yoquelvis Jorge Abreu, software and web developer based in the Dominican Republic. I build landing pages, business websites, and apps with React, Next.js, TypeScript, and Node.js. Production-ready code, clear UX, and reliable delivery. Contact me for your next project.',
    keywords:
      'web developer dominican republic, react developer santo domingo, next.js developer DR, typescript developer, full stack developer, freelance web developer, software developer portfolio, hire react developer, professional web development, frontend backend developer, landing page developer, yoquelvis jorge abreu',
    ogLocale: 'en_US',
    siteName: 'Yoquelvis Jorge Abreu · Web Developer',
    brandTagline: 'Code built for production',
  },
};

export function getSeoContent(language) {
  return SEO_BY_LANGUAGE[language] || SEO_BY_LANGUAGE.en;
}

export function buildCanonicalUrl(language) {
  const lang = language === 'es' ? 'es' : 'en';
  return `${SITE_ORIGIN}/?lang=${lang}`;
}

export function buildStructuredData(language) {
  const seo = getSeoContent(language);
  const isSpanish = language === 'es';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Person', 'ProfilePage'],
        name: SEO_PROFILE.name,
        jobTitle: isSpanish ? 'Desarrollador de Software' : 'Software Developer',
        url: SITE_ORIGIN,
        image: SEO_PROFILE.image,
        description: seo.description,
        email: SEO_PROFILE.email,
        telephone: SEO_PROFILE.phone,
        sameAs: [
          'https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/',
          'https://github.com/yoquelvisdev08',
          'https://www.instagram.com/yoquelvis_08',
        ],
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
        name: seo.siteName,
        url: SITE_ORIGIN,
        description: seo.description,
        inLanguage: ['es', 'en'],
        publisher: {
          '@type': 'Person',
          name: SEO_PROFILE.name,
        },
        author: {
          '@type': 'Person',
          name: SEO_PROFILE.name,
        },
      },
      {
        '@type': 'ProfessionalService',
        name: isSpanish
          ? 'Desarrollo Web y Software · Yoquelvis Jorge Abreu'
          : 'Web & Software Development · Yoquelvis Jorge Abreu',
        description: seo.description,
        url: SITE_ORIGIN,
        image: SEO_PROFILE.image,
        provider: {
          '@type': 'Person',
          name: SEO_PROFILE.name,
        },
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
