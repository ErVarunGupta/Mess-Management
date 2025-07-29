import Joi from 'joi';

export const studentSignupValidation = async(req, res, next) =>{
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required().min(5).max(50),
        contact: Joi.string().required().min(10).max(10),
        institute: Joi.string().required(),
        department: Joi.string().required(),
        semester: Joi.number().required(),
        registration_no: Joi.string().required(),
        roll_no: Joi.string().required(),
        password: Joi.string().required().max(50).min(4),
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(401).json({
            message: "Bad Request!",
            error
        })
    }

    next();
}


export const studentSigninValidation = async(req, res, next) =>{
    const schema = Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required().min(4).max(50)
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(401).json({
            message: "Bad Request!",
            success: false
        })
    }

    next();
}