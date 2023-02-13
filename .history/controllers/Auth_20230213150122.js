import { request, response } from "express";
import { ComprobarUser } from "../helpers/HelpersAuth.js";
import Usuarios from "../models/Usuarios.js";

/*?CREACION DEL METODO DE REGISTRO */
export const AuthPostRegister = async (req = request, res = response) => {

    const { email } = req.body
    const resultado = await ComprobarUser(email);
    if (resultado) {
        return res.status(200).json({
            errores: 'USER ALREADY EXISTS'
        })

    }

    const Usuario = new Usuarios({
        name: 'Dany',
        email,
        password: '123456'
    });




    const usuarioCreado = await Usuario.save()

    res.status(200).json({ ok: 'Register', usuarioCreado })
}
/*?CREACION DEL METODO DE LOGIN*/
export const AuthPostLogin = (req = request, res = response) => {
    res.status(200).json({ ok: 'Login' })
}

/*?CREACION DEL METODO DE OBTENER TODOS LOS USUARIOS */
export const AuthGet = (req = request, res = response) => {
    res.status(200).json({ ok: '1234' })
}

