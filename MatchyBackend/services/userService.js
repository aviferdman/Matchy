class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(data) {
        const existingUser = await this.userModel.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Email already in use');
        }
        return this.userModel.create(data);
    }

    getAllUsers() {
        return this.userModel.findAll();
    }

    getAllUsersByGender(gender) {
        return this.userModel.findAllByGender(gender);
    }

    getUserById(id) {
        return this.userModel.findById(id);
    }

    updateUser(id, data) {
        return this.userModel.update(id, data);
    }

    deleteUser(id) {
        return this.userModel.delete(id);
    }
}

module.exports = UserService;
