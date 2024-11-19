import test, { expect } from "@playwright/test";

test("verify data", async ({ page }) => {
  await page.goto("https://app.dev.life-house.com/revenue/dashboard");
  await expect(
    page.locator(
      "#root > div:nth-child(4) > div.css-t24h4h.e443fzb2 > div.css-v0jwfo.e443fzb0 > div > div.css-1d0doy1.e1v0rose0 > div.css-16hzyu6.e1v0rose1 > h5"
    )
  ).toContainText("Overview");
});
