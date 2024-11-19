import { Page, Locator, expect } from '@playwright/test';

export class NavigatePreferencesPage {
    private readonly page: Page;
    private readonly revenueButton: Locator;
    private readonly preferencesButton: Locator;
    private readonly pricingButton: Locator;
    private readonly addEventButton: Locator;
    private readonly eventNameInput: Locator; // Locator for the New Special Event input field
    private readonly datePickerButton: Locator; // Locator for the button that opens the date picker
    private readonly dateElements: Locator; // Locator for date elements in the date picker
    private readonly specificTextField: Locator; // Locator for the specific text field

    constructor(page: Page) {
        this.page = page;
        this.revenueButton = page.locator('text=Revenue');
        this.preferencesButton = page.locator('text=Preferences');
        this.pricingButton = page.locator('[data-testid="test-tab-Pricing"]'); // Using data-testid to locate the Pricing tab
        this.addEventButton = page.locator('text=Add Event'); // Locator for the Add Event button
        this.eventNameInput = page.locator('input[placeholder="New Special Event"]'); // Locator for the input field
        this.datePickerButton = page.locator('.css-npricq'); // Locator for the date picker button container
        this.dateElements = page.locator('.CalendarDay[role="button"][aria-disabled="false"]'); // Locator for date elements in the date picker
        this.specificTextField = page.locator('td.css-1ahlg2y input[type="text"][data-testid="field-input"][pattern=".*?"][placeholder="0"][name="input"][min="0"][class="css-1vs66fv ehrccju0"][value="$0"]').nth(1);

    }

    async navigateToRevenue() {
        await this.revenueButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
    }

    async navigateToPreferences() {
        await this.revenueButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await this.preferencesButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
    }

    async navigateToPricing() {
        await this.revenueButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await this.preferencesButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await this.pricingButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
    }

    async addEvent() { // New function to navigate to Pricing and then click Add Event
        await this.revenueButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await this.preferencesButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await this.pricingButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await this.addEventButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds
        await expect(this.eventNameInput).toBeVisible(); // Assertion to check visibility of the input field

        // Generate a random 5-character string
        const randomName = Math.random().toString(36).substring(2, 7);

        // Set the value of the input field to the random name
        await this.eventNameInput.fill(randomName);

        // Click the button to open the date picker
        await this.datePickerButton.click(); // Open the date picker for the start date

        // Wait for the date picker to be visible
        await this.page.waitForSelector('.DayPicker', { state: 'visible' });

        // Ensure the start date is visible and clickable
        let dateCount = await this.dateElements.count();
        let randomIndex = Math.floor(Math.random() * dateCount);
        let randomStartDate = this.dateElements.nth(randomIndex);
        while (!(await randomStartDate.isVisible())) {
            randomIndex = Math.floor(Math.random() * dateCount);
            randomStartDate = this.dateElements.nth(randomIndex);
        }
        await randomStartDate.click();

        // Click the button to open the date picker again for the end date
        await this.datePickerButton.click();

        // Wait for the date picker to be visible
        await this.page.waitForSelector('.DayPicker', { state: 'visible' });

        // Ensure the end date is visible and clickable
        dateCount = await this.dateElements.count();
        randomIndex = Math.floor(Math.random() * dateCount);
        let randomEndDate = this.dateElements.nth(randomIndex);
        while (!(await randomEndDate.isVisible())) {
            randomIndex = Math.floor(Math.random() * dateCount);
            randomEndDate = this.dateElements.nth(randomIndex);
        }
        await randomEndDate.click();

        // Close the date picker by clicking outside
        await this.page.mouse.click(0, 0); // Click at the top-left corner to close the date picker

        // Wait for the date picker to be closed
        await this.page.waitForTimeout(500); // Wait for 0.5 seconds

        // Generate a random 3-digit number
        const randomThreeDigitNumber = Math.floor(100 + Math.random() * 900).toString();

        // Set the value of the input field to the random 3-digit number
        await this.specificTextField.fill(randomThreeDigitNumber);
    }
}
