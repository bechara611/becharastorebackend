import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import { ComprobarIDProducto, ComprobarTitle } from "../helpers/HelpersProducts.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";
import Productos from "../models/Productos.js";
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config();

const cloudinaryInstancia = cloudinary.v2;

cloudinaryInstancia.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



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

        const productoEliminado = await Productos.findByIdAndDelete(mongoid, { new: true })
        //?Tambien le retornamos todos los productos por si el frontend los necesita
        const productoAll = await Productos.find();

        return res.status(200).json({
            ok: true,
            productoEliminado,
            productos: productoAll
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
        const { email: EmailToken } = await VerificarJWT(token);
        const { title, idstore, urlimg, description, categoria, descriptionLong, price, cantidad, destroyimg } = req.body
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
        const productoActualizado = await Productos.findByIdAndUpdate(mongoid, {
            title, idstore, urlimg, description, categoria, descriptionLong, price, cantidad
        }, { new: true })

        //?Si la propiedad del body destroyimg es true, quiere decir que me esta dando un link nuevo de otra imagen y hay que eliminar la anterior
        if (destroyimg === true) {
            try {
                //si la imagen en el modelo existe
                if (existe.urlimg) {
                    //borrar la imagen del servidor de cloudinary
                    //entrada:     "img": "https://res.cloudinary.com/dscpbsjbj/image/upload/v1656357342/ycmvpqp9t1uudpmncrr9.png"
                    const nombreSplit1 = existe.urlimg.split('/');
                    //Salida: arrayz por cada /, la ultima posicion es: v1656357342/ycmvpqp9t1uudpmncrr9.png
                    //otro split
                    const nombre = nombreSplit1[nombreSplit1.length - 1].split('.')
                    //salida: un arrayz con ycmvpqp9t1uudpmncrr9 y en la otra posicion png
                    const ID_PUBLICO = nombre[0];
                    // console.log(ID_PUBLICO);





                    await cloudinaryInstancia.uploader.destroy(ID_PUBLICO);
                }
            } catch (error) {
                console.log(error)
            }
        }
        //?Tambien le retornamos todos los productos por si el frontend los necesita
        const productoAll = await Productos.find();

        return res.status(200).json({
            ok: true,
            productoActualizado,
            productos: productoAll
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

export const uploadImage = async (req = request, res = response) => {
    try {
        //comprobamos si hay algo cargado en los files, recuerda el middleware de fileupload en tu clase server para que esto valga
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'NOT FILE WERE UPLOADED',


                    }
                    ],

                }
            })
        }
        //ahora comparamos que exista un archivo llamado imagenes que se pasa por la raw-data
        if (!req.files.imagen) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: 'IMAGEN NOT FOUND-FRONTEND ERROR',


                    }
                    ],

                }
            })

        }
        //todo VALIDAR EXTENSION
        const { imagen } = req.files;
        const nombreCortado = imagen.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        const extensionesValida = ['jpg', 'jpeg', 'png', 'ico'];
        if (!extensionesValida.includes(extension)) {
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{


                        msg: '.EXT NOT VALID',


                    }
                    ],

                }
            })

        }
        //?Desestructura el tempFilePath que se usa el claudinary para subir la foto
        const { tempFilePath } = imagen
        //TODO limitar tamano del archivo
        console.log(imagen.size/1000000)
        if(imagen.size/1000000>2.5){ //hay que dividir entre 1000000 para tener el valor en megas
            return res.status(400).json({
                ok: false,
                errores: {
                    errors: [{
    
    
                        msg: 'IMAGE TO BIG, MAX 2MG',
    
    
                    }
                    ],
    
                }
            })
        }
        const resp = await cloudinaryInstancia.uploader.upload(tempFilePath)
            .then((resp) => {
                return resp
            })
            .catch((error) => { console.log(error) })

        const { secure_url } = resp;
        return res.status(200).json({ ok: true, msg: 'UPLOAD', urlimg: secure_url })
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