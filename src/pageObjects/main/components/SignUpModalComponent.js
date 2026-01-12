
import { expect } from "@playwright/test";
import BaseComponent from '../../BaseComponent.js';


export default class SignUpModalComponent extends BaseComponent {
    constructor(page) {
        super(page);

        this.signUpModal = page.locator(".modal-content");
        this.registerButton = this.signUpModal.getByRole("button", { name: "Register" })
        this.errorMessage = this.signUpModal.locator(".invalid-feedback")

        this.signUpFields = {
            name: this.signUpModal.locator("#signupName"),
            lastName: this.signUpModal.locator("#signupLastName"),
            email: this.signUpModal.locator("#signupEmail"),
            password: this.signUpModal.locator("#signupPassword"),
            repeatPassword: this.signUpModal.locator("#signupRepeatPassword")
        }
    }

    async getSignUpModal() {
        return this.signUpModal;
    }

    async fillSignUpFields(userData) {
        for (const [fieldName, value] of Object.entries(userData)) {
            if (!this.signUpFields[fieldName]) {
                throw new Error(`Field ${fieldName} does not exist in sign up form`);
            }
            await this.signUpFields[fieldName].fill(value);
        }
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async getRegisterButton() {
        return this.registerButton;
    }

    async assertRegisterButtonEnabled() {
        expect(this.registerButton).toBeEnabled({ timeout: 5000 });
    }

    async assertSignUpModalFields(userData) {
        expect(this.signUpFields.name).toHaveValue(userData.name);
        expect(this.signUpFields.lastName).toHaveValue(userData.lastName);
        expect(this.signUpFields.email).toHaveValue(userData.email);
        expect(this.signUpFields.password).toHaveValue(userData.password);
        expect(this.signUpFields.repeatPassword).toHaveValue(userData.repeatPassword);
        // expect(this.registerButton).toBeEnabled();
        await this.assertRegisterButtonEnabled();
    }

    async expectFieldByNameToBeEmpty(fieldName) {
        const field = await this.getFieldByName(fieldName);
        expect(field).toBeEmpty();
    }

    async getFieldByName(fieldName) {
        if (!this.signUpFields[fieldName]) {
            throw new Error(`Field ${fieldName} does not exist in sign up form`);
        }

        return this.signUpFields[fieldName];
    }

    async getAllSignUpFields() {
        return this.signUpFields;
    }

    async getErrorMessage() {
        return this.errorMessage;
    }

    async expectCorrectErrorMessage(nameField, errorMessage) {
        // expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(errorMessage).toBeVisible();
        expect(errorMessage).not.toBeEmpty();
    }

    async expectEmptyErrorMessage(errorMessage) {
        expect(errorMessage).not.toBeVisible();
    }



}