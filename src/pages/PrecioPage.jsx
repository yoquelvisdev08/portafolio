import React, { useEffect } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import PageBackground from '../components/PageBackground';
import SiteBrand from '../components/SiteBrand';
import PricingPlanCard from '../components/pricing/PricingPlanCard';
import {
  buildMeetingWhatsAppUrl,
  pricingCta,
  pricingHero,
  pricingPlans,
} from '../data/pricingData';
import { revealContainer, revealItem, reducedMotionVariant } from '../lib/motion';

function PrecioSEO() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Planes y Precios — Desarrollo Web | Yoquelvis Jorge Abreu';

    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta(
      'description',
      'Planes de desarrollo web en República Dominicana: landing pages, sitios corporativos, catálogos, citas online, CRM y e-commerce. Precios transparentes en RD$.',
    );
    setMeta('robots', 'noindex, nofollow');
    document.documentElement.lang = 'es';
    document.documentElement.setAttribute('data-theme', 'blue');

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return null;
}

function PrecioPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <PrecioSEO />
      <div className="relative min-h-screen text-on-surface">
        <PageBackground />

        <header className="page-x relative z-10 mx-auto max-w-container-max pt-10 sm:pt-14">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group flex items-center gap-2 font-headline-md text-lg font-bold text-primary-fixed sm:text-xl"
              aria-label="CREA ENTREGA · portafolio"
            >
              <span className="material-symbols-outlined text-primary-fixed transition-transform group-hover:rotate-12">
                terminal
              </span>
              <span className="hidden sm:inline">
                <SiteBrand />
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="btn-secondary hidden rounded-full px-4 py-2.5 text-xs font-bold sm:inline-flex sm:text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                {pricingCta.knowMoreLabel}
              </Link>
              <a
                href={buildMeetingWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-full px-4 py-2.5 text-xs font-bold sm:px-5 sm:text-sm"
              >
                <FaWhatsapp aria-hidden="true" />
                <span className="hidden sm:inline">Agendar</span>
              </a>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <section className="page-x mx-auto max-w-container-max pb-12 pt-10 sm:pt-14 sm:pb-16">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-fixed/30 bg-primary-fixed/10 px-4 py-2 font-label-caps text-xs text-primary-fixed sm:text-label-caps"
                variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-fixed" />
                {pricingHero.eyebrow}
              </motion.p>

              <motion.h1
                className="font-display text-balance text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
                variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
              >
                {pricingHero.title}
              </motion.h1>

              <motion.p
                className="mx-auto mt-5 max-w-2xl font-body-lg text-base leading-relaxed text-on-surface-variant sm:text-lg"
                variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
              >
                {pricingHero.description}
              </motion.p>

              <motion.ul
                className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-2"
                variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
              >
                {pricingHero.highlights.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-outline bg-surface-container/50 px-4 py-3 text-sm text-on-surface"
                    variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                      verified
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
                variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
              >
                <a
                  href={buildMeetingWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary rounded-full px-8 py-4 text-sm font-bold shadow-[0_0_24px_rgba(195,244,0,0.25)] sm:text-base"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  {pricingCta.primaryLabel}
                </a>
                <Link
                  to="/"
                  className="btn-secondary rounded-full px-8 py-4 text-sm font-bold sm:text-base"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  {pricingCta.knowMoreLabel}
                </Link>
              </motion.div>
            </motion.div>
          </section>

          <section className="page-x mx-auto max-w-container-max pb-12 sm:pb-14">
            <motion.div
              className="glass-card flex flex-col items-center gap-6 rounded-2xl border border-outline p-6 text-center sm:flex-row sm:p-8 sm:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-fixed/30 bg-primary-fixed/10">
                <span className="material-symbols-outlined text-3xl text-primary-fixed">badge</span>
              </div>
              <div className="flex-1">
                <h2 className="font-headline-lg text-xl font-bold text-on-surface sm:text-2xl">
                  ¿Quieres saber quién desarrolla tu proyecto?
                </h2>
                <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
                  {pricingCta.knowMoreDescription}
                </p>
              </div>
              <Link
                to="/"
                className="btn-secondary shrink-0 rounded-full px-6 py-3 font-bold"
              >
                {pricingCta.knowMoreLabel}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </motion.div>
          </section>

          <section
            className="page-x mx-auto max-w-container-max pb-16 sm:pb-20"
            aria-label="Planes de servicios"
          >
            <motion.div
              className="mb-10 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface sm:text-headline-lg">
                Planes y rangos de inversión
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-variant sm:text-base">
                {pricingCta.plansIntro}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {pricingPlans.map((plan, index) => (
                <PricingPlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </motion.div>
          </section>

          <section className="page-x mx-auto max-w-container-max pb-20 sm:pb-24">
            <motion.div
              className="glass-card rounded-2xl border border-primary-fixed/20 p-6 text-center sm:p-10 md:p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              <h2 className="font-display text-2xl font-bold text-on-surface sm:text-3xl">
                {pricingCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-on-surface-variant">{pricingCta.description}</p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={buildMeetingWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full rounded-full px-8 py-4 font-bold sm:w-auto"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  {pricingCta.primaryLabel}
                </a>
                <Link to="/" className="btn-secondary w-full rounded-full px-8 py-4 sm:w-auto">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  {pricingCta.knowMoreLabel}
                </Link>
                <a
                  href={`mailto:${pricingCta.email}?subject=Agendar%20reunión%20—%20desarrollo%20web`}
                  className="btn-secondary w-full rounded-full px-8 py-4 sm:w-auto"
                >
                  <FaEnvelope aria-hidden="true" />
                  {pricingCta.secondaryLabel}
                </a>
              </div>

              <p className="mt-6 font-mono text-xs text-on-surface-variant sm:text-sm">
                República Dominicana · Precios en RD$ · Facturación y contrato según alcance
              </p>
            </motion.div>
          </section>
        </main>

        <footer className="page-x relative z-10 border-t border-outline py-8 text-center">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 font-label-caps text-sm text-primary-fixed transition-opacity hover:opacity-80"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            {pricingCta.knowMoreLabel}
          </Link>
          <p className="font-code-sm text-sm text-on-surface-variant">
            © {new Date().getFullYear()} Yoquelvis Jorge Abreu · Desarrollo de Software
          </p>
        </footer>

        <a
          href={buildMeetingWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          aria-label="Agendar reunión por WhatsApp"
          title="Agendar reunión por WhatsApp"
        >
          <FaWhatsapp size={28} aria-hidden="true" />
        </a>

        <Analytics />
        <SpeedInsights />
      </div>
    </MotionConfig>
  );
}

export default PrecioPage;
