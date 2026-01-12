import BasePage from '../BasePage.js';
import MainPageHeaderComponent from '../main/components/MainPageHeaderComponent.js';
import { expect } from '@playwright/test';

export default class GaragePage extends BasePage {

  constructor(page) {
    super(page, '/panel/garage');

    this.headerComponents = new MainPageHeaderComponent(page);
  }

  //need to be logged in as guest before using this method
  async createCarAsGuest() {
    const addCarButton = this.page.getByRole('button', { name: 'Add car' });
    await addCarButton.click();
    const addCarModal = this.page.locator('app-add-car-modal');
    const cancelButton = addCarModal.getByRole('button', { name: 'Cancel' });
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

    await this.page.evaluate(async (guestData) => {
      window.sessionStorage.setItem("guestData", JSON.stringify(guestData));
    }, data);

    await this.page.reload();
    const sessionStorageData = await this.page.evaluate(() => {
      return window.sessionStorage.getItem("guestData");
    });

    expect(JSON.parse(sessionStorageData)).toEqual(data);
  }
}