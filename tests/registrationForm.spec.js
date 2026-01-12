import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.skip("Registration form", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator(".btn-primary").click();
        const signUpModal = page.locator(".modal-content")
        await expect(signUpModal).toBeVisible();
    })


    test("Sign up with valid data should be successful", async ({ page }) => {

        const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
        const userData = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        }

        const signUpModal = page.locator(".modal-content")
        const nameField = signUpModal.locator("#signupName")
        const lastNameField = signUpModal.locator("#signupLastName")
        const emailField = signUpModal.locator("#signupEmail")
        const passwordField = signUpModal.locator("#signupPassword")
        const repeatPasswordField = signUpModal.locator("#signupRepeatPassword")
        const registerButton = signUpModal.getByRole("button", { name: "Register" })

        await nameField.fill(userData.name);
        await lastNameField.fill(userData.lastName);
        await emailField.fill(userData.email);
        await passwordField.fill(userData.password);
        await repeatPasswordField.fill(userData.repeatPassword);

        expect(nameField).toHaveValue(userData.name);
        expect(lastNameField).toHaveValue(userData.lastName);
        expect(emailField).toHaveValue(userData.email);
        expect(passwordField).toHaveValue(userData.password);
        expect(repeatPasswordField).toHaveValue(userData.repeatPassword);
        expect(registerButton).toBeEnabled();

        registerButton.click();

        const garageEmptystate = page.locator(".panel-empty_message")
        await expect(garageEmptystate).toBeVisible();
        await expect(garageEmptystate).toHaveText("You don’t have any cars in your garage");
    })

    test("Empty 'Name' field should show an error message", async ({ page }) => {

        const signUpModal = page.locator(".modal-content")
        const nameField = signUpModal.locator("#signupName")

        await nameField.focus();
        await nameField.blur();

        const errorMessage = signUpModal.locator(".invalid-feedback")

        expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(errorMessage).toBeVisible();
        expect(errorMessage).toHaveText('Name required');

    })

    test("Invalid Name with 1 character should show error message", async ({ page }) => {
        const name = 'A'
        const signUpModal = page.locator(".modal-content")
        const nameField = signUpModal.locator("#signupName")
        await nameField.fill(name);
        await nameField.blur();

        const errorMessage = signUpModal.locator(".invalid-feedback")

        expect(nameField).toHaveValue(name);
        expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(errorMessage).toBeVisible();
        expect(errorMessage).toHaveText('Name has to be from 2 to 20 characters long');

    })

    test("Invalid Name with 21 character should show error message", async ({ page }) => {
        const name = 'qwertyuiopasdfghjklzx' //21 characters
        const signUpModal = page.locator(".modal-content")
        const nameField = signUpModal.locator("#signupName")
        await nameField.fill(name);
        await nameField.blur();

        const errorMessage = signUpModal.locator(".invalid-feedback")

        expect(nameField).toHaveValue(name);
        expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(errorMessage).toBeVisible();
        expect(errorMessage).toHaveText('Name has to be from 2 to 20 characters long');

    })

    test("Valid email with subdomain should be accepted", async ({ page }) => {
        const email = 'user123@email.co.uk'
        const signUpModal = page.locator(".modal-content")
        const emailField = signUpModal.locator("#signupEmail")
        await emailField.fill(email);
        await emailField.blur();

        const errorMessage = signUpModal.locator(".invalid-feedback")

        expect(emailField).toHaveValue(email);
        expect(errorMessage).not.toBeVisible();

    })

    test("Reloading page should reset all fields", async ({ page }) => {

        const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
        const userData = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        }

        const signUpModal = page.locator(".modal-content")
        const nameField = signUpModal.locator("#signupName")
        const lastNameField = signUpModal.locator("#signupLastName")
        const emailField = signUpModal.locator("#signupEmail")
        const passwordField = signUpModal.locator("#signupPassword")
        const repeatPasswordField = signUpModal.locator("#signupRepeatPassword")

        await nameField.fill(userData.name);
        await lastNameField.fill(userData.lastName);
        await emailField.fill(userData.email);
        await passwordField.fill(userData.password);
        await repeatPasswordField.fill(userData.repeatPassword);

        expect(nameField).toHaveValue(userData.name);
        expect(lastNameField).toHaveValue(userData.lastName);
        expect(emailField).toHaveValue(userData.email);
        expect(passwordField).toHaveValue(userData.password);
        expect(repeatPasswordField).toHaveValue(userData.repeatPassword);

        await page.reload();

        expect(signUpModal).not.toBeVisible();

        await page.locator(".btn-primary").click();
        expect(nameField).toBeEmpty();
        expect(lastNameField).toBeEmpty();
        expect(emailField).toBeEmpty();
        expect(passwordField).toBeEmpty();
        expect(repeatPasswordField).toBeEmpty();
    })

})