import { request, response } from "express";
import Productos from "../models/Productos.js";

export const getProductos =async(req=request,res=response)=>{
try {
    const productos= await Productos.find();
    res.json({ok:true,productos})
} catch (error) {
    
}
 
}

export const postInsertarProducto=async(req=request,res=response)=>{

}