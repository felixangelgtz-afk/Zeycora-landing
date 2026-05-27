import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import logoPrincipal from '../01_logo_principal.png';
import isotipo from '../05_isotipo.png';
import {
  dashboards,
  demoSystems,
  demoTickets,
  demoUsers,
  kits,
  satisfaction,
  ticketBenefits,
  ticketCharts,
  ticketKpis,
  warranties,
} from './data/demoData.js';
import './styles.css';

const demoRoutes = {
  '/demos/tickets': 'tickets',
  '/demos/flotilla': 'flotilla',
  '/demos/taller': 'taller',
  '/demos/inventario': 'inventario',
  '/demos/crm': 'crm',
  '/demos/desarrollo': 'desarrollo',
};

const menuItems = ['Dashboard', 'Notificaciones', 'Satisfaccion', 'Tickets', 'Usuarios', 'Garantias', 'Kits', 'Configuracion'];

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [modalSystem, setModalSystem] = useState('');

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const page = useMemo(() => {
    if (path === '/demos') return <DemosPage onContact={setModalSystem} />;
    if (path === '/demos/tickets') return <TicketDemo onContact={setModalSystem} />;
    if (path === '/demos/desarrollo') return <CustomDevelopmentDemo onContact={setModalSystem} />;
    if (demoRoutes[path]) return <BusinessDashboard type={demoRoutes[path]} onContact={setModalSystem} />;
    return <LandingPage />;
  }, [path]);

  const isDemoPath = path.startsWith('/demos/');

  return (
    <>
      {!isDemoPath && <Header />}
      <main>{page}</main>
      {isDemoPath && <FloatingContact onContact={() => setModalSystem('Demostracion personalizada')} />}
      {!isDemoPath && <Footer />}
      {modalSystem && <ContactModal system={modalSystem} onClose={() => setModalSystem('')} />}
    </>
  );
}

function LinkButton({ href, children, className = '', disabled = false }) {
  return (
    <a
      className={`btn ${className} ${disabled ? 'is-disabled' : ''}`}
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (href?.startsWith('/')) {
          event.preventDefault();
          navigateTo(href);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    >
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container navbar">
        <a className="brand" href="/" onClick={(event) => {
          event.preventDefault();
          navigateTo('/');
        }}>
          <img src={isotipo} alt="ZEYCORA" />
          <span>ZEYCORA</span>
        </a>
        <nav className="main-nav" aria-label="Navegacion principal">
          <a href="/#services">Servicios</a>
          <a href="/#solutions">Soluciones</a>
          <a href="/demos" onClick={(event) => {
            event.preventDefault();
            navigateTo('/demos');
          }}>
            Probar un sistema
          </a>
          <a href="mailto:contacto@zeycora.com">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Software especializado para operacion real</p>
            <h1>
              Specialized <span>Software</span>
              <br />
              & Automation Solutions
            </h1>
            <p>
              Disenamos soluciones digitales especializadas para empresas que buscan automatizar
              procesos, optimizar operaciones y modernizar su flujo de trabajo.
            </p>
            <div className="actions">
              <a href="mailto:contacto@zeycora.com" className="btn btn-primary">Contactar</a>
              <LinkButton href="/demos" className="btn-secondary">Probar un sistema</LinkButton>
            </div>
          </div>
          <div className="hero-image">
            <img src={logoPrincipal} alt="ZEYCORA Specialized Software" />
          </div>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <SectionIntro
            title="Que hacemos"
            subtitle="ZEYCORA desarrolla plataformas y soluciones digitales personalizadas enfocadas en operacion, automatizacion y eficiencia empresarial."
          />
          <div className="services-grid">
            {[
              ['Sistemas Personalizados', 'Software adaptado a necesidades operativas especificas de cada empresa.'],
              ['Automatizacion', 'Procesos manuales convertidos en flujos digitales rapidos, organizados y medibles.'],
              ['Aplicaciones Moviles', 'Apps modernas para tecnicos, operacion de campo y administracion empresarial.'],
              ['Dashboards & Control', 'Metricas, seguimiento operativo e informacion centralizada en una plataforma.'],
            ].map(([title, text]) => (
              <article className="info-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band" id="solutions">
        <div className="container">
          <SectionIntro
            title="Soluciones Especializadas"
            subtitle="Construimos soluciones enfocadas en industrias y operaciones reales."
          />
          <div className="services-grid">
            {demoSystems.slice(0, 4).map((system) => (
              <article className="info-card" key={system.slug}>
                <h3>{system.name}</h3>
                <p>{system.shortDescription}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="cta-panel">
            <h2>Transformamos procesos manuales en soluciones digitales.</h2>
            <p>ZEYCORA desarrolla tecnologia enfocada en resultados reales para empresas modernas.</p>
            <div className="actions centered">
              <a href="mailto:contacto@zeycora.com" className="btn btn-primary">contacto@zeycora.com</a>
              <LinkButton href="/demos" className="btn-secondary">Ver demos</LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionIntro({ title, subtitle }) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function DemosPage({ onContact }) {
  return (
    <section className="page-shell demos-page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Catalogo de soluciones</p>
          <h1>Prueba un sistema Zeycora</h1>
          <p>
            Explora soluciones empresariales desarrolladas para optimizar operaciones,
            servicios tecnicos, talleres, flotillas e inventarios.
          </p>
          <div className="actions centered">
            <button className="btn btn-secondary" type="button" onClick={() => onContact('Catalogo de demos')}>
              Solicitar demo personalizada
            </button>
          </div>
        </div>

        <div className="demo-grid catalog-grid">
          {demoSystems.map((system) => (
            <article className="demo-card catalog-card" key={system.slug}>
              <div className="catalog-card-top">
                <span className="system-icon">{system.icon}</span>
                <span className="status-pill available">{system.status}</span>
              </div>
              <div>
                <h2>{system.name}</h2>
                <p>{system.description}</p>
              </div>
              <ul className="benefit-list">
                {system.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <LinkButton href={`/demos/${system.slug}`} className="btn-primary">Probar Demo</LinkButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TicketDemo({ onContact }) {
  const [entered, setEntered] = useState(false);
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [selectedId, setSelectedId] = useState(demoTickets[0].folio);
  const selectedTicket = demoTickets.find((ticket) => ticket.folio === selectedId) ?? demoTickets[0];

  if (!entered) {
    return <TicketEntry onEnter={() => setEntered(true)} onContact={onContact} />;
  }

  return (
    <SaasShell
      systemName="Gestion de Servicios Tecnicos"
      activeModule={activeModule}
      onModule={setActiveModule}
      onContact={onContact}
    >
      <DashboardModule
        activeModule={activeModule}
        selectedTicket={selectedTicket}
        selectedId={selectedId}
        onSelectTicket={setSelectedId}
        onContact={onContact}
      />
    </SaasShell>
  );
}

function TicketEntry({ onEnter, onContact }) {
  return (
    <section className="ticket-entry">
      <div className="entry-visual">
        <div className="mini-dashboard">
          <div className="mini-sidebar" />
          <div className="mini-content">
            <div className="mini-top" />
            <div className="mini-kpis">
              <span />
              <span />
              <span />
            </div>
            <div className="mini-chart" />
          </div>
        </div>
      </div>
      <div className="entry-copy">
        <img src={isotipo} alt="ZEYCORA" />
        <p className="eyebrow">Demo interactiva</p>
        <h1>Gestion de Servicios Tecnicos</h1>
        <p>
          Controle tickets, instalaciones, garantias, tecnicos, evidencias fotograficas
          y encuestas de satisfaccion desde una sola plataforma.
        </p>
        <div className="benefit-cloud">
          {ticketBenefits.map((benefit) => (
            <span key={benefit}>{benefit}</span>
          ))}
        </div>
        <div className="actions">
          <button className="btn btn-primary" type="button" onClick={onEnter}>Entrar a la Demo</button>
          <button className="btn btn-secondary" type="button" onClick={() => onContact('Gestion de Servicios Tecnicos')}>
            Solicitar cotizacion
          </button>
        </div>
      </div>
    </section>
  );
}

function SaasShell({ systemName, activeModule, onModule, onContact, children }) {
  return (
    <div className="saas-shell">
      <aside className="demo-sidebar">
        <div className="sidebar-brand">
          <img src={isotipo} alt="ZEYCORA" />
          <div>
            <strong>{systemName}</strong>
            <span>by Zeycora</span>
          </div>
        </div>
        <div className="workspace-card">
          <span>Zeycora Demo Platform</span>
          <strong>Operaciones</strong>
        </div>
        <nav className="side-nav" aria-label="Modulos de demo">
          {menuItems.map((item) => (
            <button
              className={item === activeModule ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => onModule(item)}
            >
              <span className="nav-dot" />
              {item}
            </button>
          ))}
        </nav>
        <LinkButton href="/demos" className="btn-secondary sidebar-back">Volver al catalogo</LinkButton>
      </aside>

      <div className="saas-main">
        <header className="demo-topbar">
          <div className="topbar-title">
            <span>Operacion</span>
            <strong>{activeModule}</strong>
          </div>
          <div className="topbar-brand">
            <img src={isotipo} alt="ZEYCORA" />
            <div>
              <span>Zeycora Platform</span>
              <strong>ZEYCORA</strong>
            </div>
          </div>
          <button className="alert-button" type="button">Alertas</button>
        </header>
        <div className="saas-content">{children}</div>
      </div>
    </div>
  );
}

function DashboardModule({ activeModule, selectedTicket, selectedId, onSelectTicket, onContact }) {
  if (activeModule === 'Tickets') {
    return <TicketsModule selectedTicket={selectedTicket} selectedId={selectedId} onSelectTicket={onSelectTicket} />;
  }
  if (activeModule === 'Garantias') return <WarrantyModule />;
  if (activeModule === 'Satisfaccion') return <SatisfactionModule />;
  if (activeModule === 'Usuarios') return <UsersModule />;
  if (activeModule === 'Kits') return <KitsModule />;

  return (
    <>
      <DemoPageHeader
        eyebrow="Dashboard"
        title="Indicadores de servicios tecnicos"
        description="Visualiza operacion con KPIs, pendientes urgentes, filtros y graficas listas para direccion."
        onContact={() => onContact('Gestion de Servicios Tecnicos')}
      />
      <FilterPanel />
      <KpiGrid kpis={ticketKpis} />
      <ChartsGrid />
      <TicketsModule selectedTicket={selectedTicket} selectedId={selectedId} onSelectTicket={onSelectTicket} compact />
    </>
  );
}

function DemoPageHeader({ eyebrow, title, description, onContact }) {
  return (
    <div className="demo-page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <button className="btn btn-primary" type="button" onClick={onContact}>Solicitar cotizacion</button>
    </div>
  );
}

function FilterPanel() {
  return (
    <section className="filter-panel">
      {['Fecha inicial', 'Fecha final'].map((label) => (
        <label className="field" key={label}>
          <span>{label}</span>
          <input type="text" readOnly value="Seleccionar fecha" />
        </label>
      ))}
      <label className="field">
        <span>Tecnico</span>
        <select defaultValue="Todos los tecnicos">
          <option>Todos los tecnicos</option>
          <option>Ana Lopez</option>
          <option>Marco Ruiz</option>
          <option>Sofia Perez</option>
          <option>David Torres</option>
        </select>
      </label>
      <label className="field">
        <span>Estado</span>
        <select defaultValue="Todos los estados">
          <option>Todos los estados</option>
          <option>Abierto</option>
          <option>En proceso</option>
          <option>Revision</option>
          <option>Cerrado</option>
        </select>
      </label>
      <div className="filter-actions">
        <button className="btn btn-dark" type="button">Aplicar filtros</button>
        <button className="btn btn-light" type="button">Limpiar filtros</button>
      </div>
    </section>
  );
}

function KpiGrid({ kpis }) {
  return (
    <section className="ops-kpi-grid">
      {kpis.map((kpi) => (
        <article className={`ops-kpi ${kpi.tone ?? 'dark'}`} key={kpi.label}>
          <span className="kpi-accent" />
          <div>
            <p>{kpi.label}</p>
            <strong>{kpi.value}</strong>
            <small>{kpi.hint}</small>
          </div>
        </article>
      ))}
    </section>
  );
}

function ChartsGrid() {
  return (
    <section className="charts-grid">
      <BarChart title="Tickets por mes" data={ticketCharts.monthly} />
      <BarChart title="Tickets por tecnico" data={ticketCharts.technicians} />
      <ProgressChart title="Satisfaccion del cliente" data={ticketCharts.satisfaction} />
      <ProgressChart title="Estado de tickets" data={ticketCharts.status} />
    </section>
  );
}

function BarChart({ title, data }) {
  const max = Math.max(...data.map((item) => item.value));
  return (
    <article className="chart-card">
      <div className="panel-title">
        <h2>{title}</h2>
        <span>Simulado</span>
      </div>
      <div className="vertical-chart">
        {data.map((item) => (
          <div className="vertical-bar" key={item.label}>
            <span style={{ height: `${(item.value / max) * 100}%` }} />
            <small>{item.label}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

function ProgressChart({ title, data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <article className="chart-card">
      <div className="panel-title">
        <h2>{title}</h2>
        <span>{total}</span>
      </div>
      <div className="progress-list">
        {data.map((item) => (
          <div className="progress-row" key={item.label}>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
            <i><b style={{ width: `${Math.min(item.value, 100)}%` }} /></i>
          </div>
        ))}
      </div>
    </article>
  );
}

function TicketsModule({ selectedTicket, selectedId, onSelectTicket, compact = false }) {
  return (
    <section className={compact ? 'module-section compact' : 'module-section'}>
      {!compact && (
        <DemoPageHeader
          eyebrow="Tickets"
          title="Listado y detalle de tickets"
          description="Tabla operativa con folio, cliente, servicio, tecnico, estado, prioridad y acciones."
          onContact={() => {}}
        />
      )}
      <div className="ticket-workspace">
        <article className="data-card ticket-table-card">
          <div className="panel-title">
            <h2>Tickets</h2>
            <span>{demoTickets.length} registros</span>
          </div>
          <div className="table-wrap">
            <table className="demo-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Tecnico</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {demoTickets.map((ticket) => (
                  <tr className={selectedId === ticket.folio ? 'selected' : ''} key={ticket.folio}>
                    <td>{ticket.folio}</td>
                    <td>{ticket.cliente}</td>
                    <td>{ticket.servicio}</td>
                    <td>{ticket.tecnico}</td>
                    <td><span className="table-pill">{ticket.estado}</span></td>
                    <td><span className={`priority ${ticket.prioridad.toLowerCase()}`}>{ticket.prioridad}</span></td>
                    <td>{ticket.fecha}</td>
                    <td>
                      <button type="button" onClick={() => onSelectTicket(ticket.folio)}>Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <TicketDetail ticket={selectedTicket} />
      </div>
    </section>
  );
}

function TicketDetail({ ticket }) {
  return (
    <aside className="data-card ticket-detail">
      <div className="panel-title">
        <h2>Detalle de ticket</h2>
        <span>{ticket.folio}</span>
      </div>
      <h3>{ticket.servicio}</h3>
      <p>{ticket.descripcion}</p>
      <div className="detail-grid">
        <InfoLine label="Cliente" value={ticket.cliente} />
        <InfoLine label="Ubicacion" value={ticket.ubicacion} />
        <InfoLine label="Tecnico asignado" value={ticket.tecnico} />
        <InfoLine label="Estatus" value={ticket.estado} />
        <InfoLine label="Firma digital" value={ticket.firma} />
        <InfoLine label="Encuesta" value={ticket.encuesta} />
      </div>
      <div className="evidence-grid">
        {ticket.evidencias.map((evidence, index) => (
          <div className="evidence-tile" key={evidence}>
            <span>IMG {index + 1}</span>
            <strong>{evidence}</strong>
          </div>
        ))}
      </div>
      <div className="timeline">
        {ticket.historial.map((item) => (
          <div className="timeline-item" key={item}>
            <span />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function WarrantyModule() {
  return (
    <>
      <DemoPageHeader
        eyebrow="Garantias"
        title="Control visual de garantias"
        description="Seguimiento de garantias abiertas, cerradas, pendientes e incompletas."
        onContact={() => {}}
      />
      <KpiGrid kpis={warranties} />
      <ProgressChart title="Estado de garantias" data={[
        { label: 'Abiertas', value: 9 },
        { label: 'Cerradas', value: 31 },
        { label: 'Pendientes', value: 6 },
        { label: 'Incompletas', value: 4 },
      ]} />
    </>
  );
}

function SatisfactionModule() {
  return (
    <>
      <DemoPageHeader
        eyebrow="Satisfaccion"
        title="Satisfaccion del cliente"
        description="Calificacion promedio, encuestas respondidas, tendencia mensual y comentarios simulados."
        onContact={() => {}}
      />
      <KpiGrid kpis={satisfaction.metrics} />
      <article className="data-card comments-card">
        <h2>Comentarios simulados</h2>
        {satisfaction.comments.map((comment) => (
          <p key={comment}>{comment}</p>
        ))}
      </article>
    </>
  );
}

function UsersModule() {
  return (
    <>
      <DemoPageHeader
        eyebrow="Usuarios"
        title="Roles y usuarios demo"
        description="Administradores, supervisores y tecnicos organizados por perfil operativo."
        onContact={() => {}}
      />
      <section className="role-grid">
        {demoUsers.map((user) => (
          <article className="data-card role-card" key={user.role}>
            <span>{user.role}</span>
            <strong>{user.count}</strong>
            <p>{user.names}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function KitsModule() {
  return (
    <>
      <DemoPageHeader
        eyebrow="Kits"
        title="Kits instalados y equipos"
        description="Equipos, numeros de parte e historial de instalacion con datos simulados."
        onContact={() => {}}
      />
      <section className="role-grid">
        {kits.map((kit) => (
          <article className="data-card role-card" key={kit.part}>
            <span>{kit.part}</span>
            <strong>{kit.name}</strong>
            <p>{kit.installed} kits instalados. {kit.history}.</p>
          </article>
        ))}
      </section>
    </>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="info-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function BusinessDashboard({ type, onContact }) {
  const content = dashboards[type];
  return (
    <section className="business-demo">
      <div className="business-shell">
        <DemoPageHeader
          eyebrow="Demo visual"
          title={content.title}
          description={content.subtitle}
          onContact={() => onContact(content.ctaSystem)}
        />
        <KpiGrid kpis={content.kpis} />
        <section className="business-grid">
          <article className="data-card">
            <div className="panel-title">
              <h2>Modulos</h2>
              <span>Dashboard completo</span>
            </div>
            <div className="module-chips">
              {content.modules.map((module) => (
                <span key={module}>{module}</span>
              ))}
            </div>
          </article>
          <article className="data-card">
            <div className="panel-title">
              <h2>Operacion simulada</h2>
              <span>Datos locales</span>
            </div>
            <div className="simple-table">
              {content.rows.map((row) => (
                <div className="simple-row" key={row.join('-')}>
                  <strong>{row[0]}</strong>
                  <span>{row[2]}</span>
                  <small>{row[1]} - {row[3]}</small>
                </div>
              ))}
            </div>
          </article>
          <BarChart title="Actividad mensual" data={[
            { label: 'Ene', value: 28 },
            { label: 'Feb', value: 34 },
            { label: 'Mar', value: 31 },
            { label: 'Abr', value: 46 },
            { label: 'May', value: 58 },
          ]} />
        </section>
        <button className="btn btn-primary" type="button" onClick={() => onContact(content.ctaSystem)}>
          Solicitar cotizacion
        </button>
      </div>
    </section>
  );
}

function CustomDevelopmentDemo({ onContact }) {
  const examples = ['Apps moviles', 'Sistemas web', 'Dashboards', 'Automatizaciones', 'Integraciones', 'Portales de clientes'];
  return (
    <section className="business-demo custom-demo">
      <div className="business-shell">
        <DemoPageHeader
          eyebrow="Desarrollo a medida"
          title="No encuentras exactamente lo que necesitas?"
          description="Desarrollamos soluciones personalizadas para empresas que requieren flujos, roles, reportes e integraciones especificas."
          onContact={() => onContact('Desarrollo a Medida')}
        />
        <div className="custom-grid">
          {examples.map((example) => (
            <article className="data-card role-card" key={example}>
              <span>Solucion</span>
              <strong>{example}</strong>
              <p>Diseno funcional, interfaz profesional y arquitectura alineada a la operacion.</p>
            </article>
          ))}
        </div>
        <button className="btn btn-primary" type="button" onClick={() => onContact('Desarrollo a Medida')}>
          Solicitar cotizacion
        </button>
      </div>
    </section>
  );
}

function FloatingContact({ onContact }) {
  return (
    <button className="floating-contact" type="button" onClick={onContact}>
      Solicitar demostracion personalizada
    </button>
  );
}

function ContactModal({ system, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    sistema: system,
    mensaje: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const requiredFields = ['nombre', 'empresa', 'correo', 'telefono', 'sistema', 'mensaje'];
    const missingFields = requiredFields.filter((field) => !formData[field].trim());

    if (missingFields.length > 0) {
      setStatus({ type: 'error', message: 'Completa todos los campos obligatorios.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'No se pudo enviar la solicitud.');
      }

      setStatus({ type: 'success', message: 'Solicitud enviada correctamente. Te contactaremos pronto.' });
      setFormData({
        nombre: '',
        empresa: '',
        correo: '',
        telefono: '',
        sistema: system,
        mensaje: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'No se pudo enviar la solicitud. Intentalo nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Contacto demo">
      <div className="contact-modal">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Contacto comercial</p>
            <h2>Solicitar demostracion personalizada</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose}>Cerrar</button>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Nombre</span>
            <input
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={(event) => updateField('nombre', event.target.value)}
              required
            />
          </label>
          <label>
            <span>Empresa</span>
            <input
              type="text"
              placeholder="Nombre de empresa"
              value={formData.empresa}
              onChange={(event) => updateField('empresa', event.target.value)}
              required
            />
          </label>
          <label>
            <span>Correo</span>
            <input
              type="email"
              placeholder="correo@empresa.com"
              value={formData.correo}
              onChange={(event) => updateField('correo', event.target.value)}
              required
            />
          </label>
          <label>
            <span>Telefono</span>
            <input
              type="tel"
              placeholder="Telefono de contacto"
              value={formData.telefono}
              onChange={(event) => updateField('telefono', event.target.value)}
              required
            />
          </label>
          <label>
            <span>Sistema de interes</span>
            <input
              type="text"
              value={formData.sistema}
              onChange={(event) => updateField('sistema', event.target.value)}
              required
            />
          </label>
          <label className="wide">
            <span>Mensaje</span>
            <textarea
              placeholder="Cuentanos que operacion quieres controlar"
              value={formData.mensaje}
              onChange={(event) => updateField('mensaje', event.target.value)}
              required
            />
          </label>
          {status.message && (
            <p className={`form-status ${status.type}`} role="status">{status.message}</p>
          )}
          <div className="actions form-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar solicitud demo'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>(c) 2026 ZEYCORA - Specialized Software & Automation Solutions</span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
