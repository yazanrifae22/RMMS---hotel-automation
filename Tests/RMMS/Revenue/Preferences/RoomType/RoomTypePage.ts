
import { Page, Locator } from "@playwright/test";
import { randomRoomType } from "./utils";

export class RoomTypePage {
  readonly page: Page;
  readonly PropertyDropDown: Locator;
  readonly roomTypeTable: Locator;
  readonly updateButton: Locator;

  private readonly URL =
    "https://app.dev.life-house.com/revenue/preferences/room-type";

  constructor(page: Page) {
    this.page = page;
    this.PropertyDropDown = page.locator(
      "#root > div:nth-child(4) > div.css-c5zgjz.eudk50v1 > div.css-1gzrznk.e1jgm9600 > button"
    );
    this.roomTypeTable = page.locator(
      "#root > div:nth-child(4) > div.css-t24h4h.e443fzb2 > div.css-v0jwfo.e443fzb0 > div.css-1gcye90.e90k5qf0 > div > table > tbody"
    );
    this.updateButton = page.locator(
      'button:has-text("Yes, Update Base Price")'
    );
  }

  async navigate() {
    await this.page.goto(this.URL);
  }

  async selectProperty(propertyName: string) {
    await this.PropertyDropDown.click();
    await this.page.getByText(propertyName).click();
  }

  async randomizeRoomType() {
    await randomRoomType(this.page, this.roomTypeTable);
  }

  async updateBasePrice() {
    await this.updateButton.click();
  }
}
