import { request, response } from "express";

export const getCategorias=(req=request,res=response)=>{
res.status(200).json({ok:true,msg:'Categorias'})
}