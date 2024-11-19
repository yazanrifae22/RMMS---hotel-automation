import { Page } from '@playwright/test';

export async function applyPromoCode(page: Page, promoCode: string): Promise<void> {
  // Locate the promo code input field and type the promo code
  const promoCodeInput = page.locator('input[placeholder="Promo code"]');
  await promoCodeInput.fill(promoCode);

  // Locate and click the Apply button
  const applyButton = page.locator('button:has-text("Apply")');
  await applyButton.click();

  // Wait for the result message to appear
  await page.waitForTimeout(2000); // Adjust this if the response is slow, or use waitForSelector if you have a specific element to wait for

  // Check if an invalid promo code message appears
  const invalidPromoMessage = await page.locator('text="Promo code is not valid"').isVisible(); // Replace with the actual error message
  const validPromoMessage = await page.locator('text="Promo code applied successfully"').isVisible(); // Replace with the actual success message

  // Print the result
  if (invalidPromoMessage) {
    console.log(`The promo code "${promoCode}" is not valid.`);
  } else if (validPromoMessage) {
    console.log(`The promo code "${promoCode}" was applied successfully.`);
  } else {
    console.log(`No clear feedback received after applying the promo code "${promoCode}".`);
  }
}
