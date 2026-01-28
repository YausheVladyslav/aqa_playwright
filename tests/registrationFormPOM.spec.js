import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import MainPage from '../src/pageObjects/main/MainPage.js';
import SignUpModalComponent from '../src/pageObjects/main/components/SignUpModalComponent.js';


test.describe("Registration form POM", () => {
    let signUpPage;
    let mainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        signUpPage = new SignUpModalComponent(page);

        await mainPage.navigate();
        await mainPage.openSignUpModal();

    })


    test("Sign up with valid data should be successful @pom", async () => {

        const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
        const userData = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        }

        await signUpPage.fillSignUpFields(userData);
        await signUpPage.assertSignUpModalFields(userData);
        await signUpPage.clickRegisterButton();
    })

    test("Empty 'Name' field should show an error message @pom", async () => {
        const nameField = await signUpPage.getFieldByName('name');

        await nameField.focus();
        await nameField.blur();

        const errorMessage = await signUpPage.getErrorMessage();

        // expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(errorMessage).toBeVisible();
        expect(errorMessage).toBeEmpty();
        expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    })

    test("Invalid Name with 1 character should show error message @pom", async () => {
        const nameField = await signUpPage.getFieldByName('name');
        await nameField.fill('A');
        await nameField.blur();
        const errorMessage1 = await signUpPage.getErrorMessage();
        await signUpPage.expectCorrectErrorMessage(nameField, errorMessage1);

    })

    test("Invalid Name with 21 character should show error message @pom", async () => {
        const longName = 'qwertyuiopasdfghjklzx'; //21 characters
        const nameField = await signUpPage.getFieldByName('name');
        await nameField.fill(longName);
        await nameField.blur();
        const errorMessage = await signUpPage.getErrorMessage();
        await signUpPage.expectCorrectErrorMessage(nameField, errorMessage);

    })

    test("Valid email with subdomain should be accepted @pom", async () => {
        await test.step("Filling email field with valid email having subdomain", async () => {
            const email = 'user123@email.co.uk';
            const emailField = await signUpPage.getFieldByName('email');
            await emailField.fill(email);
            await emailField.blur();
        })
        await test.step("Verifying that no error message is shown for valid email", async () => {
            const errorMessage = await signUpPage.getErrorMessage();
            await signUpPage.expectEmptyErrorMessage(errorMessage);
        })

    })

    test("Reloading page should reset all fields @pom", async () => {

        const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
        const userData = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        }

        await signUpPage.fillSignUpFields(userData);
        const registerButton = await mainPage.getRegisterButton();
        const userFilledData = await signUpPage.getAllSignUpFields();

        expect(userFilledData.name).toHaveValue(userData.name);
        expect(userFilledData.lastName).toHaveValue(userData.lastName);
        expect(userFilledData.email).toHaveValue(userData.email);
        expect(userFilledData.password).toHaveValue(userData.password);
        expect(userFilledData.repeatPassword).toHaveValue(userData.repeatPassword);
        expect(registerButton).toBeEnabled({ timeout: 5000 });

        await mainPage.reloadPage();

        const signUpModalAfterReload = await mainPage.getSignUpModalLocator();

        expect(signUpModalAfterReload).not.toBeVisible();

        await mainPage.openSignUpModal();

        signUpPage.expectFieldByNameToBeEmpty('name');
        signUpPage.expectFieldByNameToBeEmpty('lastName');
        signUpPage.expectFieldByNameToBeEmpty('email');
        signUpPage.expectFieldByNameToBeEmpty('password');
        signUpPage.expectFieldByNameToBeEmpty('repeatPassword');
        expect(registerButton).not.toBeEnabled({ timeout: 5000 });
    })

})