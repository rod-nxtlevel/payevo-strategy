# PayEvo Strategy - Operating Guide

This repository includes the exported PayEvo design system and the guardrails that keep implementation work aligned with it.

Use this file as the source of truth for how we update, validate, and ship design-system changes.

## Repository Purpose

- Store and evolve the PayEvo design system artifacts exported from Claude Design.
- Keep agent behavior aligned with PayEvo standards via Cursor rules.
- Enforce consistency using style lint checks and visual regression tests.

## Folder and File Ownership

### Design system content (safe to replace from export)

- `PayEvo Design System/colors_and_type.css`
- `PayEvo Design System/assets/**`
- `PayEvo Design System/preview/**`
- `PayEvo Design System/ui_kits/workspace/**`
- `PayEvo Design System/uploads/**`
- `PayEvo Design System/README.md`
- `PayEvo Design System/SKILL.md`

### Enforcement and workflow files (do not overwrite from export)

- `.cursor/rules/**`
- `.stylelintrc.cjs`
- `playwright.config.ts`
- `tests/visual/**`
- `.github/pull_request_template.md`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `README.md` (this file)

## Standard Design System Update Process

When a new design system export is produced in Claude Design, do not copy it directly over the repo blindly.

1. Export into a temporary staging directory:
   - Example: `PayEvo Design System__incoming/`
2. Compare incoming vs current content.
3. Copy only the design-system-owned paths listed in "Design system content".
4. Keep all enforcement/workflow files unchanged unless intentionally updating tooling.
5. Run validation commands (below).
6. If visuals changed intentionally, update visual baselines.
7. Commit with a message that explains why the design update was made.

## Validation Commands

Run from repository root:

```bash
npm run lint:styles
npm run test:visual
```

If the design update intentionally changes appearance:

```bash
npm run test:visual:update
npm run test:visual
```

## Cursor Rule System

Rules live in `.cursor/rules/` and are required for consistent agent behavior.

Current rules:

- `payevo-foundation.mdc`
- `payevo-styling-tokens.mdc`
- `payevo-workspace-components.mdc`
- `payevo-brand-copy.mdc`
- `payevo-assets-icons.mdc`

If design principles change (tokens, typography, icon policy, voice), update these rule files in the same PR as the design system update.

## PR Expectations

Use `.github/pull_request_template.md` and complete every checklist item:

- token usage and typography compliance
- component reuse
- icon and logo policy alignment
- copy/tone consistency
- lint and visual test runs

## Notes on Legacy Surfaces

Some legacy HTML surfaces are currently ignored by style lint configuration so checks stay actionable for active work.

As part of future cleanup, we should migrate these legacy files to full token usage and then remove ignore entries from `.stylelintrc.cjs`.

## To Start HTML Browser

Use this in Terminal: python3 -m http.server 8080
