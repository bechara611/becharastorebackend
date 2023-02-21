import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";

export const getCategorias=async(req=request,res=response)=>{
    const { token } = req.headers
    const { email: EmailToken } = await VerificarJWT(token);
    const infoAdmin = await ComprobarUser(EmailToken);
     //?Si el usuario no existe devuelve un return de error
     if (!infoAdmin) {
        return res.status(400).json({
            ok: false,
            errores: {
                errors: [{


                    msg: 'ADMIN/EMAIL NOT FOUND',


                }
                ],

            }
        })

    }
res.status(200).json({ok:true,msg:'Categorias'})
}