import { request, response } from "express";

const getProductos =(req=request,res=response)=>{
    res.json({ok:true})
}