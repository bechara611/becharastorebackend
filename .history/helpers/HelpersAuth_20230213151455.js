import Usuarios from "../models/Usuarios.js";

export const ComprobarUser = async (email) => {
//helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
    const user = await Usuarios.findOne({ email })
    if (Encontrado) {
        return user
    } else {
        return null
    }

}