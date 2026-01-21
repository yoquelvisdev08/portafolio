import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEOHead = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    // Actualizar lang del HTML
    document.documentElement.lang = currentLang;

    // Meta tags dinámicos según idioma
    const metaTags = {
      en: {
        title: 'Yoquelvis Jorge Abreu - Software Developer | Web Developer | React, Next.js, TypeScript',
        description: 'Software Developer specialized in React, Next.js, TypeScript and full-stack web development. I create innovative and efficient solutions for businesses and startups. Contact me for your next web project.',
        keywords: 'web developer, react developer, next.js developer, typescript developer, full stack developer, software developer, web programmer, freelance developer, web development dominican republic, react dominican republic, next.js dominican republic'
      },
      es: {
        title: 'Yoquelvis Jorge Abreu - Desarrollador de Software | Web Developer | React, Next.js, TypeScript',
        description: 'Desarrollador de Software especializado en React, Next.js, TypeScript y desarrollo web full-stack. Creo soluciones innovadoras y eficientes para empresas y startups. Contáctame para tu próximo proyecto web.',
        keywords: 'desarrollador web, web developer, react developer, next.js developer, typescript developer, full stack developer, desarrollador de software, programador web, freelance developer, desarrollo web dominicana, react dominicana, next.js dominicana'
      }
    };

    const tags = metaTags[currentLang] || metaTags.en;

    // Actualizar título
    document.title = tags.title;

    // Actualizar o crear meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', tags.description);
    updateMetaTag('keywords', tags.keywords);
    updateMetaTag('og:title', tags.title, 'property');
    updateMetaTag('og:description', tags.description, 'property');
    updateMetaTag('twitter:title', tags.title, 'property');
    updateMetaTag('twitter:description', tags.description, 'property');
    updateMetaTag('og:locale', currentLang === 'es' ? 'es_DO' : 'en_US', 'property');

  }, [currentLang]);

  return null;
};

export default SEOHead;
