# PayEvo Onboarding PRD

Date: 2026-04-07  
Status: Draft  
Owner: Rodrigo

## 1. Problem

The current prototype is strong on speed, especially at signup and email verification, but it over-indexes on a single happy path for payroll setup.

It does not capture enough early information to:

- determine who should actually be screened
- separate payroll-only onboarding from ePay-enabled onboarding
- route lower-risk and higher-risk businesses differently
- recognize repeat or linked accounts
- protect PayEvo from fraud while still getting legitimate users to value quickly

The result is an experience that is fast on the surface but not yet robust enough for compliance-sensitive onboarding.

## 2. Product Goal

Design a compliance-first onboarding experience that:

- protects PayEvo from fraud and compliance exposure as the highest priority
- reduces friction wherever risk does not justify it
- gets legitimate users to first value quickly
- supports both payroll setup and ePay-related onboarding requirements without forcing everyone through the same path

## 3. Success Criteria

### Primary

- PayEvo can identify the correct signer / authority holder for screening.
- PayEvo can distinguish low-risk vs elevated-risk onboarding paths before asking for deeper information.
- The flow collects the minimum information needed to safely enable payroll and ePay.

### Secondary

- New business owner reaches a meaningful setup milestone in the first session.
- Low-risk payroll users can complete setup without unnecessary document upload friction.
- Repeat or linked-account users get faster treatment when prior verification can be reused.

### Activation

Activation should be defined by product line:

- Payroll activation: workspace created, payroll defaults configured, at least one employee added, ready to run payroll
- ePay activation: business profile created, signer identified, verification started or passed, bank verification started or passed, required docs collected if needed

## 4. Non-Goals

- Full underwriting automation for all entity types
- Perfect registry auto-fill in v1
- Replacing all manual review for higher-risk cases
- Capturing every optional payroll setting during first-run onboarding

## 5. Design Principles

1. Compliance before convenience

- Friction can be reduced only after the system has enough information to trust the lane.

1. Progressive disclosure

- Ask universal questions first.
- Reveal additional questions only when role, entity type, product intent, or risk level requires them.

1. Route by intent and authority

- Determine early:
- what the customer wants to do
- who they are relative to the business
- whether they are authorized to be screened and sign

1. Separate setup from optimization

- Only collect information required to safely reach value.
- Push optional or optimization settings later.

1. Reuse trust where possible

- If the user is tied to an existing verified relationship, use that to reduce redundant effort.

## 6. Primary User Types

### A. Business owner / signing officer

Most straightforward path.

Typical goals:

- set up payroll quickly
- optionally enable ePay
- invite employees

### B. Accountant / bookkeeper onboarding on behalf of a client

Needs authority-aware routing.

Typical goals:

- create workspace
- configure company and employee data
- defer signer verification to client where required

### C. Payroll admin / operations user without signing authority

Can complete operational setup, but cannot satisfy final compliance requirements alone.

### D. Existing client opening another account

Should get a faster path if linked to a verified prior relationship.

## 7. High-Level Journey Model

### Stage 0. Account Creation

Collect:

- work email
- full name
- password or Google SSO

Then:

- immediate email verification

### Stage 1. Intent + Authority Routing

Collect:

- what are you setting up?
- payroll only
- payroll + ePay
- ePay / payments with payroll later
- who are you in relation to the business?
- owner / signing officer
- accountant / bookkeeper
- payroll admin / employee
- do you have authority to sign?
- yes / no / not sure
- is this a new business or linked to an existing PayEvo client?

Why this stage exists:

- it is the earliest point where the flow can decide whether to prioritize speed, verification, or delegation

### Stage 2. Company Profile

Collect universal company fields:

- legal business name
- operating name optional
- business address
- industry
- entity type
- sole prop
- partnership
- corporation
- non-profit
- other
- jurisdiction of incorporation / registration
- federal
- provincial
- foreign
- employee count band

Conditional:

- CRA / MRQ numbers can be deferred for payroll-only customers if not needed immediately
- linked account / referral ID appears if user indicates they already work with PayEvo

### Stage 3. Payroll Configuration

Collect the minimum fields needed for correct payroll setup:

- payroll year
- pay frequency / number of pays per year
- primary province for tax defaults
- remittance frequency if required
- company pay rules only when triggered by province or plan

Conditional:

- Ontario EHT
- Quebec CNESST / HSF / related settings
- benefits / deductions setup only if user indicates these exist

### Stage 4. ePay / Risk & Verification

Shown only when:

- user wants ePay or payment functionality
- or the selected plan / operational setup makes ePay-relevant screening necessary

Collect / trigger:

- signer identity verification
- online bank verification
- proof of ownership / incorporation / registration
- max PAD limit
- intended payment / remittance behavior
- beneficial owners if required

Conditional outcomes:

- low-risk lane
- elevated-risk lane
- manual review lane

### Stage 5. Employee Setup

For fastest payroll value, collect the minimum employee data set:

- first name
- last name
- employee vs contractor
- hire date
- pay frequency if different from company default
- date of birth
- pay details
- YTD values if mid-year or migrating from another system

Optional / deferrable:

- SIN
- employee email / phone
- vacation settings
- bank details
- advanced tax table overrides

### Stage 6. Review + Activation

Show:

- what is complete
- what is pending
- what can be used immediately
- what blocks ePay vs what blocks payroll

Possible outcomes:

- Ready to run payroll
- Ready to invite signer for verification
- Ready for manual review
- Ready to connect bank / finish ePay verification

## 8. Journey Variants

### Journey 1. Low-risk payroll owner

Profile:

- owner / signer
- sole prop or simple corporation
- payroll only
- low-risk industry
- no unusual limits

Experience:

- fast signup
- intent / authority
- company basics
- payroll defaults
- first employee
- ready to run payroll

What gets deferred:

- advanced tax settings
- optional employee details
- ePay verification

### Journey 2. Payroll + ePay owner

Profile:

- owner / signer
- wants payroll plus direct payment functionality

Experience:

- same fast entry as above
- then explicit ePay verification stage
- online IDV
- online bank verification
- ownership doc
- PAD limit
- payment intent

Outcome:

- payroll may be ready before ePay is fully approved
- ePay state should clearly show pending verification / review

### Journey 3. Accountant onboarding for client

Profile:

- accountant or bookkeeper
- can set up company and employee records
- is not necessarily the signer

Experience:

- creates workspace
- enters company and payroll setup
- adds employees / imports data
- triggers signer invite for compliance completion

Key rule:

- accountant cannot satisfy signer verification unless they are also a valid signing authority

### Journey 4. Repeat / linked client

Profile:

- user or business has an existing verified PayEvo relationship

Experience:

- enter linked account ID / referral code
- pre-fill known business data where safe
- reduce redundant document requests
- reuse verification where policy allows

### Journey 5. Elevated-risk onboarding

Triggers may include:

- corporation with multiple beneficial owners
- foreign incorporation
- high-risk industry
- high PAD limit
- signer mismatch
- failed online verification
- bank ownership mismatch

Experience:

- faster early steps still apply
- but the flow pivots to additional owners, documents, and manual-review expectations

## 9. Data Collection Model

### Universal fields

- account email
- full name
- password / SSO
- email verification
- product intent
- user role relative to business
- signing authority status
- legal company name
- business address
- industry
- entity type

### Payroll-required fields

- payroll year
- employee / contractor setting
- hire date
- pay frequency
- DOB
- pay details
- YTD when applicable
- tax-table settings or defaults

### ePay-required fields

- proof of ownership / incorporation / registration
- online bank verification
- signer identity verification
- maximum PAD limit
- payment / remittance intent

### Optional or conditional fields

- CRA / MRQ number
- company defaults for province and number of pays
- referral / linked account ID
- beneficial owners
- employee email / phone
- employee bank details
- digital signature acknowledgement

## 10. Risk Routing Rules

### Low-friction lane

Eligible when most of the following are true:

- owner / signer is present
- simple entity structure
- low-risk industry
- payroll-only or standard low-limit payment use case
- online verification passes cleanly
- no prior flags

Behavior:

- no unnecessary document upload
- strong defaults
- optional advanced settings deferred

### Standard compliance lane

Used when:

- ePay is requested
- ownership needs verification
- province / company rules create additional requirements

Behavior:

- collect only the required verification artifacts
- keep operational setup moving while compliance completes

### Elevated-friction lane

Used when:

- signer cannot be confirmed
- beneficial ownership is complex
- industry or payment behavior raises risk
- bank or identity verification fails
- limits exceed standard comfort thresholds

Behavior:

- request additional documents or owners
- route to manual review
- make the reason explicit to reduce user confusion

## 11. UX Recommendations

### Keep from current prototype

- quick signup
- immediate email verification
- strong use of defaults
- early “add first employee” for faster payroll value
- clear success and next-step framing

### Change from current prototype

1. Add an early routing step before company basics

- today the prototype jumps straight into business info
- it should first determine product intent, user role, authority, and linked-account status

1. Split payroll setup from ePay verification

- today payment method is treated like a simple setup choice
- it should become part of a broader payment-risk stage when ePay is relevant

1. Move from linear happy path to conditional lanes

- current prototype assumes everyone follows the same 5-step wizard
- that is too simple for compliance-heavy onboarding

1. Support partial activation

- a user may be ready for payroll before ePay is approved
- the UI should show readiness by capability

1. Make manual review feel intentional, not like failure

- if higher-risk cases require review, message it as a protection and timing expectation

## 12. Proposed Information Architecture

1. Sign up
2. Verify email
3. Choose what you are setting up
4. Confirm your role and signing authority
5. Company profile
6. Payroll essentials
7. Payment and verification
8. Employee setup or import
9. Review and activate
10. Dashboard with next steps by capability

## 13. Prototype Requirements

The prototype should demonstrate:

- at least one low-risk owner path
- at least one accountant path
- at least one ePay / elevated-risk branch
- clear split between payroll-ready and ePay-pending states
- minimal field collection for first value
- conditional disclosure of higher-friction requirements

## 14. Open Questions

- What exact policy allows reuse of verification from linked accounts?
%%Once an ID and/or bank account has been verified, the verification can be applied across the entire account and for other accounts too%%
- What PAD limit thresholds define low vs elevated risk?

%%Let's call it $50,000 and above%%

- Which industries require special friction today?

%%Finance, health%%

- Which registry lookups are actually available for auto-fill?
- Can payroll activation occur before CRA remittance details are complete in all cases, or only some?
- Which signer flows legally require stronger signature handling?
%%Let's assume none. In other words, let's assume we can simply use e-signature for all%%

## 15. Recommendation

Do not frame onboarding as a single wizard whose goal is “complete everything.”

Instead, frame it as:

- identify the lane
- collect only what is necessary for that lane
- get the customer to the earliest safe value
- continue the remaining compliance or optimization work in guided follow-up steps

