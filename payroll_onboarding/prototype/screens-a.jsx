// =========================================================
// Screens A: 0-12 (role-gate through payroll-funding)
// =========================================================

// 0 — Role gate
const RoleGate = ({ ctx, go }) => {
  const [role, setRole] = useState(ctx.role || "owner");
  const opts = [
    { id: "owner", t: "Owner / Signing Officer", c: "I can sign legal and banking documents for the business.", icon: I.user(16) },
    { id: "admin", t: "Payroll Admin", c: "I run payroll on behalf of the company.", icon: I.user(16) },
    { id: "accountant", t: "Accountant or Bookkeeper", c: "I manage payroll for clients I represent.", icon: I.fileText(16) },
    { id: "employee", t: "Employee or Contractor", c: "I'm here to view paystubs or submit a timesheet.", icon: I.user(16) },
  ];
  return (
    <Card width="default" eyebrow="Sign up · 1 of 3" title="Welcome to PayEvo" sub="Which best describes you? We use this to tailor the rest of setup.">
      <div className="pe-stack">
        {opts.map(o => <RadioCard key={o.id} selected={role === o.id} onSelect={() => setRole(o.id)} title={o.t} caption={o.c} icon={o.icon}/>)}
      </div>
      <div className="pe-actions">
        <span/>
        <Btn kind="primary" disabled={!role} large iconRight={I.arrowRight(14)}
          onClick={() => { ctx.set({ role }); role === "employee" ? go("employee-terminal") : go("signup"); }}>
          Continue
        </Btn>
      </div>
    </Card>
  );
};

// 0b — Employee terminal
const EmployeeTerminal = ({ go }) => (
  <Card width="narrow" eyebrow="You're in the wrong place" title="Download PayChequer" sub="Employees and contractors view their paystubs and submit timesheets in our companion app, PayChequer.">
    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
      <Btn kind="primary" block large>Download for iOS</Btn>
      <Btn kind="secondary" block large>Get it on Android</Btn>
    </div>
    <div className="pe-actions">
      <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("role-gate")}>Back</Btn>
      <span/>
    </div>
  </Card>
);

// 1 — Signup
const Signup = ({ ctx, go }) => {
  const [tos, setTos] = useState(false);
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("alex@acmeco.ca");
  const ready = tos && auth && email.includes("@");
  return (
    <Card width="narrow" eyebrow="Sign up · 2 of 3" title="Create your account" sub="Takes about 30 seconds.">
      <div className="pe-stack" style={{ marginBottom: 18 }}>
        <Btn kind="secondary" block large icon={<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5C29.5 34.7 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4 5.6l6.5 5.5c-.4.4 7-5 7-15.1 0-1.3-.1-2.6-.4-3.9z"/></svg>}>Continue with Google</Btn>
        <Btn kind="secondary" block large icon={<svg width="16" height="16" viewBox="0 0 24 24"><rect x="2" y="2" width="9.5" height="9.5" fill="#F25022"/><rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00"/><rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF"/><rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/></svg>}>Continue with Microsoft</Btn>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--grey-500)", fontSize: 12, margin: "16px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--grey-300)" }}/>OR<div style={{ flex: 1, height: 1, background: "var(--grey-300)" }}/>
      </div>
      <div className="pe-stack">
        <Field label="Work email" required>
          <input className="pe-input" value={email} onChange={e => setEmail(e.target.value)} type="email"/>
        </Field>
        <Field label="Full legal name" required><input className="pe-input" defaultValue="Alex Pereira"/></Field>
        <Field label="Password" required hint="At least 12 characters."><input className="pe-input" type="password" defaultValue="••••••••••••"/></Field>
      </div>
      <div className="pe-stack" style={{ marginTop: 18, gap: 10 }}>
        <label style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--grey-700)", cursor: "pointer" }}>
          <input type="checkbox" checked={tos} onChange={e => setTos(e.target.checked)} style={{ marginTop: 2 }}/>
          <span>I agree to the <a href="#" style={{ color: "var(--pe-blue)" }}>Terms of Service</a>, <a href="#" style={{ color: "var(--pe-blue)" }}>Privacy Policy</a>, and confidentiality agreement.</span>
        </label>
        <label style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--grey-700)", cursor: "pointer" }}>
          <input type="checkbox" checked={auth} onChange={e => setAuth(e.target.checked)} style={{ marginTop: 2 }}/>
          <span>I confirm I have authority to act on behalf of the business I'm registering.</span>
        </label>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("role-gate")}>Back</Btn>
        <Btn kind="primary" large disabled={!ready} iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ email }); go("otc"); }}>Create account</Btn>
      </div>
    </Card>
  );
};

// 2 — OTC
const OTC = ({ ctx, go }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);
  const onChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code]; next[i] = v; setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const all = code.every(c => c.length === 1);
  useEffect(() => { if (all) setTimeout(() => go("business-basics"), 700); }, [all]);
  return (
    <Card width="narrow" eyebrow="Sign up · 3 of 3" title="Check your email" sub={`We sent a 6-digit code to ${ctx.email || "alex@acmeco.ca"}. It expires in 15 minutes.`}>
      <div className="pe-otc" style={{ margin: "20px 0 12px" }}>
        {code.map((c, i) => (
          <input key={i} ref={el => refs.current[i] = el}
            className={c ? "filled" : ""} value={c} onChange={e => onChange(i, e.target.value)}
            onKeyDown={e => e.key === "Backspace" && !c && i > 0 && refs.current[i - 1]?.focus()}
            inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`}/>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button style={{ background: "none", border: 0, color: "var(--pe-blue)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Resend code</button>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("signup")}>Back</Btn>
        <Btn kind="primary" disabled={!all} iconRight={I.arrowRight(14)} onClick={() => go("business-basics")}>Verify</Btn>
      </div>
    </Card>
  );
};

// 3 — Business basics
const BusinessBasics = ({ ctx, go }) => {
  const isCorp = ctx.bizType === "corp-fed" || ctx.bizType === "corp-prov";
  const isFedCorp = ctx.bizType === "corp-fed";
  const dateLabel =
    ctx.bizType === "partnership" ? "Date of registration" :
    ctx.bizType === "sole" ? "Business start date" :
    "Date of incorporation";
  return (
    <Card width="default" eyebrow="Step 1 · Business" title="Tell us about your business" sub="We'll use this to pre-fill what we can and skip the rest.">
      {isFedCorp && (
        <div style={{ marginBottom: 20 }}>
          <Banner kind="success" title="We found your registration with Corporations Canada">
            <strong>Acme Construction Ltd.</strong> · Federal Corporation #87654321 · Active. We've pre-filled your registered name and head-office address.
          </Banner>
        </div>
      )}
      <div className="pe-stack-lg">
        <Field label="Legal business name" required><input className="pe-input" defaultValue="Acme Construction Ltd"/></Field>
        <Field label="Operating name / DBA" hint="If different from legal name."><input className="pe-input" placeholder="e.g. Acme Builds"/></Field>
        <div className="pe-field-row">
          <Field label="Business type" required>
            <select className="pe-select" value={ctx.bizType} onChange={e => ctx.set({ bizType: e.target.value })}>
              <option value="sole">Sole proprietor</option>
              <option value="corp-fed">Corporation — Federal</option>
              <option value="corp-prov">Corporation — Provincial</option>
              <option value="partnership">Partnership</option>
              <option value="nfp">Not-for-profit</option>
            </select>
          </Field>
          <Field label={dateLabel}><input className="pe-input" defaultValue="2018-04-12" type="date"/></Field>
        </div>
        <div className="pe-field-row">
          <Field label="Company phone" required><input className="pe-input" defaultValue="(416) 555-0142"/></Field>
          <Field label="Number of employees" required>
            <select className="pe-select" defaultValue="6-25"><option>1–5</option><option>6–25</option><option>26–100</option><option>100+</option></select>
          </Field>
        </div>
        <div className="pe-field-row">
          <Field label="Industry" required>
            <select className="pe-select" defaultValue="construction"><option value="construction">Construction</option><option>Retail</option><option>Professional services</option><option>Hospitality</option><option>Healthcare</option></select>
          </Field>
          {isCorp ? (
            <Field label="Annual payroll value" hint="We pre-selected $250K–$1M based on your industry & size.">
              <select className="pe-select" defaultValue="250-1m"><option>Under $250K</option><option value="250-1m">$250K – $1M</option><option>$1M – $5M</option><option>Over $5M</option></select>
            </Field>
          ) : (
            <Field label="Annual payroll value" hint="We pre-selected $250K–$1M based on your industry & size.">
              <select className="pe-select" defaultValue="250-1m"><option>Under $250K</option><option value="250-1m">$250K – $1M</option><option>$1M – $5M</option><option>Over $5M</option></select>
            </Field>
          )}
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("otc")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("business-address")}>Continue</Btn>
      </div>
    </Card>
  );
};

// 4 — Business address
const BusinessAddress = ({ ctx, go }) => {
  const provs = ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"];
  const active = ctx.provinces || ["ON"];
  const toggle = (p) => {
    const next = active.includes(p) ? active.filter(x => x !== p) : [...active, p];
    ctx.set({ provinces: next });
  };
  return (
    <Card width="default" eyebrow="Step 1 · Business" title="Where does your business operate?" sub="We use this to load the right provincial payroll rules.">
      <div className="pe-section">
        <h4>Head office</h4>
        <div className="pe-stack-lg">
          <Field label="Street address" required><input className="pe-input" defaultValue="180 King Street West"/></Field>
          <div className="pe-field-row">
            <Field label="City" required><input className="pe-input" defaultValue="Toronto"/></Field>
            <Field label="Postal code" required hint="Format: A1A 1A1"><input className="pe-input" defaultValue="M5H 1J9"/></Field>
          </div>
          <Field label="Province" required>
            <select className="pe-select" defaultValue="ON">{provs.map(p => <option key={p}>{p}</option>)}</select>
          </Field>
        </div>
      </div>
      <div className="pe-section">
        <h4>Where do you employ people?</h4>
        <div style={{ fontSize: 13, color: "var(--grey-600)", marginBottom: 14 }}>Select every province or territory where you have employees on the books.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {provs.map(p => {
            const on = active.includes(p);
            return (
              <button key={p} onClick={() => toggle(p)} style={{
                padding: "10px 12px", border: `1.5px solid ${on ? "var(--pe-blue)" : "var(--grey-300)"}`,
                background: on ? "var(--pe-blue-tint)" : "#fff", borderRadius: 5, cursor: "pointer",
                fontWeight: 600, fontSize: 13, color: on ? "var(--pe-blue-deep)" : "var(--grey-700)",
                display: "flex", alignItems: "center", gap: 8, justifyContent: "center"
              }}>
                {on && <span style={{ color: "var(--pe-blue)" }}>{I.check(13)}</span>}
                {p}
              </button>
            );
          })}
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("business-basics")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go(ctx.bizType === "sole" ? "idv-prescreen" : "business-owners")}>Continue</Btn>
      </div>
    </Card>
  );
};

// 5 — Business owners
const BusinessOwners = ({ ctx, go }) => {
  const [signer, setSigner] = useState("yes");
  const [multi, setMulti] = useState("yes");
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const owners = [
    { name: "Alex Pereira (you)", pct: 51, applicant: true },
    { name: "Jordan Kim", pct: 30 },
  ];
  const total = owners.reduce((s, o) => s + o.pct, 0);
  const totalKind = total > 100 ? "red" : total < 75 ? "amber" : "green";
  if (ctx.bizType === "sole") {
    return (
      <Card width="default" eyebrow="Step 1 · Business" title="Proof of ownership" sub="Sole proprietors only need to upload one document.">
        <div className="pe-drop">
          <div style={{ color: "var(--pe-blue)", marginBottom: 8 }}>{I.upload(28)}</div>
          <div className="pe-drop-title">Upload proof of ownership</div>
          <div className="pe-drop-sub">PDF, JPG, or PNG. 10 MB max. Business license, GST/HST registration, or Master Business License.</div>
        </div>
        <div className="pe-actions">
          <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("business-address")}>Back</Btn>
          <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("idv-prescreen")}>Continue</Btn>
        </div>
      </Card>
    );
  }
  return (
    <Card width="default" eyebrow="Step 1 · Business" title="Ownership and signing" sub="Canadian AML rules require this. We'll only ask what's relevant.">
      <div className="pe-section">
        <h4>Are you the authorized signatory?</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <RadioCard selected={signer === "yes"} onSelect={() => setSigner("yes")} title="Yes, that's me" caption="I can sign legal and banking docs."/>
          <RadioCard selected={signer === "no"} onSelect={() => setSigner("no")} title="No, someone else" caption="We'll email them to verify."/>
        </div>
        {signer === "no" && (
          <div style={{ marginTop: 14 }}>
            <Banner kind="info" title="We'll email the signer to complete their ID verification">You can keep going with payroll setup while they finish.</Banner>
            <div className="pe-field-row" style={{ marginTop: 14 }}>
              <Field label="Signer's full legal name" required><input className="pe-input" placeholder="e.g. Maya Singh"/></Field>
              <Field label="Signer's email" required><input className="pe-input" placeholder="signer@acmeco.ca" type="email"/></Field>
            </div>
          </div>
        )}
      </div>
      <div className="pe-section">
        <h4>Does anyone other than you own 25% or more?</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <RadioCard selected={multi === "yes"} onSelect={() => setMulti("yes")} title="Yes" caption="There are other beneficial owners."/>
          <RadioCard selected={multi === "no"} onSelect={() => setMulti("no")} title="No" caption="I'm the only 25%+ owner."/>
        </div>
        {multi === "yes" && (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 14, color: "var(--grey-700)", fontWeight: 600 }}>Beneficial owners</div>
              <Pill kind={totalKind}>{total}% accounted for</Pill>
            </div>
            <div className="pe-stack">
              {owners.map((o, i) => (
                <div key={i} className={`pe-chip-card ${o.applicant ? "edited" : ""}`}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: "var(--grey-500)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13, flex: "none" }}>
                    {o.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span className="pe-chip-title">{o.name}</span>
                      {o.applicant && <Pill kind="blue">Applicant</Pill>}
                    </div>
                    <div className="pe-chip-summary">{o.pct}% ownership</div>
                  </div>
                  <button className="pe-btn ghost">{I.edit(13)}</button>
                  {!o.applicant && <button className="pe-btn ghost" style={{ color: "var(--color-danger)" }}>{I.trash(13)}</button>}
                </div>
              ))}
              <button className="pe-btn secondary" onClick={() => setShowOwnerModal(true)} style={{ alignSelf: "flex-start" }}>{I.plus(14)} Add beneficial owner</button>
            </div>
            {total < 75 && <div style={{ marginTop: 10, fontSize: 12, color: "#6e5300" }}>FINTRAC requires at least 75% of ownership accounted for.</div>}
          </div>
        )}
      </div>
      {ctx.bizType !== "sole" && (
        <div className="pe-section">
          <h4>Directors</h4>
          <div className="pe-stack">
            <div className="pe-chip-card">
              <div className="pe-chip-icon">{I.user(16)}</div>
              <div className="pe-chip-body">
                <div className="pe-chip-title">Alex Pereira</div>
                <div className="pe-chip-summary">President, Director</div>
              </div>
              <button className="pe-btn ghost">{I.edit(13)}</button>
            </div>
            <button className="pe-btn secondary" style={{ alignSelf: "flex-start" }}>{I.plus(14)} Add director</button>
          </div>
        </div>
      )}
      <div className="pe-section">
        <h4>Proof of ownership</h4>
        <div className="pe-drop">
          <div style={{ color: "var(--pe-blue)", marginBottom: 8 }}>{I.upload(24)}</div>
          <div className="pe-drop-title">Drop a file or browse</div>
          <div className="pe-drop-sub">Articles of incorporation, partnership agreement, or shareholder registry. PDF/JPG/PNG, 10 MB max.</div>
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("business-address")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ signerIsApplicant: signer === "yes" }); go("idv-prescreen"); }}>Continue</Btn>
      </div>
      {showOwnerModal && <OwnerModal onClose={() => setShowOwnerModal(false)}/>}
    </Card>
  );
};

// 6 — IDV prescreen
const IDVPrescreen = ({ ctx, go }) => {
  const isSigner = ctx.signerIsApplicant !== false;
  if (!isSigner) {
    return (
      <Card width="default" eyebrow="Step 2 · ID & Bank" title="You're all set for now" sub="The signing officer will get an email to verify their identity. You can keep going with payroll setup.">
        <div className="pe-stack-lg">
          <Banner kind="success" title="Email sent to signer@acmeco.ca">We'll send reminders at 24h and 72h. The signer needs about 5 minutes to finish.</Banner>
          <div style={{ background: "var(--grey-75)", borderRadius: 5, padding: 18 }}>
            <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>While they're verifying, you can:</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--grey-700)", fontSize: 14, lineHeight: 1.8 }}>
              <li>Configure payroll basics — tax numbers, frequency, dates.</li>
              <li>Add your employees by CSV or one-by-one.</li>
              <li>Run your first payroll using e-Transfer, online bill payment, or wire.</li>
            </ul>
          </div>
        </div>
        <div className="pe-actions">
          <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("business-owners")}>Back</Btn>
          <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ epayState: "in_review" }); go("payroll-funding"); }}>Continue to payroll setup</Btn>
        </div>
      </Card>
    );
  }
  return (
    <Card width="default" eyebrow="Step 2 · ID & Bank" title="Let's verify your identity and bank" sub="A short, secure check from our verification partner. Most people finish in under 5 minutes.">
      <div className="pe-stack-lg">
        <Banner kind="info" title="Three steps, all on your phone">
          <ol style={{ margin: "6px 0 0", paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Photo of your government ID (driver's license or passport).</li>
            <li>Quick selfie to confirm it's you.</li>
            <li>Sign in to your business bank to confirm the account.</li>
          </ol>
        </Banner>
        <div style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--grey-600)" }}>
          {I.shield(16)}
          <span>Your data is encrypted in transit and at rest. ID images are never stored on PayEvo's servers.</span>
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("business-owners")}>Back</Btn>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn kind="secondary" onClick={() => go("idv-manual")}>Enter manually</Btn>
          <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("idv-interact")}>Verify identity</Btn>
        </div>
      </div>
    </Card>
  );
};

// 7 — IDV QR handoff
const IDVInteract = ({ go }) => {
  const qr = useMemo(() => Array.from({ length: 400 }, () => Math.random() > 0.5), []);
  return (
    <Card width="default" eyebrow="Step 2 · ID & Bank" title="Verify on your phone" sub="Scan the QR with your phone, or send yourself a link.">
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div className="pe-qr">
          {qr.map((on, i) => <div key={i} style={{ background: on ? "var(--ink)" : "transparent" }}/>)}
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>What we'll check</h4>
          <div className="pe-stack" style={{ gap: 8 }}>
            {[["Government ID", "Driver's license or passport"], ["Liveness selfie", "A quick selfie to confirm it's you"], ["Bank sign-in", "Confirm your business bank account"]].map(([t, s], i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: 11, background: "var(--pe-blue-tint)", color: "var(--pe-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flex: "none", marginTop: 1 }}>{i + 1}</div>
                <div><div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div><div style={{ fontSize: 13, color: "var(--grey-600)" }}>{s}</div></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, padding: "10px 14px", background: "var(--grey-75)", borderRadius: 5, fontSize: 13, color: "var(--grey-600)", display: "inline-flex", gap: 8 }}>
            <span style={{ color: "var(--pe-blue)" }}>{I.info(14)}</span>
            Estimated time: 3 to 5 minutes.
          </div>
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("idv-prescreen")}>Back</Btn>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn kind="secondary" icon={I.send(14)}>Send me a link</Btn>
          <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("idv-wait")}>I'm ready — start</Btn>
        </div>
      </div>
    </Card>
  );
};

// 8 — IDV polling wait
const IDVWait = ({ go }) => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 2200);
    const t2 = setTimeout(() => setStep(3), 4500);
    const t3 = setTimeout(() => go("idv-bank"), 6500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);
  const stateOf = (i) => i < step ? "done" : i === step ? "active" : "pending";
  return (
    <Card width="default" eyebrow="Step 2 · ID & Bank" title="Verifying on your phone…" sub="We'll auto-advance when our verification partner is done. Keep this window open.">
      <div style={{ marginTop: 8 }}>
        <VStep state={stateOf(1)} title="Session started" body="Your phone is connected."/>
        <VStep state={stateOf(2)} title="ID capture & liveness" body="Take a photo of your ID, then a selfie."/>
        <VStep state={stateOf(3)} title="Bank account verification" body="Sign in to your business bank to confirm."/>
      </div>
    </Card>
  );
};

// 9 — IDV bank
const IDVBank = ({ ctx, go }) => {
  const [pick, setPick] = useState(0);
  const accts = ctx.bankMatch === "mismatch" ? [
    { bank: "TD Canada Trust", acct: "•••• 4172", match: "mismatch", subtitle: "Personal Chequing" },
  ] : ctx.bankMatch === "multi" ? [
    { bank: "RBC Royal Bank", acct: "•••• 2841", match: "match", subtitle: "Business Operating" },
    { bank: "RBC Royal Bank", acct: "•••• 9120", match: "match", subtitle: "Business Reserve" },
  ] : [
    { bank: "RBC Royal Bank", acct: "•••• 2841", match: "match", subtitle: "Business Operating" },
  ];
  return (
    <Card width="default" eyebrow="Step 2 · ID & Bank" title="Pick your payroll funding account" sub="These accounts came from your bank sign-in.">
      <div style={{ marginBottom: 18 }}>
        <Banner kind="success" title="ID verified — one more step">Now tell us which account to debit for payroll runs.</Banner>
      </div>
      <div className="pe-stack">
        {accts.map((a, i) => (
          <RadioCard key={i} selected={pick === i} onSelect={() => setPick(i)}
            icon={I.bank(16)}
            title={`${a.bank} — ${a.acct}`}
            caption={a.subtitle}
            right={a.match === "match" ? <Pill kind="green">Business name match</Pill> : <Pill kind="amber">Name mismatch</Pill>}/>
        ))}
      </div>
      {accts[pick]?.match === "mismatch" && (
        <div style={{ marginTop: 16 }}>
          <Banner kind="warning" title="We'll route this to manual review">The account name doesn't match your business name. You can keep going — we'll confirm via micro-deposit.</Banner>
        </div>
      )}
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("idv-wait")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ epayState: accts[pick].match === "match" ? "ready" : "in_review" }); go("idv-pad"); }}>Continue to PAD</Btn>
      </div>
    </Card>
  );
};

// 10 — PAD
const IDVPad = ({ ctx, go }) => {
  const [name, setName] = useState("");
  const [signed, setSigned] = useState(false);
  return (
    <Card width="default" eyebrow="Step 2 · ID & Bank" title="Sign your PAD agreement" sub="Your Pre-Authorized Debit agreement authorizes PayEvo to withdraw approved payroll runs from your account.">
      <div className="pe-pad-box">
        <p><b>Pre-Authorized Debit (PAD) Agreement</b></p>
        <p>By signing below, you authorize PaymentEvolution Systems Inc. ("PayEvo") to debit the bank account on file for payroll runs you have submitted, including statutory remittances and applicable fees.</p>
        <p>Debits will occur up to one (1) business day before the scheduled payment date. Unusual or out-of-pattern runs may be held briefly for review before funds move. You retain all rights afforded under Payments Canada Rule H1, including a 90-day reimbursement claim for unauthorized debits.</p>
        <p>This authorization remains in effect until cancelled in writing with 10 business days' notice.</p>
        <p>Governed by the laws of the province of {ctx.provinces?.[0] || "Ontario"} and applicable federal law of Canada.</p>
      </div>
      <div style={{ marginTop: 20 }}>
        <Field label="Type your full legal name to sign" required>
          <input className="pe-input" value={name} onChange={e => { setName(e.target.value); setSigned(!!e.target.value.trim()); }} placeholder="e.g. Alex Pereira"/>
        </Field>
      </div>
      <div className={`pe-sig ${signed ? "" : "empty"}`} style={{ marginTop: 14 }}>
        {signed ? name : "Your signature will appear here as you type."}
      </div>
      <div style={{ fontSize: 12, color: "var(--grey-600)", marginTop: 12, lineHeight: 1.6 }}>
        By signing, you agree this typed signature has the same legal force as an ink signature under PIPEDA and provincial e-signature legislation. A copy will be emailed to you.
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("idv-bank")}>Back</Btn>
        <Btn kind="success" disabled={!signed} large iconRight={I.arrowRight(14)} onClick={() => go("payroll-funding")}>Sign and continue</Btn>
      </div>
    </Card>
  );
};

// 11 — IDV manual
const IDVManual = ({ ctx, go }) => (
  <Card width="default" eyebrow="Step 2 · ID & Bank" title="Let's try manual verification" sub="No problem — we'll confirm your bank with two small micro-deposits in 1–2 business days. You're not blocked from running payroll.">
    <div className="pe-stack-lg">
      <Banner kind="info" title="What happens next">Two deposits under $1.00 will arrive in your account within 1–2 business days. Confirm the amounts in Settings to activate ePay direct deposit.</Banner>
      <div className="pe-stack-lg">
        <Field label="Financial institution" required>
          <select className="pe-select"><option>RBC Royal Bank</option><option>TD Canada Trust</option><option>Scotiabank</option><option>BMO</option><option>CIBC</option><option>Other</option></select>
        </Field>
        <div className="pe-field-row">
          <Field label="Branch (transit) number" required hint="5 digits"><input className="pe-input" placeholder="00123"/></Field>
          <Field label="Account number" required><input className="pe-input" placeholder="0000000"/></Field>
        </div>
        <Field label="Proof of bank ownership" hint="Void cheque or bank-issued PAD form. PDF/JPG/PNG, 10 MB max.">
          <div className="pe-drop">
            <div style={{ color: "var(--pe-blue)", marginBottom: 6 }}>{I.upload(20)}</div>
            <div className="pe-drop-title">Drop a file or browse</div>
          </div>
        </Field>
      </div>
    </div>
    <div className="pe-actions">
      <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("idv-prescreen")}>Back</Btn>
      <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ epayState: "in_review", epayVariant: "fallback" }); go("payroll-funding"); }}>Submit and continue</Btn>
    </div>
  </Card>
);

// 12 — Payroll funding
const PayrollFunding = ({ ctx, go }) => {
  const [runSoon, setRunSoon] = useState("yes");
  const [method, setMethod] = useState("etransfer");
  const epayPending = ctx.epayState !== "ready";
  const variant = ctx.epayVariant || (ctx.lane === "manual" ? "manual" : "standard");
  return (
    <Card width="default" eyebrow="Step 3 · Payroll" title="Set up payroll funding" sub="How and when you'd like to fund your first payroll.">
      {epayPending && <div style={{ marginBottom: 20 }}><StateBanner variant={variant} lang={ctx.lang}/></div>}
      {!epayPending && <div style={{ marginBottom: 20 }}><Banner kind="success" title="ePay is ready">Direct deposit is approved for your first payroll. Funds will move on your scheduled pay date.</Banner></div>}
      <div className="pe-section">
        <h4>Are you running payroll soon?</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <RadioCard selected={runSoon === "yes"} onSelect={() => setRunSoon("yes")} title="Yes, within the next 2 weeks" caption="We'll set you up to run right away."/>
          <RadioCard selected={runSoon === "no"} onSelect={() => setRunSoon("no")} title="Not yet" caption="Set up now, run later."/>
        </div>
      </div>
      {epayPending && runSoon === "yes" && (
        <div className="pe-section">
          <h4>Choose an interim funding method</h4>
          <div style={{ fontSize: 13, color: "var(--grey-600)", marginBottom: 12 }}>One-time, while ePay finishes verifying. ePay will take over from your second payroll onwards.</div>
          <div className="pe-stack">
            <RadioCard selected={method === "etransfer"} onSelect={() => setMethod("etransfer")} icon={I.send(16)}
              title="Interac e-Transfer" caption="Fastest. Recipient-confirmed. Under $25K per run."
              right={<Pill kind="green">Recommended</Pill>}/>
            <RadioCard selected={method === "billpay"} onSelect={() => setMethod("billpay")} icon={I.card(16)}
              title="Online bill payment" caption="From most Canadian banks. 1–2 business days. No fee."/>
            <RadioCard selected={method === "wire"} onSelect={() => setMethod("wire")} icon={I.bank(16)}
              title="Wire transfer" caption="For runs $10K and over. $15 flat fee."/>
          </div>
        </div>
      )}
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("idv-pad")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ fundingMethod: method, runSoon }); go("payroll-basics"); }}>Continue</Btn>
      </div>
    </Card>
  );
};

Object.assign(window, {
  RoleGate, EmployeeTerminal, Signup, OTC, BusinessBasics, BusinessAddress,
  BusinessOwners, IDVPrescreen, IDVInteract, IDVWait, IDVBank, IDVPad, IDVManual, PayrollFunding,
});
