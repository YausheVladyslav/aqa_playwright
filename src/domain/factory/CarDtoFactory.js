import { faker } from "@faker-js/faker";
import CarDto from '../dto/CarDto.js';


export default class CarDtoFactory {

    static randomValidCar(carBrandsData, carModelsData) {
        const randomBrand = carBrandsData[faker.number.int({ min: 0, max: carBrandsData.length - 1 })]
        const brandModels = carModelsData.filter(model => model.carBrandId == randomBrand.id)
        const randomCarModel = brandModels[faker.number.int({ min: 0, max: brandModels.length - 1 })]
        console.log(randomBrand, randomCarModel)
        const carData = {
            carBrandId: randomBrand.id,
            carModelId: randomCarModel.id,
            mileage: faker.number.int({ min: 1, max: 999999 })
        }
        return new CarDto(carData)
    }

}
