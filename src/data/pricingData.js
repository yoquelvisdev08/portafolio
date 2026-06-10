export const WHATSAPP_AGENDAR = 'https://wa.link/rozl9z';

export function buildMeetingWhatsAppUrl(planTitle = null) {
  const message = planTitle
    ? `Hola Yoquelvis, me interesa el plan "${planTitle}". Me gustaría agendar una reunión para conocernos, entender mi proyecto y luego recibir una cotización a medida.`
    : 'Hola Yoquelvis, vi tus planes de desarrollo web. Me gustaría agendar una reunión para conocernos y ver qué solución encaja con mi negocio antes de cotizar.';

  return `https://wa.me/18294223313?text=${encodeURIComponent(message)}`;
}

export const pricingHero = {
  eyebrow: 'Desarrollo web profesional',
  title: 'Soluciones digitales que convierten visitas en clientes',
  description:
    'Primero nos conocemos, entendemos tu negocio y luego definimos la solución y la inversión. Sin presión: una reunión clara para ver si encajamos.',
  highlights: [
    'Reunión inicial para conocernos',
    'Cotización después de entender tu alcance',
    'Diseño responsive y UX con criterio',
    'Entrega lista para producción',
  ],
};

export const pricingPlans = [
  {
    id: 'landing',
    title: 'Landing Page',
    price: 'RD$10,000 – RD$25,000',
    icon: 'web',
    idealFor: [
      'Campañas publicitarias',
      'Captación de leads',
      'Lanzamiento de productos',
      'Servicios profesionales',
    ],
    includes: [
      'Diseño UX/UI',
      'Desarrollo responsive',
      'Formulario de contacto',
      'Integración con WhatsApp',
      'SEO básico',
      'Integración con Analytics',
    ],
    benefit: null,
    extras: [
      'Dominio (según extensión)',
      'Hosting (RD$300 – RD$800/mes)',
      'Mantenimiento (RD$1,000/mes)',
    ],
  },
  {
    id: 'corporate',
    title: 'Página Corporativa',
    price: 'RD$20,000 – RD$50,000',
    icon: 'business',
    idealFor: ['Empresas', 'Consultoras', 'Abogados', 'Constructoras', 'Agencias'],
    includes: [
      'Inicio',
      'Nosotros',
      'Servicios',
      'Contacto',
      'Blog opcional',
      'CMS básico',
      'Formularios',
      'WhatsApp',
      'SEO básico',
    ],
    benefit: null,
    extras: [
      'Hosting: RD$500 – RD$1,500/mes',
      'Mantenimiento: RD$1,500 – RD$3,000/mes',
    ],
  },
  {
    id: 'catalog',
    title: 'Catálogo de Productos',
    price: 'RD$25,000 – RD$60,000',
    icon: 'inventory_2',
    idealFor: ['Tiendas', 'Dealers', 'Ferreterías', 'Distribuidores'],
    includes: [
      'Panel administrativo',
      'Gestión de productos',
      'Categorías',
      'Buscador',
      'Filtros',
      'Galería de imágenes',
      'Formulario de cotización',
      'WhatsApp',
    ],
    benefit:
      'Permite mostrar cientos de productos sin necesidad de responder las mismas preguntas una y otra vez.',
    extras: [
      'Hosting: RD$800 – RD$1,500/mes',
      'Mantenimiento: RD$2,000 – RD$4,000/mes',
    ],
  },
  {
    id: 'appointments',
    title: 'Sistema de Citas',
    price: 'RD$30,000 – RD$80,000',
    icon: 'calendar_month',
    idealFor: [
      'Médicos',
      'Dentistas',
      'Salones',
      'Barberías',
      'Gimnasios',
      'Consultores',
    ],
    includes: [
      'Agenda online',
      'Selección de fecha y hora',
      'Gestión de disponibilidad',
      'Panel administrativo',
      'Correos automáticos',
      'Recordatorios',
    ],
    benefit: 'Reduce llamadas, evita citas perdidas y permite recibir reservas 24/7.',
    extras: [
      'Hosting: RD$800 – RD$2,000/mes',
      'Mantenimiento: RD$3,000 – RD$5,000/mes',
    ],
  },
  {
    id: 'crm',
    title: 'CRM Básico',
    price: 'RD$60,000 – RD$150,000',
    icon: 'hub',
    idealFor: ['Equipos de ventas', 'Inmobiliarias', 'Agencias', 'Empresas de servicios'],
    includes: [
      'Gestión de clientes',
      'Pipeline de ventas',
      'Seguimiento de leads',
      'Notificaciones',
      'Dashboard',
      'Reportes',
    ],
    benefit: 'Ningún cliente potencial se pierde por falta de seguimiento.',
    extras: [
      'Hosting: RD$1,500 – RD$4,000/mes',
      'Mantenimiento: RD$5,000 – RD$10,000/mes',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    price: 'RD$45,000 – RD$150,000+',
    icon: 'shopping_cart',
    idealFor: ['Tiendas online', 'Marcas propias', 'Distribuidores'],
    includes: [
      'Catálogo',
      'Carrito',
      'Checkout',
      'Gestión de pedidos',
      'Gestión de inventario',
      'Pasarela de pago',
      'Panel administrativo',
    ],
    benefit: null,
    extras: [
      'Hosting: RD$1,500 – RD$5,000/mes',
      'Mantenimiento: RD$3,000 – RD$10,000/mes',
    ],
  },
];

export const pricingCta = {
  title: '¿Hablamos en una reunión?',
  description:
    'Agendamos una llamada o videollamada breve para conocernos, aclarar dudas y entender qué necesitas. Después de eso te envío una cotización concreta y sin sorpresas.',
  primaryLabel: 'Agendar reunión por WhatsApp',
  planButtonLabel: 'Agendar reunión',
  secondaryLabel: 'Enviar correo',
  knowMoreLabel: 'Conoce más sobre mí',
  knowMoreDescription:
    'Revisa mi portafolio, experiencia y proyectos reales antes de la reunión. Así llegas con contexto y aprovechamos mejor el tiempo.',
  email: 'yoquelvis18@gmail.com',
  plansIntro:
    'Los rangos son orientativos. La cotización final la definimos juntos en reunión, según alcance, integraciones y plazos.',
};
