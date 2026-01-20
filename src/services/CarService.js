
export default class CarService {
    constructor(apiClient) {
        this.apiClient = apiClient
    }

    async getBrandsAndModels() {
        const brandsResponse = await this.apiClient.carController.getCarBrands()
        const brandsJson = await brandsResponse.json()

        const modelsResponse = await this.apiClient.carController.getCarModels()
        const modelsJson = await modelsResponse.json()

        return {
            brands: brandsJson.data,
            models: modelsJson.data
        }
    }

    // async createRandomCar() {
    //     const { brands, models } = await this.getBrandsAndModels()
    //     const randomCar = CarDtoFactory.randomValidCar(brands, models).extract()
    //     return this.apiClient.carController.createCar(randomCar)
    // }

}