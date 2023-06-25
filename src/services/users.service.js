const userModel = require("../DAO/models/users.model");

class UserManagerMongoose {
    async createUser(newUser) {
        try {
            const createNewUser = new userModel({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                isAdmin: newUser.isAdmin,
            });
            return await createNewUser.save();
        } catch (e) {
            throw new Error('error al crear usuario');
        };
    };
    async getUsers() {
        return await userModel.find({})
    }
}



module.exports = UserManagerMongoose;