import { request, response } from "express";

const getCategorias=(req=request,res=response)=>{
res.status(200).json({ok:true,msg:'Categorias'})
}