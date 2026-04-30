// =========================================================
// Shared UI components
// =========================================================
const { useState, useEffect, useRef, useMemo } = React;

const PELogo = ({ size = 28, color = "var(--pe-primary)", strokeWidth = 6 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <path d="M 50 8 A 42 42 0 1 1 22 88" strokeLinecap="round"/>
  </svg>
);
const PEWordmark = ({ size = 22 }) => (
  <img src="ds/PayEvo-logo-black.svg" alt="PayEvo" style={{ height: size, display: "block" }}/>
);
const PEBrand = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <PEWordmark/>
  </div>
);

// Inline SVG icons (we don't load lucide here - keep things light)
const I = {
  check: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowRight: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowLeft: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  x: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  info: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  shield: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  upload: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  download: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  edit: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  plus: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  trash: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  user: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  building: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>,
  bank: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 9 12 3 21 9 21 10 3 10"/><line x1="6" y1="13" x2="6" y2="18"/><line x1="10" y1="13" x2="10" y2="18"/><line x1="14" y1="13" x2="14" y2="18"/><line x1="18" y1="13" x2="18" y2="18"/><line x1="3" y1="21" x2="21" y2="21"/></svg>,
  card: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  send: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  zap: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  fileText: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  csv: (s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  alertCircle: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  qrIcon: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="14" y1="17" x2="17" y2="17"/><line x1="17" y1="14" x2="17" y2="17"/><line x1="20" y1="14" x2="20" y2="17"/><line x1="20" y1="20" x2="21" y2="20"/><line x1="17" y1="20" x2="17" y2="21"/></svg>,
  message: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  sparkle: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  trendingUp: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  list: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  globe: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

// Header
const LANGUAGES = [
  { value: "en", code: "EN", name: "English", native: "English", flag: "🇨🇦" },
  { value: "fr", code: "FR", name: "French", native: "Français", flag: "🇨🇦" },
  { value: "es", code: "ES", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { value: "zh", code: "ZH", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { value: "pa", code: "PA", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { value: "tl", code: "TL", name: "Tagalog", native: "Tagalog", flag: "🇵🇭" },
];

const Header = ({ stepIdx, lang, onLang, onIndex, indexOpen }) => {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const current = LANGUAGES.find(l => l.value === lang) || LANGUAGES[0];
  const steps = lang === "fr" ?
    ["Entreprise", "Identité", "Paie", "Employés", "Lancer"] :
    ["Business", "ID & Bank", "Payroll Setup", "Add Employees", "Run Payroll"];
  return (
    <header className="pe-header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <PEBrand/>
        <span className="pe-plan-badge">Business Basic</span>
      </div>
      <div className="pe-steps">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`pe-step ${i === stepIdx ? "active" : i < stepIdx ? "done" : ""}`}>
              <div className="pe-step-dot">{i < stepIdx ? I.check(13) : i + 1}</div>
              <span className="pe-step-label">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`pe-step-conn ${i < stepIdx ? "done" : ""}`}/>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span className="pe-save"><span className="dot pulse"/>{lang === "fr" ? "Enregistré" : "Saved"}</span>
        <div className="pe-lang" ref={langRef}>
          <button
            className="pe-lang-btn"
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            onClick={() => setLangOpen(o => !o)}
            title="Change language"
          >
            <span className="pe-lang-globe">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <span className="pe-lang-code">{current.code}</span>
            <span className="pe-lang-chev">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          {langOpen && (
            <div className="pe-lang-menu" role="listbox">
              {LANGUAGES.map(l => (
                <button
                  key={l.value}
                  role="option"
                  aria-selected={l.value === lang}
                  className={`pe-lang-item ${l.value === lang ? "on" : ""}`}
                  onClick={() => { onLang(l.value); setLangOpen(false); }}
                >
                  <span className="pe-lang-item-flag">{l.flag}</span>
                  <span className="pe-lang-item-name">{l.name}</span>
                  <span className="pe-lang-item-native">{l.native}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={onIndex} className="pe-btn ghost" style={{ padding: "6px 10px" }} title="Screen index">
          {I.list(16)}
        </button>
      </div>
    </header>
  );
};

// State banner — the signature pattern
const StateBanner = ({ variant = "standard", lang = "en", funding }) => {
  const copyMap = {
    standard: lang === "fr"
      ? { title: "Votre compte est actif pour la paie.", body: "ePay (dépôt direct) est en vérification — la plupart des approbations se complètent en moins de 4 heures ouvrables." }
      : { title: "Your account is live for payroll.", body: "ePay direct deposit is being verified and will activate automatically — most approvals complete within 4 business hours." },
    manual: lang === "fr"
      ? { title: "Votre compte est actif pour la paie.", body: "ePay est en révision manuelle — délai jusqu'à 72 heures." }
      : { title: "Your account is live for payroll.", body: "ePay direct deposit is being verified — manual review takes up to 72 hours." },
    fallback: lang === "fr"
      ? { title: "Votre compte est actif pour la paie.", body: "ePay s'activera après confirmation des micro-dépôts (1–2 jours ouvrables)." }
      : { title: "Your account is live for payroll.", body: "ePay activates after micro-deposit confirmation — 1–2 business days." },
  };
  const c = copyMap[variant] || copyMap.standard;
  const fundingLabel = funding && (lang === "fr"
    ? ` Paie envoyée par ${funding}.`
    : ` Payroll funded via ${funding}.`);
  return (
    <div className="pe-state-banner" role="status" aria-live="polite">
      <div className="sb-icon">{I.zap(16)}</div>
      <div style={{ flex: 1 }}>
        <div className="sb-title">{c.title}</div>
        <div className="sb-body">
          {c.body}
          {funding && <span><b>{fundingLabel}</b></span>}
        </div>
      </div>
    </div>
  );
};

// Banner
const Banner = ({ kind = "info", title, children }) => {
  const icons = { info: I.info(16), success: I.check(16), warning: I.alertCircle(16), error: I.alertCircle(16) };
  return (
    <div className={`pe-banner ${kind}`}>
      <div style={{ marginTop: 1, color: kind === "info" ? "var(--pe-blue)" : kind === "success" ? "var(--pe-green)" : kind === "warning" ? "var(--color-warning)" : "var(--color-danger)" }}>
        {icons[kind]}
      </div>
      <div style={{ flex: 1 }}>
        {title && <div className="b-title" style={{ marginBottom: 2 }}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

// Pill
const Pill = ({ kind = "gray", children }) => (
  <span className={`pe-pill ${kind}`}>
    <span className="dot"/>
    {children}
  </span>
);

// Radio card
const RadioCard = ({ selected, onSelect, title, caption, icon, right }) => (
  <div className={`pe-radio-card ${selected ? "selected" : ""}`} onClick={onSelect} role="radio" aria-checked={selected} tabIndex={0}>
    <div className="pe-radio-dot"/>
    {icon && <div style={{ width: 32, height: 32, borderRadius: 5, background: selected ? "#fff" : "var(--pe-blue-tint)", color: "var(--pe-blue)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{icon}</div>}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="pe-radio-title">{title}</div>
      {caption && <div className="pe-radio-cap">{caption}</div>}
    </div>
    {right}
  </div>
);

// Btn
const Btn = ({ kind = "primary", icon, iconRight, children, onClick, disabled, large, block, type, style }) => (
  <button type={type || "button"} className={`pe-btn ${kind} ${large ? "large" : ""} ${block ? "block" : ""}`} onClick={onClick} disabled={disabled} style={style}>
    {icon}
    {children}
    {iconRight}
  </button>
);

// Card wrapper
const Card = ({ width = "default", children, eyebrow, title, sub, headerRight }) => (
  <div className={`pe-card ${width}`}>
    {(eyebrow || title || sub || headerRight) && (
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1 }}>
          {eyebrow && <div className="pe-eyebrow">{eyebrow}</div>}
          {title && <h2 className="pe-h-screen">{title}</h2>}
          {sub && <p className="pe-sub" style={{ marginTop: 8 }}>{sub}</p>}
        </div>
        {headerRight}
      </div>
    )}
    {children}
  </div>
);

// Field
const Field = ({ label, required, hint, error, children, span }) => (
  <div className="pe-field" style={span ? { gridColumn: `span ${span}` } : undefined}>
    {label && <label className="pe-label">{label}{required && <span className="req">*</span>}</label>}
    {children}
    {hint && !error && <div className="pe-hint">{hint}</div>}
    {error && <div className="pe-err">{error}</div>}
  </div>
);

// Vertical stepper item
const VStep = ({ state, title, body }) => (
  <div className={`pe-vstep ${state}`}>
    <div className="pe-vstep-icon">
      {state === "done" ? I.check(13) : state === "active" ? <span className="ring"/> : null}
    </div>
    <div>
      <div className="pe-vstep-title">{title}</div>
      {body && <div className="pe-vstep-body">{body}</div>}
    </div>
  </div>
);

// Modal
const Modal = ({ title, sub, children, onClose, footer }) => (
  <div className="pe-modal-bg" onClick={onClose}>
    <div className="pe-modal" onClick={e => e.stopPropagation()}>
      <div className="pe-modal-head">
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.01em", margin: 0 }}>{title}</h3>
          {sub && <p style={{ fontSize: 14, color: "var(--grey-600)", marginTop: 6 }}>{sub}</p>}
        </div>
        <button className="pe-modal-close" onClick={onClose}>{I.x(16)}</button>
      </div>
      <div className="pe-modal-body">{children}</div>
      {footer && <div className="pe-modal-foot">{footer}</div>}
    </div>
  </div>
);

// Chip card (default/edited)
const ChipCard = ({ icon, title, summary, edited, onEdit }) => (
  <div className={`pe-chip-card ${edited ? "edited" : ""}`}>
    <div className="pe-chip-icon">{icon}</div>
    <div className="pe-chip-body">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="pe-chip-title">{title}</span>
        <Pill kind={edited ? "blue" : "gray"}>{edited ? "Custom" : "Default"}</Pill>
      </div>
      <div className="pe-chip-summary">{summary}</div>
    </div>
    <button className="pe-btn ghost" onClick={onEdit} style={{ color: "var(--pe-blue)" }}>
      {I.edit(13)} Edit
    </button>
  </div>
);

// Help FAB
const HelpFab = () => (
  <button className="pe-fab" title="Help & support">{I.message(22)}</button>
);

Object.assign(window, {
  PELogo, PEWordmark, PEBrand, I, Header, StateBanner, Banner, Pill,
  RadioCard, Btn, Card, Field, VStep, Modal, ChipCard, HelpFab,
});
