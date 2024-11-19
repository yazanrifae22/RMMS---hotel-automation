import { test, expect } from '@playwright/test';
import { performBookingAction } from '../utils/selecte_dates'; 
import { getRoomDetails } from '../utils/roomScraper'; // Ensure the path is correct
import { updateGuestCount } from '../utils/updateGuestCount'; 


test("Force click on sandbox button, select first and second available days, and press 'Let\'s Go!' button", async ({ page }) => {
  test.setTimeout(300000);

  // Perform the booking action
  await performBookingAction(page);

  // Get the room details after the booking action
  const rooms = await getRoomDetails(page);

  // Print the room details
  console.log("List of Rooms:");
  rooms.forEach((room, index) => {
    console.log(`Room ${index + 1}:`);
    console.log(`- Name: ${room.roomName}`);
    console.log(`- Max Guests: ${room.maxGuests}`);
    console.log(`- Availability: ${room.availability}`);
    console.log(`- Rates:`);
    room.rates.forEach(rate => {
      console.log(`  * ${rate.name}: ${rate.price}`);
    });
  });

  // Example expectations based on the room details
  expect(rooms.length).toBeGreaterThan(0);  // Ensure that there are rooms available
  await updateGuestCount(page, { adults: 3, children: 2, seniors: 1, others: 0 });

});
