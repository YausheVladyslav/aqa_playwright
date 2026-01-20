import BaseController from './BaseController.js';

export default class UserAPIController extends BaseController {
    _USER_SIGNUP_PATH = '/api/auth/signup';
    _USER_SIGNIN_PATH = "/api/auth/signin";

    constructor(request) {
        super(request);
    }

    signUp(userData) {
        return this.request.post(this._USER_SIGNUP_PATH, { data: userData });
    }

    signIn({ email, password, remember = false }) {
        return this.request.post(this._USER_SIGNIN_PATH, {
            data: {
                email,
                password,
                remember
            }
        });
    }
}