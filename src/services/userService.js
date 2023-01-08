import User from "../models/User.js";

export class UserServices {
    static async findUserByBrowserId(browserId){
        return User.findOne({ browserId: browserId });
    }
    static async createUser(userInfo){
        let user = new User(userInfo);
        await user.save()

        return user
    }
    static async findByPk(id){
        return User.findOne({ _id: id });
    }
}