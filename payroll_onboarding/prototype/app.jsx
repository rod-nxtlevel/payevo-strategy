// =========================================================
// App shell — context, navigation, screen index, tweaks
// =========================================================

const SCREENS = [
  { id: "role-gate", step: -1, label: "Role gate", group: "Sign up", Comp: RoleGate },
  { id: "signup", step: -1, label: "Sign up", group: "Sign up", Comp: Signup },
  { id: "otc", step: -1, label: "Email code", group: "Sign up", Comp: OTC },
  { id: "employee-terminal", step: -1, label: "Employee terminal", group: "Sign up", Comp: EmployeeTerminal },
  { id: "business-basics", step: 0, label: "Business basics", group: "Business", Comp: BusinessBasics },
  { id: "business-address", step: 0, label: "Address & provinces", group: "Business", Comp: BusinessAddress },
  { id: "business-owners", step: 0, label: "Ownership & signing", group: "Business", Comp: BusinessOwners },
  { id: "idv-prescreen", step: 1, label: "IDV prescreen", group: "ID & Bank", Comp: IDVPrescreen },
  { id: "idv-interact", step: 1, label: "IDV — QR handoff", group: "ID & Bank", Comp: IDVInteract },
  { id: "idv-wait", step: 1, label: "IDV — verifying", group: "ID & Bank", Comp: IDVWait },
  { id: "idv-bank", step: 1, label: "Bank picker", group: "ID & Bank", Comp: IDVBank },
  { id: "idv-pad", step: 1, label: "PAD signature", group: "ID & Bank", Comp: IDVPad },
  { id: "idv-manual", step: 1, label: "Manual fallback", group: "ID & Bank", Comp: IDVManual },
  { id: "payroll-funding", step: 2, label: "Payroll funding", group: "Payroll", Comp: PayrollFunding },
  { id: "payroll-basics", step: 2, label: "Payroll basics", group: "Payroll", Comp: PayrollBasics },
  { id: "payroll-provincial", step: 2, label: "Provincial taxes", group: "Payroll", Comp: PayrollProvincial },
  { id: "payroll-policies", step: 2, label: "Policies", group: "Payroll", Comp: PayrollPolicies },
  { id: "employees-choice", step: 3, label: "Add employees", group: "Employees", Comp: EmployeesChoice },
  { id: "employees-csv", step: 3, label: "CSV import", group: "Employees", Comp: EmployeesCSV },
  { id: "employees-manual", step: 3, label: "Add manually", group: "Employees", Comp: EmployeesManual },
  { id: "employees-review", step: 3, label: "Review team", group: "Employees", Comp: EmployeesReview },
  { id: "manual-review-waiting", step: 4, label: "Manual review", group: "Run", Comp: ManualReviewWaiting },
  { id: "run-payroll", step: 4, label: "Run payroll", group: "Run", Comp: RunPayroll },
  { id: "activation-submitted", step: 4, label: "Submitted", group: "Run", Comp: ActivationSubmitted },
  { id: "activation-funded", step: 4, label: "Activated 🎉", group: "Run", Comp: ActivationFunded },
  { id: "funding-failed", step: 4, label: "Funding failed", group: "Run", Comp: FundingFailed },
  { id: "error-international", step: -1, label: "International", group: "Edge", Comp: ErrorInternational },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bizType": "corp-fed",
  "provinces": "ON",
  "bankMatch": "match",
  "lang": "en",
  "lane": "standard"
}/*EDITMODE-END*/;

function App() {
  const [tw, setTw] = useTweaks(TWEAK_DEFAULTS);
  const [screenId, setScreenId] = useState("role-gate");
  const [indexOpen, setIndexOpen] = useState(false);
  const [ctxState, setCtxState] = useState({});

  // Translate tweaks into ctx
  const provincesArray = useMemo(() => {
    const p = tw.provinces || "ON";
    return p === "ON-QC" ? ["ON", "QC"] : p === "ON-BC" ? ["ON", "BC"] : p === "ON-QC-BC" ? ["ON", "QC", "BC"] : [p];
  }, [tw.provinces]);

  const ctx = {
    ...ctxState,
    bizType: tw.bizType,
    provinces: provincesArray,
    bankMatch: tw.bankMatch,
    lang: tw.lang,
    lane: tw.lane,
    epayState: ctxState.epayState ?? (tw.bankMatch === "match" && tw.lane !== "manual" ? "ready" : "in_review"),
    epayVariant: ctxState.epayVariant ?? (tw.lane === "manual" ? "manual" : tw.bankMatch === "mismatch" ? "fallback" : "standard"),
    set: (patch) => setCtxState(s => ({ ...s, ...patch })),
  };

  const screen = SCREENS.find(s => s.id === screenId) || SCREENS[0];
  const go = (id) => { setScreenId(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const groups = ["Sign up", "Business", "ID & Bank", "Payroll", "Employees", "Run", "Edge"];

  return (
    <div className="pe-app" data-screen-label={screen.label}>
      <Header stepIdx={screen.step} lang={tw.lang} onLang={(l) => setTw("lang", l)} onIndex={() => setIndexOpen(o => !o)} indexOpen={indexOpen}/>
      <div className="pe-stage">
        <screen.Comp ctx={ctx} go={go}/>
      </div>
      <HelpFab/>

      <div className={`pe-index ${indexOpen ? "open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px 12px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Screen index</div>
          <button className="pe-modal-close" onClick={() => setIndexOpen(false)}>{I.x(16)}</button>
        </div>
        {groups.map(g => {
          const items = SCREENS.filter(s => s.group === g);
          if (!items.length) return null;
          return (
            <div key={g}>
              <div className="pe-index-section">{g}</div>
              {items.map((s, i) => (
                <div key={s.id} className={`pe-index-item ${s.id === screenId ? "active" : ""}`} onClick={() => { go(s.id); }}>
                  <span className="pe-index-num">{SCREENS.findIndex(x => x.id === s.id).toString().padStart(2, "0")}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Business">
          <TweakSelect label="Business type" value={tw.bizType} onChange={(v) => setTw("bizType", v)} options={[
            { value: "sole", label: "Sole proprietor" },
            { value: "corp-fed", label: "Corporation — Federal" },
            { value: "corp-prov", label: "Corporation — Provincial" },
            { value: "partnership", label: "Partnership" },
          ]}/>
          <TweakRadio label="Active provinces" value={tw.provinces} onChange={(v) => setTw("provinces", v)} options={[
            { value: "ON", label: "ON" },
            { value: "ON-QC", label: "ON+QC" },
            { value: "ON-BC", label: "ON+BC" },
            { value: "ON-QC-BC", label: "All 3" },
          ]}/>
        </TweakSection>
        <TweakSection title="Risk & Bank">
          <TweakRadio label="Bank match" value={tw.bankMatch} onChange={(v) => setTw("bankMatch", v)} options={[
            { value: "match", label: "Match" },
            { value: "multi", label: "Multi" },
            { value: "mismatch", label: "Mismatch" },
          ]}/>
          <TweakRadio label="Risk lane (silent)" value={tw.lane} onChange={(v) => setTw("lane", v)} options={[
            { value: "fast", label: "Fast" },
            { value: "standard", label: "Standard" },
            { value: "manual", label: "Manual" },
          ]}/>
        </TweakSection>
        <TweakSection title="Locale">
          <TweakRadio label="Language" value={tw.lang} onChange={(v) => setTw("lang", v)} options={[
            { value: "en", label: "English" },
            { value: "fr", label: "Français" },
          ]}/>
        </TweakSection>
        <TweakSection title="Jump to milestone">
          <TweakButton onClick={() => go("idv-prescreen")}>IDV start</TweakButton>
          <TweakButton onClick={() => go("payroll-funding")}>Payroll funding</TweakButton>
          <TweakButton onClick={() => go("employees-review")}>Employees review</TweakButton>
          <TweakButton onClick={() => go("activation-funded")}>Activation 🎉</TweakButton>
          <TweakButton onClick={() => go("funding-failed")}>Funding failed</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
