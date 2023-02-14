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
            level,
            active:true,
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

      return  res.status(200).json({ ok: true, user: userLogueado, token })

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

/*?CREACION DEL METODO DE OBTENER TODOS LOS USUARIOS */
//TODO obtener todos los user
export const AuthGet = async(req = request, res = response) => {
    try {
        //?obtenemos todos los usuarios con el metodo find del modelo
        const usuarios =await  Usuarios.find();


            return res.status(200).json({ ok:true,
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

//?Poner inactivo un usuario
export const AuthPostDelete = async (req = request, res = response) => {
    try {
        const{token}= req.headers('token');
        const { email } = req.body

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
      


      return  res.status(200).json({ ok: true,token,email})

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

