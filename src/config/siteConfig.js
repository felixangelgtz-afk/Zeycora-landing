export const siteConfig = {
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  whatsappMessage:
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    'Hola Zeycora, quiero hablar con un asesor sobre una solucion empresarial.',
};
