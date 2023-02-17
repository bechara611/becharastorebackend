import { request, response } from "express";
import Productos from "../models/Productos.js";

export const getProductos =async(req=request,res=response)=>{

    const productos= await Productos.find();
    res.json({ok:true,productos})
}

export const postInsertarProducto=async(req=request,res=response)=>{
    
}