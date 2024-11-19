import { Page, Locator, expect } from "@playwright/test";
import {
  selectRandomDates,
  clickRandom,
  selectRandomDivInParentDiv,
  getRandomNumber,
} from "./utils";

export class PricingPage {
  readonly page: Page;
  private readonly URL =
    "https://app.dev.life-house.com/revenue/preferences/pricing";
  readonly propertyDropDown: Locator;
  readonly seasonsTable: Locator;
  readonly AddSpecialEventbtn: Locator;
  readonly AddSeasonbtn: Locator;
  readonly eventName: Locator;
  readonly seasonName: Locator;
  readonly eventDatePicker: Locator;
  readonly saveChangesbtn: Locator;
  readonly pricingTable: Locator;
  readonly calendar: Locator;
  readonly repeated: Locator;
  readonly typeOptions: Locator;
  readonly bookingWindowbtn: Locator;
  readonly bookingWindowOptions: Locator;
  readonly dayOfWeek: Locator;
  readonly weekends: Locator;
  readonly PAweekdaysbtn: Locator;
  readonly PAweekendsbtn: Locator;
  readonly PAweekdaysOptions: Locator;
  readonly PAweekendsOptions: Locator;
  readonly WDdefaultPrice: Locator;
  readonly WEdefaultPrice: Locator;
  readonly eventsTable: Locator;
  readonly deleteIcon: Locator;
  readonly confirmbtn: Locator;
  readonly WDTargetOcc: Locator;
  readonly WETargetOcc: Locator;

  constructor(page: Page) {
    this.page = page;
    this.propertyDropDown = page.locator(
      "#root > div:nth-child(4) > div.css-c5zgjz.eudk50v1 > div.css-1gzrznk.e1jgm9600 > button"
    );
    this.seasonsTable = page.locator("tbody");
    this.AddSpecialEventbtn = page.getByRole("button", { name: "Add Event" });
    this.AddSeasonbtn = page.getByRole("button", { name: "Add Season" });
    this.eventName = page.getByTestId("special-event-modal-title");
    this.seasonName = page.getByTestId("season-modal-title");
    this.eventDatePicker = page.locator(
      "#special-event-date-range-picker > button"
    );
    this.pricingTable = page.locator(
      'xpath=//*[id^="radix-"]/div[1]/div[2]/div/div[2]/div[13]/table/tbody'
    );
    this.calendar = page.locator(
      '[id^="radix-"] > div > div > div > div > div.DayPicker_focusRegion.DayPicker_focusRegion_1 > div.DayPicker_transitionContainer.DayPicker_transitionContainer_1.DayPicker_transitionContainer__horizontal.DayPicker_transitionContainer__horizontal_2 > div > div:nth-child(2) > div > table > tbody'
    );
    this.repeated = page.locator(
      'p[data-testid="specialEvent-type-menu-trigger"]'
    );
    this.typeOptions = page.locator('div[role="menu"][data-state="open"]');
    this.bookingWindowbtn = page.locator(
      'div[data-testid="booking-window-dropdown-trigger"]'
    );
    this.bookingWindowOptions = page.locator(
      'div[role="menu"][data-state="open"]'
    );
    this.dayOfWeek = page.locator(
      "#days-of-week-tooltip-container > div.css-g21nwr.e1v0rose2 > div:nth-child(1) > div > div > button:nth-child(1)"
    );
    this.weekends = page.locator(
      "#days-of-week-tooltip-container > div.css-g21nwr.e1v0rose2 > div:nth-child(2) > div"
    );
    this.PAweekdaysbtn = page.locator(
      'div[data-testid="price-aggressiveness-trigger-Weekdays"]'
    );
    this.PAweekendsbtn = page.locator(
      'div[data-testid="price-aggressiveness-trigger-Weekends"]'
    );
    this.PAweekdaysOptions = page.locator(
      'div[role="menu"][data-state="open"]'
    );
    this.PAweekendsOptions = page.locator(
      'div[role="menu"][data-state="open"]'
    );
    this.WDdefaultPrice = page.locator(
      'input[aria-label="cell-058b1bbf-0776-4f3b-aa78-add500fb6542-second-row-weekdays-default-price"]'
    );
    this.WEdefaultPrice = page.locator(
      'input[aria-label="cell-058b1bbf-0776-4f3b-aa78-add500fb6542-second-row-weekends-default-price"]'
    );
    this.saveChangesbtn = page.locator('button >> p:has-text("Save Changes")');
    this.eventsTable = page.locator("tbody");
    this.deleteIcon = page.locator("button >> svg#delete");
    this.confirmbtn = page.locator('button >> p:has-text("Confirm")');
    this.WETargetOcc = page.locator(
      '#target-occupancy-tooltip-container input[aria-label="Weekdays"]'
    );
    this.WDTargetOcc = page.locator(
      '#target-occupancy-tooltip-container input[aria-label="Weekends"]'
    );
  }
  async navigateTo() {
    await this.page.goto(this.URL);
  }
  async selectProperty(propertyName: string) {
    await this.propertyDropDown.waitFor();
    await this.propertyDropDown.click();
    await this.page.getByText(propertyName).click();
  }
  async addEvent() {
    await this.AddSpecialEventbtn.click();
  }
  async fillEventName(eventName: string) {
    await this.eventName.fill(eventName);
  }
  async fillSeasonName(sName: string) {
    await this.seasonName.fill(sName);
  }
  async chooseDate() {
    await this.eventDatePicker.click();
    await this.page.waitForTimeout(2000);
    await selectRandomDates(this.page, this.calendar);
  }
  async selectEventType() {
    await this.repeated.click();
    await selectRandomDivInParentDiv(this.page, this.typeOptions);
  }
  async changeBookingWindow() {
    await this.bookingWindowbtn.click();
    await selectRandomDivInParentDiv(this.page, this.bookingWindowOptions);
  }
  async moveToWeekEnds() {
    await this.dayOfWeek.dragTo(this.weekends);
  }
  async priceAggressiveness() {
    await this.PAweekdaysbtn.click();
    await selectRandomDivInParentDiv(this.page, this.PAweekdaysOptions);
    await this.PAweekendsbtn.click();
    await selectRandomDivInParentDiv(this.page, this.PAweekendsOptions);
  }
  async setDefaultPrice() {
    await this.WDdefaultPrice.click();
    await this.WDdefaultPrice.fill(getRandomNumber().toString());
    await this.WEdefaultPrice.click();
    await this.WEdefaultPrice.fill(getRandomNumber().toString());
  }
  async saveChanges() {
    await this.saveChangesbtn.click();
  }
  async selectRandomEvent(): Promise<string> {
    const selectedEvent = await clickRandom(this.page, this.eventsTable);
    return selectedEvent;
  }
  async deleteAndConfirm() {
    await this.deleteIcon.click();
    await this.confirmbtn.click();
  }
  async changeTargetOcc() {
    await this.WDTargetOcc.click();
    await this.WDTargetOcc.clear();
    await this.WDTargetOcc.fill(getRandomNumber().toString());
    await this.WDTargetOcc.click();

    await this.WETargetOcc.click();
    await this.WETargetOcc.clear();
    await this.WETargetOcc.fill(getRandomNumber().toString());
    await this.WETargetOcc.click();
  }
}
