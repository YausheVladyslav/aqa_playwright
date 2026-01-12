import { test as base } from '@playwright/test';
import MainPage from '../pageObjects/main/MainPage.js';
import GaragePage from '../pageObjects/garage/GaragePage.js';

export const test = base.extend({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        await use(mainPage);
    },

    guestGaragePage: async ({ page, mainPage }, use) => {
        await mainPage.loginAsGuest();
        await use(new GaragePage(page));
    }

})