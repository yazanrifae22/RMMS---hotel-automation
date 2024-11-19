import test, { expect } from "@playwright/test";
import { CompetitorPage } from "./CompetitorPage";
import { clickRandomFirstCell, checkCompName } from "./utils";

test("To Delete Existing Competitor", async ({ page }) => {
  const competitorPage = new CompetitorPage(page);
  await competitorPage.navigate();
  await page.waitForTimeout(2000);
  await competitorPage.selectProperty("Palm Spring");
  await page.waitForTimeout(2000);
  await clickRandomFirstCell(page);
  await page.waitForTimeout(2000);
  const compName = await competitorPage.page
    .locator(
      '[id^="radix-"] > div.css-h2g23l.envqq0t2 > div.css-i9qisg.envqq0t1 > div'
    )
    .textContent();
  console.log(compName);
  await competitorPage.deleteCompetitor();
  const ifFound = await checkCompName(page, compName || "Null");
  await expect(ifFound).toBe("not found");
});
