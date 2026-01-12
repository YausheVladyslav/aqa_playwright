import {test} from "@playwright/test";
import MainPageHeaderComponent from "../src/pageObjects/main/components/MainPageHeaderComponent";

test.describe("Login as Guest", () => {
    let mainPageHeader;

    test.beforeEach(async ({page}) => {
        await page.goto('/');
        mainPageHeader = new MainPageHeaderComponent(page);
    });

    test("Should login as Guest successfully", async () => {
        await mainPageHeader.loginAsGuest();
    });

});