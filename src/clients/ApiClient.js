import UserAPIController from './controllers/UserAPIController.js';
import CarAPIController from './controllers/CarAPIController.js';

export default class ApiClient {
    constructor(request) {
        this.request = request;
        this.userController = new UserAPIController(request);
        this.carController = new CarAPIController(request);
    }
}