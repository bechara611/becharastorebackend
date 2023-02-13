import { response } from "express"
import { validationResult } from "express-validator"

export const ValidarErrores =(req,res=response)=>{
    const errores= validationResult(req);
    if(!errores.isEmpty()){
        res.status(401).json({
            errores
        })
        return
    }

}