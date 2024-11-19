import { Page } from 'playwright';

interface Rate {
    name: string;
    price: string;
}

interface RoomDetails {
    roomName: string;
    maxGuests: string;
    availability: string;
    rates: Rate[];
}

/**
 * Function to extract room details from a given page.
 * @param page - The Playwright page object.
 * @param selector - The selector for the room container elements. Defaults to 'div.css-kpulmx.e1v0rose0'.
 * @returns An array of room details.
 */
export async function getRoomDetails(page: Page, selector: string = 'div.css-kpulmx.e1v0rose0'): Promise<RoomDetails[]> {
    const rooms: RoomDetails[] = [];
    await page.waitForTimeout(7000);
    // Get all room containers
    const roomElements = await page.$$(selector);

    for (const roomElement of roomElements) {
        // Extract room name
        const roomName = await roomElement.$eval('h1.css-u3ukw', el => el.textContent?.trim() || '');

        // Extract max guests using regex to extract the number after "Max Guests:"
        const maxGuestsText = await roomElement.$eval('p:has-text("Max Guests")', el => el.textContent?.trim() || '');
        const maxGuestsMatch = maxGuestsText.match(/Max Guests:\s*(\d+)/);
        const maxGuests = maxGuestsMatch ? maxGuestsMatch[1] : '';

        // Extract availability (if it exists)
        const availability = await roomElement.$eval('div:has-text("Rooms Available") p.css-1jlnpuf', el => el.textContent?.trim() || 'N/A').catch(() => 'N/A');

        // Extract rates
        const rates: Rate[] = await roomElement.$$eval('div.css-od9vqg', rateElements =>
            rateElements.map(rate => ({
                name: rate.querySelector('p[title]')?.textContent?.trim() || '',
                price: rate.querySelector('p[data-testid="rate-price"]')?.textContent?.trim() || '',
            }))
        );

        rooms.push({
            roomName,
            maxGuests,
            availability,
            rates,
        });
    }
    
    return rooms;
}
