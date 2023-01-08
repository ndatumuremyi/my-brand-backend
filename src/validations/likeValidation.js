import joi from 'joi'

const likeValidation = (req, res, next) =>{
    const likeSchema = joi.object().keys({
        blogId:joi.string().required().messages({
            "any.required":"blogId required",
        }),
        browserId:joi.string().required().messages({
            "any.required":"browserId required",
        }),

    })

    const value = likeSchema.validate(req.body);
    if(value.error){
        return res.status(400).json({
            message:value.error.details[0].message,
        })
    }else {
        return next()
    }
}

export default likeValidation