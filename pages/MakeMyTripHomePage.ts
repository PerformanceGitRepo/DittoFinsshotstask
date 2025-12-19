import { Page } from '@playwright/test';
import BasePage from './BasePage';
import { formatDateLabel } from '../util/date';

export default class MakeMyTripHomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async selectHotelsTab() {
        await this.page.getByRole('link', { name: 'Hotels' }).click()
    }

    async closeAccountLogin() {
        await this.page.getByRole('img', { name: 'minimize' }).click(); //[alt = 'minimize']
        await this.page.locator("[data-cy = 'closeModal']").click()
    }

    async selectCity(city: string) {
        await this.page.locator("#city").click();
        await this.page.getByRole('textbox', { name: 'Where do you want to stay?' }).fill(city);
        await this.page.locator('.freeText').click();
    }

    async selectDates() {

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const checkInLabel = formatDateLabel(today);     // Thu Dec 18
        const checkOutLabel = formatDateLabel(tomorrow);

        // Open calendar
        await this.page.locator('#checkin').click();
        await this.page.getByLabel(checkInLabel).click();


        await this.page.getByLabel(checkOutLabel).click();
        await this.page.locator("#guest").click();
        await this.page.mouse.wheel(0, 300);

        // Small wait for UI to settle
        await this.page.waitForTimeout(200);

        // Click APPLY
        await this.page.getByRole('button', { name: 'APPLY' }).click();
        await this.page.waitForTimeout(3000);


    }


    async searchHotels() {
        await this.page.getByRole('button', { name: 'Search' }).click();

    }
}
