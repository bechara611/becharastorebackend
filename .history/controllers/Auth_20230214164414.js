import { request, response } from "express";
import { GenerarJWT } from "../helpers/GenerarJWT.js";
import { ComprobarUser, ComprobarUserAndPassword } from "../helpers/HelpersAuth.js";
import Usuarios from "../models/Usuarios.js";

/*?CREACION DEL METODO DE REGISTRO */
export const AuthPostRegister = async (req = request, res = response) => {
    try {
        //obtenemos todo del body
        const { email, name, password, level = 'user' } = req.body
        //comprobamos que en efecto el email no exista
        const resultado = await ComprobarUser(email);
        if (resultado) {
            return res.status(200).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'USER ALREADY EXISTS',


                    }
                    ],

                }
            })

        }
        //?si no existe se creara el usuario en la coleccion de mongo, primero la instancia y luego se guarda 
        const Usuario = new Usuarios({
            name,
            email,
            password,
            level
        });



        //?aca se guarda al usuario
        const usuarioCreado = await Usuario.save()

        //? generar JWT
        const token = await GenerarJWT(email, usuarioCreado._id)

        //?Retorna el usuario y su token respectivo
        return res.status(200).json({ ok: true, user: usuarioCreado, token })

    } catch (error) {
        console.log(error)
        res.status(400).json({
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


/*?CREACION DEL METODO DE LOGIN*/
//TODO login
export const AuthPostLogin =async (req = request, res = response) => {
    const { email, name, password, level = 'user' } = req.body

    //comprobamos que en efecto el email no exista
    const resultado = await ComprobarUser(email);
    if (!resultado) {
        return res.status(200).json({
            ok: false,
            errores: {
                errors: [{


                    msg: 'EMAIL NOT FOUND',


                }
                ],

            }
        })

    }
    const userLogueado = await ComprobarUserAndPassword(email,password);
    if (!userLogueado) {
        return res.status(200).json({
            ok: false,
            errores: {
                errors: [{


                    msg: 'INCORRECT PASSWORD',


                }
                ],

            }
        })

    }

    res.status(200).json({ ok: 'Login' })
}

/*?CREACION DEL METODO DE OBTENER TODOS LOS USUARIOS */
//TODO obtener todos los user
export const AuthGet = (req = request, res = response) => {
    res.status(200).json({ ok: '1234' })
}

