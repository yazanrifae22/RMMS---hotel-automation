import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly cookieAcceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.signInButton = page.locator('[data-testid="submit-button"]');
        this.cookieAcceptButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
    }

    async acceptCookies() {
        if (await this.cookieAcceptButton.isVisible()) {
            await this.cookieAcceptButton.click();
        }
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.acceptCookies();
        await this.signInButton.click();
        await this.acceptCookies();
    }
}
