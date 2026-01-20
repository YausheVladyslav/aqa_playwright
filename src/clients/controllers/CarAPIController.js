import BaseController from './BaseController.js';

export default class CarAPIController extends BaseController {
    _CREATE_CAR_PATH = '/api/cars'
    _GET_CAR_MODELS_PATH = '/api/cars/models'
    _GET_CAR_BRANDS_PATH = '/api/cars/brands'
    // _GET_CAR_BRANDS_BY_ID_PATH = `/api/cars/brands/id`

    constructor(request) {
        super(request)
    }

    getCarModels() {
        return this.request.get(this._GET_CAR_MODELS_PATH);
    }

    getCarBrands() {
        return this.request.get(this._GET_CAR_BRANDS_PATH);
    }

    createCar(carData) {
        return this.request.post(this._CREATE_CAR_PATH, {data: carData});
    }

}