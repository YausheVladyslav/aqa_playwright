import BasePage from '../BasePage.js';

export default class MainPage extends BasePage {
    constructor(page) {
        super(page, '/');

        this.signUpButton = page.locator(".btn-primary");
        this.signUpModal = page.locator(".modal-content");
        this.registerButton = this.signUpModal.getByRole("button", { name: "Register" });
    }

    async navigate() {
        await this.page.goto(this._url);
    }

    async getSignUpModalLocator() {
        return this.signUpModal;
    }

    async openSignUpModal() {
        await this.signUpButton.click();
    }
    
    async getSignUpButton() {
        return this.signUpButton;
    }

    async getRegisterButton() {
        return this.registerButton;
    }

    async assertionSignUpButtonVisible() {
        await expect(this.signUpButton).toBeVisible();
    }

    async reloadPage() {
        await this.page.reload();
    }
}