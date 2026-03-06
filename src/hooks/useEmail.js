import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get these from your EmailJS dashboard after setting up:
// 1. Public Key: Account → General
// 2. Service ID: Email Services → Your Gmail Service
// 3. Template IDs: Email Templates

export const EMAILJS = {
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY', // This is from EmailJS, not your Gmail password
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  CLIENT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE || 'YOUR_CLIENT_TEMPLATE_ID',
  BUSINESS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_BUSINESS_TEMPLATE || 'YOUR_BUSINESS_TEMPLATE_ID',
  BUSINESS_EMAIL: 'ashishvishwakarma95624@gmail.com',
};

// Init once
let _inited = false;
function init() {
  if (_inited || EMAILJS.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') return;
  emailjs.init(EMAILJS.PUBLIC_KEY);
  _inited = true;
}

// Send contact/quote form emails
export async function sendFormEmails({ clientEmail, clientName, templateVars }) {
  init();

  // Not configured yet — succeed silently in dev so the form still works
  if (EMAILJS.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
      EMAILJS.SERVICE_ID === 'YOUR_SERVICE_ID' || 
      EMAILJS.CLIENT_TEMPLATE_ID === 'YOUR_CLIENT_TEMPLATE_ID') {
    console.info('[EmailJS] Not configured yet — email send skipped. Add your credentials to .env file');
    console.info('Form data that would be sent:', { clientEmail, clientName, templateVars });
    return { ok: true, mock: true };
  }

  const clientParams = {
    to_email: clientEmail,
    to_name: clientName,
    from_name: 'Guru Creations',
    reply_to: EMAILJS.BUSINESS_EMAIL,
    ...templateVars,
  };

  const businessParams = {
    to_email: EMAILJS.BUSINESS_EMAIL,
    to_name: 'Guru Creations Team',
    from_name: clientName,
    from_email: clientEmail,
    reply_to: clientEmail,
    ...templateVars,
  };

  try {
    const [clientRes, bizRes] = await Promise.allSettled([
      emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.CLIENT_TEMPLATE_ID, clientParams),
      emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.BUSINESS_TEMPLATE_ID, businessParams),
    ]);

    if (clientRes.status === 'rejected') {
      console.error('[EmailJS] Client email failed:', clientRes.reason);
    }
    if (bizRes.status === 'rejected') {
      console.error('[EmailJS] Business email failed:', bizRes.reason);
    }

    const ok = clientRes.status === 'fulfilled' || bizRes.status === 'fulfilled';
    if (!ok) throw new Error('Both emails failed to send');
    
    return { ok: true, client: clientRes.status, business: bizRes.status };
  } catch (error) {
    console.error('[EmailJS] Error sending emails:', error);
    throw error;
  }
}