import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import { text } from 'node:stream/consumers';

export default class DittoHealthPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async selectHDFCErgoOptimaSecure() {
        await this.page.locator('div').filter({ hasText: /^HDFCERGOOptima Secure$/ }).nth(1).click();
        //await this.page.getByText('HDFC ERGO Optima Secure').click();
    }

    async clickNext(times: number) {
        for (let i = 0; i < times; i++) {
            await this.page.getByRole('button', { name: 'Next' }).click();
        }
    }

    async clickContinue() {
        await this.page.keyboard.press('End')
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }


    async selectGenderMale() {
        await this.page.getByText('Male').first().click();
    }

    async clickOnNextStep() {
        await this.page.getByRole('button', { name: 'Next step' }).click();
    }


    async fillAgeAndPincode(age: string, pincode: string) {
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('textbox', { name: 'Your age' }).fill(age);
        await this.page.getByRole('textbox', { name: 'Proposer\'s Pincode' }).fill(pincode);
        await this.page.getByRole('button', { name: 'Calculate Premium' }).click();
    }


    async addFirstRiders() {
        await this.page.waitForTimeout(3000);
        await this.page.locator("[name = 'Unlimited Restoration']").check();
        await this.page.getByText('Premium₹').first().click();
    }


    async selectFirstRider() {
        const ridersSection = this.page.getByRole('region', { name: 'Add Ons & Riders' });

        const checkboxes = ridersSection.getByRole('checkbox');

        for (let i = 0; i < 3; i++) {
            await checkboxes.nth(i).click();

            await this.page.locator('.mantine-Grid-inner').nth(1).isVisible()


        }

        await this.page.waitForTimeout(3000);
        await this.page.getByRole('checkbox', { name: 'Self (M) (29 Years)' }).check();

        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }


    async getAddonAmounts(): Promise<number[]> {
        const addons = this.page.locator('.mantine-Grid-inner');
        const amounts: number[] = [];

        for (let i = 1; i < 4; i++) {
            await this.page.waitForTimeout(3000);
            const text = await addons.nth(i).innerText();
            amounts.push(Number(text.replace(/[^0-9.]/g, '')));


        }
        const basePriceText = await this.page
            .locator('.mantine-Stack-root > div > span')
            .nth(12)
            .innerText();

        const basePrice = parseInt(
            basePriceText.replace(/[^0-9.]/g, ''),
            10
        );

        const totalPriceText = await this.page
            .locator('.mantine-Stack-root > div > span')
            .nth(14)
            .innerText();

        const totalPrice = Number(
            totalPriceText.replace(/[^0-9.]/g, '')
        );
        const addonsTotal = amounts.reduce((sum, val) => sum + val, 0);
        const calculatedTotal = basePrice + addonsTotal;
        expect(totalPrice).toBe(calculatedTotal);


        return amounts;
    }

}
