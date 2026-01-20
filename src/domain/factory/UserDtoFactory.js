import UserDto from '../dto/UserDto.js';
import { faker } from '@faker-js/faker';

export default class UserDtoFactory {

    static validUser(overrides = {}) {
        const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
        const userData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: password,
            repeatPassword: password,
            ...overrides
        }
        console.log(userData)
        return new UserDto(userData)

    }

}