import joi from 'joi'

const AuthValidation = (req, res, next) =>{
    const singUpSchema = joi.object().keys({
        email:joi.string().required().messages({
            "any.required":"user email required",
        }),
        password:joi.string().required().messages({
            "any.required":"password required",
        }),

    })

    const value = singUpSchema.validate(req.body);
    if(value.error){
        return res.status(400).json({
            message:value.error.details[0].message,
        })
    }else {
        return next()
    }
}

export default AuthValidation