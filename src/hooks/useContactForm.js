import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const INITIAL_FORM = { name: '', email: '', message: '' };

export function useContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const updateField = useCallback((field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') {
      setStatus('idle');
    }
  }, [status]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      setForm(INITIAL_FORM);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, [form]);

  const statusMessage =
    status === 'submitting'
      ? t('contact.form.submitting')
      : status === 'success'
        ? t('contact.form.success')
        : status === 'error'
          ? t('contact.form.error')
          : '';

  return {
    form,
    updateField,
    handleSubmit,
    status,
    statusMessage,
    isSubmitting: status === 'submitting',
  };
}
