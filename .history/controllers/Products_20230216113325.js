import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";
import Productos from "../models/Productos.js";

export const getProductos = async (req = request, res = response) => {
    try {
        const productos = await Productos.find();
        res.json({ ok: true, productos })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            errores: {
                errors: [{


                    msg: 'Internal error',


                }
                ],

            }
        })
    }

}

export const postInsertarProducto = async (req = request, res = response) => {
    try {
        const body = req.body
        const { token } = req.headers
        //?Metodo para verificar el token y obtener el email y el mongoID porque lo tiene el payload del JWT
        const { email: EmailToken, _id } = await VerificarJWT(token);




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



        //?SI NO ES ADMIN NO LO DEJAMOS PASAR

        if (infoAdmin.level === 'user' || infoAdmin.level === 'USER') {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'YOU DONT HAVE PERMISSION TO DO THAT',


                    }
                    ],

                }
            })




        }

        res.status(200).json({ok:true})
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            errores: {
                errors: [{


                    msg: 'Internal error',


                }
                ],

            }
        })
    }
}