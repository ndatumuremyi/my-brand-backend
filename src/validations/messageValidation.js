import joi from 'joi'

const messageValidation = (req, res, next) =>{
    const messageSchema = joi.object().keys({
        email:joi.string().required().messages({
            "any.required":"user email required",
        }),
        names:joi.string().required().messages({
            "any.required":"user names required",
        }),
        message:joi.string().required().messages({
            "any.required":"message required",
        }),

    })

    const value = messageSchema.validate(req.body);
    if(value.error){
        return res.status(400).json({
            message:value.error.details[0].message,
        })
    }else {
        return next()
    }
}

export default messageValidation