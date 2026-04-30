import path from "node:path";
import { pathToFileURL } from "node:url";
import { test, expect } from "@playwright/test";

const repoRoot = path.resolve(__dirname, "../..");

const targets = [
  {
    label: "workspace-index",
    file: path.join(repoRoot, "PayEvo Design System/ui_kits/workspace/index.html")
  },
  {
    label: "preview-buttons",
    file: path.join(repoRoot, "PayEvo Design System/preview/buttons.html")
  },
  {
    label: "preview-cards",
    file: path.join(repoRoot, "PayEvo Design System/preview/cards.html")
  },
  {
    label: "preview-inputs",
    file: path.join(repoRoot, "PayEvo Design System/preview/inputs.html")
  },
  {
    label: "preview-logo",
    file: path.join(repoRoot, "PayEvo Design System/preview/logo.html")
  },
  {
    label: "preview-product-logos",
    file: path.join(repoRoot, "PayEvo Design System/preview/product-logos.html")
  },
  {
    label: "preview-colors-primary",
    file: path.join(repoRoot, "PayEvo Design System/preview/colors-primary.html")
  },
  {
    label: "preview-colors-semantic",
    file: path.join(repoRoot, "PayEvo Design System/preview/colors-semantic.html")
  }
];

for (const target of targets) {
  test(`visual baseline: ${target.label}`, async ({ page }) => {
    await page.goto(pathToFileURL(target.file).toString());
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(`${target.label}.png`, {
      fullPage: true
    });
  });
}
