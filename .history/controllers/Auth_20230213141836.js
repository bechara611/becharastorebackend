import { request, response } from "express";
import Usuarios from "../models/Usuarios.js";

export const AuthGet=(req=request,res=response)=>{
res.status(200).json({ok:'1234'})
}

export const AuthPostRegister=async(req=request,res=response)=>{

    const Usuario = new Usuarios();
    Usuario.save({
        name:'Dany',
        email:'Bechara611@gmail.com',
        password:'123456'
    })

    res.status(200).json({ok:'Register'})
}

export const AuthPostLogin=(req=request,res=response)=>{
    res.status(200).json({ok:'Login'})
}