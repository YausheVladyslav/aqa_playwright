
export default class UserDTO {
    constructor(userData) {
        this.userData = userData;
    }

    setUserName(userName) {
        this.userData.name = userName;
        return this;
    }

    setUserLastName(userLastName) {
        this.userData.lastName = userLastName;
        return this;
    }

    extract() {
        return structuredClone(this.userData);
    }
}