import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { NavigatePreferencesPage } from "../pages/NavigatePreferencesPage";
import { ChangeHotelPage } from "../pages/ChangeHotelPage";
import dotenv from "dotenv";
dotenv.config();

test("login and navigate to preferences", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const navigatePreferencesPage = new NavigatePreferencesPage(page);
  const changeHotelPage = new ChangeHotelPage(page);
  await page.goto("https://app.dev.life-house.com/");

  const email = process.env.TEST_EMAIL || "yazan@life-house.com";
  const password = process.env.TEST_PASSWORD || "Zaramhara22@@";

  await loginPage.login(email, password);
  await expect(page.getByText(`Welcome ${email}`)).toBeVisible({
    timeout: 10000,
  });

  await loginPage.acceptCookies();
  await changeHotelPage.clickSelectedHotelNameButton();
  await changeHotelPage.selectHotelFromDropdown("palm springs");

  await expect(page.locator(`text=palm springs`)).toBeVisible({
    timeout: 10000,
  });

  await navigatePreferencesPage.addEvent();
  
});
