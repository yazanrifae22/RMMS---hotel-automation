import { test } from "@playwright/test";
import { CompetitorPage } from "./CompetitorPage";
import { randomScroll, RandomComp } from "./utils";

test("Adding a new Competitor", async ({ page }) => {
  const competitorPage = new CompetitorPage(page);

  await competitorPage.navigate();
  await page.waitForTimeout(2000);
  await competitorPage.selectProperty("Palm Spring");
  await page.waitForTimeout(2000);
  await competitorPage.addCompetitor("hot");
  await page.waitForTimeout(2000);
  await RandomComp(page, competitorPage.searchResult);
  await page.waitForTimeout(2000);
  await competitorPage.selectServiceLevel("Luxury");
  await page.waitForTimeout(2000);

  const elementsToScroll = [
    competitorPage.wdRelevance,
    competitorPage.wdPositioning,
    competitorPage.weRelevance,
    competitorPage.wePositioning,
  ];
  await randomScroll(page, elementsToScroll);
  await page.waitForTimeout(2000);
  await competitorPage.saveChanges();
});
