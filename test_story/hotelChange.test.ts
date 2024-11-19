import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ChangeHotelPage } from '../pages/ChangeHotelPage';
import { NavigatePreferencesPage } from '../pages/NavigatePreferencesPage';    


test('change hotel', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const changeHotelPage = new ChangeHotelPage(page);
    const navigatePreferencesPage = new NavigatePreferencesPage(page);

    
    await page.goto('https://app.dev.life-house.com/');

    const email = process.env.TEST_EMAIL || 'admin';
    const password = process.env.TEST_PASSWORD || 'admin';

    await loginPage.login(email, password);

    await expect(page.locator(`text=Welcome ${email}`)).toBeVisible({ timeout: 10000 });

    await changeHotelPage.clickSelectedHotelNameButton();
    await changeHotelPage.selectHotelFromDropdown('palm springs');

    await expect(page.locator(`text=palm springs`)).toBeVisible({ timeout: 10000 });
    await navigatePreferencesPage.navigateToRevenue();
    await navigatePreferencesPage.navigateToPreferences();
    
});
