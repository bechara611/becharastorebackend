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
    if(cantidad<0){
        throw new Error('PLEASE, INSERT A VALID AMOUNT')
    }
    return null;
}

export const MiddlewarePrecio =async(price)=>{
    if(price<=0){
        throw new Error('PLEASE, INSERT A VALID PRICE')
    }
    return null;
}