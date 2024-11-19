
import test from "@playwright/test";
import { RoomTypePage } from "./RoomTypePage";

test("to verify Changing BasePrice room", async ({ page }) => {
  const roomTypePage = new RoomTypePage(page);

  await roomTypePage.navigate();
  await page.waitForTimeout(2000);
  await roomTypePage.selectProperty("Palm Spring");
  await page.waitForTimeout(2000);
  await roomTypePage.randomizeRoomType();
  await page.waitForTimeout(2000);
  await roomTypePage.updateBasePrice();
  await page.waitForTimeout(2000);
});
