import { Page } from '@playwright/test';

interface GuestCount {
  adults: number;
  children: number;
  seniors: number;
  others: number;
}

export async function updateGuestCount(page: Page, guestCount: GuestCount) {
  // Open the guest count dropdown
  await page.locator('div[data-testid="guest-count-dropdown-button"]').click();
  await page.waitForSelector('p[data-testid="counter-value-Adults"]');

  // Function to update individual guest count category
  const updateCategoryCount = async (category: string, desiredCount: number) => {
    const currentCountText = await page.locator(`p[data-testid="counter-value-${category}"]`).innerText();
    const currentCount = parseInt(currentCountText, 10);

    const difference = desiredCount - currentCount;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        await page.locator(`div[data-testid="icon-plus-${category}"]`).click();
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        await page.locator(`div[data-testid="icon-minus-${category}"]`).click();
      }
    }
  };

  // Update the counts for each category
  await updateCategoryCount('Adults', guestCount.adults);
  await updateCategoryCount('Children', guestCount.children);
  await updateCategoryCount('Senior', guestCount.seniors);
  await updateCategoryCount('other', guestCount.others);

  // Optionally close the dropdown after setting the counts
  // await page.locator('div[data-testid="guest-count-dropdown-button"]').click();
}
