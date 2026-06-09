import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '../hooks/useContactForm';
import {
  revealContainer,
  revealItem,
  reducedMotionVariant,
  listContainer,
  listItem,
  sectionViewport,
  listViewport,
} from '../lib/motion';

const contactIconMap = {
  phone: 'call',
  teléfono: 'call',
  email: 'mail',
  correo: 'mail',
  website: 'language',
  'sitio web': 'language',
};

const Contact = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const contactItems = t('contact.contactItems', { returnObjects: true });
  const { form, updateField, handleSubmit, status, statusMessage, isSubmitting } = useContactForm();

  return (
    <motion.section
      id="contact"
      className="section-block scroll-mt-28 relative"
      aria-label={t('contact.title')}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-primary-fixed/5"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-container-max px-gutter">
        <motion.div
          className="glass-card rounded-2xl border-primary-fixed/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.08)] md:p-12"
          variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[32px] font-bold leading-tight text-on-surface md:text-[40px]">
                {t('contact.ctaTitle')}
              </h2>
              <p className="mb-8 mt-4 font-body-lg text-body-lg text-on-surface-variant">
                {t('contact.ctaDescription')}
              </p>

              <motion.div
                className="space-y-4"
                variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={listViewport}
              >
                {contactItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-outline hover:bg-white/5"
                    variants={shouldReduceMotion ? reducedMotionVariant : listItem}
                    aria-label={`${item.type}: ${item.text}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline bg-surface text-on-surface transition-colors group-hover:text-primary-fixed">
                      <span className="material-symbols-outlined">
                        {contactIconMap[item.type] || 'contact_mail'}
                      </span>
                    </div>
                    <div>
                      <p className="mb-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {item.type}
                      </p>
                      <p className="font-code-sm text-code-sm text-on-surface transition-colors group-hover:text-primary-fixed">
                        {item.text}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-card border border-outline bg-surface p-8"
            >
              <div className="terminal-dots mb-6" aria-hidden="true">
                <div className="terminal-dot dot-red" />
                <div className="terminal-dot dot-yellow" />
                <div className="terminal-dot dot-green" />
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder={t('contact.form.namePlaceholder')}
                    className="w-full border-0 border-b border-outline bg-transparent px-0 py-2 font-code-sm text-code-sm text-on-surface transition-colors focus:border-primary-fixed focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="w-full border-0 border-b border-outline bg-transparent px-0 py-2 font-code-sm text-code-sm text-on-surface transition-colors focus:border-primary-fixed focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full resize-none border-0 border-b border-outline bg-transparent px-0 py-2 font-code-sm text-code-sm text-on-surface transition-colors focus:border-primary-fixed focus:outline-none focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary mt-4 w-full rounded-full font-bold disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </button>

                {statusMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`font-code-sm text-sm ${
                      status === 'success'
                        ? 'text-primary-fixed'
                        : status === 'error'
                          ? 'text-red-400'
                          : 'text-on-surface-variant'
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
