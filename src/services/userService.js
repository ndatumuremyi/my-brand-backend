import User from "../models/User.js";

export class UserServices {
    static async findUserByBrowserId(browserId){
        return User.findOne({ browserId: browserId });
    }
}