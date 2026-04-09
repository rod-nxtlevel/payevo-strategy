# PayEvo Adaptive Onboarding PRD

Date: 2026-04-07
Status: Draft
Owner: Rodrigo

---

## 1. Problem

PayEvo's current onboarding prototype is strong on speed. The three-field signup and immediate email verification are the right foundation. But the flow after verification assumes a single happy path: every user walks through the same five-step wizard regardless of who they are, what they want to do, or how much risk they represent.

That creates three problems:

1. **Compliance exposure.** PayEvo cannot tell whether the person filling in forms is the actual signer, an accountant setting up a client, or an admin without authority. Screening happens too late or to the wrong person.
2. **Unnecessary friction for simple cases.** A sole proprietor who only wants manual payroll inherits the same verification steps as a corporation requesting $100,000 in PAD exposure.
3. **Incomplete journeys.** The prototype does not show what happens when the signer is absent, when the business is a returning client, or when risk signals require enhanced review. Users hit dead ends.

The redesign must fix all three without losing the speed and simplicity that make the first two screens work.

---

## 2. Product Goal

Design an onboarding experience that:

- **Protects PayEvo from fraud and compliance exposure** as the highest priority
- **Gets legitimate users to payroll value fast** as the primary user-facing promise
- **Reduces friction wherever risk does not justify it** by routing customers into the right lane early
- **Supports multiple real journeys** without forcing everyone through the same maximum-friction path

The customer's experience should feel like: "That was easy. I set up my business, added my first employee, and I'm ready to run payroll." The compliance work should feel invisible when risk is low, and clearly justified when it is not.

---

## 3. Success Criteria

### Primary (compliance)

- PayEvo can identify the correct signer or authority holder before any screening begins.
- PayEvo can distinguish low-risk from elevated-risk onboarding paths before asking for deeper information.
- The flow collects the minimum information needed to safely enable payroll and, when requested, ePay.

### Secondary (customer experience)

- A low-risk business owner reaches "ready to run payroll" in a single session, ideally under 6 minutes.
- Low-risk payroll-only users complete setup without document uploads, IDV, or bank verification.
- Repeat or linked-account users get faster treatment when prior verification can be reused.
- Every user leaves onboarding knowing exactly what is ready, what is pending, and what they need to do next.

### Activation definitions

- **Payroll activation:** workspace created, payroll defaults configured, at least one employee added, ready to run a payroll draft.
- **ePay activation:** business profile created, signer identified and verified, bank verified, required docs collected, PAD limit approved, digital signature captured.

---

## 4. Non-Goals

- Full underwriting automation for all entity types in v1.
- Perfect registry auto-fill on day one. Manual confirmation and fallback flows must still work.
- Replacing all manual review for higher-risk cases. Some applications will always need human review.
- Capturing every optional payroll setting during first-run onboarding. Advanced configuration belongs post-setup.
- Blocking manual payroll setup just because ePay verification is incomplete.

---

## 5. Design Principles

### 1. The customer came here to run payroll, not to fill out compliance forms

The experience should feel like setting up payroll. Compliance questions should be woven in naturally, not presented as a separate bureaucratic phase. When extra information is needed, explain why in one sentence.

### 2. Compliance before convenience, but only where it matters

Friction can be reduced only after the system has enough information to trust the lane. But friction should never be added where risk does not require it. A sole proprietor doing manual payroll should not see beneficial-owner collection screens.

### 3. Progressive disclosure

Ask universal questions first. Reveal additional questions only when role, entity type, product intent, or risk level requires them. The user should never wonder "why are you asking me this?"

### 4. Route by intent and authority early

Determine three things before deeper setup:
- What does the customer want to do? (payroll only, payroll + ePay, setting up for a client)
- Who are they relative to the business? (owner/signer, accountant, payroll admin)
- Can they authorize what needs to be authorized? (signing authority yes/no)

### 5. Separate setup from optimization

Only collect information required to safely reach value. Push optional settings, advanced tax overrides, employee bank details, and SIN collection to guided follow-up steps after the first payroll milestone.

### 6. Reuse trust where possible

If the user is tied to an existing verified PayEvo relationship, use that to reduce redundant effort. Once an ID or bank account has been verified, the verification can be applied across the entire account and for other accounts too.

---

## 6. User Types

### A. Business owner or signing officer

The most common and most straightforward path. This person can authorize everything.

**Typical goals:**
- Set up payroll quickly
- Optionally enable direct deposit and remittances (ePay)
- Add employees and run the first payroll

**What they care about:** speed, simplicity, getting to value. They trust that PayEvo handles compliance correctly and do not want to think about it more than necessary.

### B. Accountant or bookkeeper onboarding on behalf of a client

Needs authority-aware routing. Can do operational setup but cannot satisfy signer verification alone.

**Typical goals:**
- Create the workspace and configure company details
- Add employees, possibly in bulk with addresses and full detail
- Trigger a signer invite so the client can complete compliance steps

**Key constraint:** the accountant cannot satisfy signer verification unless they are also a valid signing authority for that business.

### C. Payroll admin or operations user without signing authority

Can complete operational setup but cannot authorize ePay or sign compliance documents.

**Typical goals:**
- Configure payroll settings and add employees
- Hand off signer and ePay steps to the business owner

### D. Existing client opening another account

Should get a faster path if linked to a verified prior relationship.

**Typical goals:**
- Set up a new entity without repeating full verification
- Reuse prior IDV and bank verification where policy allows

**Policy answer:** once an ID and/or bank account has been verified, the verification can be applied across the entire account and for other accounts too. If the prior relationship is recent and risk-consistent, reduce duplicate steps.

---

## 7. The Onboarding Flow

The flow has seven stages. Every user starts with stages 0-1. After that, the path adapts based on what was learned in stage 1.

### Stage 0. Create Account

**What the user sees:** a clean signup form. Three fields. Google SSO option. No compliance questions.

**Collect:**
- Work email
- Full name
- Password (or Google SSO)

**Then:** immediate email verification with a 6-digit code before any setup work begins.

**Why this stays:** it is the strongest part of the current prototype. Do not add fields here.

---

### Stage 1. Tell Us About Yourself

**What the user sees:** a friendly screen that asks what they want to do and who they are. This feels like personalization, not interrogation.

**Collect:**

**What are you setting up?**
- Run payroll (fastest path, no ePay friction)
- Payroll + direct deposit and remittances (standard path, ePay verification required)
- Setting up for a client (accountant/bookkeeper path, signer delegation)

**Your role:**
- I am the business owner or signing officer
- I am an accountant or bookkeeper
- I am a payroll admin or employee

**Do you have an existing PayEvo account?**
- No, this is new
- Yes (enter account ID or referral code)

**Why this stage exists:** it is the earliest point where the flow can decide whether to prioritize speed, verification, or delegation. Without it, every user gets the same path.

**What the system decides here:**
- Whether ePay verification screens will appear at all
- Whether the current user is the person who should be screened
- Whether linked-account shortcuts apply
- The initial risk posture for the rest of the flow

---

### Stage 2. Company Profile

**What the user sees:** a business information form that feels like standard payroll setup. The compliance-relevant fields (entity type, jurisdiction, industry) are mixed in naturally.

**Collect:**
- Legal business name
- Operating name (optional)
- Business address (with auto-complete)
- Entity type: sole proprietorship, corporation, partnership, non-profit, other
- Jurisdiction of incorporation/registration: federal Canada, provincial, foreign
- Industry (searchable dropdown with enough granularity for risk assessment -- not just 8 categories, but grouped so it feels simple)
- Employee count band: 1-5, 6-25, 26-100, 100+

**Conditional fields:**
- CRA/MRQ number: shown if the user selected payroll + ePay, or if remittances are being enabled. Optional for payroll-only customers.
- Linked account/referral ID: shown if the user indicated they already work with PayEvo.

**Business lookup opportunity:** if the user enters a CRA number or the business name matches a registry, offer to pre-fill details. The user confirms rather than types.

**What the system learns here:**
- Entity type determines whether beneficial owners need to be collected later (corporations) or can be skipped (sole props where signer = owner).
- Jurisdiction determines whether federal registry lookup is available for owner confirmation.
- Industry flags whether finance or health triggers elevated risk.

---

### Stage 3. Payroll Essentials

**What the user sees:** a payroll configuration screen that feels like the original prototype's "Payroll Basics" step. Clean, focused, with smart defaults.

**Collect:**
- Payroll year (defaults to 2026, with option for 2025 if within the allowed window)
- Pay frequency: weekly, bi-weekly, semi-monthly, monthly
- Primary province for tax defaults
- First pay date or current period
- Remittance frequency (only if remittances are being enabled)

**Conditional (shown only when triggered by province):**
- Ontario: EHT threshold question
- Quebec: CNESST/HSF/QPP-related settings
- BC: relevant provincial questions

**What is NOT collected here:**
- Benefits and deductions setup (deferred unless user indicates these exist)
- Advanced company rules (deferred to post-setup)
- Employee-level tax overrides (handled per-employee later)

---

### Stage 4. Payment and Verification

**Who sees this stage:** only users who selected payroll + ePay, or whose plan requires ePay-related screening. Payroll-only users skip this entirely and go straight to Stage 5.

**What the user sees:** a verification flow that explains why each step is needed. The tone is protective, not bureaucratic: "We verify your identity and bank to keep your account secure."

**Sub-steps:**

**4a. Signer confirmation**
- Confirm: are you the signing officer? (pre-filled from Stage 1)
- If yes: capture signer name, title, email (may already be known)
- If no: collect signer contact details and trigger a signer invite. The current user continues with payroll setup while the signer completes verification separately.

**4b. Identity verification**
- Primary method: online IDV (Deep IDV / Flinks integration)
- The user does not upload ID photos in-app. The IDV provider handles this externally.
- If online IDV fails: fall back to manual ID review (upload + staff review)

**4c. Bank verification**
- Primary method: online bank verification (connect via banking credentials)
- The user selects which account to use. Account details are pulled automatically.
- If online bank verification fails: fall back to void cheque upload or micro-payment confirmation.

**4d. Business documentation**
- Upload one ownership or registration document (articles of incorporation, business registration, etc.)
- This is the only document upload required for standard cases.

**4e. PAD limit and payment intent**
- Intended payment behavior: direct deposit only, remittances only, or both
- PAD limit is calculated proportionally based on employee count, not chosen from an arbitrary dropdown

**PAD limit calculator:**

The system should suggest a default PAD limit based on the number of employees the business is setting up. The baseline assumption is a median monthly payroll cost of **$7,500 per employee** (covering gross pay, employer contributions, and remittances).

| Employees | Suggested PAD limit | Calculation |
|-----------|-------------------|-------------|
| 1-5 | $37,500 | 5 x $7,500 |
| 6-25 | $187,500 | 25 x $7,500 |
| 26-100 | $750,000 | 100 x $7,500 |
| 100+ | Custom | Requires manual review |

The user sees the suggested limit pre-filled and can adjust it:
- **At or below the suggested limit:** standard processing. The limit is proportional to the declared payroll size, so the risk is expected.
- **Above the suggested limit but under $50,000:** still standard processing, but the system notes the discrepancy for review context.
- **$50,000 and above (regardless of employee count):** elevated risk. May trigger enhanced review depending on other signals.
- **Significantly above the proportional suggestion:** the system should ask the user to explain the reason (e.g., large bonuses, back-pay, seasonal spikes) to give the risk team context.

This approach has three benefits:
1. The user does not have to guess what limit to request. The system proposes something reasonable.
2. PayEvo gets a built-in sanity check: a 3-employee sole prop requesting $300,000 PAD is immediately flagged as disproportionate.
3. The limit can grow naturally as the business adds employees, creating a clear upgrade path rather than a one-time decision.

**4f. Beneficial owners (conditional)**
- Shown only for corporations where ownership verification is required
- Sole proprietors: skipped entirely (signer = owner)
- Federal corporations: if registry lookup is available, pre-fill owners and ask user to confirm
- Provincial/foreign corporations: ask user to manually enter beneficial owners (name, role, ownership %)

**4g. Digital signature**
- Pre-fill the signer's name in a cursive-style font
- Checkbox confirmation: "I confirm I am authorized to sign for this business"
- No wet signature required. E-signature is sufficient for all cases.

**Risk routing outcomes from this stage:**

| Signal | Result |
|--------|--------|
| Owner present, simple entity, low-risk industry, PAD at or below proportional suggestion, verification passes | **Low friction.** ePay approved in-session. |
| Standard corporation, PAD at or below proportional suggestion, verification passes | **Standard compliance.** ePay approved or pending brief review. |
| PAD $50k+ or significantly above proportional suggestion, high-risk industry (finance, health), foreign incorporation, verification fails, ownership unclear | **Elevated friction.** Route to manual review. Payroll still available. |
| Signer not present (admin or accountant path) | **Delegated.** Signer invite sent. ePay locked until signer completes. |

---

### Stage 5. Add Your First Employee

**What the user sees:** the same clean employee-addition form from the original prototype. This is where the user starts to feel real operational value.

**Required fields (minimum for correct payroll calculation):**
- First name
- Last name
- Employee or contractor
- Hire date
- Date of birth (needed for CPP/QPP age-based calculations)
- Pay frequency (defaults to company setting, changeable)
- Pay type: salary or hourly
- Rate of pay
- Province of employment
- YTD values (required only if migrating mid-year from another system)

**Optional / deferrable fields:**
- SIN (not required for initial payroll calculation, but needed for tax forms later)
- Employee email and phone (needed for Chequer invites, not for payroll)
- Employee bank details (defaults to cheque if not provided)
- Vacation settings (every province requires vacation pay, but the employer does not have to run it through the system)
- Advanced tax table overrides / TD1 values (keep defaults unless an exception exists)

**Alternative paths:**
- Add one employee now (default for small business owners)
- Bulk import via CSV (better for accountants or migration-heavy setups)
- Skip and add later (allowed, but the system should encourage at least one employee for activation)

---

### Stage 6. Review and Activate

**What the user sees:** a clear summary of what is ready and what is not. This replaces the generic "You're all set!" screen with honest, capability-specific status.

**Possible outcomes:**

**Outcome A: Payroll ready, ePay approved**
- Everything passed. The user can run payroll and use direct deposit immediately.
- Next steps: run first payroll, add more employees, explore features.

**Outcome B: Payroll ready, ePay pending review**
- Payroll works. ePay is under review (standard or elevated).
- Next steps: run first payroll now, ePay will activate when review completes.
- Show estimated review timeline.

**Outcome C: Payroll ready, ePay waiting on signer**
- The current user (admin or accountant) completed setup. The signer has been invited.
- Next steps: run first payroll (if allowed without ePay), remind signer, add more employees.

**Outcome D: Payroll ready, no ePay requested**
- The user chose payroll only. No verification was needed.
- Next steps: run first payroll, enable ePay later if needed (this triggers the verification flow at that point).

**Outcome E: Enhanced review required**
- Payroll may still be available, but ePay requires additional documentation or manual review.
- Next steps: provide requested documents, wait for review, run payroll in the meantime if possible.
- Messaging should feel protective: "We're reviewing your account to make sure everything is set up correctly. This usually takes [X business days]."

---

### Stage 7. Dashboard with Guided Next Steps

**What the user sees:** a clean dashboard (same design language as the original prototype) with a persistent getting-started checklist that adapts to the user's journey.

**Checklist items (shown conditionally):**

| Item | When shown |
|------|-----------|
| Run first payroll | Always (if at least one employee exists) |
| Complete ePay verification | When ePay is pending or incomplete |
| Invite signer to complete verification | When signer delegation is active |
| Add more employees | Always |
| Invite employees to self-service | After first employee is added |
| Set up automatic CRA remittances | When remittances are enabled |
| Complete employee details (SIN, bank) | After initial setup |
| Resolve review request | Only when account is in elevated-risk review |

---

## 8. Journey Walkthroughs

### Journey 1: Low-risk payroll-only owner

**Profile:** Sarah runs a small landscaping company (sole prop, 3 employees, Ontario, low-risk industry). She just wants to run payroll. No direct deposit yet.

**What she sees:**

| Step | Screen | Time |
|------|--------|------|
| 1 | Create account (3 fields) | 30 sec |
| 2 | Verify email (6-digit code) | 30 sec |
| 3 | "What are you setting up?" -- selects "Run payroll" | 20 sec |
| 4 | Company profile (name, address, sole prop, Ontario, landscaping) | 90 sec |
| 5 | Payroll essentials (bi-weekly, 2026, Ontario defaults) | 45 sec |
| 6 | Add first employee (name, hire date, DOB, pay rate) | 60 sec |
| 7 | "You're ready to run payroll!" with next steps | Done |

**What she does NOT see:** IDV, bank verification, document upload, PAD limits, beneficial owners, digital signature. None of that is relevant to her path.

**Total time:** approximately 4-5 minutes.

**What happens later:** if Sarah decides she wants direct deposit, she can enable ePay from the dashboard. That triggers the verification flow at that point, with her existing data pre-filled.

---

### Journey 2: Owner who wants payroll + direct deposit

**Profile:** Roberto owns BioPick Enterprises Inc. (corporation, 12 employees, Ontario, food production). He wants payroll and direct deposit from day one.

**What he sees:**

| Step | Screen | Time |
|------|--------|------|
| 1 | Create account | 30 sec |
| 2 | Verify email | 30 sec |
| 3 | "What are you setting up?" -- selects "Payroll + direct deposit" | 20 sec |
| 4 | Company profile (corporation, provincial Ontario, food production) | 90 sec |
| 5 | Payroll essentials (bi-weekly, 2026, Ontario, CRA number) | 60 sec |
| 6 | Payment verification: signer confirmation, online IDV, bank connection, upload incorporation doc, PAD limit (auto-suggested at $187,500 based on 12 employees x $7,500 -- Roberto accepts or adjusts), beneficial owners, digital signature | 3-4 min |
| 7 | Add first employee | 60 sec |
| 8 | "Payroll ready! ePay approved." or "Payroll ready, ePay pending brief review." | Done |

**Total time:** approximately 7-9 minutes.

**Key difference from Journey 1:** Roberto sees the full verification stage because he is enabling funds movement. But payroll setup still happens first, so even if ePay review takes longer, he can start using the product.

---

### Journey 3: Accountant onboarding for a client

**Profile:** Maria is a bookkeeper setting up payroll for her client's new restaurant (corporation, Quebec, 8 employees). She is not the signing officer.

**What she sees:**

| Step | Screen | Time |
|------|--------|------|
| 1 | Create account | 30 sec |
| 2 | Verify email | 30 sec |
| 3 | "What are you setting up?" -- selects "Setting up for a client." Role: accountant. | 20 sec |
| 4 | Company profile (client's business details, corporation, provincial Quebec) | 90 sec |
| 5 | Payroll essentials (bi-weekly, 2026, Quebec, CNESST questions triggered) | 90 sec |
| 6 | Add employees (she adds 8, possibly via CSV import with full detail including addresses) | 3-5 min |
| 7 | "Payroll workspace ready! Signer invite sent to [client name]." | Done |

**What she does NOT see:** IDV, bank verification, document upload, digital signature. Those steps are sent to the client (the actual signer) via a secure invite link.

**What happens next:** the client receives an email with a link to complete signer verification. Maria can continue adding employees and configuring payroll in the meantime.

---

### Journey 4: Returning client opening a new entity

**Profile:** John already has a verified PayEvo account for his consulting firm. He just incorporated a new company and needs a separate payroll account.

**What he sees:**

| Step | Screen | Time |
|------|--------|------|
| 1 | Create account (new email or same email, new workspace) | 30 sec |
| 2 | Verify email | 30 sec |
| 3 | "What are you setting up?" -- selects "Payroll + direct deposit." Enters linked account ID. | 30 sec |
| 4 | Company profile (new entity details, but system notes the linked relationship) | 60 sec |
| 5 | Payroll essentials | 45 sec |
| 6 | Payment verification: **reduced steps.** IDV reused from prior account. Bank verification may be reused if same bank. Only new entity documentation required. | 1-2 min |
| 7 | Add first employee | 60 sec |
| 8 | "Payroll ready! ePay approved." | Done |

**Total time:** approximately 5-6 minutes (faster than a new customer because verification is partially reused).

**Policy:** once an ID and/or bank account has been verified, the verification can be applied across the entire account and for other accounts too. If the prior relationship is recent and risk-consistent, reduce duplicate steps. If the prior account was flagged as high-risk, that context carries forward too.

---

### Journey 5: Elevated-risk onboarding

**Profile:** A corporation with foreign incorporation, multiple beneficial owners, requesting $75,000 PAD limit, in a financial services industry.

**What they see:**

| Step | Screen | Time |
|------|--------|------|
| 1-5 | Same fast early steps as Journey 2 | 4-5 min |
| 6 | Payment verification: all standard steps PLUS beneficial owner collection (manual entry since foreign corp), higher scrutiny on documentation | 5-7 min |
| 7 | Add first employee | 60 sec |
| 8 | "Payroll ready. ePay under enhanced review." | Done |

**What is different:**
- The system detects elevated risk from: foreign jurisdiction + finance industry + PAD above $50k
- Beneficial owners must be manually entered (no registry lookup for foreign corps)
- ePay does not activate in-session. It goes to manual review.
- Payroll is still available immediately.
- The dashboard shows a clear status: "ePay review in progress. Estimated [X] business days."

**Messaging tone:** "We're reviewing your payment setup to make sure everything is configured correctly. This is standard for businesses in your industry with your requested payment limits. Your payroll workspace is fully operational in the meantime."

---

## 9. Data Collection Model

### Universal fields (collected for everyone)

- Account email, full name, password/SSO
- Email verification
- Product intent (payroll only / payroll + ePay / setting up for client)
- User role (owner/signer, accountant, payroll admin)
- Signing authority status
- Legal company name, business address
- Entity type, jurisdiction, industry
- Employee count band

### Payroll-required fields

- Payroll year
- Pay frequency
- Primary province for tax defaults
- First pay date
- Employee: name, hire date, DOB, worker type, pay details, province of employment
- YTD values (when migrating mid-year)
- Province-specific rules (only when triggered)

### ePay-required fields (only when ePay is selected)

- Signer identity verification (online IDV)
- Online bank verification
- Ownership/registration document
- Maximum PAD limit
- Payment/remittance intent
- Beneficial owners (corporations only, conditional on entity type and jurisdiction)
- Digital signature

### Optional / deferrable fields

- CRA/MRQ number (can be added later for payroll-only customers)
- Linked account/referral ID
- Employee SIN
- Employee email and phone
- Employee bank details
- Vacation settings
- Advanced tax table overrides (TD1 values)
- Benefits and deductions configuration

---

## 10. Risk Routing Rules

### Low-friction lane

**Eligible when most of the following are true:**
- Owner/signer is present and verified
- Simple entity structure (sole prop or straightforward corporation)
- Low-risk industry (not finance, not health)
- Payroll-only, or PAD limit at or below the proportional suggestion for the declared employee count
- Online verification passes cleanly
- No prior flags or risk history

**Behavior:** no unnecessary document upload beyond what is required. Strong defaults. Optional advanced settings deferred. ePay approved in-session if applicable.

### Standard compliance lane

**Used when:**
- ePay is requested
- Ownership needs verification
- Province or company rules create additional requirements
- PAD limit is moderate and proportional to employee count

**Behavior:** collect only the required verification artifacts. Keep operational setup moving while compliance completes. ePay may be approved in-session or pending brief review.

### Elevated-friction lane

**Triggered when any of the following are true:**
- Signer cannot be confirmed (admin or accountant path without signer present)
- Beneficial ownership is complex (multiple owners, corporate chains)
- Industry is finance or health
- PAD limit is $50,000 or above, or significantly exceeds the proportional suggestion for the declared employee count
- Foreign incorporation
- Online ID or bank verification fails
- Bank ownership mismatch

**Behavior:** request additional documents or owner details. Route to manual review. Make the reason explicit to reduce user confusion. Payroll remains available while review is in progress.

---

## 11. UX Recommendations

### Keep from the original prototype

- Quick three-field signup with Google SSO
- Immediate email verification before any setup work
- Strong use of defaults (bi-weekly pay, current year, auto-detected province)
- Early "add first employee" for faster payroll value
- Clear success and next-step framing
- Clean wizard sidebar with numbered steps
- Time estimates on each step
- Annotation/rationale notes for stakeholder review

### Change from the original prototype

1. **Add an early routing step before company basics.** Today the prototype jumps straight into business info. It should first determine product intent, user role, and linked-account status. This should feel like personalization ("Let's customize your setup"), not interrogation.

2. **Split payroll setup from ePay verification.** Today payment method is treated like a simple setup choice (screen 6 in the original). It should become a separate verification stage that only appears when ePay is relevant.

3. **Move from one linear path to conditional lanes.** The original prototype assumes everyone follows the same 5-step wizard. The new flow should show different step counts and different screens depending on the journey.

4. **Support partial activation.** A user may be ready for payroll before ePay is approved. The UI should show readiness by capability, not a single "complete" or "incomplete" state.

5. **Make manual review feel intentional, not like failure.** If higher-risk cases require review, message it as protection and set timing expectations. Never leave the user wondering what happened.

6. **Show real journeys in the prototype.** The prototype should let a reviewer click through at least: one low-risk owner path, one accountant path, one ePay + elevated-risk branch, and one returning-client path. Each should feel like a complete experience, not a status card.

---

## 12. Information Architecture

The wizard sidebar should show steps that are relevant to the user's journey. Not every user sees every step.

### Payroll-only owner (5 steps)

1. Sign up and verify email
2. Tell us about yourself
3. Your business
4. Payroll setup
5. Add your first employee

### Payroll + ePay owner (7 steps)

1. Sign up and verify email
2. Tell us about yourself
3. Your business
4. Payroll setup
5. Verify your identity and bank
6. Add your first employee
7. Review and activate

### Accountant for a client (6 steps)

1. Sign up and verify email
2. Tell us about yourself
3. Client's business
4. Payroll setup
5. Add employees
6. Invite signer to complete verification

### Returning client (5-6 steps, reduced verification)

1. Sign up and verify email
2. Tell us about yourself (with linked account)
3. New business details
4. Payroll setup
5. Reduced verification (reuse prior IDV/bank where possible)
6. Add your first employee

---

## 13. Prototype Requirements

The prototype should demonstrate:

- At least one complete low-risk owner path (payroll only) that feels as fast and simple as the original prototype
- At least one complete payroll + ePay owner path showing the verification stage
- At least one accountant/delegated path showing signer handoff
- At least one returning-client path showing reduced verification
- Clear split between payroll-ready and ePay-pending states on the activation screen
- Minimal field collection for first value
- Conditional disclosure of higher-friction requirements
- Customer-facing language throughout (not compliance jargon)
- The same visual quality and simplicity as the original prototype

---

## 14. Answered Questions

| Question | Answer |
|----------|--------|
| What policy allows reuse of verification from linked accounts? | Once an ID and/or bank account has been verified, the verification can be applied across the entire account and for other accounts too. |
| What PAD limit thresholds define low vs elevated risk? | $50,000 and above triggers elevated risk. Additionally, PAD limits are auto-suggested proportionally at $7,500/month per declared employee. Requests significantly above the proportional suggestion are flagged for context. |
| Which industries require special friction today? | Finance and health. |
| Which signer flows legally require stronger signature handling? | None. E-signature is sufficient for all cases. |

### Still open

- Which registry lookups are actually available for auto-fill in v1?
- Can payroll activation occur before CRA remittance details are complete in all cases, or only some?

---

## 15. Core Recommendation

Do not frame onboarding as a single wizard whose goal is "complete everything."

Instead, frame it as:

1. **Identify the lane** -- what does this customer need, and who are they?
2. **Collect only what is necessary for that lane** -- no more, no less.
3. **Get the customer to the earliest safe value** -- payroll-ready is the first milestone.
4. **Continue the remaining compliance or optimization work in guided follow-up steps** -- ePay verification, employee details, advanced settings all have a home in the dashboard checklist.

The customer's promise is: "Run payroll in minutes." The compliance team's promise is: "We screen the right person at the right time." Both can be true.
