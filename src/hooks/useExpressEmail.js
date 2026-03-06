export async function sendFormEmails({ clientEmail, clientName, templateVars }) {
  console.log('📤 Sending email request to backend...');
  console.log('Data:', { clientEmail, clientName, templateVars });

  try {
    const response = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        phone: templateVars.from_phone,
        subject: templateVars.subject,
        message: templateVars.message,
      }),
    });

    const data = await response.json();
    console.log('📨 Server response:', data);

    if (!response.ok) {
      throw new Error(data.error || data.details || 'Failed to send email');
    }

    return { ok: true, data };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}