import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import Usuarios from "../models/Usuarios.js";

/*?CREACION DEL METODO DE REGISTRO */
export const AuthPostRegister = async (req = request, res = response) => {
    try {
         //obtenemos todo del body
    const { email,name,password } = req.body
    //comprobamos que en efecto el email no exista
    const resultado = await ComprobarUser(email);
    if (resultado) {
        return res.status(200).json({
            errores: 'USER ALREADY EXISTS'
        })

    }
//si no existe se creara el usuario en la coleccion de mongo, primero la instancia y luego se guarda 
    const Usuario = new Usuarios({
        name: 'Dany',
        email,
        password: '123456'
    });



//aca se guarda al usuario
    const usuarioCreado = await Usuario.save()

    return res.status(200).json({ ok: true, user:usuarioCreado })
    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            errores:'INTERNAL ERROR'
        })
    }

   
}
/*?CREACION DEL METODO DE LOGIN*/
export const AuthPostLogin = (req = request, res = response) => {
    res.status(200).json({ ok: 'Login' })
}

/*?CREACION DEL METODO DE OBTENER TODOS LOS USUARIOS */
export const AuthGet = (req = request, res = response) => {
    res.status(200).json({ ok: '1234' })
}

