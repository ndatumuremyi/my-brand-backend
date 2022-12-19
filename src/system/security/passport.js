import passport from "passport"
import passportJWT from 'passport-jwt'
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import User from "../../models/User.js";

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'joanlouji'
    },
    function (jwtPayload, done) {
        return User.findById(jwtPayload.sub)
            .then(user =>
                {
                    return done(null, user);
                }
            ).catch(err =>
            {
                return done(err);
            });
    }
))