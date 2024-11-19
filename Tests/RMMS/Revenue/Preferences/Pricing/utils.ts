import { Page, Locator } from "playwright";

const clickRandom = async (page: Page, parentDiv: Locator): Promise<string> => {
  const rows = await parentDiv.locator("tr").elementHandles();
  if (rows.length === 0) {
    throw new Error("no rows found in this parentdiv");
  }
  const randomIndix = Math.floor(Math.random() * rows.length);
  const randomRow = rows[randomIndix];

  const firstCell = await randomRow.$("td:first-child");
  if (!firstCell) {
    throw new Error("No cells found in the selected row.");
  }
  const firstcellText = await firstCell.textContent();
  await firstCell.click();

  return firstcellText?.trim() || " ";
};

const selectRandomDates = async (
  page: Page,
  datepickerLocator: Locator
): Promise<void> => {
  const availableDays = datepickerLocator.locator("tr td button ");
  const availableDaysCount = await availableDays.count();
  const randomStartIndex = Math.floor(Math.random() * availableDaysCount);
  let randomEndIndex = Math.floor(Math.random() * availableDaysCount);
  while (randomEndIndex <= randomStartIndex) {
    randomEndIndex = Math.floor(Math.random() * availableDaysCount);
  }
  const startDate = availableDays.nth(randomStartIndex);
  await startDate.click();
  const endDate = availableDays.nth(randomEndIndex);
  await endDate.click();
};

const selectRandomDivInParentDiv = async (page: Page, Div: Locator) => {
  const divs = await Div.locator("div").elementHandles();
  if (divs.length === 0) {
    console.log("no options found");
  }
  const randomIndex = Math.floor(Math.random() * divs.length);
  const randomDiv = divs[randomIndex];
  await randomDiv.click();
};

const getRandomNumber = (): number => Math.floor(Math.random() * 100) + 1;

const checkExistance = async (page: Page, Div: Locator, name: string) => {
  const nameLocator = Div.locator(`[name="${name}"]`);
  const isNameFound = (await nameLocator.count()) > 0;

  if (isNameFound) {
    console.log(`Name "${name}" found in the Table.`);
  } else {
    console.log(`Name "${name}" not found in the Table.`);
  }
};

export {
  clickRandom,
  selectRandomDates,
  selectRandomDivInParentDiv,
  getRandomNumber,
  checkExistance,
};
