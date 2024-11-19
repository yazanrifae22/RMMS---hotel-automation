import { Locator } from "@playwright/test";
import { Page } from "playwright";

export async function randomRoomType(page: Page, tbodySelector: Locator) {
  const tbody = tbodySelector;
  const rows = await tbody.locator("tr").all();
  const filteredRows = rows.slice(1);
  page.waitForTimeout(3000);
  if (filteredRows.length === 0) {
    throw new Error("No rows available to select from.");
  }

  const randomRowIndex = Math.floor(Math.random() * filteredRows.length);
  const randomRow = filteredRows[randomRowIndex];
  const rowText = await randomRow.textContent();
  console.log(`Selected row text: ${rowText}`);

  const cell = randomRow.locator("td:nth-child(2)");

  await cell.click();
}
