import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import { ComprobarIDProducto, ComprobarTitle } from "../helpers/HelpersProducts.js";
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
        const { title, idstore, urlimg, description, categoria, descriptionLong, price, cantidad } = req.body
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
        //?COMPROBAMOS SI EL TITULO UTILIZADO Y RECIBIDO DEL FRONT YA EXISTE EN NUESTRA BD
        const existe = await ComprobarTitle(title)
        if (existe) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'TITLE ALREADY CREATED, PLEASE CHOOSE ANOTHER ONE',


                    }
                    ],

                }
            })


        }
        //TODO INSERTAR IMAGEN

        const producto = new Productos({
            title,
            idstore,
            urlimg,
            description,
            categoria,
            descriptionLong,
            price,
            cantidad,
        })
        const productoGuardado = await producto.save();
        //TODO DEBES CREAR UNA RUTA QUE PUEDA SUBIR LA IMAGEN A CLOUDINARY Y LE DE AL FRONT EL LINK PARA PASARLO POR ACA, POR AHORA ES ESTATICO
        res.status(200).json({ ok: true, producto: productoGuardado })
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

export const deleteProducto = async (req = request, res = response) => {
    try {
        const { mongoid } = req.params;
        const { token } = req.headers
        const { email: EmailToken} = await VerificarJWT(token);

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

        //? luego de pasar la parte de que si es o no admin, comprobamos que el id del producto exista
        const existe = await ComprobarIDProducto(mongoid)
        if (!existe) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'PRODUCT NOT FOUND',


                    }
                    ],

                }
            })


        }
        //TODO eliminar un producto

        const productoEliminado = await Productos.findByIdAndDelete(mongoid,{new:true})
        //?Tambien le retornamos todos los productos por si el frontend los necesita
        const productoAll= await Productos.find();

       return res.status(200).json({
            ok: true,
            productoEliminado,
            productos:productoAll
        })
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

export const UpdateProducto = async (req = request, res = response) => {
    try {
        const { token } = req.headers
        const { mongoid } = req.params;
        const { email: EmailToken} = await VerificarJWT(token);
        const { title, idstore, urlimg, description, categoria, descriptionLong, price, cantidad } = req.body
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

     //TODO comprobar si el producto existe
const existe = await ComprobarIDProducto(mongoid)
if (!existe) {
    return res.status(400).json({
        ok: false,
        errores: {
            errors: [{


                msg: 'PRODUCT NOT FOUND',


            }
            ],

        }
    })


}
        //TODO ACTUALIZAR un producto
        const productoActualizado= await Productos.findByIdAndUpdate(mongoid,{
            title, idstore, urlimg, description, categoria, descriptionLong, price, cantidad
        },{new:true})

         //?Tambien le retornamos todos los productos por si el frontend los necesita
         const productoAll= await Productos.find();

       return res.status(200).json({
            ok: true,
            productoActualizado,
            productos:productoAll
        })
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

export const uploadProducto =async (req=request,res=response)=>{

//comprobamos si hay algo cargado en los files, recuerda el middleware de fileupload en tu clase server para que esto valga
if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        errors: {
            msg: 'NOT FILE WERE UPLOADED'
        }
    })
}
//ahora comparamos que exista un archivo llamado imagenes que se pasa por la raw-data
if (!req.files.imagen) {
    return res.status(400).json({
        errors: {
            msg: 'IMAGENES NOT FOUND'
        }
    })

}
//al haber comprobado que haya datos, los extraemos de manera correcta, 
    return res.status(200).json({ok:true,msg:'UPLOAD'})
}