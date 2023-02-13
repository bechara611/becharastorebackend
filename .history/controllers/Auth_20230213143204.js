import { request, response } from "express";
import Usuarios from "../models/Usuarios.js";

/*?CREACION DEL METODO DE REGISTRO */
export const AuthPostRegister = async (req = request, res = response) => {

    const Usuario = new Usuarios({
        name:'Dany',
        email:'bechara611@gmail.com',
        password:'123456'
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

