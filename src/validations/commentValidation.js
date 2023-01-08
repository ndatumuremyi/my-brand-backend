import joi from 'joi'

const commentValidation = (req, res, next) =>{
    const commentSchema = joi.object().keys({
        email:joi.string().required().messages({
            "any.required":"user e" +
                "mail required",
        }),
        names:joi.string().required().messages({
            "any.required":"user names required",
        }),
        blogId:joi.string().required().messages({
            "any.required":"blogId required",
        }),
        comment:joi.string().required().messages({
            "any.required":"comment required",
        }),

    })

    const value = commentSchema.validate(req.body);
    if(value.error){
        return res.status(400).json({
            message:value.error.details[0].message,
        })
    }else {
        return next()
    }
}

export default commentValidation