import { Page, Locator } from "playwright";

export async function RandomComp(page: Page, parentDivLocator: Locator) {
  const childDivs = await parentDivLocator
    .locator('[role="button"]')
    .elementHandles();

  if (childDivs.length > 0) {
    const randomIndex = Math.floor(Math.random() * childDivs.length);
    const randomDiv = childDivs[randomIndex];

    await randomDiv.click();

    console.log(`Clicked on div with role="button" at index ${randomIndex}`);
  } else {
    console.log("No child div elements with role='button' found.");
  }
}

export async function clickRandomFirstCell(page: Page) {
  const tbody = await page.$(
    'xpath=//*[@id="root"]/div[2]/div[2]/div[2]/div[2]/div/div/table/tbody'
  );
  if (!tbody) {
    throw new Error("tbody not found.");
  }
  const rows = await tbody.$$("tr td:first-child");
  const rowCount = rows.length;

  if (rowCount === 0) {
    throw new Error("No rows found in the table.");
  }

  const randomIndex = Math.floor(Math.random() * rowCount);
  await rows[randomIndex].click();
}

export async function checkCompName(
  page: Page,
  compName: string
): Promise<string> {
  const tbody = await page.$(
    'xpath=//*[@id="root"]/div[2]/div[2]/div[2]/div[2]/div/div/table/tbody'
  );
  if (!tbody) {
    throw new Error("tbody not found.");
  }
  const rows = await tbody.$$("tr td:first-child");
  const rowCount = rows.length;
  if (rowCount === 0) {
    throw new Error("No rows found in the table.");
  }
  for (const row of rows) {
    const text = await row.textContent();
    if (text && text.trim() === compName) {
      console.log(`The name "${compName}" was found in the table.`);
      return "found";
    }
  }
  console.log(`The name "${compName}" was NOT found in the table.`);
  return "not found";
}

export async function randomScroll(
  page: Page,
  containerLocators: Locator[]
): Promise<void> {
  for (const containerLocator of containerLocators) {
    const divs = containerLocator.locator("div");
    const count = await divs.count();
    if (count === 0) {
      console.log("No divs found inside one of the containers.");
    }

    const randomIndex = Math.floor(Math.random() * count);
    await divs.nth(randomIndex).click();
    console.log(`Clicked on div at index ${randomIndex} inside a container.`);
  }

  console.log("No divs found in any of the containers.");
}
