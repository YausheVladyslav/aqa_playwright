import { test, expect } from "@playwright/test";
import MainPageHeaderComponent from "../src/pageObjects/main/components/MainPageHeaderComponent";
import GaragePage from "../src/pageObjects/garage/GaragePage";

test.describe.skip("Login as Guest", async () => {
    let mainPageHeader;
    let garagePage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        mainPageHeader = new MainPageHeaderComponent(page);
        garagePage = new GaragePage(page);
    });

    test("Create a car as a Guest with session storage", async ({ page }) => {
        await mainPageHeader.loginAsGuest();
        const addCarButton = page.getByRole('button', { name: 'Add car' })
        await addCarButton.click();
        const addCarModal = page.locator('app-add-car-modal')
        const cancelButton = addCarModal.getByRole('button', { name: 'Cancel' })
        expect(cancelButton).toBeVisible();

        const data = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 321,
                    "updatedMileageAt": "2026-01-11T22:17:45.341Z",
                    "carCreatedAt": "2026-01-11T22:17:45.341Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 321
                }
            ],
            "nextCarId": 3,
            "nextExpenseId": 2
        }

        await page.evaluate(async (guestData) => {
            window.sessionStorage.setItem("guestData", JSON.stringify(guestData));
        }, data);

        await page.reload();

        const sessionStorageData = await page.evaluate(() => {
            return window.sessionStorage.getItem("guestData");
        });

        expect(JSON.parse(sessionStorageData)).toEqual(data);
    })
})