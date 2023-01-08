import jwt from "jsonwebtoken";
 const genToken = user => {
    return jwt.sign({
        iss: 'Joan_Louji',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'joanlouji');
}
export default genToken