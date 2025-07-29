import Joi from 'joi';

export const managerSignupValidation = async(req, res, next) =>{
    const schema = Joi.object({
        name: Joi.string().required().max(50).min(2),
        email: Joi.string().required().email().max(50).min(5),
        contact: Joi.string().required().min(10).max(10),
        institute: Joi.string().required(),
        password: Joi.string().required().max(50).min(4)
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

export const managerSigninValidation = async (req, res, next) =>{
    const schema = Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required().min(4).max(50),
    });


    const {error} = schema.validate(req.body);

    if(error){
        return res.status(401).json({
            message: "Bad Request!",
            error
        })
    }

    next();
}
