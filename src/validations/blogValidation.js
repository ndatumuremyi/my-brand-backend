import joi from 'joi'

const blogValidation = (req, res, next) =>{
    const blogSchema = joi.object().keys({
        title:joi.string().required().messages({
            "any.required":"Blog title is required",
        }),
        description:joi.string().required().messages({
            "any.required":"Blog description is required",
        }),
        category:joi.string().required().messages({
            "any.required":"Blog category is required",
        }),
        image:joi.object().required().messages({
            "any.required":"Blog Image is required",
        }),
    })
    console.log(req.body)
    const value = blogSchema.validate(req.body);
    if(value.error){
        return res.status(400).json({
            message:value.error.details[0].message,
        })
    }else {
        return next()
    }
}

export default blogValidation