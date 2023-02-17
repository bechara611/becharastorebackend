import Productos from "../models/Productos"

export const ComprobarTitle = async (title) => {
    //helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
        const product = await Productos.findOne({ title })
        if (product) {
            return product
        } else {
            return null
        }
    
    }