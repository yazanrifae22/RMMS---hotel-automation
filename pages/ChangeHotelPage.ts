import { Page, Locator } from '@playwright/test';

export class ChangeHotelPage {
    private readonly page: Page;
    private readonly selectedHotelNameButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectedHotelNameButton = page.locator('[data-testid="selected-hotel-name"]');
    }

    async clickSelectedHotelNameButton() {
        await this.selectedHotelNameButton.click();
    }

    // Updated to accept a hotelName parameter
    async selectHotelFromDropdown(hotelName: string) {
        // Dynamically locating the hotel option based on the provided hotelName
        const hotelDropdownOption: Locator = this.page.locator(`text=${hotelName}`);
        await hotelDropdownOption.click();
    }
}
