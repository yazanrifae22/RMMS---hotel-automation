import test from "@playwright/test";
import { PricingPage } from "./PricingPage";
import { checkExistance } from "./utils";

test("to verify deleting an existing event", async ({ page }) => {
  const pricingPage = new PricingPage(page);

  await pricingPage.navigateTo();
  await pricingPage.selectProperty("Palm Spring");
  await page.waitForTimeout(4000);
  const selectedEvent = await pricingPage.selectRandomEvent();
  await page.waitForTimeout(2000);
  await pricingPage.deleteAndConfirm();
  await checkExistance(
    pricingPage.page,
    pricingPage.eventsTable,
    selectedEvent
  );
});
