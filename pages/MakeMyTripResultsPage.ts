import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class MakeMyTripResultsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

//   async getHotelNames(): Promise<string[]> {
//     await this.page.waitForLoadState('networkidle');

//     return await this.page.$$eval(
//       "p.hotel-name",
//       hotels => hotels.map(h => h.textContent?.trim() || '')
//     );
//   }

  async getHotelNames(): Promise<string[]> {
  // Wait for at least one hotel to appear
  await this.page.waitForSelector('p#hlistpg_hotel_name.latoBlack.blackText.font20');

  return await this.page.$$eval(
    'p#hlistpg_hotel_name.latoBlack.blackText.font20',
    hotels => hotels.map(h => h.textContent?.trim() || '')
  );
}

}
