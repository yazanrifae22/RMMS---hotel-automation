import { test } from "@playwright/test";
import { PricingPage } from "./PricingPage";

test.describe("updating existing event", () => {
  test.beforeEach(async ({ page }) => {
    const pricingPage = new PricingPage(page);

    await pricingPage.navigateTo();
    await pricingPage.selectProperty("Palm Spring");
  });
  test("updating event booking window", async ({ page }) => {
    const pricingPage = new PricingPage(page);

    await page.waitForTimeout(2000);
    await pricingPage.selectRandomEvent();
    await pricingPage.changeBookingWindow();
    await pricingPage.saveChanges();
  });
  test("updating event type", async ({ page }) => {
    const pricingPage = new PricingPage(page);

    await page.waitForTimeout(2000);
    await pricingPage.selectRandomEvent();
    await pricingPage.selectEventType();
    await pricingPage.saveChanges();
  });
  test("updating event weekdays and weekends", async ({ page }) => {
    const pricingPage = new PricingPage(page);

    await page.waitForTimeout(2000);
    await pricingPage.selectRandomEvent();
    await pricingPage.moveToWeekEnds();
    await pricingPage.saveChanges();
  });
  test("updating event price agressiveness", async ({ page }) => {
    const pricingPage = new PricingPage(page);

    await page.waitForTimeout(2000);
    await pricingPage.selectRandomEvent();
    await pricingPage.priceAggressiveness();
    await pricingPage.saveChanges();
  });
  // test("updating event target Occupancy", async ({ page }) => {
  //   const pricingPage = new PricingPage(page);

  //   await page.waitForTimeout(3000);
  //   await pricingPage.selectRandomEvent();
  //   await pricingPage.changeTargetOcc();
  //   await page.waitForTimeout(1000);
  //   await pricingPage.saveChanges();
  // });
});
