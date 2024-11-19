import { Page } from '@playwright/test';

export async function performBookingAction(page: Page, url: string = 'https://booking-engine-widget-dev.webflow.io/', sandboxSelector: string = '#sandbox') {
  // Navigate to the provided URL or the default one
  await page.goto(url, { waitUntil: 'networkidle' });

  const sandboxButton = page.locator(sandboxSelector);
  await sandboxButton.waitFor({ state: 'visible' });

  await page.evaluate((selector) => {
    const button = document.querySelector(selector) as HTMLAnchorElement;
    if (button) {
      button.click();
    }
  }, sandboxSelector);

  await page.waitForTimeout(10000);

  const availableDates = page.locator('.CalendarDay[role="button"][aria-disabled="false"]');
  await availableDates.first().waitFor({ state: 'visible' });

  const totalAvailableDays = await availableDates.count();
  console.log(`Total available days: ${totalAvailableDays}`);

  if (totalAvailableDays < 2) {
    throw new Error('Not enough available dates to select two distinct dates.');
  }

  const firstDate = availableDates.first();
  await firstDate.scrollIntoViewIfNeeded();
  await firstDate.click();
  console.log('Clicked on the first available date');

  await page.waitForTimeout(500);

  const availableDatesAfterFirstSelection = page.locator('.CalendarDay[role="button"][aria-disabled="false"]');
  await availableDatesAfterFirstSelection.first().waitFor({ state: 'visible' });

  const secondDate = availableDatesAfterFirstSelection.nth(1);
  await secondDate.scrollIntoViewIfNeeded();
  await secondDate.click();
  console.log('Clicked on the second available date');

  const letsGoButton = page.locator('div.css-18slnuy.ez89zr21:has-text("Let\'s Go!")');
  await letsGoButton.waitFor({ state: 'visible' });
  await letsGoButton.click();
  console.log('Clicked on the "Let\'s Go!" button');

  // Wait for the target element to be visible and fully loaded
  const targetElement = page.locator('div.css-kpulmx.e1v0rose0').nth(0);  // Use nth(0) for the first element, or nth(index) for a specific one
  await targetElement.waitFor({ state: 'visible' });

  console.log('Target element is visible and fully loaded');
}
