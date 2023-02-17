import { request, response } from "express";
import { GenerarJWT } from "../helpers/GenerarJWT.js";
import { ComprobarUser, ComprobarUserAndPassword } from "../helpers/HelpersAuth.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";
import Usuarios from "../models/Usuarios.js";

//?CREACION DEL METODO DE OBTENER TODOS LOS USUARIOS */
export const AuthGet = async (req = request, res = response) => {
    try {
        //?obtenemos todos los usuarios con el metodo find del modelo
        const usuarios = await Usuarios.find();


        return res.status(200).json({
            ok: true,
            usuarios
        })

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




//?CREACION DEL METODO DE REGISTRO */
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
            level,
            active: true,
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


//?CREACION DEL METODO DE LOGIN*/
//TODO login
export const AuthPostLogin = async (req = request, res = response) => {
    try {
        const { email, password } = req.body

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
        const userLogueado = await ComprobarUserAndPassword(email, password);
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
        //? generar JWT
        const token = await GenerarJWT(email, userLogueado._id)

        return res.status(200).json({ ok: true, user: userLogueado, token })

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



//?DELETE Poner inactivo un usuario
export const AuthPostDelete = async (req = request, res = response) => {
    try {
        //ya en el check se comprueba si lleva o no token la peticion
        const { token } = req.headers;
        const { email } = req.body

        //comprobamos que en efecto el email a poner en inactivo exista
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
        //TODO metodo de comprobar el JWT
        const payload = await VerificarJWT(token);
        console.log(payload)

        //TODO que unicamente el usuario administrador pueda borrar un usuario o ponerlo inactivo

        //TODO retornar el usuario borrado


        return res.status(200).json({ ok: true, token })

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

//? ACTUALIZAR PASSWORD DE UN USUARIO, RECIBE EL TOKEN, EMAIL,PASSWORD1 Y PASSWORD2 
export const AuthUpdatePassword = async (req = request, res = response) => {
    try {

        //ya en el check se comprueba si lleva o no token la peticion
        const { token } = req.headers;
        const { email, password, password2 } = req.body

        //comprobamos que en efecto el email a poner en inactivo exista
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

             //TODO metodo de comprobar el JWT



        const userLogueado = await ComprobarUserAndPassword(email, password);
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
             //TODO METODO ACTUALIZAR LA CLAVE



        return res.status(200).json({ ok: true })

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

