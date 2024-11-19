import { test, expect } from "@playwright/test";
import { PricingPage } from "./PricingPage";
import { getRandomNumber } from "./utils";

test("to verify adding a new event", async ({ page }) => {
  const pricingPage = new PricingPage(page);

  await pricingPage.navigateTo();
  await pricingPage.selectProperty("Palm Spring");
  await pricingPage.addEvent();
  await pricingPage.fillEventName("QA-Auto-" + getRandomNumber());
  await pricingPage.chooseDate();
  // await pricingPage.selectEventType();
  // await pricingPage.changeBookingWindow();
  // await pricingPage.moveToWeekEnds();
  // await pricingPage.priceAggressiveness();
  await pricingPage.setDefaultPrice();
  await pricingPage.saveChanges();
});
