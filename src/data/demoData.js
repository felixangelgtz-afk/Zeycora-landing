export const demoSystems = [
  {
    slug: 'tickets',
    icon: 'ST',
    name: 'Gestion de Servicios Tecnicos',
    shortDescription: 'Tickets, tecnicos, garantias, evidencias y satisfaccion en una sola plataforma.',
    description:
      'Controle servicios de campo, instalaciones, garantias, evidencia fotografica, firmas y reportes operativos.',
    benefits: ['Asignacion de tecnicos', 'Evidencias y firmas', 'Indicadores operativos'],
    status: 'Disponible',
  },
  {
    slug: 'taller',
    icon: 'TW',
    name: 'Control de Taller',
    shortDescription: 'Ordenes de trabajo, vehiculos, tecnicos, refacciones y productividad.',
    description:
      'Visualice el avance del taller, los vehiculos en proceso, refacciones pendientes e ingresos estimados.',
    benefits: ['Ordenes de trabajo', 'Control de refacciones', 'Productividad tecnica'],
    status: 'Disponible',
  },
  {
    slug: 'flotilla',
    icon: 'FL',
    name: 'Control de Flotilla',
    shortDescription: 'Vehiculos, operadores, mantenimientos, documentacion y alertas.',
    description:
      'Controle disponibilidad, mantenimientos, consumo, documentacion y alertas de una flotilla operativa.',
    benefits: ['Mantenimientos', 'Alertas operativas', 'Disponibilidad'],
    status: 'Disponible',
  },
  {
    slug: 'inventario',
    icon: 'IN',
    name: 'Inventario',
    shortDescription: 'Productos, entradas, salidas, stock critico y valor de inventario.',
    description:
      'Administre existencias, movimientos, categorias, reportes y alertas de stock con visibilidad ejecutiva.',
    benefits: ['Stock critico', 'Movimientos', 'Reportes'],
    status: 'Disponible',
  },
  {
    slug: 'crm',
    icon: 'CR',
    name: 'CRM de Clientes',
    shortDescription: 'Clientes, prospectos, oportunidades, cotizaciones y actividades.',
    description:
      'Organice seguimiento comercial, oportunidades, cotizaciones, historial y actividades pendientes.',
    benefits: ['Pipeline comercial', 'Seguimiento', 'Cotizaciones'],
    status: 'Disponible',
  },
  {
    slug: 'desarrollo',
    icon: 'DM',
    name: 'Desarrollo a Medida',
    shortDescription: 'Apps, sistemas web, dashboards, automatizaciones e integraciones.',
    description:
      'Soluciones personalizadas para empresas que necesitan flujos, integraciones o plataformas especificas.',
    benefits: ['Apps moviles', 'Sistemas web', 'Automatizaciones'],
    status: 'Disponible',
  },
];

export const ticketBenefits = [
  'Asignacion de tecnicos',
  'Evidencia fotografica',
  'Firmas digitales',
  'Encuestas de satisfaccion',
  'Reportes PDF',
  'Garantias',
  'Historial de servicios',
  'Indicadores operativos',
];

export const ticketKpis = [
  { label: 'Tickets abiertos', value: '26', hint: '+6 esta semana', tone: 'red' },
  { label: 'Tickets cerrados', value: '148', hint: 'Ultimos 30 dias', tone: 'green' },
  { label: 'Tickets en proceso', value: '12', hint: '4 prioridad alta', tone: 'orange' },
  { label: 'Garantias abiertas', value: '9', hint: '3 en revision', tone: 'red' },
  { label: 'Garantias incompletas', value: '4', hint: 'Requieren evidencia', tone: 'dark' },
  { label: 'Satisfaccion del cliente', value: '94%', hint: 'Promedio mensual', tone: 'green' },
  { label: 'Tickets atrasados', value: '3', hint: 'Atencion inmediata', tone: 'red' },
  { label: 'Tiempo promedio de atencion', value: '3.4 h', hint: '-18% vs mes anterior', tone: 'dark' },
];

export const demoTickets = [
  {
    folio: 'ST-2048',
    cliente: 'Cliente Demo Norte',
    servicio: 'Instalacion de alineadora',
    tecnico: 'Ana Lopez',
    estado: 'En proceso',
    prioridad: 'Alta',
    fecha: '27 May 2026',
    ubicacion: 'Monterrey, NL',
    descripcion:
      'Instalacion, configuracion inicial, checklist de seguridad y evidencia de entrega en sitio.',
    evidencias: ['Panel instalado', 'Conexion validada', 'Checklist firmado'],
    firma: 'Firma digital recibida',
    encuesta: 'Pendiente',
    historial: ['Ticket creado', 'Tecnico asignado', 'Visita iniciada', 'Evidencia cargada'],
  },
  {
    folio: 'ST-2047',
    cliente: 'Cliente Demo Bajio',
    servicio: 'Actualizacion de software',
    tecnico: 'Marco Ruiz',
    estado: 'Programado',
    prioridad: 'Media',
    fecha: '28 May 2026',
    ubicacion: 'Queretaro, QRO',
    descripcion: 'Actualizacion remota asistida, validacion de licencia y prueba funcional.',
    evidencias: ['Version validada', 'Respaldo generado'],
    firma: 'No requerida',
    encuesta: 'Sin enviar',
    historial: ['Solicitud recibida', 'Ventana de servicio confirmada'],
  },
  {
    folio: 'ST-2046',
    cliente: 'Cliente Demo Centro',
    servicio: 'Diagnostico de elevador',
    tecnico: 'Sofia Perez',
    estado: 'En diagnostico',
    prioridad: 'Alta',
    fecha: '26 May 2026',
    ubicacion: 'CDMX',
    descripcion: 'Revision electrica, diagnostico de falla intermitente y propuesta de refaccion.',
    evidencias: ['Tablero electrico', 'Lectura de voltaje', 'Reporte tecnico'],
    firma: 'Pendiente',
    encuesta: 'Pendiente',
    historial: ['Ticket creado', 'Tecnico en sitio', 'Diagnostico en curso'],
  },
  {
    folio: 'ST-2045',
    cliente: 'Cliente Demo Industrial',
    servicio: 'Calibracion ADAS',
    tecnico: 'David Torres',
    estado: 'Cerrado',
    prioridad: 'Baja',
    fecha: '25 May 2026',
    ubicacion: 'Saltillo, COA',
    descripcion: 'Calibracion, evidencia de parametros y cierre con firma digital.',
    evidencias: ['Equipo calibrado', 'Parametros aprobados'],
    firma: 'Firma digital recibida',
    encuesta: '5/5',
    historial: ['Servicio iniciado', 'Calibracion completada', 'Cliente firmo', 'Ticket cerrado'],
  },
  {
    folio: 'ST-2044',
    cliente: 'Cliente Demo Occidente',
    servicio: 'Mantenimiento preventivo',
    tecnico: 'Ana Lopez',
    estado: 'Atrasado',
    prioridad: 'Critica',
    fecha: '24 May 2026',
    ubicacion: 'Guadalajara, JAL',
    descripcion: 'Mantenimiento preventivo pendiente por autorizacion de acceso a planta.',
    evidencias: ['Orden de visita', 'Solicitud de acceso'],
    firma: 'Pendiente',
    encuesta: 'Sin enviar',
    historial: ['Ticket creado', 'Acceso pendiente', 'Escalamiento enviado'],
  },
  {
    folio: 'ST-2043',
    cliente: 'Cliente Demo Sureste',
    servicio: 'Configuracion de red',
    tecnico: 'Sofia Perez',
    estado: 'Revision',
    prioridad: 'Media',
    fecha: '23 May 2026',
    ubicacion: 'Merida, YUC',
    descripcion: 'Configuracion de conectividad, pruebas de enlace y validacion con usuario final.',
    evidencias: ['Prueba de enlace', 'Configuracion aplicada'],
    firma: 'Pendiente',
    encuesta: 'Pendiente',
    historial: ['Ticket creado', 'Configuracion aplicada', 'Revision de supervisor'],
  },
];

export const ticketCharts = {
  monthly: [
    { label: 'Ene', value: 34 },
    { label: 'Feb', value: 42 },
    { label: 'Mar', value: 38 },
    { label: 'Abr', value: 57 },
    { label: 'May', value: 64 },
    { label: 'Jun', value: 49 },
  ],
  technicians: [
    { label: 'Ana', value: 78 },
    { label: 'Marco', value: 62 },
    { label: 'Sofia', value: 70 },
    { label: 'David', value: 51 },
  ],
  satisfaction: [
    { label: 'Muy satisfecho', value: 72 },
    { label: 'Satisfecho', value: 18 },
    { label: 'Neutral', value: 7 },
    { label: 'Requiere seguimiento', value: 3 },
  ],
  status: [
    { label: 'Abiertos', value: 26 },
    { label: 'Proceso', value: 12 },
    { label: 'Revision', value: 7 },
    { label: 'Cerrados', value: 48 },
  ],
};

export const warranties = [
  { label: 'Garantias abiertas', value: '9', hint: '3 esperando refaccion' },
  { label: 'Garantias cerradas', value: '31', hint: 'Ultimos 30 dias' },
  { label: 'Garantias pendientes', value: '6', hint: 'Revision tecnica' },
  { label: 'Garantias incompletas', value: '4', hint: 'Falta evidencia' },
];

export const satisfaction = {
  metrics: [
    { label: 'Calificacion promedio', value: '4.8/5', hint: 'Encuestas verificadas' },
    { label: 'Encuestas respondidas', value: '126', hint: 'Ultimos 30 dias' },
    { label: 'Tendencia mensual', value: '+9%', hint: 'Mejora continua' },
  ],
  comments: [
    'El tecnico llego dentro de la ventana acordada.',
    'La evidencia del servicio fue clara para autorizacion interna.',
    'El seguimiento posterior ayudo a cerrar la incidencia rapido.',
  ],
};

export const demoUsers = [
  { role: 'Administradores', count: 3, names: 'Direccion, Operaciones, Finanzas' },
  { role: 'Supervisores', count: 5, names: 'Zona Norte, Zona Centro, Calidad' },
  { role: 'Tecnicos', count: 18, names: 'Campo, instalaciones, soporte remoto' },
];

export const kits = [
  { name: 'Kit Alineacion Pro', part: 'KP-ALN-220', installed: 18, history: 'Ultima instalacion: 24 May' },
  { name: 'Kit Diagnostico ADAS', part: 'KP-ADS-410', installed: 9, history: 'Revision programada: 30 May' },
  { name: 'Kit Elevacion Taller', part: 'KP-ELV-118', installed: 14, history: 'Garantia activa en 2 equipos' },
];

export const dashboards = {
  taller: {
    title: 'Control de Taller',
    subtitle: 'Dashboard operativo para clientes, vehiculos, ordenes de trabajo, tecnicos y refacciones.',
    modules: ['Clientes', 'Vehiculos', 'Ordenes de trabajo', 'Tecnicos', 'Refacciones'],
    ctaSystem: 'Control de Taller',
    kpis: [
      { label: 'Vehiculos en proceso', value: '18', hint: '6 en diagnostico' },
      { label: 'Ordenes abiertas', value: '31', hint: '12 alta prioridad' },
      { label: 'Ordenes terminadas', value: '86', hint: 'Este mes' },
      { label: 'Refacciones pendientes', value: '14', hint: 'Compras activas' },
      { label: 'Ingresos estimados', value: '$482k', hint: 'Pipeline mensual' },
    ],
    rows: [
      ['OT-5841', 'SUV demo', 'Diagnostico electrico', 'En proceso'],
      ['OT-5838', 'Sedan demo', 'Servicio mayor', 'Refaccion pendiente'],
      ['OT-5831', 'Pickup demo', 'Revision final', 'Listo para entrega'],
    ],
  },
  flotilla: {
    title: 'Control de Flotilla',
    subtitle: 'Visibilidad de vehiculos, operadores, mantenimientos, documentacion y alertas.',
    modules: ['Vehiculos', 'Operadores', 'Mantenimientos', 'Documentacion', 'Alertas'],
    ctaSystem: 'Control de Flotilla',
    kpis: [
      { label: 'Vehiculos activos', value: '42', hint: '93% disponibles' },
      { label: 'En mantenimiento', value: '5', hint: '2 correctivos' },
      { label: 'Proximos servicios', value: '11', hint: '7 dias' },
      { label: 'Alertas', value: '8', hint: 'Documentos y km' },
      { label: 'Consumo combustible', value: '12.8k L', hint: 'Mes actual' },
    ],
    rows: [
      ['UN-018', 'Operador demo A', 'En ruta', 'Documentacion vigente'],
      ['UN-021', 'Operador demo B', 'Disponible', 'Servicio en 420 km'],
      ['UN-009', 'Operador demo C', 'Mantenimiento', 'Cambio de frenos'],
    ],
  },
  inventario: {
    title: 'Inventario',
    subtitle: 'Control de productos, categorias, movimientos, reportes y alertas de stock.',
    modules: ['Productos', 'Categorias', 'Movimientos', 'Reportes'],
    ctaSystem: 'Inventario',
    kpis: [
      { label: 'Productos', value: '1,248', hint: 'SKU activos' },
      { label: 'Entradas', value: '74', hint: 'Esta semana' },
      { label: 'Salidas', value: '69', hint: 'Esta semana' },
      { label: 'Stock critico', value: '21', hint: 'Reorden sugerido' },
      { label: 'Valor de inventario', value: '$2.4M', hint: 'Estimado' },
    ],
    rows: [
      ['SKU-1184', 'Sensor de presion', 'Disponible', '42 piezas'],
      ['SKU-0971', 'Filtro industrial', 'Stock critico', '6 piezas'],
      ['SKU-2020', 'Kit mantenimiento', 'En transito', 'Arribo estimado'],
    ],
  },
  crm: {
    title: 'CRM de Clientes',
    subtitle: 'Gestion comercial para clientes, prospectos, oportunidades, cotizaciones y actividades.',
    modules: ['Clientes', 'Seguimiento', 'Cotizaciones', 'Actividades'],
    ctaSystem: 'CRM de Clientes',
    kpis: [
      { label: 'Clientes activos', value: '86', hint: 'Cartera demo' },
      { label: 'Prospectos', value: '34', hint: 'Nuevos este mes' },
      { label: 'Oportunidades', value: '19', hint: 'Pipeline abierto' },
      { label: 'Ventas cerradas', value: '$740k', hint: 'Mes actual' },
    ],
    rows: [
      ['OP-410', 'Prospecto demo A', 'Cotizacion enviada', '$85k'],
      ['OP-406', 'Cliente demo B', 'Seguimiento', '$120k'],
      ['OP-392', 'Prospecto demo C', 'Discovery', '$62k'],
    ],
  },
};
