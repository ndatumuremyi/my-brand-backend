import 'dotenv/config';
import {UserServices} from "../services/userService.js";
import {decode} from "../system/security/jwt.js";
import passport from "passport";

export const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = decode(token);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.user = decodedToken;
    return next();
};

export const protectedRoute = async (req, res, next) => {
    // if (!req.isAuth) {
    //     return res.status(401).json({ message: 'unauthorized' });
    // }
    const { user } = req;
    try {
        const foundUser = await UserServices.findByPk(user.id);
        if (!foundUser.status) {
            return res.status(401).json({
                message: 'logged out, login and try again',
            });
        }
        req.me = foundUser;
        req.user = foundUser;
        return passport.authenticate('jwt', {session:false});
    } catch (err) {
        return res.status(401).json({
            message: 'invalid token,login to get one',
        });
    }
};
