import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";
import Categories from "../models/Categories.js";

export const getCategorias = async (req = request, res = response) => {
    try {
        const categorias = Categories.find();
        res.status(200).json({ ok: true, msg: 'Categorias', categorias })
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


export const PostCategorias = async (req = request, res = response) => {

    try {
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
        res.status(200).json({ ok: true, msg: ' post Categorias' })
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


export const DeleteCategorias = async (req = request, res = response) => {

    try {
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
        res.status(200).json({ ok: true, msg: ' Delete Categorias' })
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

