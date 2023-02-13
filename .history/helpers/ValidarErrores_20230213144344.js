import { response } from "express"
import { validationResult } from "express-validator"

export const ValidarErrores =(req,res=response,next)=>{
    const errores= validationResult(req);
    if(!errores.isEmpty()){
        return  res.status(401).json({
            errores
        })
       
    }
next();
}