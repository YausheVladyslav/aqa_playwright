import { expect } from '@playwright/test';
import ApiClient from '../../src/clients/ApiClient.js';
import { faker } from '@faker-js/faker';
import CarDtoFactory from '../../src/domain/factory/carDtoFactory.js';
import { test } from '../../src/customFixtures/customFixture.js'

test.describe.only("Create API tests", async () => {
    let apiClient;
    test.beforeEach(async ({ page, request }) => {
        apiClient = new ApiClient(request);
        page.goto('/api');
    })

    test('Create a car', async ({authorizedUser}) => {
        const getBrandsResponse = await apiClient.carController.getCarBrands()
        const carBrandListJSON = await getBrandsResponse.json()
        const carBrandsData = carBrandListJSON.data
        console.log(carBrandListJSON)

        const carModelsResponse = await apiClient.carController.getCarModels()
        const carModelListJSON = await carModelsResponse.json()
        const carModelsData = carModelListJSON.data
        console.log(carModelListJSON)

        const randomValidCar = await CarDtoFactory.randomValidCar(carBrandsData, carModelsData).extract()
        console.log(randomValidCar)
        const createCarResponse = await apiClient.carController.createCar(randomValidCar)
        expect(createCarResponse).toBeOK();
    })

    test('Create a car with authorized user', async ({ authorizedUser }) => {
        console.log("created user for authorizedUser fixture from TEST", await authorizedUser.user)
        const getBrandsResponse = await authorizedUser.apiClient.carController.getCarBrands()
        const carBrandListJSON = await getBrandsResponse.json()
        const carBrandsData = carBrandListJSON.data
        console.log(carBrandListJSON)

        const carModelsResponse = await authorizedUser.apiClient.carController.getCarModels()
        const carModelListJSON = await carModelsResponse.json()
        const carModelsData = carModelListJSON.data
        console.log(carModelListJSON)

        const randomValidCar = await CarDtoFactory.randomValidCar(carBrandsData, carModelsData).extract()
        console.log("RANDOM CAR CREATED:", randomValidCar)
        const createCarResponse = await apiClient.carController.createCar(randomValidCar)
        console.log("RESPONSE: ", await createCarResponse.json())
        await expect(createCarResponse).toBeOK();
    })

})