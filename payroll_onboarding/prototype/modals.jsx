// =========================================================
// Modals: vacation, deductions, benefits, earnings, owner, director, YTD
// =========================================================

const PolicyModal = ({ kind, onClose, onSave }) => {
  const config = {
    vacation: {
      title: "Vacation policy",
      sub: "How is vacation accrued and paid for your employees?",
      body: (
        <div className="pe-stack-lg">
          <div>
            <div className="pe-label" style={{ marginBottom: 8 }}>Accrual method</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <RadioCard selected title="Paid on every cheque" caption="Vacation is added as a line item to each pay period."/>
              <RadioCard title="Accrued and banked" caption="Tracks a balance the employee can request from."/>
            </div>
          </div>
          <div className="pe-field-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <Field label="Base rate" hint="ON minimum: 4%"><input className="pe-input" defaultValue="4%"/></Field>
            <Field label="Step up after"><input className="pe-input" defaultValue="5 yrs"/></Field>
            <Field label="New rate"><input className="pe-input" defaultValue="6%"/></Field>
          </div>
          <label style={{ display: "flex", gap: 10, fontSize: 13 }}>
            <input type="checkbox"/>
            <span>Also accrue vacation for contractors (T4A)</span>
          </label>
        </div>
      ),
    },
    deductions: {
      title: "Deductions",
      sub: "Choose what to withhold from each paycheque.",
      body: (
        <div className="pe-stack-lg">
          <div>
            <div className="pe-label" style={{ marginBottom: 8 }}>Statutory (always on)</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Federal income tax", "Provincial income tax", "CPP / CPP2", "EI", "QPIP (QC only)"].map(d => (
                <label key={d} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--grey-600)" }}>
                  <input type="checkbox" checked disabled/>{d}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="pe-label" style={{ marginBottom: 8 }}>Optional</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Garnishments", "Group RRSP", "DPSP", "Health premiums", "Union dues", "Charitable giving"].map(d => (
                <label key={d} style={{ display: "flex", gap: 8, fontSize: 13 }}>
                  <input type="checkbox"/>{d}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="pe-label" style={{ marginBottom: 8 }}>Custom deduction</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="pe-input" placeholder="Name"/>
              <Btn kind="secondary">Add</Btn>
            </div>
          </div>
        </div>
      ),
    },
    benefits: {
      title: "Benefits",
      sub: "What does your company offer?",
      body: (
        <div className="pe-stack-lg">
          <div>
            <div className="pe-label" style={{ marginBottom: 8 }}>Health coverage</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <RadioCard selected title="None" caption="Skip for now."/>
              <RadioCard title="Basic" caption="Drug, dental, vision."/>
              <RadioCard title="Standard" caption="Adds paramedical and mental health."/>
              <RadioCard title="Premium" caption="Standard + travel + family coverage."/>
            </div>
          </div>
          <Field label="Retirement plan"><select className="pe-select"><option>None</option><option>Group RRSP</option><option>DCPP</option><option>DBPP</option></select></Field>
          <div className="pe-field-row">
            <Field label="Wellness stipend / mo"><input className="pe-input" defaultValue="$0"/></Field>
            <Field label="Waiting period"><select className="pe-select"><option>Day 1</option><option>30 days</option><option>90 days</option></select></Field>
          </div>
        </div>
      ),
    },
    earnings: {
      title: "Earning types",
      sub: "Which earning categories will appear on paystubs?",
      body: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {["Regular pay (locked)", "Overtime", "Stat holiday", "Vacation pay", "Bonus", "Commission", "Tips", "Reimbursements", "Per diem", "Severance", "Retroactive", "Sick leave"].map((d, i) => (
              <label key={d} style={{ display: "flex", gap: 8, fontSize: 13, color: i === 0 ? "var(--grey-600)" : "var(--ink)" }}>
                <input type="checkbox" checked={i < 4} disabled={i === 0}/>{d}
              </label>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="pe-label" style={{ marginBottom: 8 }}>Custom earning</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="pe-input" placeholder="e.g. Project bonus"/>
              <Btn kind="secondary">Add</Btn>
            </div>
          </div>
        </div>
      ),
    },
  }[kind];
  if (!config) return null;
  return (
    <Modal title={config.title} sub={config.sub} onClose={onClose}
      footer={<><Btn kind="ghost" onClick={onClose}>Cancel</Btn><Btn kind="primary" onClick={onSave}>Save changes</Btn></>}>
      {config.body}
    </Modal>
  );
};

const OwnerModal = ({ onClose }) => (
  <Modal title="Add a beneficial owner" sub="We need this for FINTRAC compliance. They won't be contacted unless there's an issue with the application." onClose={onClose}
    footer={<><Btn kind="ghost" onClick={onClose}>Cancel</Btn><Btn kind="primary" onClick={onClose}>Add owner</Btn></>}>
    <div className="pe-stack-lg">
      <Field label="Full legal name" required><input className="pe-input" placeholder="Maya Singh"/></Field>
      <div className="pe-field-row">
        <Field label="Date of birth" required><input className="pe-input" type="date"/></Field>
        <Field label="Ownership %" required hint="19% remaining"><input className="pe-input" placeholder="e.g. 19"/></Field>
      </div>
      <Field label="Residential address" required><input className="pe-input" placeholder="123 Main St, Toronto, ON"/></Field>
      <Field label="Email"><input className="pe-input" type="email" placeholder="optional"/></Field>
    </div>
  </Modal>
);

const YTDModal = ({ onClose }) => (
  <Modal title="Year-to-date payroll" sub="If this employee was paid earlier in the year, enter their YTD totals so deductions calculate correctly." onClose={onClose}
    footer={<><Btn kind="ghost" onClick={onClose}>Skip</Btn><Btn kind="primary" onClick={onClose}>Save YTD totals</Btn></>}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {[["Gross earnings YTD", "$0.00"], ["Federal tax YTD", "$0.00"], ["Provincial tax YTD", "$0.00"], ["CPP / CPP2 YTD", "$0.00"], ["EI YTD", "$0.00"], ["Vacation accrual carry-in", "$0.00"]].map(([l, v]) => (
        <Field key={l} label={l}><input className="pe-input" defaultValue={v}/></Field>
      ))}
    </div>
  </Modal>
);

Object.assign(window, { PolicyModal, OwnerModal, YTDModal });
