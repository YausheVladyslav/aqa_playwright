import { test as base } from '@playwright/test';
import MainPage from '../pageObjects/main/MainPage.js';
import GaragePage from '../pageObjects/garage/GaragePage.js';
import ApiClient from '../clients/ApiClient.js';
import UserDtoFactory from '../domain/factory/userDtoFactory.js';

export const test = base.extend({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        await use(mainPage);
    },

    guestGaragePage: async ({ page, mainPage }, use) => {
        await mainPage.loginAsGuest();
        await use(new GaragePage(page));
    },

    authorizedUser: async ({ request }, use) => {
        const apiClient = new ApiClient(request)
        const userDTO = UserDtoFactory.validUser()
        const user = userDTO.extract()
        await apiClient.userController.signUp(user)
        await apiClient.userController.signIn({ email: user.email, password: user.password })
        await use({ apiClient, user })

    }

})