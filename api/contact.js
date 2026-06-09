const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'yoquelvis18@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio <contacto@yoquelvis.dev>';

  if (!apiKey) {
    return res.status(500).json({ error: 'server_not_configured' });
  }

  const name = sanitizeText(req.body?.name, MAX_NAME_LENGTH);
  const email = sanitizeText(req.body?.email, 254);
  const message = sanitizeText(req.body?.message, MAX_MESSAGE_LENGTH);

  if (name.length < 2) {
    return res.status(400).json({ error: 'invalid_name' });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: 'invalid_message' });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Contacto portafolio - ${name}`,
        text: [`Nombre: ${name}`, `Email: ${email}`, '', message].join('\n'),
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error('Resend error:', resendResponse.status, errorBody);
      return res.status(502).json({ error: 'email_provider_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'internal_error' });
  }
}
