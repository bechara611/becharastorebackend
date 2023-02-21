import Categories from "../models/Categories.js"

export const ComprobarCategoria = async (CategoryName) => {
    //helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
        const categoria = await Categories.findOne({ CategoryName })
        if (categoria) {
            return categoria
        } else {
            return null
        }
    
    }