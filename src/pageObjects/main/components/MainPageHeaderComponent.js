import { expect } from "@playwright/test";
import BaseComponent from '../../BaseComponent.js';

export default class MainPageHeaderComponent extends BaseComponent {
    constructor(page) {
        super(page, 'div.header_inner');

        this.GuestLoginButton = this.root.getByRole("button", { name: "Guest log in" });
    }

    async loginAsGuest() {
        expect(this.GuestLoginButton).toBeVisible();
        expect(this.GuestLoginButton).toBeEnabled();
        await this.GuestLoginButton.click();
        const logoutButton = this.page.getByText('Log out');
        expect(logoutButton).toBeVisible({ timeout: 5000 });
    }
}