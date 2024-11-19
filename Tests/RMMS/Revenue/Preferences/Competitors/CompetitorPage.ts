// CompetitorPage.ts
import { Locator, Page } from "@playwright/test";

export class CompetitorPage {
  readonly page: Page;
  readonly propertyDropDown: Locator;
  readonly addCompetitorButton: Locator;
  readonly searchResult: Locator;
  readonly serviceLevel: Locator;
  readonly wdRelevance: Locator;
  readonly wdPositioning: Locator;
  readonly weRelevance: Locator;
  readonly wePositioning: Locator;
  readonly saveChangesButton: Locator;
  readonly deleteCompetitorButton: Locator;
  readonly confirmDeletionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.propertyDropDown = page.locator(
      "#root > div:nth-child(4) > div.css-c5zgjz.eudk50v1 > div.css-1gzrznk.e1jgm9600 > button"
    );
    this.addCompetitorButton = page.locator(
      'button:has-text("Add Competitor")'
    );
    this.searchResult = page.locator(
      '[id^="radix-"] > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div'
    );
    this.serviceLevel = page.locator(
      '[id^="radix-"] > div.css-h2g23l.e11xwqzi2 > div.css-19hce57.ejs36ai0 > div > div.css-148so3k.e1v0rose2 > div.css-1eaizhu.e1v0rose2 > div.css-t8shh8.e1v0rose1'
    );
    this.wdRelevance = page.locator(
      '[id^="radix-"] > div.css-h2g23l.e11xwqzi2 > div.css-19hce57.ejs36ai0 > div > div:nth-child(3) > div > div:nth-child(1) > div > div.css-744o9b.e1v0rose2 > div.css-2i1ilh.e1v0rose0 > div.css-2i1ilh.e1v0rose0 > span > span.css-lww5hq.ema63gp3 > div'
    );
    this.wdPositioning = page.locator(
      '[id^="radix-"] > div.css-h2g23l.e11xwqzi2 > div.css-19hce57.ejs36ai0 > div > div:nth-child(3) > div > div:nth-child(3) > div > div.css-744o9b.e1v0rose2 > div.css-2i1ilh.e1v0rose0 > div.css-2i1ilh.e1v0rose0 > span > span.css-lww5hq.ema63gp3 > div'
    );
    this.weRelevance = page.locator(
      '[id^="radix-"] > div.css-h2g23l.e11xwqzi2 > div.css-19hce57.ejs36ai0 > div > div:nth-child(4) > div > div:nth-child(1) > div > div.css-744o9b.e1v0rose2 > div.css-2i1ilh.e1v0rose0 > div.css-2i1ilh.e1v0rose0 > span > span.css-lww5hq.ema63gp3 > div'
    );
    this.wePositioning = page.locator(
      '[id^="radix-"] > div.css-h2g23l.e11xwqzi2 > div.css-19hce57.ejs36ai0 > div > div:nth-child(4) > div > div:nth-child(3) > div > div.css-744o9b.e1v0rose2 > div.css-2i1ilh.e1v0rose0 > div.css-2i1ilh.e1v0rose0 > span > span.css-lww5hq.ema63gp3 > div'
    );
    this.saveChangesButton = page.locator(
      '[id^="radix-"] > div.css-119ntx9.e10ac8eb0 > button.css-2qkafr.ez89zr20'
    );
    this.deleteCompetitorButton = page.locator(
      '[id^="radix-"] > div.css-h2g23l.envqq0t2 > div.css-i9qisg.envqq0t1 > div > div > button > button'
    );
    this.confirmDeletionButton = page.locator(
      '[id^="radix-"] > div > button.css-3xl12b.ez89zr20'
    );
  }

  async navigate() {
    await this.page.goto(
      "https://app.dev.life-house.com/revenue/preferences/competitor-set"
    );
  }
  async selectProperty(propertyName: string) {
    await this.propertyDropDown.waitFor();
    await this.propertyDropDown.click();
    await this.page.getByText(propertyName).click();
  }
  async addCompetitor(competitorName: string) {
    await this.addCompetitorButton.click();
    await this.page.getByPlaceholder("Search").fill(competitorName);
  }
  async selectServiceLevel(level: string) {
    await this.serviceLevel.click();
    await this.page.getByLabel("Select One").getByText(level).click();
  }
  async saveChanges() {
    await this.saveChangesButton.click();
  }
  async deleteCompetitor() {
    await this.deleteCompetitorButton.click(); 
    await this.confirmDeletionButton.click(); 
  }
}
