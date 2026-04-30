// =========================================================
// Screens B: 13-26 (payroll-basics through error-international)
// =========================================================

// 13 — Payroll basics
const PayrollBasics = ({ ctx, go }) => {
  const hasQC = (ctx.provinces || []).includes("QC");
  const epayPending = ctx.epayState !== "ready";
  const [showFlash, setShowFlash] = useState(ctx.justApproved);
  return (
    <Card width="default" eyebrow="Step 3 · Payroll" title="Payroll basics" sub="A few essentials for the CRA and your first run. We've pre-filled what we can.">
      {showFlash && <div style={{ marginBottom: 20 }}><Banner kind="success" title="Your ePay has been approved!">Direct deposit is now live. We'll use it for every payroll going forward.</Banner></div>}
      {epayPending && !showFlash && <div style={{ marginBottom: 20 }}><StateBanner variant={ctx.epayVariant || "standard"} lang={ctx.lang}/></div>}
      <div className="pe-section">
        <h4>Tax accounts</h4>
        <div className="pe-stack-lg">
          <Field label="CRA Payroll Account Number" required hint="Format: 123456789RP0001"><input className="pe-input" defaultValue="847291036RP0001"/></Field>
          {hasQC && <Field label="Revenu Québec Payroll Number" required hint="QC employer identification (NEQ + RP)"><input className="pe-input" defaultValue="1234567890 RS0001"/></Field>}
        </div>
      </div>
      <div className="pe-section">
        <h4>Schedule</h4>
        <div className="pe-stack-lg">
          <div className="pe-field-row">
            <Field label="Payroll year"><select className="pe-select"><option>2026</option><option>2027</option></select></Field>
            <Field label="Pay frequency" hint="We pre-selected Bi-weekly based on your industry."><select className="pe-select" defaultValue="biweekly"><option>Weekly</option><option value="biweekly">Bi-weekly</option><option>Semi-monthly</option><option>Monthly</option></select></Field>
          </div>
          <div className="pe-field-row">
            <Field label="Cycle start date"><input type="date" className="pe-input" defaultValue="2026-05-04"/></Field>
            <Field label="First payment date"><input type="date" className="pe-input" defaultValue="2026-05-15"/></Field>
          </div>
          <Field label="CRA remittance frequency" hint="We pre-selected Regular Monthly based on your annual payroll size."><select className="pe-select" defaultValue="monthly"><option>Quarterly</option><option value="monthly">Regular monthly</option><option>Threshold 1 (twice monthly)</option><option>Threshold 2 (weekly)</option></select></Field>
        </div>
      </div>
      <div className="pe-section">
        <h4>EI premium</h4>
        <div style={{ fontSize: 13, color: "var(--grey-600)", marginBottom: 12 }}>Default multiplier is 1.4×. Lower rates apply only if you have a Service Canada-approved Premium Reduction Plan.</div>
        <RadioCard selected title="Standard rate (1.4×)" caption="Most employers use this. No additional paperwork required."/>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => { setShowFlash(false); go("payroll-funding"); }}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("payroll-provincial")}>Continue</Btn>
      </div>
    </Card>
  );
};

// 14 — Payroll provincial
const PayrollProvincial = ({ ctx, go }) => {
  const provs = ctx.provinces || ["ON"];
  const blocks = [];
  if (provs.includes("ON")) blocks.push({ p: "ON", name: "Ontario", items: [["EHT exemption", "$1,000,000 (default)"], ["EHT rate", "1.95%"]] });
  if (provs.includes("QC")) blocks.push({ p: "QC", name: "Québec", items: [["CNESST", "1.37% — Class 1 default"], ["FSS / HSF", "1.25%"], ["QPIP / RQAP", "0.494% (set by Revenu Québec)"]] });
  if (provs.includes("BC")) blocks.push({ p: "BC", name: "British Columbia", items: [["EHT threshold", "$500,000"], ["EHT rate", "1.95%"]] });
  if (provs.includes("MB")) blocks.push({ p: "MB", name: "Manitoba", items: [["Health & Education tax", "2.15%"]] });
  if (provs.includes("NL")) blocks.push({ p: "NL", name: "Newfoundland & Labrador", items: [["HAPSET", "2.00%"]] });
  if (blocks.length === 0) {
    return (
      <Card width="default" eyebrow="Step 3 · Payroll" title="No provincial taxes apply" sub="Your selected provinces don't carry employer health or payroll taxes for now.">
        <Banner kind="info">You can add or remove provinces anytime in Settings.</Banner>
        <div className="pe-actions"><Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("payroll-basics")}>Back</Btn><Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("payroll-policies")}>Continue</Btn></div>
      </Card>
    );
  }
  return (
    <Card width="default" eyebrow="Step 3 · Payroll" title="Provincial payroll taxes" sub="Confirm the rates we've pre-loaded for each province where you employ people.">
      {ctx.epayState !== "ready" && <div style={{ marginBottom: 20 }}><StateBanner variant={ctx.epayVariant || "standard"} lang={ctx.lang}/></div>}
      <div className="pe-stack-lg">
        {blocks.map(b => (
          <div key={b.p} className="pe-prov">
            <div className="pe-prov-head">
              <div className="pe-prov-flag">{b.p}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{b.name}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {b.items.map(([k, v], i) => (
                <div key={i}>
                  <div style={{ fontSize: 12, color: "var(--grey-500)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 14, color: "var(--ink)", marginTop: 4, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}><Banner kind="info" title="Rates are set annually">If your category differs, edit the rate above. We'll re-confirm each January.</Banner></div>
      <div className="pe-actions"><Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("payroll-basics")}>Back</Btn><Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("payroll-policies")}>Continue</Btn></div>
    </Card>
  );
};

// 15 — Payroll policies
const PayrollPolicies = ({ ctx, go }) => {
  const [edits, setEdits] = useState({});
  const [modal, setModal] = useState(null);
  const policies = [
    { id: "vacation", icon: I.fileText(18), title: "Vacation", summary: "4% accrued, paid on every cheque. Ontario minimum." },
    { id: "deductions", icon: I.fileText(18), title: "Deductions", summary: "5 statutory deductions. No optional deductions yet." },
    { id: "benefits", icon: I.fileText(18), title: "Benefits", summary: "No health coverage or retirement plans configured." },
    { id: "earnings", icon: I.fileText(18), title: "Earning types", summary: "Regular pay, Overtime, Statutory holiday pay." },
  ];
  const anyEdited = Object.values(edits).some(Boolean);
  return (
    <Card width="default" eyebrow="Step 3 · Payroll" title="Confirm your payroll policies" sub="We've set sensible defaults based on your industry and provinces. Edit any that don't fit.">
      {ctx.epayState !== "ready" && <div style={{ marginBottom: 20 }}><StateBanner variant={ctx.epayVariant || "standard"} lang={ctx.lang}/></div>}
      <div className="pe-stack">
        {policies.map(p => (
          <ChipCard key={p.id} icon={p.icon} title={p.title} summary={p.summary} edited={!!edits[p.id]} onEdit={() => setModal(p.id)}/>
        ))}
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("payroll-provincial")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("employees-choice")}>{anyEdited ? "Continue with your changes" : "Everything looks right — Continue"}</Btn>
      </div>
      {modal && <PolicyModal kind={modal} onClose={() => setModal(null)} onSave={() => { setEdits({ ...edits, [modal]: true }); setModal(null); }}/>}
    </Card>
  );
};

// 16 — Employees choice
const EmployeesChoice = ({ ctx, go }) => {
  const employees = ctx.employees || [];
  return (
    <Card width="default" eyebrow="Step 4 · Employees" title="Add your team" sub="Bring everyone over by spreadsheet, or add them one at a time.">
      {ctx.epayState !== "ready" && employees.length > 0 && <div style={{ marginBottom: 20 }}><StateBanner variant={ctx.epayVariant || "standard"} lang={ctx.lang}/></div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="pe-path" onClick={() => go("employees-csv")}>
          <div className="pe-path-icon">{I.csv(20)}</div>
          <div className="pe-path-title">Import from CSV / Excel</div>
          <div className="pe-path-cap">Best if you already have employees in another system. Up to 5 MB.</div>
          <Btn kind="secondary" style={{ marginTop: 6, alignSelf: "flex-start" }} icon={I.upload(13)}>Upload file</Btn>
        </div>
        <div className="pe-path" onClick={() => go("employees-manual")}>
          <div className="pe-path-icon">{I.user(20)}</div>
          <div className="pe-path-title">Add one by one</div>
          <div className="pe-path-cap">Best if you have just a few employees. Takes about 90 seconds each.</div>
          <Btn kind="secondary" style={{ marginTop: 6, alignSelf: "flex-start" }} icon={I.plus(13)}>Add manually</Btn>
        </div>
      </div>
      {employees.length > 0 && (
        <div className="pe-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h4 style={{ margin: 0 }}>Added so far</h4>
            <Pill kind="green">{employees.length} employees · payroll-ready</Pill>
          </div>
          <table className="pe-table">
            <thead><tr><th>Name</th><th>Type</th><th>Province</th><th>Pay</th><th></th></tr></thead>
            <tbody>{employees.map((e, i) => (
              <tr key={i}><td><b style={{ fontWeight: 600 }}>{e.name}</b></td><td>{e.type}</td><td>{e.prov}</td><td style={{ fontVariantNumeric: "tabular-nums" }}>{e.pay}</td><td style={{ textAlign: "right", color: "var(--grey-500)" }}>{I.trash(14)}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("payroll-policies")}>Back</Btn>
        {employees.length > 0 ? <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("employees-review")}>Continue to review</Btn> : <span/>}
      </div>
    </Card>
  );
};

// 17 — Employees CSV
const EmployeesCSV = ({ ctx, go }) => {
  const [stage, setStage] = useState("idle");
  const errorRows = [
    { name: "Mira Patel", sin: "453-XX-001", err: "Invalid SIN format" },
    { name: "Tom Lee", sin: "529-118-902", err: "Province missing" },
  ];
  return (
    <Card width="wide" eyebrow="Step 4 · Employees" title="Import from CSV / Excel" sub="Use our template for the smoothest import. We'll validate every row before saving.">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Btn kind="secondary" icon={I.download(14)}>Download template</Btn>
        <span style={{ fontSize: 13, color: "var(--grey-600)" }}>CSV or XLSX, up to 5 MB.</span>
      </div>
      {stage === "idle" && (
        <div className="pe-drop" onClick={() => { setStage("uploading"); setTimeout(() => setStage("partial"), 1200); }}>
          <div style={{ color: "var(--pe-blue)", marginBottom: 8 }}>{I.upload(28)}</div>
          <div className="pe-drop-title">Drop your file or click to browse</div>
          <div className="pe-drop-sub">payevo-employees-template.csv</div>
        </div>
      )}
      {stage === "uploading" && <div style={{ padding: 40, textAlign: "center", color: "var(--grey-600)" }}><div style={{ width: 28, height: 28, border: "3px solid var(--grey-200)", borderTopColor: "var(--pe-blue)", borderRadius: "50%", margin: "0 auto 12px", animation: "spin .8s linear infinite" }}/>Validating 14 rows…</div>}
      {stage === "partial" && (
        <>
          <Banner kind="warning" title="2 rows need a fix"><span>12 of 14 employees imported successfully. Fix the rows below and click Retry.</span></Banner>
          <div style={{ marginTop: 14, border: "1px solid var(--grey-300)", borderRadius: 5, overflow: "hidden" }}>
            <table className="pe-table">
              <thead><tr><th>Name</th><th>SIN</th><th>Province</th><th>Error</th><th></th></tr></thead>
              <tbody>{errorRows.map((r, i) => (
                <tr key={i} className="row-err">
                  <td><input className="pe-input" defaultValue={r.name} style={{ padding: "6px 8px" }}/></td>
                  <td><input className="pe-input err" defaultValue={r.sin} style={{ padding: "6px 8px" }}/></td>
                  <td><select className="pe-select" style={{ padding: "6px 8px" }}><option>Select…</option><option>ON</option><option>QC</option><option>BC</option></select></td>
                  <td style={{ color: "var(--color-danger-dark)", fontSize: 13 }}>{r.err}</td>
                  <td><button className="pe-btn ghost" style={{ color: "var(--color-danger)" }}>{I.trash(13)}</button></td>
                </tr>))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Pill kind="green">12 employees imported · payroll-ready</Pill>
            <Btn kind="secondary" onClick={() => setStage("done")}>Retry these rows</Btn>
          </div>
        </>
      )}
      {stage === "done" && (
        <Banner kind="success" title="All 14 employees imported">We've matched provinces, validated SINs, and flagged anyone missing a banking address.</Banner>
      )}
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("employees-choice")}>Back</Btn>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ employees: SAMPLE_EMPLOYEES }); go("employees-review"); }} disabled={stage !== "done" && stage !== "partial"}>Continue to review</Btn>
      </div>
    </Card>
  );
};

const SAMPLE_EMPLOYEES = [
  { name: "Maya Singh", type: "Employee (T4)", prov: "ON", pay: "$84,000/yr", email: "maya@acmeco.ca", sin: "***-***-219" },
  { name: "Daniel Wong", type: "Employee (T4)", prov: "ON", pay: "$72,500/yr", email: "dwong@acmeco.ca", sin: "***-***-441" },
  { name: "Lin Chen", type: "Employee (T4)", prov: "ON", pay: "$28.50/hr", email: "lin@acmeco.ca", sin: "***-***-318" },
  { name: "Ravi Patel", type: "Employee (T4)", prov: "ON", pay: "$58,000/yr", email: "ravi@acmeco.ca", sin: "***-***-902" },
  { name: "Jordan Reyes", type: "Contractor (T4A)", prov: "BC", pay: "$55/hr", email: "jordan@reyesco.ca", sin: "***-***-118" },
];

// 18 — Employees manual
const EmployeesManual = ({ ctx, go }) => {
  const [type, setType] = useState("employee");
  const [showYTD, setShowYTD] = useState(false);
  return (
    <Card width="default" eyebrow="Step 4 · Employees" title="Add an employee" sub="We'll inherit your company defaults — override only what's different.">
      <div className="pe-section">
        <h4>Type</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <RadioCard selected={type === "employee"} onSelect={() => setType("employee")} title="Employee (T4)" caption="On payroll, with deductions and benefits."/>
          <RadioCard selected={type === "contractor"} onSelect={() => setType("contractor")} title="Contractor (T4A)" caption="Invoice-based, minimal deductions."/>
        </div>
      </div>
      <div className="pe-section">
        <h4>Personal</h4>
        <div className="pe-stack-lg">
          <div className="pe-field-row"><Field label="Legal name" required><input className="pe-input" placeholder="Sara Martinez"/></Field><Field label="Preferred name"><input className="pe-input" placeholder="Sara"/></Field></div>
          <div className="pe-field-row"><Field label="Personal email" required><input className="pe-input" type="email" placeholder="sara@email.com"/></Field><Field label="Mobile phone"><input className="pe-input" placeholder="(416) 555-0188"/></Field></div>
          <div className="pe-field-row"><Field label="Date of hire" required><input className="pe-input" type="date" defaultValue="2026-04-21"/></Field><Field label="Province of employment" required><select className="pe-select" defaultValue="ON"><option>ON</option><option>QC</option><option>BC</option></select></Field></div>
          <div className="pe-field-row"><Field label="SIN" required hint="Encrypted at rest. Only the last 3 digits are visible after save."><input className="pe-input" placeholder="000-000-000"/></Field><Field label="Date of birth" required><input className="pe-input" type="date"/></Field></div>
          <div className="pe-field-row"><Field label="Pay type" required><select className="pe-select"><option>Salaried</option><option>Hourly</option></select></Field><Field label="Pay rate" required><input className="pe-input" placeholder="$0.00"/></Field></div>
        </div>
      </div>
      <div className="pe-section">
        <h4>Inheritance</h4>
        <div className="pe-stack">
          <ChipCard icon={I.fileText(18)} title="Payroll rules" summary="Inherited from company — vacation 4%, statutory deductions, regular & overtime earnings." edited={false} onEdit={() => {}}/>
          <ChipCard icon={I.fileText(18)} title="YTD payroll" summary="Optional — for mid-year switchers." edited={false} onEdit={() => setShowYTD(true)}/>
          <ChipCard icon={I.bank(18)} title="Banking" summary="Optional — leave blank and we'll email them to add their own details via PayChequer." edited={false} onEdit={() => {}}/>
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("employees-choice")}>Back</Btn>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn kind="secondary" onClick={() => { ctx.set({ employees: SAMPLE_EMPLOYEES }); go("employees-choice"); }}>Save and add another</Btn>
          <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => { ctx.set({ employees: SAMPLE_EMPLOYEES }); go("employees-review"); }}>Save and continue</Btn>
        </div>
      </div>
      {showYTD && <YTDModal onClose={() => setShowYTD(false)}/>}
    </Card>
  );
};

// 19 — Employees review
const EmployeesReview = ({ ctx, go }) => {
  const employees = ctx.employees || SAMPLE_EMPLOYEES;
  const fundingLabel = ctx.fundingMethod === "billpay" ? "online bill payment" : ctx.fundingMethod === "wire" ? "wire transfer" : "Interac e-Transfer";
  return (
    <Card width="wide" eyebrow="Step 4 · Employees" title="Review your team" sub="Looks good? Let's pay them.">
      {ctx.epayState !== "ready" && <div style={{ marginBottom: 20 }}><StateBanner variant={ctx.epayVariant || "standard"} lang={ctx.lang} funding={fundingLabel}/></div>}
      <div style={{ border: "1px solid var(--grey-300)", borderRadius: 5, overflow: "hidden" }}>
        <table className="pe-table">
          <thead><tr><th>Name</th><th>Type</th><th>Province</th><th>SIN</th><th>Pay rate</th><th></th></tr></thead>
          <tbody>{employees.map((e, i) => (
            <tr key={i}>
              <td><div style={{ fontWeight: 600 }}>{e.name}</div><div style={{ color: "var(--grey-500)", fontSize: 12 }}>{e.email}</div></td>
              <td>{e.type}</td><td>{e.prov}</td><td style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{e.sin}</td>
              <td style={{ fontVariantNumeric: "tabular-nums" }}>{e.pay}</td>
              <td style={{ textAlign: "right", color: "var(--grey-500)" }}>{I.trash(13)}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14, fontSize: 13, color: "var(--grey-600)" }}>PayChequer invites are queued for {employees.filter(e => e.email).length} employees with email addresses.</div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("employees-choice")}>Back</Btn>
        <Btn kind="success" large iconRight={I.arrowRight(14)} onClick={() => go(ctx.lane === "manual" ? "manual-review-waiting" : "run-payroll")}>Run your first payroll</Btn>
      </div>
    </Card>
  );
};

// 20 — Manual review waiting
const ManualReviewWaiting = ({ ctx, go }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const deadline = new Date(now.getTime() + 38 * 3600 * 1000); // 38h from now
  const remaining = (() => {
    const ms = deadline - now;
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const days = Math.floor(h / 24);
    return days > 0 ? `in ${days} day ${h % 24} hours` : `in ${h} hours ${m} minutes`;
  })();
  const approaching = false; // SLA still distant
  return (
    <Card width="default" eyebrow="Step 5 · Run" title="Your account is being reviewed" sub="Because of your industry classification, we run a brief compliance check before your first payroll. You don't need to do anything else.">
      <div style={{ marginTop: 6 }}>
        <VStep state="done" title="Business details submitted" body="Apr 26, 2026 · 10:14 AM"/>
        <VStep state="done" title="Employees added" body={`${(ctx.employees || SAMPLE_EMPLOYEES).length} employees ready to be paid`}/>
        <VStep state="active" title="Compliance review in progress" body={`Expected by ${deadline.toLocaleString("en-CA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })} · ${remaining}`}/>
        <VStep state="pending" title="Approved — run payroll" body="You'll get an email the moment we're done."/>
      </div>
      <div style={{ marginTop: 24 }}>
        <Banner kind={approaching ? "warning" : "info"} title="We'll email you when we're done">Most accounts clear well within the 72-hour window. You can close this tab.</Banner>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("employees-review")}>Back</Btn>
        <Btn kind="secondary" onClick={() => go("run-payroll")}>Continue (simulate approval)</Btn>
      </div>
    </Card>
  );
};

// 21 — Run payroll
const RunPayroll = ({ ctx, go }) => {
  const employees = ctx.employees || SAMPLE_EMPLOYEES;
  const fundingLabel = ctx.epayState === "ready" ? "ePay direct deposit" : ctx.fundingMethod === "billpay" ? "online bill payment" : ctx.fundingMethod === "wire" ? "wire transfer" : "Interac e-Transfer";
  const rows = employees.map((e, i) => {
    const gross = 1500 + i * 230;
    const ded = Math.round(gross * 0.27);
    return { ...e, gross, ded, net: gross - ded };
  });
  const totals = rows.reduce((a, r) => ({ gross: a.gross + r.gross, ded: a.ded + r.ded, net: a.net + r.net }), { gross: 0, ded: 0, net: 0 });
  return (
    <Card width="wide" headerRight={<Pill kind="blue">Pay period · Apr 16 – Apr 30, 2026</Pill>} eyebrow="Step 5 · Run" title="Review and run your first payroll" sub="One last look before we move money. You can save and come back if anything's off.">
      <Banner kind="info" title="First payroll? Here's what to expect">Funds settle in 1–2 business days. We'll handle CRA remittances on your behalf. <a href="#" style={{ color: "var(--pe-blue)" }}>Watch the 90-second walkthrough →</a></Banner>
      <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--grey-75)", borderRadius: 5, fontSize: 13, color: "var(--grey-700)", display: "flex", justifyContent: "space-between" }}>
        <span><b>Funding method:</b> {fundingLabel}</span>
        <span><b>Pay date:</b> May 15, 2026</span>
      </div>
      <div style={{ marginTop: 16, border: "1px solid var(--grey-300)", borderRadius: 5, overflow: "hidden" }}>
        <table className="pe-table">
          <thead><tr><th>Employee</th><th>Hours / Salary</th><th style={{ textAlign: "right" }}>Gross</th><th style={{ textAlign: "right" }}>Deductions</th><th style={{ textAlign: "right" }}>Net</th></tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i}>
              <td><b style={{ fontWeight: 600 }}>{r.name}</b></td><td>{r.pay.includes("/hr") ? "80 h" : "Salary"}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${r.gross.toLocaleString()}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--grey-600)" }}>−${r.ded.toLocaleString()}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>${r.net.toLocaleString()}</td>
            </tr>))}
            <tr style={{ background: "var(--grey-75)", fontWeight: 700 }}>
              <td colSpan={2}>Totals · {rows.length} employees</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${totals.gross.toLocaleString()}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>−${totals.ded.toLocaleString()}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${totals.net.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pe-section">
        <h4>CRA remittance</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[["CPP", `$${Math.round(totals.gross * 0.058).toLocaleString()}`], ["EI", `$${Math.round(totals.gross * 0.0166).toLocaleString()}`], ["Income tax", `$${Math.round(totals.gross * 0.18).toLocaleString()}`], ["Due date", "May 15, 2026"]].map(([k, v]) => (
            <div key={k} className="pe-stat">
              <div className="pe-stat-label">{k}</div>
              <div className="pe-stat-value" style={{ fontSize: 22 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("employees-review")}>Back</Btn>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn kind="secondary">Save draft</Btn>
          <Btn kind="success" large iconRight={I.arrowRight(14)} onClick={() => go("activation-submitted")}>Submit payroll · ${totals.net.toLocaleString()}</Btn>
        </div>
      </div>
    </Card>
  );
};

// 22 — Activation submitted
const ActivationSubmitted = ({ ctx, go }) => {
  const employees = ctx.employees || SAMPLE_EMPLOYEES;
  const totals = employees.reduce((a, _, i) => a + (1500 + i * 230) * 0.73, 0);
  const onHold = ctx.amlHold;
  return (
    <Card width="default">
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <Pill kind={onHold ? "amber" : "blue"}>{onHold ? "On verification hold" : "Submitted · awaiting funding"}</Pill>
      </div>
      <h2 className="pe-h-screen" style={{ textAlign: "center", marginTop: 12 }}>Payroll is on its way</h2>
      <p className="pe-sub" style={{ textAlign: "center", margin: "8px auto 24px" }}>Your first PayEvo payroll has been submitted. Funds settle in 1–2 business days, and we'll confirm activation once they're in your employees' accounts.</p>
      {onHold && (
        <Banner kind="warning" title="We're verifying this payroll before funds move">A small number of first runs go through a brief verification — typical resolution is under 4 business hours. We'll email you as soon as it clears.</Banner>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "24px 0" }}>
        <div className="pe-stat"><div className="pe-stat-label">Employees paid</div><div className="pe-stat-value">{employees.length}</div></div>
        <div className="pe-stat"><div className="pe-stat-label">Total gross</div><div className="pe-stat-value">${Math.round(totals * 1.36).toLocaleString()}</div></div>
        <div className="pe-stat"><div className="pe-stat-label">Time so far</div><div className="pe-stat-value">28 min</div></div>
      </div>
      <Banner kind="info" title="CRA remittance scheduled">We'll remit CPP, EI, and income tax by May 15, 2026.</Banner>
      <div className="pe-section">
        <h4>What's next</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Add more employees", "Bring the rest of your team on."], ["Connect accounting", "Sync with QuickBooks or Xero."], ["Schedule next payroll", "Set a recurring run."], ["Invite your accountant", "Give them view-only access."]].map(([t, s], i) => (
            <div key={i} style={{ border: "1px solid var(--grey-300)", borderRadius: 5, padding: 14, cursor: "pointer" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
              <div style={{ fontSize: 13, color: "var(--grey-600)", marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pe-actions">
        <Btn kind="ghost" onClick={() => go("run-payroll")}>Back to payroll</Btn>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn kind="secondary" onClick={() => go("funding-failed")}>Simulate failure</Btn>
          <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("activation-funded")}>Simulate funding</Btn>
        </div>
      </div>
    </Card>
  );
};

// 23 — Activation funded
const ActivationFunded = ({ ctx, go }) => {
  const employees = ctx.employees || SAMPLE_EMPLOYEES;
  const totals = employees.reduce((a, _, i) => a + (1500 + i * 230) * 1.0, 0);
  const fundingLabel = ctx.epayState === "ready" ? "ePay direct deposit" : ctx.fundingMethod === "billpay" ? "online bill payment" : ctx.fundingMethod === "wire" ? "wire transfer" : "Interac e-Transfer";
  return (
    <Card width="default">
      <div style={{ textAlign: "center", padding: "8px 0 18px" }}>
        <div className="pe-pop" style={{ fontSize: 56 }}>🎉</div>
        <h2 className="pe-h-screen" style={{ marginTop: 16 }}>You're activated</h2>
        <p className="pe-sub" style={{ margin: "8px auto 0", maxWidth: 520 }}>Your first payroll is funded and on its way to your team. This is the moment that matters.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "24px 0" }}>
        <div className="pe-stat"><div className="pe-stat-label">Employees paid</div><div className="pe-stat-value">{employees.length}</div></div>
        <div className="pe-stat"><div className="pe-stat-label">Total gross</div><div className="pe-stat-value">${Math.round(totals).toLocaleString()}</div></div>
        <div className="pe-stat"><div className="pe-stat-label">Time to first payroll</div><div className="pe-stat-value">31 min</div></div>
      </div>
      <Banner kind="success" title={`Funded via ${fundingLabel}`}>Confirmed at {new Date().toLocaleString("en-CA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}.</Banner>
      <div className="pe-section">
        <h4>What's next</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Schedule the next payroll", "Set a recurring run on your cycle."], ["Connect your accounting", "Sync with QuickBooks or Xero."], ["Add more employees", "Onboard the rest of your team."], ["Invite your accountant", "Give them view-only access."]].map(([t, s], i) => (
            <div key={i} style={{ border: "1px solid var(--grey-300)", borderRadius: 5, padding: 14, cursor: "pointer" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
              <div style={{ fontSize: 13, color: "var(--grey-600)", marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pe-actions">
        <span/>
        <Btn kind="primary" iconRight={I.arrowRight(14)} onClick={() => go("role-gate")}>Go to dashboard</Btn>
      </div>
    </Card>
  );
};

// 24 — Funding failed
const FundingFailed = ({ go }) => (
  <Card width="default">
    <Banner kind="error" title="We couldn't fund your first payroll">Your bank rejected the debit — it looks like the account had insufficient funds at the time we attempted.</Banner>
    <h2 className="pe-h-screen" style={{ textAlign: "center", marginTop: 24 }}>Let's get this back on track</h2>
    <p className="pe-sub" style={{ textAlign: "center", margin: "8px auto 24px" }}>Your employees haven't been paid yet — pick how you'd like to fix this and we'll re-run within the hour.</p>
    <div style={{ marginTop: 16 }}>
      <h4 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>What happened</h4>
      <div style={{ border: "1px solid var(--grey-300)", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--grey-150)", fontSize: 13 }}><span>1:42 PM</span><span>Debit attempted at RBC •••• 2841</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--grey-150)", fontSize: 13 }}><span>1:43 PM</span><span style={{ color: "var(--color-danger-dark)" }}>Rejected — Reason 901: Not Sufficient Funds</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", fontSize: 13 }}><span>1:44 PM</span><span>Payroll paused, you were notified</span></div>
      </div>
    </div>
    <div className="pe-section">
      <h4>Pick a path forward</h4>
      <div className="pe-stack">
        <RadioCard selected title="Switch to Interac e-Transfer" caption="Send funds directly from a different account today. Same employees, same totals." icon={I.send(16)}/>
        <RadioCard title="Add a different bank account" caption="Update ePay with another business account. Re-runs from there once verified." icon={I.bank(16)}/>
        <RadioCard title="Chat with our team" caption="Get a human on it — usually under 5 minutes during business hours." icon={I.message(16)}/>
      </div>
    </div>
    <div className="pe-actions">
      <Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("activation-submitted")}>Back</Btn>
      <Btn kind="primary" iconRight={I.arrowRight(14)}>Re-run payroll</Btn>
    </div>
  </Card>
);

// 25 — Error international
const ErrorInternational = ({ go }) => (
  <Card width="default" headerRight={<span style={{ color: "var(--pe-blue)" }}>{I.globe(20)}</span>} eyebrow="A different fit" title="We have something for international teams" sub="PayEvo is purpose-built for Canadian payroll. For multi-country teams or non-Canadian operations, our partner product International Plus will serve you better.">
    <div className="pe-stack-lg">
      <Banner kind="info" title="What you get with International Plus">Multi-currency payroll, local tax handling in 80+ countries, contractor-and-employee support, and a single dashboard for global teams.</Banner>
    </div>
    <div className="pe-actions"><Btn kind="ghost" icon={I.arrowLeft(14)} onClick={() => go("business-address")}>Back</Btn><Btn kind="primary" iconRight={I.arrowRight(14)}>Explore International Plus</Btn></div>
  </Card>
);

Object.assign(window, {
  PayrollBasics, PayrollProvincial, PayrollPolicies, EmployeesChoice, EmployeesCSV,
  EmployeesManual, EmployeesReview, ManualReviewWaiting, RunPayroll,
  ActivationSubmitted, ActivationFunded, FundingFailed, ErrorInternational, SAMPLE_EMPLOYEES,
});
