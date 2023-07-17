const user_Model = require("../DAO/models/user.model");

class User_Manager {
    async createUser(newUser) {
        try {
            const createNewUser = new user_Model({
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age,
                password: newUser.password,
                cart: newUser.cart
            });
            console.log('hasta acá todo ok');
            return await createNewUser.save();
        } catch (e) {
            throw new Error('error al crear usuario');
        };
    };
    async getUsers() {
        return await user_Model.find({})
    }
}

module.exports = User_Manager;