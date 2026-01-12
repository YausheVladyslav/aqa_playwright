import BasePage from '../BasePage.js';
import { expect } from '@playwright/test';

export default class MainPage extends BasePage {
    constructor(page) {
        super(page, '/');

        this.signUpButton = page.locator(".btn-primary");
        this.signUpModal = page.locator(".modal-content");
        this.registerButton = this.signUpModal.getByRole("button", { name: "Register" });
        this.headerComponent = page.locator('div.header_inner');
        this.GuestLoginButton = this.headerComponent.getByRole("button", { name: "Guest log in" });
    }

    async loginAsGuest() {
        expect(this.GuestLoginButton).toBeVisible();
        expect(this.GuestLoginButton).toBeEnabled();
        await this.GuestLoginButton.click();
        const logoutButton = this.page.getByText('Log out');
        expect(logoutButton).toBeVisible({ timeout: 5000 });
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