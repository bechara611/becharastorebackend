import { request, response } from "express";

export const getProductos =(req=request,res=response)=>{
    res.json({ok:true})
}