import Productos from "../models/Productos"

export const ComprobarTitle = async (title) => {
    //helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
        const user = await Productos.findOne({ title })
        if (user) {
            return user
        } else {
            return null
        }
    
    }