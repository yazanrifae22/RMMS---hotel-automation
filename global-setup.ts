import { chromium, expect, Page } from "@playwright/test";
import { env } from "process";

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://app.dev.life-house.com/");
  const locator = page.locator(
    "#root > div > div.css-1mp7hx2.e128bj550 > div > div > div:nth-child(1) > div > div > h4"
  );
  await expect(locator).toHaveText("Revenue Management & Marketing Software");
  await page.click("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
  await page.fill("#label-Email", env.TEST_EMAIL || " ");
  await page.fill("#label-Password", env.TEST_PASSWORD || " ");
  await page.click('[data-testid="submit-button"]');
  await page.waitForURL("https://app.dev.life-house.com/portal");
  await page.context().storageState({ path: "auth.json" });
}

export default globalSetup;
