import { siteConfig } from '../config/siteConfig.js';

let analyticsReady = false;

function inferSolutionType(pathname) {
  const path = pathname || '/';
  if (path.includes('/demos/tickets')) return 'Tickets';
  if (path.includes('/demos/flotilla')) return 'Flotilla';
  if (path.includes('/demos/taller')) return 'Taller';
  if (path.includes('/demos/inventario')) return 'Inventario';
  if (path.includes('/demos/crm')) return 'CRM';
  if (path.includes('/demos/desarrollo')) return 'Desarrollo personalizado';
  if (path.includes('/demos')) return 'Catalogo de demos';
  return 'Landing';
}

function getDefaultEventParams(params = {}) {
  if (typeof window === 'undefined') return params;

  return {
    page_path: window.location.pathname,
    page_title: document.title,
    solution_type: params.solution_type || params.sistema || inferSolutionType(window.location.pathname),
    ...params,
  };
}

export function initAnalytics() {
  if (siteConfig.googleSiteVerification && typeof document !== 'undefined') {
    const existingVerification = document.querySelector('meta[name="google-site-verification"]');
    if (!existingVerification) {
      const verificationMeta = document.createElement('meta');
      verificationMeta.name = 'google-site-verification';
      verificationMeta.content = siteConfig.googleSiteVerification;
      document.head.appendChild(verificationMeta);
    }
  }

  if (!siteConfig.gaMeasurementId || analyticsReady || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', siteConfig.gaMeasurementId);
  analyticsReady = true;
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, getDefaultEventParams(params));
}

export function buildWhatsappUrl() {
  if (!siteConfig.whatsappNumber) return '';
  const message = encodeURIComponent(siteConfig.whatsappMessage);
  const number = siteConfig.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${message}`;
}
