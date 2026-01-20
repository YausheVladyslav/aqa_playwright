import { expect } from '@playwright/test';
import ApiClient from '../../src/clients/ApiClient.js';
import CarDtoFactory from '../../src/domain/factory/carDtoFactory.js';
import { test } from '../../src/customFixtures/customFixture.js'
import CarService from '../../src/services/CarService.js';

test.describe("Create API tests", async () => {
    let apiClient;
    let carService;
    test.beforeEach(async ({ page, request }) => {
        apiClient = new ApiClient(request);
        carService = new CarService(apiClient);
        page.goto('/api');
    })

    test.only('Create a car with not authorized user', async () => {
        const { brands, models } = await carService.getBrandsAndModels()
        console.log("BRANDS", await brands)
        console.log("MODELS", await models)

        const randomValidCar = await CarDtoFactory.randomValidCar(brands, models).extract()
        console.log(randomValidCar)
        const createCarResponse = await apiClient.carController.createCar(randomValidCar)
        expect(createCarResponse).not.toBeOK();
    })

    test('Create a car with authorized user', async ({ authorizedUser }) => {
        console.log("created user for authorizedUser fixture from TEST", await authorizedUser.user)

        const { brands, models } = await carService.getBrandsAndModels()
        console.log("BRANDS", await brands)
        console.log("MODELS", await models)

        const randomValidCar = await CarDtoFactory.randomValidCar(brands, models).extract()
        console.log("RANDOM CAR CREATED:", randomValidCar)
        const createCarResponse = await apiClient.carController.createCar(randomValidCar)
        console.log("RESPONSE: ", await createCarResponse.json())
        await expect(createCarResponse).toBeOK();
    })

})