import Productos from "../models/Productos.js"

export const ComprobarTitle = async (title) => {
    //helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
        const product = await Productos.findOne({ title })
        if (product) {
            return product
        } else {
            return null
        }
    
    }

export const MiddlewareCantidad =async(cantidad)=>{
    if(cantidad<=0){
        return new Error('PLEASE, INSERT AN AMOUNT MORE THAN 0')
    }
    return null;
}