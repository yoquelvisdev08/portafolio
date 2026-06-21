import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SITE_ORIGIN,
  SEO_PROFILE,
  buildCanonicalUrl,
  buildStructuredData,
  getSeoContent,
} from '../data/seoData';

const STRUCTURED_DATA_ID = 'portfolio-structured-data';

function SEOHead() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'es' ? 'es' : 'en';
  const seo = getSeoContent(currentLang);
  const canonicalUrl = buildCanonicalUrl(currentLang);

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.title = seo.title;

    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel, href, extra = {}) => {
      let element = document.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
      Object.entries(extra).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    };

    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('title', seo.title);
    updateMetaTag('geo.region', SEO_PROFILE.region);
    updateMetaTag('geo.placename', SEO_PROFILE.placename);
    updateMetaTag('og:title', seo.title, 'property');
    updateMetaTag('og:description', seo.description, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:site_name', seo.siteName, 'property');
    updateMetaTag('og:locale', seo.ogLocale, 'property');
    updateMetaTag('og:locale:alternate', currentLang === 'es' ? 'en_US' : 'es_DO', 'property');
    updateMetaTag('twitter:title', seo.title, 'property');
    updateMetaTag('twitter:description', seo.description, 'property');

    updateLinkTag('canonical', canonicalUrl);

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => {
      node.remove();
    });

    [
      { lang: 'es', href: buildCanonicalUrl('es') },
      { lang: 'en', href: buildCanonicalUrl('en') },
      { lang: 'x-default', href: `${SITE_ORIGIN}/` },
    ].forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });

    let structuredDataNode = document.getElementById(STRUCTURED_DATA_ID);
    if (!structuredDataNode) {
      structuredDataNode = document.createElement('script');
      structuredDataNode.id = STRUCTURED_DATA_ID;
      structuredDataNode.type = 'application/ld+json';
      document.head.appendChild(structuredDataNode);
    }
    structuredDataNode.textContent = JSON.stringify(buildStructuredData(currentLang));
  }, [canonicalUrl, currentLang, seo.description, seo.keywords, seo.ogLocale, seo.siteName, seo.title]);

  return null;
}

export default SEOHead;
