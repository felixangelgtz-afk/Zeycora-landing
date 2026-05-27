const requiredFields = ['nombre', 'empresa', 'correo', 'telefono', 'sistema', 'mensaje'];

const json = (body, init = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init.headers ?? {}),
    },
  });

const cleanValue = (value) => String(value ?? '').trim();

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value) =>
  cleanValue(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

async function sendWithResend(payload, env) {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const to = env.CONTACT_TO_EMAIL || 'contacto@zeycora.com';
  const from = env.CONTACT_FROM_EMAIL || 'Zeycora Demos <onboarding@resend.dev>';
  const subject = `Nueva solicitud demo: ${payload.sistema}`;

  const html = `
    <h2>Nueva solicitud de cotizacion</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(payload.nombre)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(payload.empresa)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(payload.correo)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(payload.telefono)}</p>
    <p><strong>Sistema de interes:</strong> ${escapeHtml(payload.sistema)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(payload.mensaje).replaceAll('\n', '<br>')}</p>
    <hr>
    <p>Fuente: demos.zeycora.com / Cloudflare Pages Function</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.correo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${detail}`);
  }

  return response.json();
}

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
      },
    });
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Metodo no permitido.' }, { status: 405 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'El cuerpo de la solicitud no es JSON valido.' }, { status: 400 });
  }

  const payload = {
    nombre: cleanValue(body.nombre),
    empresa: cleanValue(body.empresa),
    correo: cleanValue(body.correo),
    telefono: cleanValue(body.telefono),
    sistema: cleanValue(body.sistema),
    mensaje: cleanValue(body.mensaje),
  };

  const missingFields = requiredFields.filter((field) => !payload[field]);

  if (missingFields.length > 0) {
    return json(
      { ok: false, error: 'Completa todos los campos obligatorios.', missingFields },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.correo)) {
    return json({ ok: false, error: 'Ingresa un correo valido.' }, { status: 400 });
  }

  try {
    const emailResult = await sendWithResend(payload, env);

    const ticketLead = {
      source: 'zeycora-demos',
      type: 'quote_request',
      createdAt: new Date().toISOString(),
      contact: payload,
      emailProvider: 'resend',
      emailId: emailResult.id,
    };

    return json({
      ok: true,
      message: 'Solicitud enviada correctamente.',
      lead: ticketLead,
    });
  } catch (error) {
    console.error(error);
    return json(
      {
        ok: false,
        error: 'No se pudo enviar la solicitud. Intentalo de nuevo o escribe a contacto@zeycora.com.',
      },
      { status: 502 },
    );
  }
}
