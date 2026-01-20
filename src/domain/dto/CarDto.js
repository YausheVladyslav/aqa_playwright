
export default class carDto {
    constructor(carData) {
        this.carData = carData
    }

    setCarBrandId(brandId) {
        this.carData.carBrandId = brandId
        return this
    }

    setCarModelId(modelId) {
        this.carData.carModelId = modelId
        return this
    }

    setCarMiliage(miliage) {
        this.carData.mileage = miliage
        return this
    }

    extract() {
        return structuredClone(this.carData)
    }

}