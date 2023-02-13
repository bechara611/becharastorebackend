import { response } from "express"
import { validationResult } from "express-validator"

export const ValidarErrores = (req, res = response, next) => {
    //gracias a validationResult recibe los errores de la request 
    const errores = validationResult(req);
    //comprobamos aca si NO esta vacio es porque hay errores y que retorne 
    if (!errores.isEmpty()) {
        return res.status(401).json({
            errores:{
                ...errores
            }
        })

    }
    next();
}