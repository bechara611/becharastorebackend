import { request, response } from "express";
import { ComprobarCategoria } from "../helpers/HelperCategories.js";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";
import Categories from "../models/Categories.js";

export const getCategorias = async (req = request, res = response) => {
    try {
        const categorias = await Categories.find();
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
        const {CategoryName} = req.body
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

     //TODO comprobar si el category existe



        }
        const existe = await ComprobarCategoria(CategoryName)
        if (existe) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{
   
   
                        msg: 'CATEGORY ALREADY CREATED',
   
   
                    }
                    ],
   
                }
            })
   
   
        }

        const categoriaNueva = new Categories({CategoryName})
        const nueva = await categoriaNueva.save();
        res.status(200).json({ ok: true, msg: ' post Categorias',categoriaNueva })
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
        const {CategoryName} = req.body
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
        const existe = await ComprobarCategoria(CategoryName)
        if (!existe) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{
   
   
                        msg: 'CATEGORY NOT FOUND',
   
   
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

