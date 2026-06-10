import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { buildMeetingWhatsAppUrl, pricingCta } from '../../data/pricingData';
import { revealItem, reducedMotionVariant } from '../../lib/motion';

function PricingPlanCard({ plan, index }) {
  const shouldReduceMotion = useReducedMotion();
  const whatsappHref = buildMeetingWhatsAppUrl(plan.title);

  return (
    <motion.article
      className="pricing-card glass-card flex h-full flex-col rounded-2xl border border-outline p-5 sm:p-6 lg:p-8"
      variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary-fixed/30 bg-primary-fixed/10 text-primary-fixed">
            <span className="material-symbols-outlined text-[26px]">{plan.icon}</span>
          </div>
          <h2 className="font-display text-xl font-bold leading-tight text-on-surface sm:text-2xl">
            {plan.title}
          </h2>
        </div>
      </div>

      <p className="mb-6 font-mono text-lg font-semibold text-primary-fixed sm:text-xl">{plan.price}</p>

      <div className="mb-6">
        <p className="mb-3 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
          Ideal para
        </p>
        <ul className="flex flex-wrap gap-2">
          {plan.idealFor.map((item) => (
            <li
              key={item}
              className="rounded-full border border-outline bg-surface-container px-3 py-1 font-code-sm text-xs text-on-surface-variant"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex-1">
        <p className="mb-3 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
          Incluye
        </p>
        <ul className="space-y-2">
          {plan.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-on-surface sm:text-base">
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-primary-fixed">
                check_circle
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.benefit && (
        <div className="mb-6 rounded-xl border border-primary-fixed/25 bg-primary-fixed/5 p-4">
          <p className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-primary-fixed">
            Beneficio clave
          </p>
          <p className="text-sm leading-relaxed text-on-surface sm:text-base">{plan.benefit}</p>
        </div>
      )}

      <div className="mb-6 border-t border-outline pt-5">
        <p className="mb-3 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
          Extras
        </p>
        <ul className="space-y-1.5">
          {plan.extras.map((item) => (
            <li key={item} className="font-code-sm text-xs text-on-surface-variant sm:text-sm">
              + {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-auto w-full justify-center rounded-full py-3.5 font-bold"
      >
        <FaWhatsapp className="text-lg" aria-hidden="true" />
        {pricingCta.planButtonLabel}
      </a>
    </motion.article>
  );
}

export default PricingPlanCard;
