import { request, response } from "express";
import { GenerarJWT } from "../helpers/GenerarJWT.js";
import { ComprobarUser, ComprobarUserAndPassword } from "../helpers/HelpersAuth.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";
import Usuarios from "../models/Usuarios.js";



//RUTA: URL/AUTH/


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
        const { email, name, password, level = 'USER' } = req.body
        //comprobamos que en efecto el email no exista
        const resultado = await ComprobarUser(email);
        if (resultado) {
            return res.status(400).json({
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
            return res.status(400).json({
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
            return res.status(400).json({
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


//? ACTUALIZAR PASSWORD DE UN USUARIO, RECIBE EL TOKEN, EMAIL,PASSWORD1 Y PASSWORD2 
export const AuthUpdatePassword = async (req = request, res = response) => {
    try {

        //ya en el check se comprueba si lleva o no token la peticion
        const { token } = req.headers;
        const { email, password, password2 } = req.body

        //?comprobamos que en efecto el email a poner en inactivo exista
        const usuario = await ComprobarUser(email);
        if (!usuario) {
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
        if (password === password2) {
            return res.status(200).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'PLEASE, USE ANOTHER PASSWORD',


                    }
                    ],

                }
            })

        }
        const userLogueado = await ComprobarUserAndPassword(email, password);
        if (!userLogueado) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'THE CURRENT PASSWORD IS INCORRECT',


                    }
                    ],

                }
            })

        }
        //TODO METODO ACTUALIZAR LA CLAVE
        const usuarioActualizado = await Usuarios.findByIdAndUpdate(userLogueado._id, { password: password2 }, { new: true })


        return res.status(200).json({ ok: true, user: usuarioActualizado })

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
        const usuarioABorrar = await ComprobarUser(email);
        if (!usuarioABorrar) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'EMAIL NOT FOUND',


                    }
                    ],

                }
            })

        }
        //?Si el usuario ya fue borrado, o su estado es falso , entonces retorna que ya fue asi
        if (usuarioABorrar.active === false) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'USER ALREADY DELETED',


                    }
                    ],

                }
            })

        }
        //?Metodo para verificar el token y obtener el email y el mongoID porque lo tiene el payload del JWT
        const { email: EmailToken, _id } = await VerificarJWT(token);


        //TODO que unicamente el usuario administrador pueda borrar un usuario o ponerlo inactivo

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
        //?ACTUALIZAMOS AL USUARIO QUE SE QUIERE ELIMINAR O COLOCAR COMO INACTIVO
        //TODO retornar el usuario borrado
        const usuarioBorrado = await Usuarios.findByIdAndUpdate(usuarioABorrar._id, { active: false }, { new: true });


        return res.status(200).json({ ok: true, usuarioBorrado })

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


//?UPDATE Poner ACTIVO un usuario, opuesto al delete
export const AuthPostActiveUser = async (req = request, res = response) => {
    try {
        //ya en el check se comprueba si lleva o no token la peticion
        const { token } = req.headers;
        const { email } = req.body

        //comprobamos que en efecto el email a poner en inactivo exista
        const usuarioABorrar = await ComprobarUser(email);
        if (!usuarioABorrar) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'EMAIL NOT FOUND',


                    }
                    ],

                }
            })

        }
        //?Si el usuario ya fue borrado, o su estado es falso , entonces retorna que ya fue asi
        if (usuarioABorrar.active === true) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'USER ALREADY ACTIVE',


                    }
                    ],

                }
            })

        }
        //?Metodo para verificar el token y obtener el email y el mongoID porque lo tiene el payload del JWT
        const { email: EmailToken, _id } = await VerificarJWT(token);


        //TODO que unicamente el usuario administrador pueda borrar un usuario o ponerlo inactivo

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
        //?ACTUALIZAMOS AL USUARIO QUE SE QUIERE ELIMINAR O COLOCAR COMO INACTIVO
        //TODO retornar el usuario borrado
        const usuarioBorrado = await Usuarios.findByIdAndUpdate(usuarioABorrar._id, { active: true }, { new: true });


        return res.status(200).json({ ok: true, usuarioBorrado })

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

