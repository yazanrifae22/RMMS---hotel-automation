import { test, expect } from '@playwright/test';
import { performBookingAction } from '../utils/selecte_dates'; 

import { updateGuestCount } from '../utils/updateGuestCount'; 


test("Force click on sandbox button, select first and second available days, and press 'Let\'s Go!' button", async ({ page }) => {
  test.setTimeout(300000);

  // Perform the booking action
  await performBookingAction(page);

  
  // Ensure that there are rooms available
  await updateGuestCount(page, { adults: 3, children: 2, seniors: 1, others: 0 });

});
