import { expect, test } from '@playwright/test';
import ApiClient from '../../src/clients/ApiClient.js';
import UserDtoFactory from '../../src/domain/factory/UserDtoFactory.js';

test.describe("User authentication with API", async () => {
    let apiClient;
    test.beforeEach(async ({ page, request }) => {
        await page.goto('/');
        apiClient = new ApiClient(request)

    })

    test('Sign up a new user @regression', async () => {
        const validUser = UserDtoFactory.validUser().extract()

        const expectedResponse = {
            status: 'ok',
            data: {
                userId: expect.any(Number),
                photoFilename: 'default-user.png',
                distanceUnits: 'km',
                currency: 'usd'
            }
        }

        const response = await apiClient.userController.signUp(validUser);
        console.log("RESPONSE", await response.json());
        expect(response.status()).toBe(202);
        await expect(response).toBeOK();
        expect(await response.json()).toEqual(expectedResponse);

    })

    test('Sign in (SIGN UP 2) as registered user @smoke', async () => {

          const validUser = UserDtoFactory.validUser().extract()

        const expectedResponse = {
            status: 'ok',
            data: {
                userId: expect.any(Number),
                photoFilename: 'default-user.png',
                distanceUnits: 'km',
                currency: 'usd'
            }
        }

        const response = await apiClient.userController.signUp(validUser);
        console.log("RESPONSE", await response.json());
        expect(response.status()).toBe(201);
        await expect(response).toBeOK();
        expect(await response.json()).toEqual(expectedResponse);

    })

    // test('Sign up a new user', async ({ page }) => {
    //     const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
    //     const userData = {
    //         name: faker.person.firstName(),
    //         lastName: faker.person.lastName(),
    //         email: faker.internet.email(),
    //         password: password,
    //         repeatPassword: password
    //     }
    //     const expectedResponse = {
    //         status: 'ok',
    //         data: {
    //             userId: expect.any(Number),
    //             photoFilename: 'default-user.png',
    //             distanceUnits: 'km',
    //             currency: 'usd'
    //         }
    //     }
    //     console.log(userData);

    //     const response = await page.request.post('/api/auth/signup', { data: userData });
    //     console.log("RESPONSE", await response.json());
    //     expect(response.status()).toBe(201);
    //     await expect(response).toBeOK();
    //     expect(await response.json()).toEqual(expectedResponse);

    // })


})