import Categories from "../models/Categories"

export const ComprobarCategoria = async (name) => {
    //helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
        const categoria = await Categories.findOne({ name })
        if (categoria) {
            return categoria
        } else {
            return null
        }
    
    }